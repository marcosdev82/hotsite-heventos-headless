import { env } from "@/lib/env";

export type GraphQLVariables = Record<string, unknown>;

export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    public readonly errors?: Array<{ message: string }>,
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
};

export async function fetchGraphQL<T>(
  query: string,
  {
    variables = {},
    preview = false,
    revalidate = 60,
    tags = ["wordpress"],
  }: FetchOptions = {},
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (preview && env.faustSecretKey) {
    headers["X-FaustWP-Preview"] = "true";
  }

  let response: Response;

  try {
    response = await fetch(env.graphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: preview ? 0 : revalidate,
        tags,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro de rede";
    throw new GraphQLRequestError(
      `GraphQL network error at ${env.graphqlEndpoint}: ${message}`,
    );
  }

  if (!response.ok) {
    throw new GraphQLRequestError(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new GraphQLRequestError(
      json.errors.map((error) => error.message).join(", "),
      json.errors,
    );
  }

  if (!json.data) {
    throw new GraphQLRequestError("GraphQL response não contém dados.");
  }

  return json.data;
}
