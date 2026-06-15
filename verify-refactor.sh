#!/bin/bash

# Checklist de Refatoração do Projeto Faust
# Execute este script para verificar se tudo está em ordem

echo "🔍 Verificando Refatoração do Projeto Faust..."
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador
TOTAL=0
PASSED=0

# Função para checkar arquivo
check_file() {
    TOTAL=$((TOTAL + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $1 (NÃO ENCONTRADO)"
    fi
}

# Função para checkar diretório
check_dir() {
    TOTAL=$((TOTAL + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $1/ (NÃO ENCONTRADO)"
    fi
}

echo "📁 Verificando Estrutura de Diretórios..."
check_dir "lib"
check_dir "hooks"
check_dir "components/errors"
check_dir "app"
echo ""

echo "📄 Verificando Arquivos Core..."
check_file "faust.config.js"
check_file "next.config.ts"
check_file "app/layout.tsx"
check_file "app/not-found.tsx"
echo ""

echo "📚 Verificando Arquivos Criados (Novos)..."
check_file "app/error.tsx"
check_file "components/errors/ErrorBoundary.tsx"
check_file "components/errors/NotFoundContent.tsx"
check_file "lib/logger.ts"
check_file "lib/faust-utils.ts"
check_file "lib/faust-index.ts"
check_file "lib/static-params.ts"
check_file "hooks/useFaust.ts"
echo ""

echo "📖 Verificando Documentação..."
check_file "FAUST_REFACTOR.md"
check_file "BEST_PRACTICES.md"
check_file "PROJECT_ANALYSIS.md"
echo ""

echo "🧪 Verificando Testes..."
# Adicionar verificação de testes quando disponível
echo -e "${YELLOW}⚠${NC}  Testes: Ainda não implementados"
echo ""

# Resultado final
PERCENTAGE=$((PASSED * 100 / TOTAL))
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Resultado: $PASSED/$TOTAL ($PERCENTAGE%)"

if [ $PERCENTAGE -eq 100 ]; then
    echo -e "${GREEN}✓ Refatoração Completa!${NC}"
    echo ""
    echo "🚀 Próximos passos:"
    echo "1. npm install"
    echo "2. Verificar FAUST_REFACTOR.md para entender as mudanças"
    echo "3. Revisar BEST_PRACTICES.md para melhores práticas"
    echo "4. Atualizar variáveis de ambiente (.env.local)"
    echo "5. Testar localmente: npm run dev"
    exit 0
else
    echo -e "${RED}✗ Alguns arquivos estão faltando${NC}"
    exit 1
fi
