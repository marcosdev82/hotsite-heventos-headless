"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearch } from "@/hooks/useSearch";

export function SearchForm() {
  const [input, setInput] = useState("");
  const { results, isSearching, isPending, hasSearched, search } = useSearch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void search(input);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Digite sua busca..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none ring-primary focus:ring-2"
        />
        <button
          type="submit"
          disabled={isSearching || isPending}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          Buscar
        </button>
      </form>

      {hasSearched ? (
        <ul className="space-y-4">
          {results.length ? (
            results.map((item) => (
              <li key={item.databaseId} className="rounded-lg border border-border p-4">
                <Link href={item.uri} className="font-medium hover:text-primary">
                  {item.title}
                </Link>
                {item.excerpt ? (
                  <div
                    className="mt-2 text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: item.excerpt }}
                  />
                ) : null}
              </li>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum resultado encontrado.
            </p>
          )}
        </ul>
      ) : null}
    </div>
  );
}
