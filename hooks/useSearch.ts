"use client";

import { useCallback, useState, useTransition } from "react";
import type { ContentNode } from "@/types/wordpress";

type SearchState = {
  results: ContentNode[];
  query: string;
  isSearching: boolean;
  hasSearched: boolean;
};

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    results: [],
    query: "",
    isSearching: false,
    hasSearched: false,
  });
  const [isPending, startTransition] = useTransition();

  const search = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState({ results: [], query: "", isSearching: false, hasSearched: false });
      return;
    }

    setState((current) => ({
      ...current,
      query: trimmed,
      isSearching: true,
      hasSearched: true,
    }));

    startTransition(async () => {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}`,
      );
      const data = (await response.json()) as { results: ContentNode[] };

      setState({
        query: trimmed,
        results: data.results ?? [],
        isSearching: false,
        hasSearched: true,
      });
    });
  }, []);

  return {
    ...state,
    isPending,
    search,
  };
}
