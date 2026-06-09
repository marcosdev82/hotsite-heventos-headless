import Link from "next/link";
import { ContentTemplate } from "@/components/content/ContentTemplate";
import { EventCard } from "@/components/content/EventCard";
import { MainLayout } from "@/layouts/MainLayout";
import { getEvents, getNodeByUri } from "@/services/content.service";

export const revalidate = 60;

export default async function HomePage() {
  let frontPage = null;
  let events: Awaited<ReturnType<typeof getEvents>>["eventos"]["nodes"] = [];

  try {
    const [page, eventsData] = await Promise.all([
      getNodeByUri("/"),
      getEvents(3),
    ]);
    frontPage = page;
    events = eventsData.eventos.nodes;
  } catch {
    // Fallback quando o WordPress não está disponível
  }

  if (frontPage) {
    return (
      <MainLayout>
        <ContentTemplate node={frontPage} />
        {events.length ? (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold">Próximos eventos</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.databaseId} event={event} />
              ))}
            </div>
          </section>
        ) : null}
      </MainLayout>
    );
  }

  if (events.length) {
    return (
      <MainLayout>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Eventos</h1>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.databaseId} event={event} />
            ))}
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Hotsite de Eventos
        </h1>
        <p className="mt-4 text-muted-foreground">
          Configure o WordPress headless e as variáveis de ambiente para
          carregar o conteúdo dinamicamente.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/eventos"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Ver eventos
          </Link>
          <Link
            href="/busca"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium"
          >
            Buscar conteúdo
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
