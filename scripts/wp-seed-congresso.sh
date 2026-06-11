#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SEED_SCRIPT_PATH="${ROOT_DIR}/scripts/wordpress-seed-congresso.sh"

WP_CONTAINER="${WP_CONTAINER:-wordpress}"
WP_PATH="${WP_PATH:-/var/www/html}"
WP_CLI_BIN="${WP_CLI_BIN:-wp}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Erro: docker nao encontrado no PATH."
  exit 1
fi

if [[ ! -f "${SEED_SCRIPT_PATH}" ]]; then
  echo "Erro: script de seed nao encontrado em ${SEED_SCRIPT_PATH}."
  exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -qx "${WP_CONTAINER}"; then
  echo "Erro: container '${WP_CONTAINER}' nao esta em execucao."
  echo "Defina WP_CONTAINER com o nome correto. Exemplo: WP_CONTAINER=wp-app ./scripts/wp-seed-congresso.sh"
  exit 1
fi

echo "Executando seed dentro do container '${WP_CONTAINER}'..."

docker exec -i \
  -e WP_CLI_BIN="${WP_CLI_BIN}" \
  -e WP_CLI_ARGS="--allow-root --path=${WP_PATH}" \
  "${WP_CONTAINER}" bash -s -- < "${SEED_SCRIPT_PATH}"

echo "Seed concluido no container '${WP_CONTAINER}'."
