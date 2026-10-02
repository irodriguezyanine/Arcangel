import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlbumPlate, CategoryLinks } from "@/components/site";
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
    <main className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16 lg:py-16">
      <article>
        <div className="flex items-center gap-5">
          <AlbumPlate
            album={album}
            mark={String(song.track).padStart(2, "0")}
            className="h-28 w-24 shrink-0"
          />
          <div className="min-w-0 pb-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              <Link href="/discografia" className="transition hover:text-ink">
                Discos
              </Link>
              <span className="px-2 text-mute">/</span>
              <Link href={`/disco/${album.slug}`} className="transition hover:text-ink">
                {album.title}
              </Link>
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight text-balance md:text-6xl">
              {song.title}
            </h1>
          </div>
        </div>
        <p className="mt-5 text-sm text-mute">
          {album.year} · {kindLabel(album.kind)} · {album.label} · tema{" "}
          {String(song.track).padStart(2, "0")} de {tracks.length}
        </p>
        <div className="mt-5">
          <CategoryLinks song={song} />
        </div>

        {song.note ? (
          <p className="mt-8 max-w-2xl border-l border-gold pl-5 font-serif text-2xl italic leading-9">
            {song.note}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={links.spotify} target="_blank" rel="noreferrer" className="btn btn-solid">
            Spotify
          </a>
          <a href={links.youtube} target="_blank" rel="noreferrer" className="btn btn-line">
            YouTube
          </a>
        </div>

        <nav
          className={`mt-10 grid border border-line ${prev && next ? "sm:grid-cols-2" : ""}`}
          aria-label="En el disco"
        >
          {prev ? (
            <Link
              href={`/cancion/${prev.slug}`}
              className={`px-4 py-4 transition hover:bg-paper ${
                next ? "border-b border-line sm:border-r sm:border-b-0" : ""
              }`}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
                Anterior
              </span>
              <span className="mt-1 block font-serif text-xl tracking-tight">{prev.title}</span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/cancion/${next.slug}`}
              className="px-4 py-4 text-right transition hover:bg-paper"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
                Siguiente
              </span>
              <span className="mt-1 block font-serif text-xl tracking-tight">{next.title}</span>
            </Link>
          ) : null}
        </nav>

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

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">{album.title}</p>
        <ol className="tracklist mt-3 max-h-[70vh] overflow-y-auto border border-line bg-paper/40">
          {tracks.map((track) => {
            const current = track.slug === song.slug;
            return (
              <li key={track.slug}>
                <Link
                  href={`/cancion/${track.slug}`}
                  className={`relative flex gap-3 px-3 py-2.5 text-sm transition hover:bg-paper hover:text-gold ${
                    current ? "bg-paper text-gold" : "text-ink"
                  }`}
                  aria-current={current ? "page" : undefined}
                >
                  {current ? <span className="absolute inset-y-0 left-0 w-0.5 bg-gold" /> : null}
                  <span className="w-5 shrink-0 tabular-nums text-mute">
                    {String(track.track).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">{track.title}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </aside>
    </main>
  );
}
