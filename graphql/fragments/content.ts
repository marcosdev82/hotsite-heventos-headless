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
  }
`;
