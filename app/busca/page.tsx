import { MainLayout } from "@/layouts/MainLayout";
import { SearchForm } from "@/components/search/SearchForm";

export const metadata = {
  title: "Busca",
  description: "Pesquise conteúdos, páginas e eventos.",
};

export default function BuscaPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">Busca</h1>
        <SearchForm />
      </section>
    </MainLayout>
  );
}
