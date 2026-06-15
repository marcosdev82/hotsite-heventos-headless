import { env } from "@/lib/env";

/**
 * Componente para carregar estilos customizados do WordPress em tempo de renderização.
 * Útil quando os endpoints REST não retornam CSS direto, mas precisamos dos estilos dinâmicos.
 */
export async function WordPressCustomStyles() {
  const wpUrl = env.wordpressUrl.replace(/\/$/, "");

  try {
    // Tenta buscar os estilos globais via REST API
    const response = await fetch(
      `${wpUrl}/wp-json/wp/v2/global-styles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache por 1 hora
      }
    );

    if (response.ok) {
      const styleJson = await response.json();
      
      // Extrai as configurações de estilos globais
      const styles = styleJson?.styles || {};
      const settings = styleJson?.settings || {};
      
      // Gera CSS inline a partir dos estilos customizados
      const cssVars = generateCSSVariablesFromSettings(settings);
      
      return (
        <style 
          dangerouslySetInnerHTML={{ __html: cssVars }} 
          suppressHydrationWarning
        />
      );
    }
  } catch (error) {
    console.warn(
      "[WordPressCustomStyles] Erro ao carregar estilos customizados:",
      error
    );
  }

  return null;
}

/**
 * Gera variáveis CSS a partir das configurações do theme.json do WordPress
 */
function generateCSSVariablesFromSettings(settings: any): string {
  const variables: Record<string, string> = {};

  // Processa cores customizadas
  if (settings?.color?.palette) {
    settings.color.palette.forEach((color: any) => {
      if (color?.slug && color?.color) {
        variables[`--wp--preset--color--${color.slug}`] = color.color;
      }
    });
  }

  // Processa gradientes customizados
  if (settings?.color?.gradients) {
    settings.color.gradients.forEach((gradient: any) => {
      if (gradient?.slug && gradient?.gradient) {
        variables[`--wp--preset--gradient--${gradient.slug}`] = gradient.gradient;
      }
    });
  }

  // Processa tipografia customizada
  if (settings?.typography?.fontSizes) {
    settings.typography.fontSizes.forEach((fontSize: any) => {
      if (fontSize?.slug && fontSize?.size) {
        variables[`--wp--preset--font-size--${fontSize.slug}`] = fontSize.size;
      }
    });
  }

  if (settings?.typography?.fontFamilies) {
    settings.typography.fontFamilies.forEach((fontFamily: any) => {
      if (fontFamily?.slug && fontFamily?.fontFamily) {
        variables[`--wp--preset--font-family--${fontFamily.slug}`] = fontFamily.fontFamily;
      }
    });
  }

  // Processa espaçamento customizado
  if (settings?.spacing?.spacingSizes) {
    settings.spacing.spacingSizes.forEach((spacing: any) => {
      if (spacing?.slug && spacing?.size) {
        variables[`--wp--preset--spacing--${spacing.slug}`] = spacing.size;
      }
    });
  }

  // Converte o objeto para CSS
  const cssString = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

  return `:root {\n${cssString}\n}`;
}
