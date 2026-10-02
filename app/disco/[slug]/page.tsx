import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlbumPlate, PageHeader, SongIndex } from "@/components/site";
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
      <div className="grid items-end gap-8 md:grid-cols-[11rem_minmax(0,1fr)]">
        <AlbumPlate album={album} className="aspect-[4/5] w-full max-w-44" />
        <PageHeader kicker={`${album.year} · ${kindLabel(album.kind)} · ${album.label}`} title={album.title}>
          {album.blurb}
        </PageHeader>
      </div>
      <div className="mt-10">
        <SongIndex items={tracks} />
      </div>
    </main>
  );
}
