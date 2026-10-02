import Link from "next/link";
import type { ReactNode } from "react";
import {
  categoryName,
  kindLabel,
  songAlbum,
  type Album,
  type Song,
} from "@/lib/catalog";

const plateTone: Record<string, [string, string]> = {
  "el-fenomeno": ["#6a4320", "#16110c"],
  "sentimiento-elegancia-maldad": ["#3d3428", "#12100e"],
  "los-favoritos": ["#5a3a22", "#140f0c"],
  ares: ["#4a3824", "#100e0c"],
  "historias-de-un-capricornio": ["#2e3a34", "#101210"],
  "los-favoritos-2": ["#4e3420", "#14110e"],
  "los-favoritos-2-5": ["#3a3228", "#12100e"],
  "sr-santos": ["#243038", "#101214"],
  "sentimiento-elegancia-mas-maldad": ["#3a3024", "#120f0c"],
  "papi-arca": ["#5c3d28", "#16120e"],
  "sr-santos-2": ["#2a3330", "#101312"],
  "la-8va-maravilla": ["#6b4e28", "#16130e"],
};

export function AlbumPlate({
  album,
  mark,
  className = "",
}: {
  album: Pick<Album, "slug" | "year">;
  mark?: string;
  className?: string;
}) {
  const [from, to] = plateTone[album.slug] ?? ["#3a3126", "#14110e"];
  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 72%)` }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(231,201,138,0.32), transparent 46%)",
        }}
      />
      <span className="absolute inset-y-0 left-0 w-px bg-gold/60" />
      {mark ? (
        <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
          {album.year}
        </span>
      ) : null}
      <span className="absolute bottom-3 left-3 font-serif text-4xl leading-none tracking-tight text-ink">
        {mark ?? album.year}
      </span>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      {kicker ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">{kicker}</p>
      ) : null}
      <h1
        className={`font-serif text-5xl tracking-tight text-balance md:text-6xl ${kicker ? "mt-3" : ""}`}
      >
        {title}
      </h1>
      {children ? <div className="mt-4 text-lg leading-8 text-mute">{children}</div> : null}
    </header>
  );
}

export function SiteFooter({ note }: { note: string }) {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">Colaboradores</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Ignacio Rodríguez",
              "Daniel Zaror",
              "Ignacio Cuevas",
              "Maximiliano Gomez",
            ].map((name) => (
              <li key={name} className="font-serif text-2xl leading-tight tracking-tight">
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-mute">Jugadores de Alamicos Reggeton Futbol Club</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[12rem_minmax(0,1fr)] md:items-end">
        <div>
          <p className="font-serif text-2xl leading-none tracking-tight">Arcángel</p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
            La Maravilla
          </p>
        </div>
        <div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute md:justify-end" aria-label="Pie">
            <Link href="/discografia" className="transition hover:text-ink">
              Discos
            </Link>
            <Link href="/categorias" className="transition hover:text-ink">
              Temas
            </Link>
            <Link href="/tops" className="transition hover:text-ink">
              Tops
            </Link>
            <Link href="/ranking" className="transition hover:text-ink">
              Ranking
            </Link>
            <Link href="/buscar" className="transition hover:text-ink">
              Buscar
            </Link>
          </nav>
          <p className="mt-3 max-w-md text-sm leading-6 text-mute md:ml-auto md:text-right">{note}</p>
        </div>
      </div>
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
          className="bg-gold/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-bg"
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
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-4 border-b border-line px-1 py-3.5 transition-colors last:border-b-0 hover:bg-paper sm:grid-cols-[2.75rem_minmax(0,1fr)_auto]"
          >
            <span className="tabular-nums text-mute">
              {showAlbum ? album.year : String(song.track).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <Link href={`/cancion/${song.slug}`} className="font-serif text-xl transition hover:text-gold">
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
      className="group grid overflow-hidden border border-line bg-paper transition duration-200 hover:border-gold sm:grid-cols-[9.5rem_minmax(0,1fr)]"
    >
      <AlbumPlate album={album} className="aspect-[5/3] sm:aspect-auto sm:h-full" />
      <div className="flex flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
          {kindLabel(album.kind)} · {album.label}
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight transition group-hover:text-gold">
          {album.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-mute">{album.blurb}</p>
        <p className="mt-auto pt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
          {count} temas
        </p>
      </div>
    </Link>
  );
}

export function AlbumCover({ album, count }: { album: Album; count: number }) {
  return (
    <Link
      href={`/disco/${album.slug}`}
      className="group block overflow-hidden border border-line bg-paper transition duration-200 hover:-translate-y-0.5 hover:border-gold"
    >
      <AlbumPlate album={album} className="aspect-[5/4]" />
      <div className="p-4">
        <h2 className="font-serif text-2xl leading-tight tracking-tight transition group-hover:text-gold">
          {album.title}
        </h2>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
          {count} temas · {album.label}
        </p>
      </div>
    </Link>
  );
}
