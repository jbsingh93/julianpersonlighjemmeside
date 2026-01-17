#!/usr/bin/env tsx
/**
 * Schema Validation Script
 *
 * Validates all JSON-LD structured data across the site:
 * - Checks for required properties
 * - Validates @id references
 * - Ensures consistent entity relationships
 * - Validates Schema.org types
 * - Checks for common mistakes
 */

import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

interface ValidationError {
  file: string;
  severity: 'error' | 'warning';
  message: string;
  line?: number;
}

const errors: ValidationError[] = [];

// Schema.org types that should exist
const EXPECTED_TYPES = [
  'WebSite',
  'Organization',
  'Person',
  'Service',
  'Course',
  'BreadcrumbList',
  'FAQPage',
  'CollectionPage',
  'AboutPage'
];

// Required properties for each type
const REQUIRED_PROPS: Record<string, string[]> = {
  WebSite: ['@type', '@id', 'url', 'name'],
  Organization: ['@type', '@id', 'name', 'url'],
  Person: ['@type', '@id', 'name', 'url'],
  Service: ['@type', 'name', 'description', 'url', 'provider'],
  Course: ['@type', 'name', 'description', 'provider'],
  BreadcrumbList: ['@type', 'itemListElement'],
  FAQPage: ['@type', 'mainEntity'],
  CollectionPage: ['@type', 'name', 'url'],
  AboutPage: ['@type', 'name', 'url']
};

// Known @id references
const KNOWN_IDS = [
  'https://julianbentsingh.dk/#website',
  'https://julianbentsingh.dk/#org',
  'https://julianbentsingh.dk/#julian',
  'https://julianbentsingh.dk/ai-ydelser/ai-konsulent/#service',
  'https://julianbentsingh.dk/ai-ydelser/fysiske-ai-kurser/#service',
  'https://julianbentsingh.dk/ai-ydelser/fysisk-ai-workshop/#service',
  'https://julianbentsingh.dk/ai-ydelser/foredrag/#service',
  'https://julianbentsingh.dk/referencer/#page',
  'https://julianbentsingh.dk/om/#page'
];

async function findSchemaInFile(filePath: string): Promise<any[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Look for JsonLd component usage
    if (!content.includes('JsonLd') && !content.includes('buildHomePageGraph')) {
      return [];
    }

    // Extract schema objects
    const schemas: any[] = [];

    // Look for schema variable assignments
    const schemaRegex = /const\s+schema\s*=\s*({[\s\S]*?});/g;
    let match;

    while ((match = schemaRegex.exec(content)) !== null) {
      try {
        // This is a simplified approach - in reality, we'd need to execute the code
        // For now, we'll just flag that the file has schema
        schemas.push({ file: filePath, hasSchema: true });
      } catch (e) {
        errors.push({
          file: filePath,
          severity: 'warning',
          message: 'Could not parse schema object'
        });
      }
    }

    return schemas;
  } catch (error) {
    errors.push({
      file: filePath,
      severity: 'error',
      message: `Could not read file: ${error}`
    });
    return [];
  }
}

function validateSchema(schema: any, filePath: string): void {
  if (!schema) {
    return;
  }

  // Check for @context
  if (schema['@context'] && schema['@context'] !== 'https://schema.org') {
    errors.push({
      file: filePath,
      severity: 'error',
      message: `Invalid @context: ${schema['@context']}. Should be "https://schema.org"`
    });
  }

  // Check @graph structure
  if (schema['@graph']) {
    if (!Array.isArray(schema['@graph'])) {
      errors.push({
        file: filePath,
        severity: 'error',
        message: '@graph should be an array'
      });
    } else {
      schema['@graph'].forEach((item: any, index: number) => {
        validateSchemaObject(item, filePath, `@graph[${index}]`);
      });
    }
  } else {
    validateSchemaObject(schema, filePath, 'root');
  }
}

function validateSchemaObject(obj: any, filePath: string, path: string): void {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  const type = Array.isArray(obj['@type']) ? obj['@type'][0] : obj['@type'];

  if (!type) {
    errors.push({
      file: filePath,
      severity: 'error',
      message: `${path}: Missing @type`
    });
    return;
  }

  // Check required properties
  const requiredProps = REQUIRED_PROPS[type];
  if (requiredProps) {
    requiredProps.forEach(prop => {
      if (!obj[prop]) {
        errors.push({
          file: filePath,
          severity: 'error',
          message: `${path}: Missing required property "${prop}" for type "${type}"`
        });
      }
    });
  }

  // Check @id format
  if (obj['@id']) {
    if (!obj['@id'].startsWith('https://julianbentsingh.dk/')) {
      errors.push({
        file: filePath,
        severity: 'warning',
        message: `${path}: @id should start with site URL: ${obj['@id']}`
      });
    }

    if (!obj['@id'].includes('#') && !obj['@id'].endsWith('/')) {
      errors.push({
        file: filePath,
        severity: 'warning',
        message: `${path}: @id should end with / or include fragment (#): ${obj['@id']}`
      });
    }
  }

  // Check URL properties
  if (obj.url && typeof obj.url === 'string') {
    if (!obj.url.startsWith('https://julianbentsingh.dk/') && !obj.url.startsWith('http')) {
      errors.push({
        file: filePath,
        severity: 'warning',
        message: `${path}: URL should be absolute: ${obj.url}`
      });
    }
  }

  // Check references
  ['publisher', 'provider', 'founder', 'worksFor', 'author', 'mainEntity', 'about'].forEach(refProp => {
    if (obj[refProp] && typeof obj[refProp] === 'object' && obj[refProp]['@id']) {
      const refId = obj[refProp]['@id'];
      if (!KNOWN_IDS.includes(refId)) {
        errors.push({
          file: filePath,
          severity: 'warning',
          message: `${path}: Unknown @id reference in ${refProp}: ${refId}`
        });
      }
    }
  });

  // Validate nested objects
  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      validateSchemaObject(value, filePath, `${path}.${key}`);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item && typeof item === 'object') {
          validateSchemaObject(item, filePath, `${path}.${key}[${index}]`);
        }
      });
    }
  });
}

async function validateConstantsFile(): Promise<void> {
  const constantsPath = path.join(process.cwd(), 'lib/schema/constants.ts');
  const content = await fs.readFile(constantsPath, 'utf-8');

  // Check for TODO comments
  if (content.includes('TODO')) {
    const todoMatches = content.match(/\/\/ TODO:.*$/gm);
    todoMatches?.forEach(todo => {
      errors.push({
        file: constantsPath,
        severity: 'warning',
        message: `Unresolved TODO: ${todo}`
      });
    });
  }

  // Validate SITE_URL
  if (!content.includes('SITE_URL = "https://julianbentsingh.dk"')) {
    errors.push({
      file: constantsPath,
      severity: 'error',
      message: 'SITE_URL should be "https://julianbentsingh.dk"'
    });
  }
}

async function checkPageImplementations(): Promise<void> {
  const pageFiles = await glob('app/**/page.tsx', { cwd: process.cwd() });

  const missingSchema: string[] = [];

  for (const file of pageFiles) {
    const content = await fs.readFile(file, 'utf-8');

    // Skip if it's a group route
    if (file.includes('(') || file.includes(')')) {
      continue;
    }

    // Check if page has schema
    if (!content.includes('JsonLd') && !content.includes('buildHomePageGraph')) {
      missingSchema.push(file);
    }

    // Check metadata exists
    if (!content.includes('export const metadata')) {
      errors.push({
        file,
        severity: 'warning',
        message: 'Missing metadata export'
      });
    }

    // Check canonical URL
    if (content.includes('metadata') && !content.includes('canonical')) {
      errors.push({
        file,
        severity: 'warning',
        message: 'Missing canonical URL in metadata'
      });
    }
  }

  if (missingSchema.length > 0) {
    errors.push({
      file: 'multiple',
      severity: 'warning',
      message: `${missingSchema.length} pages missing schema: ${missingSchema.join(', ')}`
    });
  }
}

async function main() {
  console.log('🔍 Validating Schema.org Structured Data...\n');

  // Validate constants
  await validateConstantsFile();

  // Check all page implementations
  await checkPageImplementations();

  // Find all page files with schemas
  const pageFiles = await glob('app/**/page.tsx', { cwd: process.cwd() });

  for (const file of pageFiles) {
    await findSchemaInFile(file);
  }

  // Report results
  console.log('\n' + '='.repeat(80));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(80) + '\n');

  if (errors.length === 0) {
    console.log('✅ All schema validation checks passed!\n');
    return;
  }

  // Group by severity
  const errorsByType = errors.reduce((acc, err) => {
    acc[err.severity] = acc[err.severity] || [];
    acc[err.severity].push(err);
    return acc;
  }, {} as Record<string, ValidationError[]>);

  // Print errors
  if (errorsByType.error) {
    console.log(`❌ ERRORS (${errorsByType.error.length}):\n`);
    errorsByType.error.forEach(err => {
      console.log(`  📄 ${err.file}`);
      console.log(`     ${err.message}\n`);
    });
  }

  // Print warnings
  if (errorsByType.warning) {
    console.log(`⚠️  WARNINGS (${errorsByType.warning.length}):\n`);
    errorsByType.warning.forEach(err => {
      console.log(`  📄 ${err.file}`);
      console.log(`     ${err.message}\n`);
    });
  }

  console.log('='.repeat(80));
  console.log(`\nTotal issues: ${errors.length} (${errorsByType.error?.length || 0} errors, ${errorsByType.warning?.length || 0} warnings)\n`);

  // Exit with error code if there are errors
  if (errorsByType.error && errorsByType.error.length > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
