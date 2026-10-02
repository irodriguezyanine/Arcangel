import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryLinks } from "@/components/site";
import { getSong, listenUrl, songAlbum, songs } from "@/lib/catalog";

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

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-gold">
        <Link href={`/disco/${album.slug}`} className="hover:text-ink">
          {album.title}
        </Link>
        {" · "}
        {album.year}
        {" · "}
        {String(song.track).padStart(2, "0")}
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">{song.title}</h1>
      <div className="mt-6">
        <CategoryLinks song={song} />
      </div>
      {song.note ? (
        <p className="mt-10 max-w-2xl font-serif text-2xl italic leading-9 text-ink">{song.note}</p>
      ) : (
        <p className="mt-10 max-w-2xl text-mute">Lectura pendiente.</p>
      )}
      <div className="mt-10 flex gap-6 text-sm">
        <a href={links.spotify} className="text-gold hover:text-ink" target="_blank" rel="noreferrer">
          Spotify
        </a>
        <a href={links.youtube} className="text-gold hover:text-ink" target="_blank" rel="noreferrer">
          YouTube
        </a>
      </div>
    </main>
  );
}
