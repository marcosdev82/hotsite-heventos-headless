"use client";

import { FaustProvider as CoreFaustProvider } from "@faustwp/core";

type FaustProviderProps = {
  children: React.ReactNode;
};

export function FaustProvider({ children }: FaustProviderProps) {
  return <CoreFaustProvider pageProps={{}}>{children}</CoreFaustProvider>;
}
