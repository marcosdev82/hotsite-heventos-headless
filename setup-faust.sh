#!/bin/bash

# Setup Script para Iniciar o Projeto com Faust
# Execute: chmod +x setup-faust.sh && ./setup-faust.sh

echo "🚀 Setup do Projeto Faust..."
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Instalar dependências
echo -e "${BLUE}→${NC} Instalando dependências..."
npm install
echo ""

# 2. Gerar possibleTypes
echo -e "${BLUE}→${NC} Gerando possibleTypes (se necessário)..."
# npm run generate-types
echo -e "${YELLOW}⚠${NC}  Execute 'npm run generate-types' se necessário"
echo ""

# 3. Criar .env.local se não existir
if [ ! -f .env.local ]; then
    echo -e "${BLUE}→${NC} Criando .env.local..."
    cp .env.example .env.local 2>/dev/null || cat > .env.local << 'EOF'
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
FAUST_SECRET_KEY=seu-secret-key-aqui
FAUST_DEBUG=true
EOF
    echo -e "${GREEN}✓${NC} .env.local criado"
    echo -e "${YELLOW}⚠${NC}  Edite .env.local com suas variáveis!"
else
    echo -e "${GREEN}✓${NC} .env.local já existe"
fi
echo ""

# 4. Compilar projeto
echo -e "${BLUE}→${NC} Compilando projeto..."
npm run build
echo ""

# 5. Resumo final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Setup Concluído!${NC}"
echo ""
echo "Próximos passos:"
echo "1. npm run dev              # Iniciar em desenvolvimento"
echo "2. Abrir http://localhost:3000"
echo "3. Revisar os logs no console"
echo "4. Consultar FAUST_REFACTOR.md para detalhes"
echo ""
echo "Documentação útil:"
echo "• FAUST_REFACTOR.md - Mudanças implementadas"
echo "• BEST_PRACTICES.md - Como usar Faust corretamente"
echo "• PROJECT_ANALYSIS.md - Análise da estrutura"
echo ""
