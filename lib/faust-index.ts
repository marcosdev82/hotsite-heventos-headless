/**
 * Index file for all Faust exports
 * Central place to import all Faust utilities and hooks
 */

// Utilities
export { logger } from "@/lib/logger";
export type { LogContext, LogLevel } from "@/lib/logger";

export {
  getContentByUri,
  getAllContentUris,
  parseUriToSegments,
  buildUriFromSegments,
  getContentTypeFromUri,
  formatDate,
  truncateText,
  stripHtml,
  isContentValid,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
} from "@/lib/faust-utils";

export {
  generateStaticParamsForContent,
  generateStaticParamsForPostType,
} from "@/lib/static-params";
export type { StaticParams } from "@/lib/static-params";

export {
  fetchGraphQL,
  GraphQLRequestError,
} from "@/lib/graphql-client";
export type { GraphQLVariables, GraphQLResponse } from "@/lib/graphql-client";

// Hooks
export { useFetchData, useCachedData, usePreviewMode } from "@/hooks/useFaust";

// Components
export { ErrorBoundary } from "@/components/errors/ErrorBoundary";
export { NotFoundContent } from "@/components/errors/NotFoundContent";

// Services
export { getNodeByUri, getEvents, searchContent } from "@/services/content.service";
export { getMainMenu, getMenuByLocation } from "@/services/menu.service";
export { getSiteSettings } from "@/services/site-settings.service";
