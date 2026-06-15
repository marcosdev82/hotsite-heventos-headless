/**
 * Best Practices Guide for Faust.js in This Project
 */

# ✨ Faust.js Best Practices

## 1. **Estrutura de Arquivos**

### Diretórios Principais
- `lib/` - Utilitários, helpers, e configurações
- `lib/faust-*` - Tudo relacionado ao Faust
- `hooks/` - React hooks customizados
- `components/errors/` - Error boundaries e fallbacks
- `services/` - Camada de negócio e data fetching

### Padrão de Imports
```typescript
// ✅ Bom - importar de faust-index para centralizar
import { logger, fetchGraphQL, useCachedData } from '@/lib/faust-index';

// ❌ Evitar - imports espalhados
import { logger } from '@/lib/logger';
import { fetchGraphQL } from '@/lib/graphql-client';
import { useCachedData } from '@/hooks/useFaust';
```

## 2. **Tratamento de Erros**

### Em Server Components
```typescript
'use server';
import { logger } from '@/lib/faust-index';

export async function MyServerAction() {
  try {
    const data = await fetchData();
    logger.info('Dados carregados com sucesso', { count: data.length });
    return data;
  } catch (error) {
    logger.error('Erro ao carregar dados', error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}
```

### Em Client Components
```typescript
'use client';
import { useEffect } from 'react';
import { logger } from '@/lib/faust-index';
import { ErrorBoundary } from '@/lib/faust-index';

export default function Page() {
  useEffect(() => {
    try {
      // client logic
    } catch (error) {
      logger.error('Erro no cliente', error instanceof Error ? error : new Error(String(error)));
    }
  }, []);

  return <div>...</div>;
}
```

### Error Boundaries
```typescript
// app/posts/error.tsx
'use client';
import { ErrorBoundary } from '@/lib/faust-index';

export default ErrorBoundary;

// Qualquer erro em posts/* será capturado
```

## 3. **Data Fetching**

### Com ISR
```typescript
export const revalidate = 3600; // 1 hora

export async function generateStaticParams() {
  return await generateStaticParamsForContent();
}

export default async function Page({ params }) {
  const content = await getContentByUri(params.slug);
  return <div>{content.title}</div>;
}
```

### Dados Customizados
```typescript
// services/custom.service.ts
export async function getCustomData() {
  try {
    const data = await fetchGraphQL<MyType>(CUSTOM_QUERY);
    return data;
  } catch (error) {
    logger.error('Erro em getCustomData', error);
    return null;
  }
}
```

## 4. **Logging**

### Níveis de Log
```typescript
logger.debug('Mensagem de debug', { extra: 'data' }); // Dev only
logger.info('Info', { operation: 'complete' });       // App info
logger.warn('Aviso', { warning: 'data' });           // Warnings
logger.error('Erro', error, { context: 'data' });    // Errors + stack
```

### GraphQL Operations
```typescript
logger.graphql('GetPost', 'start');
logger.graphql('GetPost', 'success', 123);     // duration in ms
logger.graphql('GetPost', 'error', 123, error);
```

### API Calls
```typescript
logger.api('GET', '/api/posts', 200, 45);  // method, path, status, duration
logger.api('POST', '/api/posts', 500, 100, error);
```

## 5. **Hooks Customizados**

### useFetchData
```typescript
'use client';
import { useFetchData } from '@/lib/faust-index';

export function Component() {
  const { data, loading, error } = useFetchData(async () => {
    return await fetch('/api/data').then(r => r.json());
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### useCachedData
```typescript
'use client';
import { useCachedData } from '@/lib/faust-index';

export function Component() {
  const { data, loading, error } = useCachedData(
    'my-key',
    async () => await fetch('/api/data').then(r => r.json()),
    3600 // TTL em segundos
  );
  // ... render
}
```

### usePreviewMode
```typescript
'use client';
import { usePreviewMode } from '@/lib/faust-index';

export function Component() {
  const { isPreviewMode } = usePreviewMode();
  
  return (
    <div>
      {isPreviewMode && <div className="border-2 border-yellow-400">PREVIEW MODE</div>}
    </div>
  );
}
```

## 6. **Componentes Reutilizáveis**

### Layout Pattern
```typescript
// components/MyLayout.tsx
import { logger } from '@/lib/faust-index';

export default async function MyLayout({ children }) {
  logger.debug('MyLayout renderizado');
  return <div>{children}</div>;
}
```

### Error Boundary Pattern
```typescript
// app/section/error.tsx
'use client';
import { ErrorBoundary } from '@/lib/faust-index';

export default ErrorBoundary;

// Todos os erros em /section/* serão capturados
```

## 7. **Variáveis de Ambiente**

```bash
# .env.local - Development
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
FAUST_SECRET_KEY=seu-secret-key
FAUST_DEBUG=true

# .env.production - Production
NEXT_PUBLIC_WORDPRESS_URL=https://seu-wp.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://seu-wp.com/graphql
NEXT_PUBLIC_SITE_URL=https://seu-site.com
FAUST_SECRET_KEY=seu-secret-key-production
FAUST_DEBUG=false
```

## 8. **Tipos TypeScript**

### Type Safety
```typescript
import type { ContentNode, MenuItem, SEOData } from '@/types/wordpress';

export async function getTypeSafeContent(uri: string): Promise<ContentNode | null> {
  try {
    const content: ContentNode = await fetchGraphQL<ContentNode>(QUERY);
    return content;
  } catch (error) {
    return null;
  }
}
```

## 9. **Performance**

### Otimizações
- ✅ Use `generateStaticParams()` para pré-renderização
- ✅ Use ISR com `revalidate` apropriado
- ✅ Cache dados com `useCachedData`
- ✅ Lazy load componentes com `React.lazy()`
- ✅ Optimize images com Next.js `Image`

### Monitoramento
```typescript
// Adicionar ao seu serviço de monitoring
if (process.env.NODE_ENV === 'production') {
  // Integrar com Sentry, DataDog, etc.
}
```

## 10. **Troubleshooting**

### Problema: 404 em conteúdo que existe
- ✅ Verificar se `generateStaticParams` retorna a URI corretamente
- ✅ Verificar se a rota é `dynamic` ou `static`
- ✅ Verificar permissões do GraphQL

### Problema: Erros não aparecem
- ✅ Adicionar `error.tsx` na rota
- ✅ Verificar DevTools Console
- ✅ Verificar logs com `FAUST_DEBUG=true`

### Problema: Dados não atualizam
- ✅ Verificar `revalidate` value
- ✅ Usar `revalidateTag()` para on-demand revalidation
- ✅ Verificar cache em servir estático

---

**Última Atualização**: 2026-06-15
