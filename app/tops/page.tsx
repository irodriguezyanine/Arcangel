import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site";
import { getCategory, getSong, songAlbum, tops } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Tops",
};

export default function TopsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <PageHeader title="Tops">
        Selección editorial dentro de cada tema. El orden es de lectura, no de streams.
      </PageHeader>
      <div className="mt-12 space-y-14">
        {tops.map((top) => {
          const category = getCategory(top.id);
          return (
            <section key={top.id}>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-3xl">{top.title}</h2>
                {category ? (
                  <Link
                    href={`/categoria/${category.id}`}
                    className="text-xs uppercase tracking-[0.16em] text-gold"
                  >
                    {category.name}
                  </Link>
                ) : null}
              </div>
              <ol className="border-y border-line">
                {top.slugs.map((slug, index) => {
                  const song = getSong(slug);
                  if (!song) return null;
                  const album = songAlbum(song);
                  return (
                    <li
                      key={slug}
                      className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-line py-4 last:border-b-0 sm:grid-cols-[2rem_minmax(0,1fr)_auto]"
                    >
                      <span className="font-serif text-2xl text-gold">{index + 1}</span>
                      <div>
                        <Link
                          href={`/cancion/${song.slug}`}
                          className="font-serif text-2xl hover:text-gold"
                        >
                          {song.title}
                        </Link>
                        {song.note ? (
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{song.note}</p>
                        ) : null}
                      </div>
                      <Link
                        href={`/disco/${album.slug}`}
                        className="text-sm text-mute hover:text-ink sm:text-right"
                      >
                        {album.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </main>
  );
}
