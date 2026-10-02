import Link from "next/link";
import {
  categoryName,
  kindLabel,
  songAlbum,
  type Album,
  type Song,
} from "@/lib/catalog";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4">
        <Link href="/" className="leading-none">
          <span className="block font-serif text-2xl tracking-tight">Arcángel</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-gold">
            La Maravilla
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-mute">
          <Link href="/discografia" className="hover:text-ink">
            Discos
          </Link>
          <Link href="/categorias" className="hover:text-ink">
            Temas
          </Link>
          <Link href="/tops" className="hover:text-ink">
            Tops
          </Link>
        </nav>
        <form action="/buscar" className="ml-auto flex">
          <label className="sr-only" htmlFor="q">
            Buscar canción
          </label>
          <input
            id="q"
            name="q"
            placeholder="Canción o disco"
            className="w-36 border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-mute focus:border-gold md:w-48"
          />
          <button
            type="submit"
            className="border border-line px-3 py-2 text-xs uppercase tracking-[0.16em] text-gold hover:border-gold"
          >
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
}

export function SiteFooter({ note }: { note: string }) {
  return (
    <footer className="mt-auto border-t border-line">
      <p className="mx-auto max-w-6xl px-5 py-8 text-sm leading-6 text-mute">
        {note}
      </p>
    </footer>
  );
}

export function CategoryLinks({ song }: { song: Song }) {
  if (song.categories.length === 0) {
    return <span className="text-xs uppercase tracking-[0.16em] text-mute">Sin tema</span>;
  }
  return (
    <span className="flex flex-wrap gap-2">
      {song.categories.map((id) => (
        <Link
          key={id}
          href={`/categoria/${id}`}
          className="text-xs uppercase tracking-[0.16em] text-gold hover:text-ink"
        >
          {categoryName(id)}
        </Link>
      ))}
    </span>
  );
}

export function SongIndex({
  items,
  showAlbum = false,
}: {
  items: Song[];
  showAlbum?: boolean;
}) {
  return (
    <ol className="border-y border-line">
      {items.map((song) => {
        const album = songAlbum(song);
        return (
          <li
            key={song.slug}
            className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-line py-3 last:border-b-0 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto]"
          >
            <span className="tabular-nums text-mute">
              {showAlbum ? album.year : String(song.track).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <Link href={`/cancion/${song.slug}`} className="font-serif text-xl hover:text-gold">
                {song.title}
              </Link>
              {song.version ? (
                <span className="ml-2 text-xs uppercase tracking-[0.16em] text-mute">Versión</span>
              ) : null}
              {song.skit ? (
                <span className="ml-2 text-xs uppercase tracking-[0.16em] text-mute">Interludio</span>
              ) : null}
              {showAlbum ? (
                <p className="mt-1 text-sm text-mute">
                  <Link href={`/disco/${album.slug}`} className="hover:text-ink">
                    {album.title}
                  </Link>
                </p>
              ) : null}
            </div>
            <div className="col-start-2 sm:col-start-auto">
              <CategoryLinks song={song} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function AlbumCard({ album, count }: { album: Album; count: number }) {
  return (
    <Link
      href={`/disco/${album.slug}`}
      className="block border border-line bg-paper p-5 hover:border-gold"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-gold">
        {album.year} · {kindLabel(album.kind)}
      </p>
      <h2 className="mt-3 font-serif text-3xl leading-tight">{album.title}</h2>
      <p className="mt-3 text-sm leading-6 text-mute">{album.blurb}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-mute">
        {count} temas · {album.label}
      </p>
    </Link>
  );
}
