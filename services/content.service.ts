import { fetchGraphQL } from "@/lib/graphql-client";
import {
  GET_ALL_CONTENT_URIS,
  GET_EVENTS,
  GET_NODE_BY_URI,
  GET_POSTS,
  SEARCH_CONTENT,
} from "@/graphql/queries/content";
import type {
  ContentNode,
  NodeByUriResponse,
  SitemapEntry,
} from "@/types/wordpress";

type AllUrisResponse = {
  pages?: { nodes: SitemapEntry[] };
  posts?: { nodes: SitemapEntry[] };
  eventos?: { nodes: SitemapEntry[] };
};

type PostsResponse = {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ContentNode[];
  };
};

type EventsResponse = {
  eventos: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ContentNode[];
  };
};

type SearchResponse = {
  contentNodes: { nodes: ContentNode[] };
};

export function normalizeUri(slug?: string[]): string {
  if (!slug?.length) return "/";
  return `/${slug.join("/")}/`;
}

export async function getNodeByUri(
  uri: string,
  preview = false,
): Promise<ContentNode | null> {
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

export async function getAllContentUris(): Promise<SitemapEntry[]> {
  try {
    const data = await fetchGraphQL<AllUrisResponse>(GET_ALL_CONTENT_URIS, {
      revalidate: 3600,
      tags: ["wordpress", "sitemap"],
    });

    return [
      ...(data.pages?.nodes ?? []),
      ...(data.posts?.nodes ?? []),
      ...(data.eventos?.nodes ?? []),
    ];
  } catch {
    return [];
  }
}

export async function getPosts(first = 10, after?: string) {
  try {
    return await fetchGraphQL<PostsResponse>(GET_POSTS, {
      variables: { first, after },
      tags: ["wordpress", "posts"],
    });
  } catch {
    return {
      posts: {
        pageInfo: { hasNextPage: false, endCursor: null },
        nodes: [],
      },
    };
  }
}

export async function getEvents(first = 10, after?: string) {
  try {
    return await fetchGraphQL<EventsResponse>(GET_EVENTS, {
      variables: { first, after },
      tags: ["wordpress", "eventos"],
    });
  } catch {
    return {
      eventos: {
        pageInfo: { hasNextPage: false, endCursor: null },
        nodes: [],
      },
    };
  }
}

export async function searchContent(search: string, first = 10) {
  try {
    return await fetchGraphQL<SearchResponse>(SEARCH_CONTENT, {
      variables: { search, first },
      revalidate: 0,
      tags: ["wordpress", "search"],
    });
  } catch {
    return { contentNodes: { nodes: [] } };
  }
}
