"use client";

import React from "react";
import { useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

/**
 * Error Boundary for catching errors in routes
 * Used by Next.js 13+ with error.tsx files
 */
export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry, LogRocket, etc.)
    console.error("[ErrorBoundary] Route error:", error);
    logErrorToMonitoring(error);
  }, [error]);

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl">⚠️</div>
          </div>

          <h1 className="text-2xl font-bold text-red-900 mb-2 text-center">
            Algo deu errado
          </h1>

          <p className="text-red-700 text-center mb-4">
            Desculpe, ocorreu um erro ao carregar esta página. Tente novamente em alguns segundos.
          </p>

          {process.env.NODE_ENV === "development" && (
            <details className="mb-4 p-3 bg-red-100 rounded text-sm text-red-800 overflow-auto max-h-40">
              <summary className="cursor-pointer font-semibold mb-2">
                Detalhes do erro
              </summary>
              <code className="whitespace-pre-wrap break-words">
                {error.message}
                {"\n"}
                {error.stack}
              </code>
            </details>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => reset()}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
            >
              Tentar novamente
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition-colors font-medium"
            >
              Ir para Home
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

/**
 * Log error to external monitoring service
 */
function logErrorToMonitoring(error: Error) {
  // TODO: Integrate with your monitoring service
  // Example: Sentry, LogRocket, DataDog, etc.
  if (typeof window !== "undefined" && window.__LOG_ERROR) {
    window.__LOG_ERROR({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }
}

declare global {
  interface Window {
    __LOG_ERROR?: (data: unknown) => void;
  }
}
