#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

export PATH="${HOME}/.local/bin:${PATH}"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Erro: defina GITHUB_TOKEN com um Personal Access Token da conta marcosdev82."
  echo "Exemplo: GITHUB_TOKEN=ghp_xxx ./scripts/github-push.sh"
  exit 1
fi

echo "$GITHUB_TOKEN" | gh auth login --hostname github.com --git-protocol https --with-token
gh auth setup-git

git remote set-url origin https://github.com/marcosdev82/hotsite-heventos-headless.git
git push -u origin main

echo "Push concluído: https://github.com/marcosdev82/hotsite-heventos-headless"
