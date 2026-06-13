"use client";

import { useEffect, useMemo, useState } from "react";

type EventCountdownProps = {
  eventIsoDate: string;
  title?: string;
  subtitle?: string;
};

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function getCountdownState(targetDateMs: number): CountdownState {
  const now = Date.now();
  const diff = targetDateMs - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true,
    };
  }

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  return { days, hours, minutes, seconds, finished: false };
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function EventCountdown({
  eventIsoDate,
  title = "Contagem regressiva para o congresso",
  subtitle = "Prepare sua agenda para os principais debates científicos.",
}: EventCountdownProps) {
  const targetDateMs = useMemo(() => new Date(eventIsoDate).getTime(), [eventIsoDate]);
  const [countdown, setCountdown] = useState<CountdownState | null>(null);

  useEffect(() => {
    if (Number.isNaN(targetDateMs)) {
      return;
    }

    const tick = () => {
      setCountdown(getCountdownState(targetDateMs));
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, [targetDateMs]);

  if (Number.isNaN(targetDateMs)) {
    return null;
  }

  const items = [
    { label: "Dias", value: countdown ? String(countdown.days) : "--" },
    { label: "Horas", value: countdown ? pad(countdown.hours) : "--" },
    { label: "Min", value: countdown ? pad(countdown.minutes) : "--" },
    { label: "Seg", value: countdown ? pad(countdown.seconds) : "--" },
  ];

  return (
    <section className="border-y border-border/40 bg-muted/35 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {title}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {countdown?.finished ? "Evento em andamento" : "Faltam poucos dias"}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border/40 bg-background px-5 py-4 text-center shadow-[0_10px_26px_rgba(3,4,94,0.12)]"
            >
              <p className="text-3xl font-black leading-none text-foreground sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
