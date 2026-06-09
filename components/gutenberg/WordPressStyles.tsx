import { env } from "@/lib/env";

export function WordPressStyles() {
  const wpUrl = env.wordpressUrl.replace(/\/$/, "");

  return (
    <>
      <link
        rel="stylesheet"
        href={`${wpUrl}/wp-includes/css/dist/block-library/style.min.css`}
      />
      <link
        rel="stylesheet"
        href={`${wpUrl}/wp-includes/css/dist/block-library/theme.min.css`}
      />
      <link rel="stylesheet" href={`${wpUrl}/wp-includes/css/dist/global-styles/style.min.css`} />
    </>
  );
}
