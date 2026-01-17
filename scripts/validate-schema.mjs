#!/usr/bin/env node
/**
 * Schema Validation Script
 *
 * Validates Schema.org JSON-LD markup across all pages.
 * Usage: npm run validate-schema [page-path]
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// Get target path from command line args
const targetPath = process.argv[2];

/**
 * Find all page.tsx files recursively
 */
function findPageFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract schema constant from page file
 */
function extractSchemaFromFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // Check if file imports from @/lib/schema
  if (!content.includes('@/lib/schema') && !content.includes('"@context"')) {
    return null;
  }

  // Find schema definition
  const schemaMatch = content.match(/const schema\s*=\s*{[\s\S]*?};/);
  if (!schemaMatch) {
    return null;
  }

  return {
    path: filePath,
    hasSchema: true,
    content: content,
  };
}

/**
 * Check for common schema issues
 */
function validateSchemaContent(fileInfo) {
  const issues = [];
  const content = fileInfo.content;

  // Check for hardcoded @id values
  const hardcodedIdMatches = content.match(/"@id":\s*["`']https?:\/\/[^"`']*["`']/g);
  if (hardcodedIdMatches) {
    issues.push({
      type: 'warning',
      message: 'Found hardcoded @id values. Consider using personRef() or orgRef() for consistency.',
      details: hardcodedIdMatches,
    });
  }

  // Check for SCHEMA_IDS usage instead of ref functions
  if (content.includes('{ "@id": SCHEMA_IDS.person }')) {
    issues.push({
      type: 'warning',
      message: 'Using SCHEMA_IDS.person directly. Should use personRef() for consistency.',
      line: content.split('\n').findIndex(line => line.includes('{ "@id": SCHEMA_IDS.person }')) + 1,
    });
  }

  if (content.includes('{ "@id": SCHEMA_IDS.organization }')) {
    issues.push({
      type: 'warning',
      message: 'Using SCHEMA_IDS.organization directly. Should use orgRef() for consistency.',
      line: content.split('\n').findIndex(line => line.includes('{ "@id": SCHEMA_IDS.organization }')) + 1,
    });
  }

  // Check if imports include necessary ref functions
  const hasPersonRef = content.includes('personRef');
  const hasOrgRef = content.includes('orgRef');
  const usesPersonId = content.includes('#julian') || content.includes('SCHEMA_IDS.person') || content.includes('instructor');
  const usesOrgId = content.includes('#org') || content.includes('SCHEMA_IDS.organization') || content.includes('provider');

  if (usesPersonId && !hasPersonRef) {
    issues.push({
      type: 'error',
      message: 'File references person entity but does not import personRef()',
    });
  }

  if (usesOrgId && !hasOrgRef) {
    issues.push({
      type: 'error',
      message: 'File references organization entity but does not import orgRef()',
    });
  }

  return issues;
}

/**
 * Get example schema structure for manual validation
 */
function getSchemaStructure(fileInfo) {
  const content = fileInfo.content;

  // Extract schema type
  const types = [];
  const typeMatches = content.matchAll(/"@type":\s*"([^"]+)"/g);
  for (const match of typeMatches) {
    if (!types.includes(match[1])) {
      types.push(match[1]);
    }
  }

  return {
    types: types,
    hasGraph: content.includes('"@graph"'),
    hasBreadcrumb: content.includes('BreadcrumbList') || content.includes('buildBreadcrumbSchema'),
    hasService: types.includes('Service'),
    hasCourse: types.includes('Course'),
    hasPerson: types.includes('Person'),
    hasOrganization: types.includes('Organization'),
  };
}

/**
 * Main validation function
 */
function main() {
  console.log(`${colors.bold}${colors.cyan}Schema.org Validation${colors.reset}\n`);

  const appDir = join(projectRoot, 'app');
  let pageFiles = findPageFiles(appDir);

  // Filter by target path if provided
  if (targetPath) {
    const normalizedTarget = targetPath.replace(/^\//, '').replace(/\/$/, '');
    pageFiles = pageFiles.filter(file => {
      const relativePath = relative(appDir, file).replace(/\\/g, '/');
      return relativePath.includes(normalizedTarget);
    });

    if (pageFiles.length === 0) {
      console.log(`${colors.red}✗ No pages found matching: ${targetPath}${colors.reset}`);
      process.exit(1);
    }

    console.log(`${colors.blue}Filtering to pages matching: ${targetPath}${colors.reset}\n`);
  }

  console.log(`Found ${colors.bold}${pageFiles.length}${colors.reset} page files\n`);

  const pagesWithSchema = [];
  const allIssues = [];

  // Analyze each page
  for (const file of pageFiles) {
    const relativePath = '/' + relative(appDir, file)
      .replace(/\\/g, '/')
      .replace(/\/page\.tsx$/, '') || '/';

    const fileInfo = extractSchemaFromFile(file);

    if (!fileInfo) {
      console.log(`${colors.yellow}⊘${colors.reset} ${relativePath} - No schema found`);
      continue;
    }

    pagesWithSchema.push(fileInfo);

    const issues = validateSchemaContent(fileInfo);
    const structure = getSchemaStructure(fileInfo);

    // Print results
    if (issues.length === 0) {
      console.log(`${colors.green}✓${colors.reset} ${colors.bold}${relativePath}${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠${colors.reset} ${colors.bold}${relativePath}${colors.reset}`);
      allIssues.push({ path: relativePath, issues });
    }

    // Show schema types
    console.log(`  ${colors.cyan}Types:${colors.reset} ${structure.types.join(', ')}`);

    // Show issues inline
    for (const issue of issues) {
      const icon = issue.type === 'error' ? `${colors.red}✗${colors.reset}` : `${colors.yellow}!${colors.reset}`;
      console.log(`  ${icon} ${issue.message}`);
      if (issue.line) {
        console.log(`     Line ${issue.line}`);
      }
    }

    console.log('');
  }

  // Summary
  console.log(`${colors.bold}${colors.cyan}Summary${colors.reset}\n`);
  console.log(`Total pages analyzed: ${pageFiles.length}`);
  console.log(`Pages with schema: ${colors.green}${pagesWithSchema.length}${colors.reset}`);
  console.log(`Pages with issues: ${allIssues.length > 0 ? colors.yellow : colors.green}${allIssues.length}${colors.reset}\n`);

  // Detailed issues report
  if (allIssues.length > 0) {
    console.log(`${colors.bold}${colors.yellow}Issues Found:${colors.reset}\n`);

    for (const { path, issues } of allIssues) {
      console.log(`${colors.bold}${path}${colors.reset}`);
      for (const issue of issues) {
        console.log(`  ${issue.type === 'error' ? colors.red : colors.yellow}${issue.type}:${colors.reset} ${issue.message}`);
        if (issue.details) {
          console.log(`  ${colors.cyan}Found:${colors.reset} ${issue.details.join(', ')}`);
        }
      }
      console.log('');
    }

    console.log(`${colors.yellow}Recommended Actions:${colors.reset}`);
    console.log(`1. Import personRef and orgRef from @/lib/schema`);
    console.log(`2. Replace { "@id": SCHEMA_IDS.person } with personRef()`);
    console.log(`3. Replace { "@id": SCHEMA_IDS.organization } with orgRef()`);
    console.log(`4. Replace hardcoded URLs with helper functions\n`);
  } else {
    console.log(`${colors.green}✓ All schema markup looks good!${colors.reset}\n`);
  }

  // Instructions
  console.log(`${colors.bold}Next Steps:${colors.reset}`);
  console.log(`1. Run ${colors.cyan}npm run dev${colors.reset} to start your site`);
  console.log(`2. Visit pages in browser and use "View Source"`);
  console.log(`3. Copy JSON-LD from <script type="application/ld+json">`);
  console.log(`4. Paste into ${colors.cyan}https://validator.schema.org/${colors.reset}`);
  console.log(`5. Or use ${colors.cyan}npm run validate-schema /page-path${colors.reset} to check specific pages\n`);

  // Exit with error code if there are errors
  const hasErrors = allIssues.some(({ issues }) =>
    issues.some(issue => issue.type === 'error')
  );

  if (hasErrors) {
    process.exit(1);
  }
}

main();
