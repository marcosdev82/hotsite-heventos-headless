import { EDITOR_BLOCKS_FRAGMENT } from "@/graphql/fragments/blocks";
import { SEO_FRAGMENT } from "@/graphql/fragments/seo";

export const CONTENT_NODE_FRAGMENT = `
  fragment ContentNodeFields on ContentNode {
    databaseId
    uri
    slug
    ... on NodeWithTitle {
      title
    }
    ... on NodeWithContentEditor {
      content
    }
    ... on NodeWithExcerpt {
      excerpt
    }
    ... on NodeWithFeaturedImage {
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
    ... on ContentNodeToEditLastConnectionEdge {
      modified
    }
    ... on NodeWithEditorBlocks {
      ...EditorBlocksFields
    }
    ... on Post {
      date
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
    ... on Page {
      date
    }
    ... on Evento {
      date
      eventFields {
        dataInicio
        dataFim
        local
      }
    }
    ... on NodeWithYoastSEO {
      seo {
        ...SeoFields
      }
    }
  }
  ${EDITOR_BLOCKS_FRAGMENT}
  ${SEO_FRAGMENT}
`;
