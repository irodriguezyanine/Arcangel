import type { Metadata } from "next";
import { AlbumCover, PageHeader } from "@/components/site";
import { albumSongs, albums } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Discografía",
};

export default function DiscografiaPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <PageHeader kicker="2008 — 2026" title="Discografía" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <AlbumCover key={album.slug} album={album} count={albumSongs(album.slug).length} />
        ))}
      </div>
    </main>
  );
}
