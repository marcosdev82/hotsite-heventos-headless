export const GET_MENU_BY_LOCATION = `
  query GetMenuByLocation($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }, first: 100) {
      nodes {
        id
        label
        path
        target
        parentId
        childItems {
          nodes {
            id
            label
            path
            target
            parentId
          }
        }
      }
    }
  }
`;

export const GET_MENU_BY_SLUG = `
  query GetMenuBySlug($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      id
      name
      menuItems {
        nodes {
          id
          label
          path
          target
          parentId
          childItems {
            nodes {
              id
              label
              path
              target
              parentId
            }
          }
        }
      }
    }
  }
`;
