import { MainLayout } from "@/layouts/MainLayout";

/**
 * Global 404 Not Found Component
 * Used by Next.js 13+ not-found.tsx
 */
export function NotFoundContent() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl font-bold text-primary mb-4">404</div>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            Página não encontrada
          </h1>

          <p className="text-muted-foreground mb-6">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Isso pode ter acontecido porque:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li>• A URL pode estar incorreta</li>
              <li>• A página foi removida ou movida</li>
              <li>• Você pode não ter permissão para acessar</li>
            </ul>
          </div>

          <div className="mt-6">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Voltar para Home
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
