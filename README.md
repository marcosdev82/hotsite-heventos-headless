# Hotsite de Eventos — Headless

Hotsite de eventos desenvolvido com **Next.js 15** (App Router) e **WordPress Headless**, consumindo dados via **GraphQL** e **Faust.js**.

## Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS 4
- **CMS:** WordPress + WPGraphQL + FaustWP
- **Integração:** Faust.js, Apollo Client, `@faustwp/blocks`
- **Infra:** Docker (multi-stage), GitHub Actions (CI/CD)

## Estrutura do projeto

```
app/              # Rotas App Router, API, sitemap, robots
components/       # Componentes reutilizáveis (layout, Gutenberg, busca)
layouts/          # Layouts globais
lib/              # Utilitários (env, GraphQL, SEO, Faust)
services/         # Camada de serviços (conteúdo, menus, settings)
graphql/          # Queries e fragments GraphQL
hooks/            # Hooks React (busca, etc.)
types/            # Tipos TypeScript
styles/           # Estilos Gutenberg e WordPress
wp-blocks/        # Mapeamento de blocos Gutenberg
public/           # Assets estáticos
```

## Pré-requisitos no WordPress

Instale e ative os plugins:

1. [WPGraphQL](https://www.wpgraphql.com/)
2. [FaustWP](https://faustjs.org/)
3. [WPGraphQL Content Blocks](https://github.com/wpengine/wp-graphql-content-blocks) (blocos Gutenberg)
4. [Yoast SEO](https://yoast.com/) + WPGraphQL Yoast SEO (opcional, para SEO)
5. Custom Post Type **Evento** (`evento`) — via CPT UI, ACF ou código

### Menus

Registre as localizações de menu no WordPress:

- `PRINCIPAL` — menu principal (conforme schema WPGraphQL atual)

### FaustWP

Em **Configurações → Faust**, defina:

- **Front-end site URL:** URL do Next.js (ex: `http://localhost:3000`)
- Copie a **Secret Key** para `FAUST_SECRET_KEY`

## Configuração local

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_EVENTOS=false
FAUST_SECRET_KEY=sua-chave-secreta
NODE_ENV=development
```

Se o seu WordPress expõe o CPT `evento` no WPGraphQL (campo `eventos` em `RootQuery`), altere para:

```env
NEXT_PUBLIC_ENABLE_EVENTOS=true
```

```bash
npm install --legacy-peer-deps
npm run generate   # Gera possibleTypes.json (requer WPGraphQL com introspection)
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Compatibilidade Gutenberg

O frontend reproduz estilos do editor via:

- CSS nativo do WordPress (`block-library`, `global-styles`)
- Componentes `@faustwp/blocks` (blocos core)
- `renderedHtml` como fallback para fidelidade total
- Classes e variáveis CSS do Gutenberg (`is-layout-constrained`, etc.)

Alterações de cor, tipografia, espaçamento, bordas e gradientes feitas no editor são refletidas automaticamente no frontend.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento (Faust CLI) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação TypeScript |
| `npm run generate` | Gera `possibleTypes.json` via introspection |
| `npm run seed:wp` | Executa o seeder de páginas/menu no WordPress via WP-CLI |
| `npm run seed:wp:docker` | Executa o seeder no container Docker do WordPress |

## Seeder de demonstração (WordPress)

Foi adicionado um seeder idempotente em `scripts/wordpress-seed-congresso.sh` para preparar um ambiente completo de congresso para demonstração.

O que ele cria/atualiza automaticamente:

- Páginas: Home, Congresso, Inscrições, Palestrantes, Programação, Trabalhos, Agência de Turismo, Fale Conosco
- Conteúdo fictício realista em blocos Gutenberg para cada página
- Imagens placeholder/fictícias para banners e seções
- Menu principal na ordem solicitada
- Menu de rodapé sincronizado
- Posts de exemplo para demonstrar listagens de conteúdo
- Conteúdo do CPT `evento` (quando o post type existir)

Ordem do menu principal criada pelo seeder:

1. Home
2. Congresso
3. Inscrições
4. Palestrantes
5. Programação
6. Trabalhos
7. Agência de Turismo
8. Fale Conosco

Execução com WP-CLI local:

```bash
npm run seed:wp
```

Execução em ambiente Docker (container WordPress):

```bash
WP_CONTAINER=wordpress WP_PATH=/var/www/html npm run seed:wp:docker
```

Variáveis opcionais:

- `WP_CLI_BIN` (default: `wp`)
- `WP_CLI_ARGS` (exemplo: `--allow-root --path=/var/www/html`)
- `SEED_SITE_TITLE`
- `SEED_SITE_TAGLINE`
- `SEED_PRIMARY_MENU_NAME`
- `SEED_FOOTER_MENU_NAME`

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_WORDPRESS_URL=https://seu-wp.com \
  --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://seu-wp.com/graphql \
  --build-arg NEXT_PUBLIC_SITE_URL=https://seu-site.com \
  -t hotsite-heventos .

docker run -p 3000:3000 hotsite-heventos
```

## GitHub Actions

O workflow `.github/workflows/deploy.yml` executa:

1. Checkout
2. Instalação de dependências
3. Lint e typecheck
4. Build
5. Build e push da imagem Docker (GHCR)
6. Deploy via webhook de implantação (quando configurado) ou via SSH

### Secrets necessários

| Secret | Descrição |
|--------|-----------|
| `NEXT_PUBLIC_WORDPRESS_URL` | URL do WordPress |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | Endpoint GraphQL |
| `NEXT_PUBLIC_SITE_URL` | URL pública do frontend |
| `FAUST_SECRET_KEY` | Chave do FaustWP |
| `DEPLOY_WEBHOOK_URL` | URL HTTP(S) completa do gatilho de implantação do servidor (opcional, recomendado quando usa painel como Easypanel) |
| `SSH_HOST` | Host do servidor |
| `SSH_USER` | Usuário SSH |
| `SSH_PRIVATE_KEY` | Chave privada SSH |
| `SSH_PORT` | Porta SSH (opcional) |

Observações:

- Se `DEPLOY_WEBHOOK_URL` estiver configurado, o workflow remove espaços em branco extras, valida a URL e dispara o deploy via webhook após o push da imagem Docker.
- Se `DEPLOY_WEBHOOK_URL` não estiver configurado, o workflow faz deploy via SSH executando `docker pull` e `docker run` no servidor.

## Funcionalidades preparadas

- Menus, páginas, posts e CPTs dinâmicos
- Taxonomias via `nodeByUri`
- SEO, Open Graph e metadata dinâmica
- Sitemap e robots.txt
- Busca (`/busca`)
- Paginação (queries com cursor)
- ISR com `revalidate: 60`
- Preview via Faust API (`/api/faust`)

## Licença

MIT
