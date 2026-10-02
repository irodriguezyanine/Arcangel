import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryLinks } from "@/components/site";
import {
  albumNeighbors,
  albumSongs,
  getSong,
  kindLabel,
  listenUrl,
  relatedSongs,
  songAlbum,
  songs,
} from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return songs.map((song) => ({ slug: song.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) return { title: "Canción" };
  const album = songAlbum(song);
  return {
    title: song.title,
    description: song.note ?? `${song.title}, de ${album.title} (${album.year}).`,
  };
}

export default async function SongPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) notFound();
  const album = songAlbum(song);
  const links = listenUrl(song);
  const tracks = albumSongs(album.slug);
  const { prev, next } = albumNeighbors(song);
  const related = relatedSongs(song);

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-14">
      <article>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">
          <Link href="/discografia" className="transition hover:text-ink">
            Discos
          </Link>
          {" / "}
          <Link href={`/disco/${album.slug}`} className="transition hover:text-ink">
            {album.title}
          </Link>
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-none tracking-tight md:text-7xl">
          {song.title}
        </h1>
        <p className="mt-4 text-sm text-mute">
          {album.year} · {kindLabel(album.kind)} · {album.label} · tema{" "}
          {String(song.track).padStart(2, "0")} de {tracks.length}
        </p>
        <div className="mt-6">
          <CategoryLinks song={song} />
        </div>

        {song.note ? (
          <p className="mt-10 max-w-2xl font-serif text-2xl italic leading-9">{song.note}</p>
        ) : (
          <p className="mt-10 max-w-2xl text-mute">Lectura pendiente.</p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={links.spotify}
            target="_blank"
            rel="noreferrer"
            className="border border-gold px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-bg"
          >
            Spotify
          </a>
          <a
            href={links.youtube}
            target="_blank"
            rel="noreferrer"
            className="border border-line px-4 py-2 text-xs uppercase tracking-[0.16em] text-ink transition hover:border-gold hover:text-gold"
          >
            YouTube
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/cancion/${prev.slug}`}
              className="border border-line p-4 transition hover:border-gold"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-mute">Anterior</span>
              <span className="mt-2 block font-serif text-xl">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/cancion/${next.slug}`}
              className="border border-line p-4 transition hover:border-gold sm:text-right"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-mute">Siguiente</span>
              <span className="mt-2 block font-serif text-xl">{next.title}</span>
            </Link>
          ) : null}
        </div>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-serif text-2xl">Del mismo tema</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {related.map((item) => {
                const itemAlbum = songAlbum(item);
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/cancion/${item.slug}`}
                      className="flex items-baseline justify-between gap-4 py-3 transition hover:text-gold"
                    >
                      <span className="font-serif text-lg">{item.title}</span>
                      <span className="text-sm text-mute">{itemAlbum.year}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </article>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs uppercase tracking-[0.18em] text-gold">{album.title}</p>
        <ol className="mt-3 max-h-[70vh] overflow-y-auto border border-line">
          {tracks.map((track) => {
            const current = track.slug === song.slug;
            return (
              <li key={track.slug} className={current ? "bg-paper" : undefined}>
                <Link
                  href={`/cancion/${track.slug}`}
                  className={`flex gap-3 px-3 py-2 text-sm transition hover:text-gold ${
                    current ? "text-gold" : "text-ink"
                  }`}
                  aria-current={current ? "page" : undefined}
                >
                  <span className="w-5 tabular-nums text-mute">
                    {String(track.track).padStart(2, "0")}
                  </span>
                  <span>{track.title}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </aside>
    </main>
  );
}
