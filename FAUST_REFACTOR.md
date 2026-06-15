# 🔄 Refatoração do Projeto Baseada no Faust

## 📋 Resumo das Alterações

Este documento descreve as principais refatorações aplicadas ao projeto para seguir as melhores práticas do Faust.js 3.4.1.

### ✅ Mudanças Implementadas

#### 1. **Configuração do Faust** (`faust.config.js`)
- ✅ Adicionado `templates` com mapeamento de post types (post, page, evento, category, tag)
- ✅ Configurado `revalidateOptions` para ISR (On-Demand ou Interval)
- ✅ Adicionado suporte a `experimental` features
- ✅ Adicionado debug e cache configuration

#### 2. **Configuração do Next.js** (`next.config.ts`)
- ✅ Adicionado security headers (X-Content-Type-Options, X-Frame-Options, etc)
- ✅ Adicionado image optimization settings
- ✅ Adicionado suporte a redirects e rewrites
- ✅ Melhorado `optimizePackageImports`

#### 3. **Error Handling e Boundaries**
- ✅ Criado `components/errors/ErrorBoundary.tsx` - para capturar e tratar erros
- ✅ Criado `components/errors/NotFoundContent.tsx` - componente 404
- ✅ Criado `app/error.tsx` - Error Boundary global
- ✅ Integração com serviço de monitoring (preparado para Sentry, etc)

#### 4. **Logging Estruturado** (`lib/logger.ts`)
- ✅ Logger com níveis (debug, info, warn, error)
- ✅ Integração com operações GraphQL
- ✅ Integração com chamadas de API
- ✅ Pronto para Sentry, LogRocket, ou DataDog

#### 5. **GraphQL Client Melhorado** (`lib/graphql-client.ts`)
- ✅ Adicionado timeout configurável
- ✅ Melhor tratamento de erros e logging
- ✅ Adicionado User-Agent customizado
- ✅ Suporte a Secret Key do FaustWP

#### 6. **Utilitários do Faust** (`lib/faust-utils.ts`)
- ✅ `getContentByUri()` - buscar conteúdo por URI
- ✅ `getAllContentUris()` - para generateStaticParams
- ✅ `parseUriToSegments()` - converter URI em segmentos
- ✅ `buildUriFromSegments()` - construir URI de segmentos
- ✅ `getContentTypeFromUri()` - determinar tipo de conteúdo
- ✅ Utilitários de formatação (datas, texto, etc)
- ✅ Validação de conteúdo

#### 7. **Static Params Generator** (`lib/static-params.ts`)
- ✅ `generateStaticParamsForContent()` - para rotas dinâmicas
- ✅ `generateStaticParamsForPostType()` - por tipo de post
- ✅ Pronto para uso em `app/[...slug]/page.tsx`

#### 8. **Hooks do Faust** (`hooks/useFaust.ts`)
- ✅ `useFetchData<T>()` - para fetching com loading/error
- ✅ `useCachedData<T>()` - com cache em session storage
- ✅ `usePreviewMode()` - detectar modo preview

#### 9. **Root Layout Melhorado** (`app/layout.tsx`)
- ✅ Melhor organização de imports
- ✅ Logging de erros ao gerar metadados
- ✅ Adicionado preconnect a recursos externos
- ✅ Melhor estrutura de head

---

## 🚀 Como Usar

### 1. **Renderizar Conteúdo Dinâmico**

```typescript
// app/[...slug]/page.tsx
import { generateStaticParamsForContent } from '@/lib/static-params';
import { getContentByUri } from '@/lib/faust-utils';
import { ContentTemplate } from '@/components/content/ContentTemplate';

export async function generateStaticParams() {
  return await generateStaticParamsForContent();
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const uri = '/' + params.slug.join('/') + '/';
  const content = await getContentByUri(uri);

  if (!content) {
    notFound();
  }

  return <ContentTemplate content={content} />;
}
```

### 2. **Usar Logger em Server Components**

```typescript
import { logger } from '@/lib/logger';

export async function MyServerComponent() {
  try {
    logger.info('Iniciando operação');
    // ... fazer algo
    logger.info('Operação concluída');
  } catch (error) {
    logger.error('Erro na operação', error instanceof Error ? error : new Error(String(error)));
  }
}
```

### 3. **Usar Logger em Client Components**

```typescript
'use client';

import { logger } from '@/lib/logger';
import { useEffect } from 'react';

export function MyClientComponent() {
  useEffect(() => {
    logger.debug('Componente montado');
  }, []);

  return <div>...</div>;
}
```

### 4. **Usar Cache de Dados no Cliente**

```typescript
'use client';

import { useCachedData } from '@/hooks/useFaust';

export function MyComponent() {
  const { data, loading, error } = useCachedData(
    'my-data',
    async () => {
      const response = await fetch('/api/my-data');
      return response.json();
    },
    3600 // TTL em segundos
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### 5. **Adicionar Tratamento de Erros**

```typescript
// app/posts/error.tsx
'use client';

import { ErrorBoundary } from '@/components/errors/ErrorBoundary';

export default ErrorBoundary;
```

---

## 📊 Estrutura de Diretórios

```
lib/
├── env.ts                      # Variáveis de ambiente
├── faust.ts                    # Helpers do Faust
├── faust-utils.ts             # ✨ Utilitários do Faust (novo)
├── graphql-client.ts          # Cliente GraphQL melhorado
├── graphql-client-enhanced.ts # Versão alternativa
├── logger.ts                  # ✨ Logger estruturado (novo)
├── seo.ts                     # Metadados e SEO
└── static-params.ts           # ✨ Generator de static params (novo)

components/
├── errors/
│   ├── ErrorBoundary.tsx      # ✨ Error boundary (novo)
│   └── NotFoundContent.tsx    # ✨ Conteúdo 404 (novo)
├── blocks/
├── content/
├── gutenberg/
├── layout/
├── providers/
└── search/

hooks/
├── useSearch.ts
└── useFaust.ts                # ✨ Hooks do Faust (novo)

app/
├── layout.tsx                 # ✨ Melhorado
├── error.tsx                  # ✨ Error handler (novo)
├── page.tsx
├── [...slug]/page.tsx
└── ...
```

---

## 🔧 Configurações Recomendadas

### Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_WORDPRESS_URL=https://seu-wordpress.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://seu-wordpress.com/graphql
NEXT_PUBLIC_SITE_URL=https://seu-site.com
FAUST_SECRET_KEY=seu-secret-key-do-wordpress
FAUST_DEBUG=false  # true para debug
```

### Integração com Sentry (Opcional)

```typescript
// lib/logger.ts
// Implementar __SEND_LOG para integrar com Sentry

if (typeof window !== "undefined" && window.__SENTRY__) {
  window.__SENTRY__.captureException(error);
}
```

---

## 📈 Performance

### ISR (Incremental Static Regeneration)

O projeto agora suporta ISR automático via:

1. **On-Demand ISR**: Revalidar quando conteúdo muda no WordPress
2. **Scheduled ISR**: Revalidar em intervalo configurável
3. **Static Params**: Pré-renderizar rotas conhecidas

### Caching

- Cache automático em ISR
- Session storage para dados do cliente
- HTTP cache headers

---

## 🐛 Troubleshooting

### Erro: "GraphQL endpoint não configurado"

**Solução**: Verificar `.env.local` e confirmar que `NEXT_PUBLIC_GRAPHQL_ENDPOINT` está definido

### Erro: "GraphQL network error"

**Solução**: 
- Verificar conexão com WordPress
- Verificar `NEXT_PUBLIC_WORDPRESS_URL`
- Verificar logs com `FAUST_DEBUG=true`

### Conteúdo não aparece

**Solução**:
- Verificar se o conteúdo existe no WordPress
- Verificar permissões de acesso ao GraphQL
- Verificar se as queries estão corretas
- Verificar logs no DevTools Console

---

## 📚 Próximos Passos

- [ ] Expandir block registry com blocos customizados
- [ ] Implementar cache em Redis
- [ ] Integrar com Sentry para error tracking
- [ ] Adicionar observabilidade com OpenTelemetry
- [ ] Implementar rate limiting nas APIs
- [ ] Adicionar tests e2e com Cypress/Playwright

---

## 📖 Referências

- [Faust.js Documentation](https://faustjs.org/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [WordPress GraphQL](https://www.wpgraphql.com/)
- [Headless WordPress](https://wordpress.org/news/2023/02/wordpress-as-a-cms/)

---

**Versão**: 1.0  
**Data**: 2026-06-15  
**Faust**: 3.4.1  
**Next.js**: 15.x
