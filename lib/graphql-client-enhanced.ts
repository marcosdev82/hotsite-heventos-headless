/**
 * Enhanced GraphQL Client with Faust integration
 * Adds better error handling, caching, and monitoring
 */

import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export type GraphQLVariables = Record<string, unknown>;

export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string; extensions?: unknown }>;
};

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    public readonly errors?: Array<{ message: string }>,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "GraphQLRequestError";
  }
}

type FetchOptions = {
  variables?: GraphQLVariables;
  preview?: boolean;
  revalidate?: number | false;
  tags?: string[];
  timeout?: number;
};

function getOperationName(query: string): string {
  const match = query.match(/\b(query|mutation)\s+([A-Za-z0-9_]+)/);
  return match?.[2] ?? "unknown-operation";
}

/**
 * Enhanced GraphQL request with better error handling
 */
export async function fetchGraphQL<T>(
  query: string,
  {
    variables = {},
    preview = false,
    revalidate = 60,
    tags = ["wordpress"],
    timeout = 10000,
  }: FetchOptions = {}
): Promise<T> {
  const operationName = getOperationName(query);
  const startTime = Date.now();

  if (!env.graphqlEndpoint) {
    const message =
      "GraphQL endpoint não configurado/inválido. Defina NEXT_PUBLIC_GRAPHQL_ENDPOINT com a URL pública do WordPress (ex: https://seu-wp.com/graphql).";

    logger.error("GraphQL endpoint not configured", new Error(message));

    throw new GraphQLRequestError(message);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "User-Agent": "Faust-Headless/1.0",
  };

  if (preview && env.faustSecretKey) {
    headers["X-FaustWP-Preview"] = "true";
    headers["X-FaustWP-Secret"] = env.faustSecretKey;
  }

  let response: Response;

  try {
    logger.graphql(operationName, "start");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    response = await fetch(env.graphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: {
        revalidate: preview ? 0 : revalidate,
        tags,
      },
    });

    clearTimeout(timeoutId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro de rede desconhecido";
    const duration = Date.now() - startTime;

    logger.graphql(operationName, "error", duration, new Error(message));
    logger.error(`GraphQL network error at ${env.graphqlEndpoint}`, new Error(message), {
      endpoint: env.graphqlEndpoint,
      operationName,
      tags,
    });

    throw new GraphQLRequestError(
      `GraphQL network error at ${env.graphqlEndpoint}: ${message}`
    );
  }

  const duration = Date.now() - startTime;

  if (!response.ok) {
    logger.graphql(operationName, "error", duration);
    logger.error(
      `GraphQL HTTP error: ${response.status} ${response.statusText}`,
      new Error("HTTP Error"),
      {
        endpoint: env.graphqlEndpoint,
        operationName,
        status: response.status,
        statusText: response.statusText,
      }
    );

    throw new GraphQLRequestError(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
      undefined,
      response.status
    );
  }

  let data: GraphQLResponse<T>;

  try {
    data = await response.json();
  } catch (error) {
    logger.error("Failed to parse GraphQL response", new Error(String(error)));

    throw new GraphQLRequestError(
      "Failed to parse GraphQL response as JSON"
    );
  }

  if (data.errors && data.errors.length > 0) {
    logger.graphql(operationName, "error", duration);
    logger.error(
      `GraphQL request returned errors: ${operationName}`,
      new Error(data.errors[0].message),
      {
        operationName,
        errors: data.errors,
      }
    );

    throw new GraphQLRequestError(
      `GraphQL request returned errors: ${data.errors[0].message}`,
      data.errors
    );
  }

  logger.graphql(operationName, "success", duration);

  if (!data.data) {
    logger.warn(`GraphQL request returned empty data: ${operationName}`, {
      operationName,
      response: data,
    });
  }

  return data.data as T;
}
