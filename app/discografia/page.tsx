import type { Metadata } from "next";
import { AlbumCard } from "@/components/site";
import { albumSongs, albums } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Discografía",
};

export default function DiscografiaPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-gold">2008 — 2026</p>
      <h1 className="mt-3 font-serif text-5xl">Discografía</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {albums.map((album) => (
          <AlbumCard key={album.slug} album={album} count={albumSongs(album.slug).length} />
        ))}
      </div>
    </main>
  );
}
