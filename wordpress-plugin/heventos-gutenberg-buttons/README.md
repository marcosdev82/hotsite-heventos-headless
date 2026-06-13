# Heventos Gutenberg Buttons

Plugin WordPress para adicionar controles combináveis ao bloco `core/button` no Gutenberg.

## Recursos

- Cores: `Primary`, `Secondary`, `Success`, `Danger`, `Warning`, `Info`, `Light`, `Dark`, `Link`
- Variantes: `Outline`, `Outline Secondary`, `Outline Light`, `Ghost`
- Formatos: `Pill`, `Square`
- Tamanhos: `Small`, `Medium`, `Large`, `XL`
- Hover: `Lift`, `Glow`, `Sweep`

## Instalação

1. Copie a pasta `heventos-gutenberg-buttons` para `wp-content/plugins/`.
2. Ative o plugin no painel do WordPress.
3. No Gutenberg, selecione um bloco Botão (`core/button`).
4. Use o painel lateral `Heventos Button` para combinar os estilos.

## Observação

O frontend headless precisa conhecer as classes salvas pelo bloco, como `btn-primary`, `btn-outline`, `btn-size-lg` e `btn-hover-glow`. Neste repositório isso já está refletido em `styles/wordpress.css`.