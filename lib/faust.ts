import { getGraphqlEndpoint, getWpUrl } from "@faustwp/core";

export const faust = {
  wpUrl: getWpUrl,
  graphqlEndpoint: getGraphqlEndpoint,
};
