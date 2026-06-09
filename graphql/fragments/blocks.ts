export const EDITOR_BLOCKS_FRAGMENT = `
  fragment EditorBlocksFields on NodeWithEditorBlocks {
    editorBlocks(flat: true) {
      __typename
      name
      renderedHtml
      clientId
      parentClientId
      cssClassNames
      ... on CoreParagraph {
        attributes {
          content
          cssClassName
          style
          backgroundColor
          textColor
          fontSize
          fontFamily
          align
        }
      }
      ... on CoreHeading {
        attributes {
          content
          level
          cssClassName
          style
          backgroundColor
          textColor
          fontSize
          fontFamily
          textAlign
        }
      }
      ... on CoreImage {
        attributes {
          url
          alt
          caption
          cssClassName
          style
          width
          height
        }
      }
      ... on CoreGroup {
        attributes {
          cssClassName
          style
          backgroundColor
          layout
        }
      }
      ... on CoreColumns {
        attributes {
          cssClassName
          style
        }
      }
      ... on CoreColumn {
        attributes {
          cssClassName
          style
          width
        }
      }
      ... on CoreButton {
        attributes {
          text
          url
          cssClassName
          style
          backgroundColor
          textColor
        }
      }
      ... on CoreButtons {
        attributes {
          cssClassName
          layout
          style
        }
      }
      ... on CoreCover {
        attributes {
          url
          cssClassName
          style
          overlayColor
          dimRatio
        }
      }
      ... on CoreSpacer {
        attributes {
          height
        }
      }
      ... on CoreSeparator {
        attributes {
          cssClassName
          style
        }
      }
      ... on CoreList {
        attributes {
          values
          ordered
          cssClassName
          style
        }
      }
      ... on CoreQuote {
        attributes {
          value
          citation
          cssClassName
          style
        }
      }
    }
  }
`;
