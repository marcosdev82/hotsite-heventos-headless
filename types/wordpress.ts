export type SEOData = {
  title?: string | null;
  metaDesc?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphImage?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
  canonical?: string | null;
};

export type EditorBlock = {
  __typename?: string;
  name?: string;
  renderedHtml?: string | null;
  attributes?: Record<string, unknown> | null;
  cssClassNames?: string[] | null;
  innerBlocks?: EditorBlock[];
  parentClientId?: string | null;
  clientId?: string | null;
};

export type MenuItem = {
  id: string;
  label: string;
  path: string;
  target?: string | null;
  parentId?: string | null;
  childItems?: {
    nodes: MenuItem[];
  } | null;
};

export type Menu = {
  id: string;
  name: string;
  menuItems?: {
    nodes: MenuItem[];
  } | null;
};

export type FeaturedImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
    mediaDetails?: {
      width?: number | null;
      height?: number | null;
    } | null;
  } | null;
};

export type ContentNode = {
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

export type PageNode = ContentNode & {
  __typename: "Page";
};

export type PostNode = ContentNode & {
  __typename: "Post";
  categories?: {
    nodes: Array<{ name: string; slug: string }>;
  } | null;
  tags?: {
    nodes: Array<{ name: string; slug: string }>;
  } | null;
};

export type EventNode = ContentNode & {
  __typename: "Evento";
  eventFields?: {
    dataInicio?: string | null;
    dataFim?: string | null;
    local?: string | null;
  } | null;
};

export type NodeByUriResponse = {
  nodeByUri?: ContentNode | null;
};

export type SiteSettings = {
  generalSettings?: {
    title?: string | null;
    description?: string | null;
    url?: string | null;
    language?: string | null;
  } | null;
};

export type ContentTypeArchive = {
  name: string;
  label: string;
  uri: string;
};

export type SitemapEntry = {
  uri: string;
  modified?: string | null;
};
