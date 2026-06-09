import type { Metadata } from "next";
import { EventCard } from "@/components/content/EventCard";
import { MainLayout } from "@/layouts/MainLayout";
import { getEvents } from "@/services/content.service";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Eventos",
  description: "Confira a programação completa de eventos.",
};

export default async function EventosPage() {
  let events: Awaited<ReturnType<typeof getEvents>>["eventos"]["nodes"] = [];

  try {
    const data = await getEvents(12);
    events = data.eventos.nodes;
  } catch {
    // WordPress indisponível
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Eventos</h1>
          <p className="mt-2 text-muted-foreground">
            Programação, palestrantes e inscrições.
          </p>
        </header>

        {events.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.databaseId} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nenhum evento publicado no momento.
          </p>
        )}
      </section>
    </MainLayout>
  );
}
