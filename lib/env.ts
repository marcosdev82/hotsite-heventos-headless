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

export const env = {
  wordpressUrl: getEnvVar(
    "NEXT_PUBLIC_WORDPRESS_URL",
    "http://localhost:8080",
  ),
  graphqlEndpoint: getEnvVar(
    "NEXT_PUBLIC_GRAPHQL_ENDPOINT",
    "http://localhost:8080/graphql",
  ),
  siteUrl: getEnvVar("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  faustSecretKey: getEnvVar("FAUST_SECRET_KEY"),
  enableEventos: getBooleanEnvVar("NEXT_PUBLIC_ENABLE_EVENTOS", false),
  isProduction: process.env.NODE_ENV === "production",
} as const;

export function validateEnv(): void {
  for (const key of requiredEnvVars) {
    if (!process.env[key]?.trim()) {
      console.warn(`[env] Variável ${key} não configurada.`);
    }
  }
}
