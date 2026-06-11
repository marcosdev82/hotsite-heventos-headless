const requiredEnvVars = [
  "NEXT_PUBLIC_WORDPRESS_URL",
  "NEXT_PUBLIC_GRAPHQL_ENDPOINT",
  "NEXT_PUBLIC_SITE_URL",
] as const;

function getEnvVar(key: string, fallback = ""): string {
  return process.env[key]?.trim() || fallback;
}

function getBooleanEnvVar(key: string, fallback = false): boolean {
  const value = getEnvVar(key);
  if (!value) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

const isProduction = process.env.NODE_ENV === "production";

/**
 * Em produção:
 * - exige NEXT_PUBLIC_GRAPHQL_ENDPOINT definido
 * - impede uso de localhost/127.0.0.1
 * Em desenvolvimento:
 * - mantém fallback local para DX.
 */
function resolveGraphqlEndpoint(): string {
  const configured = getEnvVar("NEXT_PUBLIC_GRAPHQL_ENDPOINT");

  if (!configured) {
    if (isProduction) {
      console.error(
        "[env] NEXT_PUBLIC_GRAPHQL_ENDPOINT não configurada em produção.",
      );
      // Retorna string vazia para evitar chamadas para localhost em produção.
      return "";
    }
    return "http://localhost:8080/graphql";
  }

  const isLocalhost =
    configured.includes("localhost") || configured.includes("127.0.0.1");

  if (isProduction && isLocalhost) {
    console.error(
      "[env] NEXT_PUBLIC_GRAPHQL_ENDPOINT aponta para localhost em produção. Corrija para a URL pública do WordPress (/graphql).",
      { configured },
    );
    // Bloqueia endpoint inválido em produção.
    return "";
  }

  return configured;
}

export const env = {
  wordpressUrl: getEnvVar("NEXT_PUBLIC_WORDPRESS_URL", "http://localhost:8080"),
  graphqlEndpoint: resolveGraphqlEndpoint(),
  siteUrl: getEnvVar("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  faustSecretKey: getEnvVar("FAUST_SECRET_KEY"),
  enableEventos: getBooleanEnvVar("NEXT_PUBLIC_ENABLE_EVENTOS", false),
  isProduction,
} as const;

export function validateEnv(): void {
  for (const key of requiredEnvVars) {
    if (!process.env[key]?.trim()) {
      console.warn(`[env] Variável ${key} não configurada.`);
    }
  }

  if (env.isProduction && !env.graphqlEndpoint) {
    console.error(
      "[env] Endpoint GraphQL inválido em produção. Defina NEXT_PUBLIC_GRAPHQL_ENDPOINT com a URL pública do WPGraphQL.",
    );
  }
}