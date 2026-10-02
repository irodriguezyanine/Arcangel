import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SongIndex } from "@/components/site";
import { albumSongs, albums, getAlbum, kindLabel } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) return { title: "Disco" };
  return { title: album.title, description: album.blurb };
}

export default async function AlbumPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) notFound();
  const tracks = albumSongs(album.slug);

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-gold">
        {album.year} · {kindLabel(album.kind)} · {album.label}
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
        {album.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-mute">{album.blurb}</p>
      <div className="mt-10">
        <SongIndex items={tracks} />
      </div>
    </main>
  );
}
