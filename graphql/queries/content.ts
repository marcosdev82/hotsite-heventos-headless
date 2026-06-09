import { CONTENT_NODE_FRAGMENT } from "@/graphql/fragments/content";

export const GET_NODE_BY_URI = `
  query GetNodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ...ContentNodeFields
    }
  }
  ${CONTENT_NODE_FRAGMENT}
`;

export const GET_ALL_CONTENT_URIS = `
  query GetAllContentUris {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        uri
        modified
      }
    }
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        uri
        modified
      }
    }
    eventos: eventos(first: 100, where: { status: PUBLISH }) {
      nodes {
        uri
        modified
      }
    }
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        __typename
        databaseId
        uri
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_EVENTS = `
  query GetEvents($first: Int = 10, $after: String) {
    eventos(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        __typename
        databaseId
        uri
        slug
        title
        date
        excerpt
        eventFields {
          dataInicio
          dataFim
          local
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const SEARCH_CONTENT = `
  query SearchContent($search: String!, $first: Int = 10) {
    contentNodes(
      first: $first
      where: { search: $search, contentTypes: [POST, PAGE, EVENTO] }
    ) {
      nodes {
        __typename
        databaseId
        uri
        slug
        ... on NodeWithTitle {
          title
        }
        ... on NodeWithExcerpt {
          excerpt
        }
      }
    }
  }
`;
