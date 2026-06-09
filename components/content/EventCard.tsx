import Link from "next/link";
import type { ContentNode } from "@/types/wordpress";

type EventCardProps = {
  event: ContentNode;
};

export function EventCard({ event }: EventCardProps) {
  const fields =
    "eventFields" in event
      ? (event as ContentNode & {
          eventFields?: {
            dataInicio?: string | null;
            local?: string | null;
          } | null;
        }).eventFields
      : null;

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      {event.featuredImage?.node?.sourceUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.featuredImage.node.sourceUrl}
          alt={event.featuredImage.node.altText || event.title || ""}
          className="aspect-video w-full object-cover"
        />
      ) : null}
      <div className="p-5">
        <h2 className="text-xl font-semibold group-hover:text-primary">
          <Link href={event.uri}>{event.title}</Link>
        </h2>
        {fields?.dataInicio ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(fields.dataInicio).toLocaleDateString("pt-BR")}
            {fields.local ? ` · ${fields.local}` : ""}
          </p>
        ) : null}
        {event.excerpt ? (
          <div
            className="mt-3 line-clamp-3 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: event.excerpt }}
          />
        ) : null}
      </div>
    </article>
  );
}
