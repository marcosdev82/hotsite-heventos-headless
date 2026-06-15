# Next.js + Faust Project Structure Analysis

**Project:** Hotsite Heventos (Headless)  
**Framework:** Next.js 15 (App Router) + Faust.js 3.4.1  
**CMS:** WordPress with WPGraphQL  
**Analysis Date:** 2026-06-15

---

## 1. Project Structure & Organization

### Directory Layout

```
hotsite-heventos-headless/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata, fonts, styles
│   ├── page.tsx                 # Home page (custom hero/events showcase)
│   ├── [...slug]/page.tsx       # Dynamic catch-all for WordPress pages/posts
│   ├── [[...slug]]/             # Optional additional route (appears unused)
│   ├── busca/page.tsx           # Search page
│   ├── eventos/page.tsx         # Events listing page
│   ├── api/
│   │   ├── search/route.ts      # Search API endpoint
│   │   └── faust/[[...route]]/ # Faust preview/auth routes
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles
├── components/                  # Reusable React components
│   ├── blocks/
│   │   └── index.ts            # Re-exports wp-blocks config
│   ├── content/
│   │   ├── ContentTemplate.tsx  # Main content wrapper (title + blocks)
│   │   ├── EventCard.tsx        # Single event card component
│   │   └── EventCountdown.tsx   # Countdown timer (imported but usage unclear)
│   ├── gutenberg/
│   │   ├── WordPressBlocksRenderer.tsx  # @faustwp/blocks renderer
│   │   ├── WordPressCustomStyles.tsx    # Custom Gutenberg styles
│   │   └── WordPressStyles.tsx          # WordPress block library styles
│   ├── layout/
│   │   ├── Header.tsx           # Sticky header with logo + nav
│   │   ├── Footer.tsx           # Footer
│   │   ├── Navigation.tsx       # Nav menu renderer
│   │   └── SiteLogo.tsx         # Logo + title
│   ├── providers/
│   │   └── FaustProvider.tsx    # Faust context provider wrapper
│   └── search/
│       └── SearchForm.tsx       # Search UI with client-side form
├── graphql/                     # GraphQL queries & fragments
│   ├── index.ts                 # Re-exports all queries
│   ├── queries/
│   │   ├── content.ts          # GET_NODE_BY_URI, GET_POSTS, GET_EVENTS, SEARCH_CONTENT
│   │   ├── menus.ts            # GET_MENU_BY_LOCATION, GET_MENU_BY_SLUG, GET_MAIN_MENU
│   │   └── settings.ts         # GET_SITE_SETTINGS
│   └── fragments/
│       ├── blocks.ts           # EDITOR_BLOCKS_FRAGMENT (Gutenberg blocks)
│       ├── content.ts          # CONTENT_NODE_FRAGMENT (pages/posts/events)
│       └── seo.ts              # SEO_FRAGMENT (Yoast SEO fields)
├── hooks/                       # React hooks
│   └── useSearch.ts            # Client-side search state & API call
├── layouts/                     # Layout components (non-App Router)
│   └── MainLayout.tsx          # Header + main + footer wrapper
├── lib/                         # Utilities & configuration
│   ├── env.ts                  # Environment variables with validation
│   ├── faust.ts                # Faust helpers (getWpUrl, getGraphqlEndpoint)
│   ├── graphql-client.ts       # fetchGraphQL utility with error handling
│   └── seo.ts                  # buildDefaultMetadata, buildContentMetadata
├── public/                      # Static assets
│   └── images/
├── services/                    # Business logic layer
│   ├── content.service.ts      # getNodeByUri, getEvents, searchContent, etc.
│   ├── menu.service.ts         # getMainMenu, getMenuByLocation
│   └── site-settings.service.ts # getSiteSettings
├── styles/                      # Global & block styles
│   ├── blocks.scss             # Custom block styles
│   ├── wordpress.css           # WordPress core block library
│   ├── wordpress-override.css  # Fidelity overrides
│   └── globals.css             # Tailwind + custom utilities
├── types/                       # TypeScript type definitions
│   └── wordpress.ts            # ContentNode, MenuItem, EditorBlock, etc.
├── wp-blocks/                   # Gutenberg block registry
│   └── index.ts                # CoreBlocks from @faustwp/blocks
├── wordpress-plugin/           # Custom WordPress plugin code
│   └── heventos-gutenberg-buttons/
├── pages/ (legacy)             # Old pages structure (may be deprecated)
│   ├── _document.tsx
│   ├── robots.txt.tsx
│   ├── sitemap.xml.tsx
│   └── api/faust/[[...route]].ts
├── faust.config.js             # Faust configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind CSS config
├── postcss.config.mjs          # PostCSS/Tailwind setup
├── eslint.config.mjs           # ESLint rules
├── .env.example                # Environment template
└── README.md                   # Project documentation
```

### Organization Principles

- **Separation of Concerns**: GraphQL queries isolated from components; services handle data fetching
- **Layers**: Presentation (components) → Layouts → Services → GraphQL → Types
- **Reusability**: Shared components in `components/`, business logic in `services/`
- **Type Safety**: Full TypeScript with strict mode enabled
- **Path Aliases**: `@/*` maps to project root for clean imports

---

## 2. Faust Configuration

### `faust.config.js`

```javascript
import { setConfig } from "@faustwp/core";
import possibleTypes from "./possibleTypes.json";

export default setConfig({
  templates: {},        // Empty: using App Router instead of traditional templates
  plugins: [],          // No Faust plugins enabled
  possibleTypes,        // Generated from WPGraphQL introspection
});
```

### Key Points:

- **Minimal Configuration**: Leverages Faust CLI defaults
- **No Templates**: Modern App Router pages handle rendering (not traditional `/pages` templates)
- **PossibleTypes**: GraphQL union/interface resolution via generated `possibleTypes.json`
- **Next.js Integration**: `withFaust()` wrapper in `next.config.ts` handles auth/preview

### `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  output: "standalone",  // Docker-optimized build
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },  // External images
      { protocol: "http", hostname: "localhost" }, // Dev
    ],
  },
  experimental: {
    optimizePackageImports: ["@faustwp/blocks", "@faustwp/core"],
  },
};

export default withFaust(nextConfig);
```

---

## 3. GraphQL Queries & Fragments Strategy

### Query Organization

| File | Purpose | Queries |
|------|---------|---------|
| `graphql/queries/content.ts` | Content fetching | `GET_NODE_BY_URI`, `GET_ALL_CONTENT_URIS`, `GET_POSTS`, `GET_EVENTS`, `SEARCH_CONTENT` |
| `graphql/queries/menus.ts` | Navigation | `GET_MENU_BY_LOCATION`, `GET_MENU_BY_SLUG`, `GET_MAIN_MENU` |
| `graphql/queries/settings.ts` | Site config | `GET_SITE_SETTINGS` |

### Fragment Architecture

#### 1. **CONTENT_NODE_FRAGMENT** (`fragments/content.ts`)
Reusable fragment for all content types:
- Applies to interface `ContentNode`
- Uses inline fragments for type-specific fields:
  - `NodeWithTitle` → `title`
  - `NodeWithContentEditor` → `content`
  - `NodeWithExcerpt` → `excerpt`
  - `NodeWithFeaturedImage` → `featuredImage`
  - Post-specific: `date`, `categories`, `tags`
  - Page-specific: `date`

```graphql
fragment ContentNodeFields on ContentNode {
  databaseId
  uri
  slug
  ... on NodeWithTitle { title }
  ... on NodeWithContentEditor { content }
  # ... inline fragments for all supported types
}
```

#### 2. **EDITOR_BLOCKS_FRAGMENT** (`fragments/blocks.ts`)
Comprehensive Gutenberg block schema:
- All core WordPress blocks (Paragraph, Heading, Image, Button, etc.)
- Hierarchical structure: `innerBlocks`
- Attribute schemas for each block type
- **Flat: true** → flattened list requires `flatListToHierarchical()` conversion

```graphql
fragment EditorBlocksFields on NodeWithEditorBlocks {
  editorBlocks(flat: true) {
    __typename
    name
    renderedHtml  # Fallback HTML
    attributes { ... }
    ... on CoreParagraph { attributes { ... } }
    ... on CoreHeading { attributes { ... } }
    # ... ~20+ core block types
  }
}
```

#### 3. **SEO_FRAGMENT** (`fragments/seo.ts`)
Yoast SEO + OpenGraph fields:
```graphql
fragment SeoFields on PostTypeSEO {
  title
  metaDesc
  opengraphTitle
  opengraphDescription
  opengraphImage { sourceUrl, altText }
  canonical
}
```

### Query Patterns

#### Node-by-URI (Dynamic Content)
```graphql
query GetNodeByUri($uri: String!) {
  nodeByUri(uri: $uri) {
    __typename
    ...ContentNodeFields
  }
}
```
**Used in**: Dynamic routes `[...slug]/page.tsx`

#### Pagination (Events/Posts)
```graphql
query GetEvents($first: Int = 10, $after: String) {
  eventos(first: $first, after: $after, where: { status: PUBLISH }) {
    pageInfo { hasNextPage, endCursor }
    nodes { ... }
  }
}
```
**Used in**: `/eventos`, potential infinite scroll

#### Search
```graphql
query SearchContent($search: String!, $first: Int = 10) {
  contentNodes(
    first: $first
    where: { search: $search, contentTypes: [POST, PAGE, EVENTO] }
  ) {
    nodes { ... }
  }
}
```
**Used in**: `/api/search` endpoint

#### Static Paths Generation
```graphql
query GetAllContentUris {
  pages(first: 100, where: { status: PUBLISH }) { nodes { uri, modified } }
  posts(first: 100, where: { status: PUBLISH }) { nodes { uri, modified } }
  # + eventos if NEXT_PUBLIC_ENABLE_EVENTOS=true
}
```
**Used in**: Potential SSG path pre-generation

---

## 4. Block Rendering Pipeline

### Architecture

```
WordPress Editor (Gutenberg)
    ↓
GraphQL Query (editorBlocks, flat: true)
    ↓
EditorBlock[] (flat list)
    ↓
flatListToHierarchical() → tree structure
    ↓
@faustwp/blocks WordPressBlocksProvider
    ↓
WordPressBlocksViewer + custom block registry
    ↓
HTML Output + WordPress CSS classes
```

### Components Involved

#### `WordPressBlocksRenderer.tsx`
- **Input**: `editorBlocks` array + optional `fallbackHtml`
- **Process**:
  1. Check if blocks exist
  2. Convert flat list to hierarchy via `flatListToHierarchical()`
  3. Render via `WordPressBlocksProvider` + `WordPressBlocksViewer`
  4. Fallback to raw HTML if no blocks
- **Output**: `<div class="entry-content wp-block-post-content is-layout-constrained">`

```typescript
export function WordPressBlocksRenderer({ editorBlocks, fallbackHtml }) {
  if (editorBlocks?.length) {
    const blockList = flatListToHierarchical(editorBlocks);
    return (
      <WordPressBlocksProvider config={{ blocks }}>
        <div className="entry-content ...">
          <WordPressBlocksViewer blocks={blockList} />
        </div>
      </WordPressBlocksProvider>
    );
  }
  // Fallback...
}
```

#### `wp-blocks/index.ts`
```typescript
import { CoreBlocks } from "@faustwp/blocks";

const blocks = { ...CoreBlocks };

export default blocks;
```
- Currently imports only `CoreBlocks`
- **Extensible**: Add custom blocks via object spread

### Block Rendering Features

- **Styles**: Applied via:
  1. WordPress core CSS (`@wordpress/block-library`)
  2. `WordPressStyles.tsx` (injects global block styles)
  3. `WordPressCustomStyles.tsx` (site-specific overrides)
  4. Tailwind utilities (for layout/responsive)
  5. Block-level `cssClassNames` attributes

- **Attributes**: Preserved in GraphQL query, passed to block renderers

- **Parent-Child Relationships**: `parentClientId` + `innerBlocks` maintain hierarchy

### Fidelity Strategy

1. **Gutenberg Block Rendering** (first choice):
   - `@faustwp/blocks` renders official block types
   - Best fidelity for core blocks (Paragraph, Heading, etc.)

2. **renderedHtml Fallback**:
   - Server-rendered HTML from WordPress
   - Used if block type unrecognized
   - Injected via `dangerouslySetInnerHTML`

3. **CSS Parity**:
   - WordPress style engine CSS variables
   - Gutenberg layout classes (`is-layout-constrained`, etc.)

---

## 5. Current Patterns & Conventions

### Data Fetching Pattern

**Layered approach**:
```
Page/Component
    ↓
Service Layer (services/*.ts)
    ↓
fetchGraphQL() utility
    ↓
WordPress WPGraphQL endpoint
```

Example (`services/content.service.ts`):
```typescript
export async function getNodeByUri(uri: string, preview = false) {
  try {
    const data = await fetchGraphQL<NodeByUriResponse>(GET_NODE_BY_URI, {
      variables: { uri },
      preview,
      tags: ["wordpress", `uri:${uri}`],
    });
    return data.nodeByUri ?? null;
  } catch {
    return null;
  }
}
```

### Error Handling Pattern

- **Graceful Degradation**:
  - Try/catch blocks return empty objects or `null`
  - Fallback UI rendered when data unavailable
  - Logging for debugging (console.log with context)

Example:
```typescript
const data = await getEvents(12).catch(() => ({ eventos: { nodes: [] } }));
// Renders empty state: "Nenhum evento publicado no momento."
```

### ISR (Incremental Static Regeneration)

- **60-second revalidate** on all dynamic/listing pages:
  ```typescript
  export const revalidate = 60;
  ```
- **Cache Tags**: NextJS `next/fetch` tags for on-demand revalidation:
  ```typescript
  await fetchGraphQL(query, { tags: ["wordpress", `uri:${uri}`] });
  ```
- **No generateStaticParams**: Routes generated on-demand (no pre-generation)

### Metadata Strategy

- **Root Layout** (`generateMetadata`): Site-wide defaults from WPGraphQL
- **Content Pages** (`[...slug]/page.tsx`): Per-page metadata from Yoast SEO
- **Structured**: `buildMetadataFromSeo()` + OpenGraph support

```typescript
export async function generateMetadata({ params }: PageProps) {
  const node = await getNodeByUri(uri);
  return buildContentMetadata(node); // Uses node.seo + title/excerpt fallback
}
```

### Client-Side Patterns

**useSearch Hook**:
- Client-side hook managing search state
- Calls `/api/search` endpoint
- Uses `useTransition()` for loading states
- Real-time input handling

**SearchForm Component**:
- Form submission → `useSearch()`
- Results list with link previews
- "No results" empty state

### Styling Approach

1. **Tailwind CSS 4** (utility-first)
2. **WordPress/Gutenberg CSS** (block styling)
3. **SCSS** (custom styling: `blocks.scss`)
4. **CSS Overrides** (`wordpress-override.css` for fidelity tweaks)

---

## 6. Main Entry Points

### Server Entry Points

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Custom home page (hero + events showcase) |
| `/*` (catch-all) | `app/[...slug]/page.tsx` | Dynamic WordPress pages/posts/events |
| `/eventos` | `app/eventos/page.tsx` | Events listing |
| `/busca` | `app/busca/page.tsx` | Search page |
| `/404` | `app/not-found.tsx` | 404 handling |

### API Entry Points

| Route | File | Purpose |
|-------|------|---------|
| `/api/search` | `app/api/search/route.ts` | GraphQL search endpoint |
| `/api/faust/*` | `app/api/faust/[[...route]]/` | Faust auth/preview routes |

### Layout Entry Points

| Component | File | Purpose |
|-----------|------|---------|
| Root Layout | `app/layout.tsx` | Fonts, metadata, global styles |
| Page Layout | `layouts/MainLayout.tsx` | Header + Main + Footer |
| Content Wrapper | `components/content/ContentTemplate.tsx` | Article wrapper + block renderer |

---

## 7. Data Fetching Strategy

### Architecture

```
fetchGraphQL<T>(query, options)
    ├─ Endpoint Validation (env.graphqlEndpoint)
    ├─ Request Headers (Content-Type, X-FaustWP-Preview)
    ├─ Fetch + Response Handling
    ├─ Error Handling (GraphQLRequestError)
    └─ Return Data<T> | throw
```

### `lib/graphql-client.ts` Features

1. **Endpoint Resolution**:
   - Production: Requires `NEXT_PUBLIC_GRAPHQL_ENDPOINT` (no localhost)
   - Development: Falls back to `http://localhost:8080/graphql`

2. **Cache Control**:
   - `revalidate` option (ISR period, default 60s)
   - `tags` array for on-demand revalidation
   - Preview mode (0 revalidation)

3. **Error Handling**:
   - Network errors logged with context
   - GraphQL errors thrown as `GraphQLRequestError`
   - Upstream services catch + gracefully degrade

4. **Operation Tracking**:
   - Extract operation name from query
   - Log operation name + tags for debugging

### Service Layer Patterns

**Each service file follows pattern**:
```typescript
// Typed response interfaces
type MenuByLocationResponse = { menuItems: { nodes: MenuItem[] } };

// Service function with error handling
export async function getMainMenu() {
  try {
    const data = await fetchGraphQL<MainMenuResponse>(GET_MAIN_MENU, {
      tags: ["wordpress", "menus", "menu-name:Principal"],
    });
    return data.menu?.menuItems?.nodes ?? [];
  } catch (error) {
    console.log("[menu] Request failed", { reason: error.message });
    return [];
  }
}
```

---

## 8. Environment Variables

### Configuration

**File**: `.env.example`

```env
# WordPress Backend
NEXT_PUBLIC_WORDPRESS_URL=              # WordPress domain
NEXT_PUBLIC_GRAPHQL_ENDPOINT=           # WPGraphQL endpoint
NEXT_PUBLIC_SITE_URL=                   # Next.js frontend URL

# Feature Flags
NEXT_PUBLIC_ENABLE_EVENTOS=false        # Enable custom post type "Evento"

# Security
FAUST_SECRET_KEY=                       # From WordPress: Settings → Faust

# Deployment (Optional)
DEPLOY_WEBHOOK_URL=                     # EasePanel webhook for CI/CD
```

### Validation (`lib/env.ts`)

- **Required vars**: `NEXT_PUBLIC_WORDPRESS_URL`, `NEXT_PUBLIC_GRAPHQL_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`
- **Production checks**:
  - GraphQL endpoint cannot be empty
  - Cannot point to localhost/127.0.0.1
  - Warns if required variables missing
- **Development fallbacks**:
  - WordPress: `http://localhost:8080`
  - GraphQL: `http://localhost:8080/graphql`
  - Site: `http://localhost:3000`

### Exported Config (`env`)

```typescript
export const env = {
  wordpressUrl: string,        // CMS domain
  graphqlEndpoint: string,     // GraphQL URL (validated)
  siteUrl: string,             // Frontend URL
  faustSecretKey: string,      // Preview/auth
  enableEventos: boolean,      // Custom CPT flag
  isProduction: boolean,       // NODE_ENV check
} as const;
```

---

## 9. TypeScript Architecture

### Type Hierarchy

```
types/wordpress.ts
├── SEOData (Yoast fields)
├── EditorBlock (Gutenberg blocks)
├── MenuItem (Navigation)
├── Menu (Navigation container)
├── FeaturedImage (Media)
├── ContentNode (Base interface for pages/posts/events)
│   ├── PageNode (extends ContentNode)
│   ├── PostNode (extends ContentNode + categories/tags)
│   └── EventNode (extends ContentNode + eventFields)
├── NodeByUriResponse
├── SiteSettings
├── SitemapEntry
└── ... (response type wrappers)
```

### Key Types

**ContentNode** (polymorphic base):
```typescript
type ContentNode = {
  __typename: string;
  databaseId: number;
  uri: string;
  slug: string;
  title?: string | null;
  content?: string | null;
  date?: string | null;
  modified?: string | null;
  excerpt?: string | null;
  featuredImage?: FeaturedImage | null;
  editorBlocks?: EditorBlock[] | null;
  seo?: SEOData | null;
};
```

**EditorBlock** (Gutenberg structure):
```typescript
type EditorBlock = {
  __typename?: string;
  name?: string;
  renderedHtml?: string | null;
  attributes?: Record<string, unknown> | null;
  cssClassNames?: string[] | null;
  innerBlocks?: EditorBlock[];
  parentClientId?: string | null;
  clientId?: string | null;
};
```

### GraphQL Response Wrappers

Each service defines typed response interfaces:
```typescript
type NodeByUriResponse = { nodeByUri?: ContentNode | null };
type MenuByLocationResponse = { menuItems: { nodes: MenuItem[] } };
type EventsResponse = {
  eventos: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ContentNode[];
  };
};
```

---

## 10. Component Architecture Summary

### Layout Components

| Component | Purpose | Children |
|-----------|---------|----------|
| `MainLayout` | Page wrapper | Header, main (slot), Footer |
| `Header` | Sticky top bar | SiteLogo, Navigation |
| `Navigation` | Menu renderer | MenuItem links (recursive) |
| `SiteLogo` | Logo + title | (no children) |
| `Footer` | Footer | (content TBD) |

### Content Components

| Component | Purpose |
|-----------|---------|
| `ContentTemplate` | Article wrapper + block renderer |
| `WordPressBlocksRenderer` | Gutenberg block tree renderer |
| `EventCard` | Event list item card |

### Feature Components

| Component | Purpose |
|-----------|---------|
| `SearchForm` | Search UI (client-side) |
| `EventCountdown` | Countdown timer (imported but unused?) |

### Provider Components

| Component | Purpose |
|-----------|---------|
| `FaustProvider` | Faust context wrapper |
| `WordPressStyles` | Global block library CSS injection |
| `WordPressCustomStyles` | Custom block styling |

---

## 11. Build & Deployment Configuration

### Build Output
```typescript
output: "standalone"  // Docker-optimized, minimal dependencies
```

### Image Optimization
- Remote patterns allow all HTTPS + localhost HTTP
- No local image optimization (relies on WordPress image delivery)

### Package Optimization
```typescript
optimizePackageImports: ["@faustwp/blocks", "@faustwp/core"]
```

---

## 12. WordPress Plugin Integration

### Custom Plugin
- **Path**: `wordpress-plugin/heventos-gutenberg-buttons/`
- **Purpose**: Custom Gutenberg block/plugin (likely extends button block)
- **Status**: Present but limited documentation

### Required WordPress Plugins (Backend)

1. **WPGraphQL** — GraphQL API
2. **FaustWP** — Preview mode + secret key management
3. **WP GraphQL Content Blocks** — Gutenberg block schema
4. **Yoast SEO + WPGraphQL Yoast** — SEO metadata
5. **Custom Post Type** "Evento" (via ACF, CPT UI, or code)

---

## 13. Current State Summary

### Strengths ✅

1. **Clean Architecture**: Layered separation (pages → services → GraphQL)
2. **Type Safety**: Full TypeScript with strict mode
3. **Error Handling**: Graceful degradation with fallbacks
4. **ISR Strategy**: 60-second revalidation for freshness
5. **Block Rendering**: Comprehensive Gutenberg support with HTML fallback
6. **SEO**: Yoast integration + dynamic metadata
7. **Environment Management**: Validated config with production safeguards
8. **Accessibility**: Semantic HTML, ARIA attributes in components
9. **Search**: Client-side hook + API endpoint pattern
10. **Responsiveness**: Tailwind CSS with mobile-first approach

### Areas for Refactoring (Faust Best Practices) 🔧

1. **Faust Config**: Minimal but could leverage more Faust features:
   - Template routing if migrating from traditional pages
   - Plugin system for extensibility
   - Advanced preview configuration

2. **Static Generation**: No `generateStaticParams()` → all routes on-demand:
   - Consider pre-generating top-level pages at build time
   - Use ISR for content changes

3. **Block Registry**: Only uses `CoreBlocks`:
   - Add custom block mappings for site-specific blocks
   - Document block registration pattern

4. **Data Fetching**: Direct `fetchGraphQL()` calls:
   - Consider Apollo Client integration for caching/normalization
   - Batch query optimization

5. **API Routes**: Search uses basic route handler:
   - Could use Faust's built-in search utilities
   - Rate limiting/validation

6. **Error Boundaries**: No React Error Boundaries:
   - Wrap content/layout components for robustness
   - User-facing error UI

7. **Legacy Pages Dir**: `/pages` folder exists (may conflict with App Router):
   - Consolidate to App Router only

8. **Fragments**: Comprehensive but could be organized:
   - Consider per-type fragments for granular query building

9. **Menu Handling**: Fallback cascade is defensive:
   - Document menu location requirements
   - Consider menu caching strategy

10. **Logging**: Console logs for debugging:
    - Implement structured logging for production
    - Error tracking (Sentry, etc.)

---

## 14. Recommended Refactoring Roadmap

### Phase 1: Architecture Cleanup
- [ ] Remove `/pages` legacy directory (migrate to App Router)
- [ ] Consolidate Faust route handlers to `app/api/faust/`
- [ ] Document menu location setup

### Phase 2: Static Generation
- [ ] Implement `generateStaticParams()` for top pages
- [ ] Add sitemap.xml generation (currently in `/pages`)
- [ ] Pre-build critical paths at build time

### Phase 3: Block System
- [ ] Formalize custom block registration
- [ ] Create block variant system (e.g., hero block, CTA block)
- [ ] Document block type additions

### Phase 4: Data Layer
- [ ] Evaluate Apollo Client vs. `fetchGraphQL` for caching
- [ ] Implement batch query optimization
- [ ] Add query complexity analysis

### Phase 5: Observability
- [ ] Add Error Boundaries to layouts
- [ ] Implement structured logging (production)
- [ ] Add performance monitoring (Web Vitals)
- [ ] Error tracking (Sentry/LogRocket)

### Phase 6: Search & Navigation
- [ ] Rate limiting on `/api/search`
- [ ] Input validation (SQL injection prevention)
- [ ] Pagination on search results

---

## Conclusion

This project demonstrates a **well-organized, type-safe Next.js + Faust implementation** with clear separation of concerns, robust error handling, and modern React patterns. The architecture is production-ready but has opportunities for optimization in static generation, block extensibility, and observability.

**Key Takeaway**: The foundation is solid; refactoring should focus on **static generation strategy**, **block system formalization**, and **production observability**.
