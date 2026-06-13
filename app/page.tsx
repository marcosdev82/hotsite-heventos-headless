import Link from "next/link";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { EventCountdown } from "@/components/content/EventCountdown";
import { MainLayout } from "@/layouts/MainLayout";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const highlights = [
  { label: "Data", value: "20 a 22 de Agosto de 2026" },
  { label: "Formato", value: "Presencial + transmissão de sessões-chave" },
  { label: "Local", value: "Centro de Convenções Frei Caneca, São Paulo" },
];

const tracks = [
  {
    title: "Atualização Científica",
    description:
      "Sessões com evidências recentes, mesas multidisciplinares e discussão de casos reais.",
  },
  {
    title: "Prática Clínica",
    description:
      "Protocolos aplicáveis para consultório, ambulatório e hospitais em diferentes cenários.",
  },
  {
    title: "Inovação e Tecnologia",
    description:
      "Inteligência clínica, ferramentas digitais e tendências para ampliar qualidade assistencial.",
  },
];

const speakers = [
  "Dra. Marina Silveira",
  "Dr. Ricardo Viana",
  "Dra. Helena Bittencourt",
  "Dr. Diego Lobo",
];

const schedule = [
  {
    day: "Dia 1",
    period: "08h às 18h",
    focus: "Imersão em atualização diagnóstica e condutas de primeira linha.",
  },
  {
    day: "Dia 2",
    period: "08h às 18h",
    focus: "Painéis temáticos com especialistas nacionais e convidados internacionais.",
  },
  {
    day: "Dia 3",
    period: "08h às 17h",
    focus: "Aplicação prática, discussão de trabalhos e agenda de futuro da área.",
  },
];

export default function HomePage() {
  return (
    <MainLayout>
      <div className={`${body.className} conference-surface`}>
        <section className="relative overflow-hidden border-b border-border/60 px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="conference-ambient" aria-hidden />
          <div className="relative mx-auto max-w-7xl">
            <p className="stagger-fade text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Congresso de Atualização em Saúde
            </p>
            <h1
              className={`${display.className} stagger-fade mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl`}
              style={{ animationDelay: "80ms" }}
            >
              Um encontro multidisciplinar para transformar prática clínica em
              resultado real.
            </h1>
            <p
              className="stagger-fade mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Três dias de conteúdo estratégico, networking qualificado e
              experiências imersivas para profissionais que querem estar à
              frente.
            </p>
            <div
              className="stagger-fade mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                href="#inscricao"
                className="btn btn-efeito rounded-full px-6 py-3 text-sm font-semibold"
              >
                <span>Garantir inscrição</span>
              </Link>
              <Link
                href="#programacao"
                className="btn btn-efeito rounded-full px-6 py-3 text-sm font-semibold"
              >
                <span>Ver programação</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {highlights.map((item, index) => (
                <article
                  key={item.label}
                  className="stagger-fade rounded-2xl border border-border/35 bg-background/70 p-4 backdrop-blur"
                  style={{ animationDelay: `${260 + index * 70}ms` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground/80">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <EventCountdown
          eventIsoDate="2026-08-20T08:00:00-03:00"
          subtitle="Abertura oficial em 20 de agosto de 2026, com trilhas clínicas, mesas interativas e networking científico."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {tracks.map((track) => (
            <article
              key={track.title}
              className="rounded-3xl border border-border/40 bg-card p-6 shadow-[0_12px_30px_rgba(3,4,94,0.14)]"
            >
              <h2
                className={`${display.className} text-2xl font-bold text-foreground`}
              >
                {track.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                {track.description}
              </p>
            </article>
          ))}
        </section>

        <section className="border-y border-border/60 bg-foreground px-4 py-16 text-background sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className={`${display.className} text-3xl font-bold sm:text-4xl`}>
                Palestrantes confirmados
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-background/80 sm:text-base">
                Especialistas reconhecidos por pesquisa, ensino e aplicação
                clínica, com palestras objetivas e debates orientados para
                tomada de decisão.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {speakers.map((speaker) => (
                  <span
                    key={speaker}
                    className="rounded-full border border-background/25 bg-background/10 px-4 py-2 text-sm"
                  >
                    {speaker}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-background/25 bg-background/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Local do Evento
              </p>
              <p className="mt-2 text-xl font-semibold">
                Centro de Convenções Frei Caneca
              </p>
              <p className="mt-4 text-sm text-background/90">
                Região da Av. Paulista, com acesso rápido a hotéis,
                gastronomia e mobilidade urbana para toda a equipe.
              </p>
              <p className="mt-6 text-sm font-semibold text-muted">
                Rua Frei Caneca, 569 · Consolação · São Paulo
              </p>
            </div>
          </div>
        </section>

        <section id="programacao" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className={`${display.className} text-3xl font-bold text-foreground`}>
              Programação resumida
            </h2>
            <Link href="#programacao" className="text-sm font-semibold text-primary hover:underline">
              Ver agenda completa
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {schedule.map((item) => (
              <article
                key={item.day}
                className="rounded-2xl border border-border/40 bg-muted/35 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  {item.day}
                </p>
                <h3 className="mt-2 text-xl font-bold text-foreground">{item.period}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {item.focus}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="inscricao" className="border-t border-border/60 bg-muted/35 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-primary/30 bg-background p-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className={`${display.className} text-3xl font-bold text-foreground`}>
                Receba novidades da próxima edição
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/75">
                Cadastre seu e-mail para receber abertura de lotes, novos
                palestrantes e atualização das trilhas científicas.
              </p>
            </div>
            <form className="grid gap-3">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                className="rounded-xl border border-foreground/20 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/35"
              />
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                className="rounded-xl border border-foreground/20 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/35"
              />
              <button
                type="button"
                className="btn btn-efeito rounded-xl px-4 py-3 text-sm font-semibold"
              >
                <span>Quero receber novidades</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
