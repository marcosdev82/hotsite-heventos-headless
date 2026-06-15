import { env } from "@/lib/env";

export function WordPressStyles() {
  const wpUrl = env.wordpressUrl.replace(/\/$/, "");

  return (
    <>
      {/* Estilos padrão dos blocos do WordPress */}
      <link
        rel="stylesheet"
        href={`${wpUrl}/wp-includes/css/dist/block-library/style.min.css`}
      />
      <link
        rel="stylesheet"
        href={`${wpUrl}/wp-includes/css/dist/block-library/theme.min.css`}
      />
      {/* Estilos globais do WordPress (tema padrão) */}
      <link rel="stylesheet" href={`${wpUrl}/wp-includes/css/dist/global-styles/style.min.css`} />
      
      {/* Estilos customizados do tema (theme.json - cores, fontes, variações) */}
      <link 
        rel="stylesheet" 
        href={`${wpUrl}/wp-json/wp/v2/global-styles?context=view`}
      />
      
      {/* Estilos customizados adicionais do tema/plugins */}
      <link 
        rel="stylesheet" 
        href={`${wpUrl}/wp-content/themes/style.css`}
        media="all"
      />
    </>
  );
}
