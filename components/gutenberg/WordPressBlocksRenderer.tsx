"use client";

import { flatListToHierarchical } from "@faustwp/core";
import {
  WordPressBlocksProvider,
  WordPressBlocksViewer,
} from "@faustwp/blocks";
import blocks from "@/wp-blocks";
import type { EditorBlock } from "@/types/wordpress";

type WordPressBlocksRendererProps = {
  editorBlocks?: EditorBlock[] | null;
  fallbackHtml?: string | null;
};

const ENTRY_CONTENT_CLASSNAME =
  "entry-content wp-block-post-content is-layout-constrained";

export function WordPressBlocksRenderer({
  editorBlocks,
  fallbackHtml,
}: WordPressBlocksRendererProps) {
  if (editorBlocks?.length) {
    const blockList = flatListToHierarchical(editorBlocks, {
      childrenKey: "innerBlocks",
    });

    return (
      <WordPressBlocksProvider config={{ blocks }}>
        <div className={ENTRY_CONTENT_CLASSNAME}>
          <WordPressBlocksViewer blocks={blockList} />
        </div>
      </WordPressBlocksProvider>
    );
  }

  if (fallbackHtml) {
    return (
      <div
        className={ENTRY_CONTENT_CLASSNAME}
        dangerouslySetInnerHTML={{ __html: fallbackHtml }}
      />
    );
  }

  return null;
}
