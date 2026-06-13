import Link from "next/link";
import { MainLayout } from "@/layouts/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">
          A página que você procura não foi encontrada.
        </p>
        <Link
          href="/"
          className="btn btn-efeito mt-8 rounded-lg px-5 py-2.5 text-sm font-medium"
        >
          <span>Voltar ao início</span>
        </Link>
      </section>
    </MainLayout>
  );
}
