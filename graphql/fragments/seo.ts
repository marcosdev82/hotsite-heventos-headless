export const SEO_FRAGMENT = `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
    }
    canonical
  }
`;
