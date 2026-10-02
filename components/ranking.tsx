"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type RankRow = {
  slug: string;
  title: string;
  album: string;
  albumSlug: string;
  year: number;
  spotify: string;
};

const storageKey = "arcangel-notas";

export function RankingBoard({ rows, albums }: { rows: RankRow[]; albums: string[] }) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [album, setAlbum] = useState("todos");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setScores(JSON.parse(saved) as Record<string, number>);
      } catch {
        setScores({});
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(storageKey, JSON.stringify(scores));
  }, [scores, ready]);

  function setScore(slug: string, value: number) {
    setScores((current) => {
      const next = { ...current };
      if (current[slug] === value) delete next[slug];
      else next[slug] = value;
      return next;
    });
  }

  const ranked = useMemo(() => {
    return rows
      .filter((row) => scores[row.slug])
      .sort((a, b) => scores[b.slug] - scores[a.slug] || a.title.localeCompare(b.title, "es"));
  }, [rows, scores]);

  const visible = rows.filter((row) => album === "todos" || row.album === album);

  async function copyReel() {
    const text = ranked
      .slice(0, 10)
      .map((row, index) => `${index + 1}. ${row.title} — ${scores[row.slug]}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <div>
      <section className="border border-line bg-paper p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl tracking-tight">Top para el reel</h2>
          <button type="button" onClick={copyReel} disabled={ranked.length === 0} className="btn btn-solid">
            {copied ? "Copiado" : "Copiar top 10"}
          </button>
        </div>
        {ranked.length === 0 ? (
          <p className="mt-4 text-sm text-mute">Todavía no hay notas.</p>
        ) : (
          <ol className="mt-4 space-y-2">
            {ranked.slice(0, 10).map((row, index) => (
              <li key={row.slug} className="flex items-baseline gap-3">
                <span className="w-6 font-serif text-xl text-gold">{index + 1}</span>
                <Link href={`/cancion/${row.slug}`} className="font-serif text-lg hover:text-gold">
                  {row.title}
                </Link>
                <span className="ml-auto tabular-nums text-mute">{scores[row.slug]}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label htmlFor="disco" className="text-xs uppercase tracking-[0.16em] text-mute">
          Disco
        </label>
          <select
          id="disco"
          value={album}
          onChange={(event) => setAlbum(event.target.value)}
          className="h-10 border border-line bg-paper px-3 text-sm outline-none focus:border-gold"
        >
          <option value="todos">Todos</option>
          {albums.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <p className="text-sm text-mute">
          {Object.keys(scores).length} con nota · {rows.length} temas
        </p>
      </div>

      <ol className="mt-4 border-y border-line">
        {visible.map((row) => (
          <li
            key={row.slug}
            className="grid items-center gap-4 border-b border-line py-3.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div className="min-w-0">
              <Link href={`/cancion/${row.slug}`} className="font-serif text-xl hover:text-gold">
                {row.title}
              </Link>
              <p className="mt-1 text-sm text-mute">
                <Link href={`/disco/${row.albumSlug}`} className="hover:text-ink">
                  {row.album}
                </Link>
                {" · "}
                {row.year}
                {" · "}
                <a href={row.spotify} target="_blank" rel="noreferrer" className="text-gold hover:text-ink">
                  Escuchar
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-1" role="group" aria-label={`Nota de ${row.title}`}>
              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => {
                const active = scores[row.slug] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setScore(row.slug, value)}
                    className={`h-8 w-8 text-sm tabular-nums transition ${
                      active
                        ? "bg-gold text-bg"
                        : "border border-line text-mute hover:border-gold hover:text-ink"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
