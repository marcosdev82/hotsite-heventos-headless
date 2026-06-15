## 🎨 Checklist: Estilos Gutenberg não Refletem no Front

### ✅ Correções Aplicadas

As seguintes alterações foram feitas para incluir estilos customizados do WordPress:

1. **[WordPressStyles.tsx](components/gutenberg/WordPressStyles.tsx)**
   - ✅ Adicionado carregamento de estilos globais customizados via REST API
   - ✅ Adicionado CSS customizado do tema

2. **[WordPressCustomStyles.tsx](components/gutenberg/WordPressCustomStyles.tsx)** (NOVO)
   - ✅ Componente que busca theme.json do WordPress
   - ✅ Gera variáveis CSS para cores, fontes, espaçamentos

3. **[app/layout.tsx](app/layout.tsx)**
   - ✅ Importado WordPressCustomStyles
   - ✅ Estilos movidos para `<head>`

---

### 🔍 Checklist de Verificação

Depois de fazer deploy, verifique:

- [ ] **DevTools → Network**: Procure por requisições para:
  - `wp-json/wp/v2/global-styles` (deve retornar JSON)
  - `wp-includes/css/dist/` (deve retornar CSS)
  - `wp-content/themes/style.css` (deve retornar CSS)

- [ ] **DevTools → Elements → `<head>`**: Verifique se há tags `<link>` e `<style>` do WordPress

- [ ] **DevTools → Console**: Nenhum erro 404 de CSS ou fetch

- [ ] **Página Renderizada**: Cores/estilos dos blocos estão aparecendo?

---

### 🐛 Se o Problema Persistir

#### Causa Possível 1: Classes CSS não sendo renderizadas
**Solução**: Verificar se os blocos estão preservando as classes CSS
```bash
# No arquivo de bloco customizado do WordPress, confirme que:
# - As classes são renderizadas no atributo 'className'
# - Não há conflito com Tailwind CSS
```

#### Causa Possível 2: Conflito com Tailwind CSS
**Solução**: Adicionar prefixo ou scope ao CSS do WordPress
- Editar `[styles/blocks.scss](styles/blocks.scss)` para adicionar prefixo `.entry-content`
- Ou ajustar `tailwind.config.ts` para não sobrescrever estilos de `.wp-*`

#### Causa Possível 3: Estilos inline não sendo preservados
**Solução**: Verificar se `dangerouslySetInnerHTML` está sendo usado corretamente
- Blocos customizados devem renderizar atributos `style` inline

#### Causa Possível 4: REST API do WordPress bloqueada/desabilitada
**Solução**: Verificar configurações do WordPress
```bash
# No WordPress, confirmar que:
# - REST API está ativada
# - Global Styles estão configuradas
# - Tema suporta block-based design (FSE)
```

---

### 🔧 Debug Avançado

Para diagnosticar qual CSS está sendo carregado:

```javascript
// Cole no console do browser para ver todos os estilos WordPress carregados:
console.log(Array.from(document.styleSheets)
  .filter(s => s.href?.includes('wp-') || s.href?.includes('wordpress'))
  .map(s => ({ href: s.href, rules: s.cssRules.length })));
```

---

### 📚 Referências

- [WordPress Global Styles API](https://developer.wordpress.org/reference/functions/wp_enqueue_global_styles/)
- [Faust.js Blocks Provider](https://faustjs.org/docs/next/blocks)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
