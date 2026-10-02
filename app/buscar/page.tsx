import type { Metadata } from "next";
import { PageHeader, SongIndex } from "@/components/site";
import { searchSongs } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Buscar",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const items = searchSongs(query);

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <PageHeader title="Buscar" />
      <form action="/buscar" className="mt-8">
        <label className="sr-only" htmlFor="buscar-q">
          Buscar
        </label>
        <div className="flex max-w-xl">
          <input
            id="buscar-q"
            name="q"
            defaultValue={query}
            placeholder="Canción, disco o tema"
            className="h-12 min-w-0 flex-1 border border-line bg-paper px-4 text-lg outline-none placeholder:text-mute focus:border-gold"
          />
          <button type="submit" className="btn btn-solid -ml-px h-12">
            Buscar
          </button>
        </div>
      </form>
      {query ? (
        <div className="mt-10">
          <p className="mb-4 text-sm text-mute">
            {items.length} {items.length === 1 ? "resultado" : "resultados"}
          </p>
          {items.length > 0 ? <SongIndex items={items} showAlbum /> : null}
        </div>
      ) : null}
    </main>
  );
}
