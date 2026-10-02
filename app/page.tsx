import Link from "next/link";
import { AlbumCard, SongIndex } from "@/components/site";
import {
  albumSongs,
  albums,
  categories,
  categorySongs,
  getSong,
  songs,
  tops,
  unclassifiedSongs,
} from "@/lib/catalog";

export default function Home() {
  const listed = songs.filter((song) => !song.version && !song.skit);
  const classified = listed.filter((song) => song.categories.length > 0).length;
  const preview = tops.filter((top) =>
    ["amor", "perreo", "bichos"].includes(top.id),
  );

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.32em] text-gold">
            Austin Agustín Santos
          </p>
          <h1 className="mt-4 font-serif text-6xl tracking-tight md:text-8xl">Arcángel</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-mute">
            Archivo de La Maravilla. {listed.length} temas de {albums.length} discos,
            leídos por amor, perreo, bichos, calle y flex.
          </p>
          <p className="mt-4 text-sm text-mute">
            {classified} con tema · {unclassifiedSongs().length} sin clasificar
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl">Temas</h2>
          <Link href="/categorias" className="text-sm text-gold hover:text-ink">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.id}`}
              className="border border-line bg-paper p-4 hover:border-gold"
            >
              <p className="font-serif text-2xl">{category.name}</p>
              <p className="mt-2 text-sm leading-6 text-mute">{category.line}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-gold">
                {categorySongs(category.id).length}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-3">
          {preview.map((top) => (
            <div key={top.id}>
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="font-serif text-2xl">{top.title}</h2>
                <Link href="/tops" className="text-xs uppercase tracking-[0.16em] text-gold">
                  Tops
                </Link>
              </div>
              <ol className="space-y-3">
                {top.slugs.map((slug, index) => {
                  const song = getSong(slug);
                  if (!song) return null;
                  return (
                    <li key={slug} className="flex gap-3">
                      <span className="text-mute tabular-nums">{index + 1}</span>
                      <Link href={`/cancion/${song.slug}`} className="font-serif text-lg hover:text-gold">
                        {song.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl">Discos</h2>
          <Link href="/discografia" className="text-sm text-gold hover:text-ink">
            Discografía
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...albums].reverse().slice(0, 4).map((album) => (
            <AlbumCard key={album.slug} album={album} count={albumSongs(album.slug).length} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="mb-6 font-serif text-3xl">Con lectura</h2>
        <SongIndex
          showAlbum
          items={songs.filter((song) => song.note).slice(0, 8)}
        />
      </section>
    </main>
  );
}
