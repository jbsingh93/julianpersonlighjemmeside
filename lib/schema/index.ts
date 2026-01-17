/**
 * Schema.org exports for julianbentsingh.dk
 *
 * Centraliseret eksport af alle schema-relaterede funktioner og konstanter.
 */

// Konstanter
export {
  SITE_URL,
  SCHEMA_IDS,
  JULIAN_DATA,
  ORG_DATA,
  AI_GROWTH_MINDS,
  VALLORA_AI,
  HIGH_AUTHORITY_MENTIONS,
} from "./constants";

// Builders
export {
  // References
  personRef,
  orgRef,
  websiteRef,
  omtalePageRef,
  // Full entity builders
  buildWebSiteSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  // Page-specific builders
  buildServiceSchema,
  buildCourseSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildOmtalePageSchema,
  buildHomePageGraph,
} from "./builders";
