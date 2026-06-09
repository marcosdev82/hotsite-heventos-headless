import { WordPressBlocksRenderer } from "@/components/gutenberg/WordPressBlocksRenderer";
import type { ContentNode } from "@/types/wordpress";

type ContentTemplateProps = {
  node: ContentNode;
};

export function ContentTemplate({ node }: ContentTemplateProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {node.title ? (
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{node.title}</h1>
        </header>
      ) : null}

      <WordPressBlocksRenderer
        editorBlocks={node.editorBlocks}
        fallbackHtml={node.content}
      />
    </article>
  );
}
