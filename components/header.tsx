"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

type NavAlbum = { slug: string; title: string; year: number };
type NavCategory = { id: string; name: string; count: number };

type Menu = "discos" | "temas" | "movil" | null;

export function SiteHeader({
  albums,
  categories,
}: {
  albums: NavAlbum[];
  categories: NavCategory[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Menu>(null);
  const [scrolled, setScrolled] = useState(false);
  const openedAt = useRef(0);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggle(menu: Exclude<Menu, null>) {
    setOpen((current) => (current === menu ? null : menu));
  }

  function reveal(menu: "discos" | "temas") {
    openedAt.current = Date.now();
    setOpen(menu);
  }

  function clickMenu(menu: "discos" | "temas") {
    if (Date.now() - openedAt.current < 450) return;
    toggle(menu);
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.35)]" : ""
      }`}
      onMouseLeave={() => {
        if (open === "discos" || open === "temas") setOpen(null);
      }}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-bg"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link href="/" className="leading-none">
          <span className="block font-serif text-2xl tracking-tight">Arcángel</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-gold">
            La Maravilla
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Principal">
          <MenuButton
            label="Discos"
            expanded={open === "discos"}
            active={pathname.startsWith("/disco")}
            onClick={() => clickMenu("discos")}
            onOpen={() => reveal("discos")}
          />
          <MenuButton
            label="Temas"
            expanded={open === "temas"}
            active={pathname.startsWith("/categoria")}
            onClick={() => clickMenu("temas")}
            onOpen={() => reveal("temas")}
          />
          <NavLink href="/tops" active={pathname === "/tops"}>
            Tops
          </NavLink>
        </nav>

        <form action="/buscar" className="ml-auto hidden md:flex">
          <label className="sr-only" htmlFor="q">
            Buscar canción
          </label>
          <input
            id="q"
            name="q"
            placeholder="Canción o disco"
            className="w-44 border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition placeholder:text-mute focus:border-gold"
          />
          <button
            type="submit"
            className="border border-l-0 border-line px-3 py-2 text-xs uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-bg"
          >
            Buscar
          </button>
        </form>

        <button
          type="button"
          className="ml-auto border border-line px-3 py-2 text-xs uppercase tracking-[0.16em] text-gold md:hidden"
          aria-expanded={open === "movil"}
          aria-controls="menu-movil"
          onClick={() => toggle("movil")}
        >
          {open === "movil" ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open === "discos" ? (
        <Mega label="Discos">
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...albums].reverse().map((album) => (
              <Link
                key={album.slug}
                href={`/disco/${album.slug}`}
                className="flex items-baseline justify-between gap-3 px-3 py-2 transition hover:bg-bg"
              >
                <span className="font-serif text-lg">{album.title}</span>
                <span className="text-xs tabular-nums text-mute">{album.year}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/discografia"
            className="mt-3 inline-block text-xs uppercase tracking-[0.16em] text-gold hover:text-ink"
          >
            Toda la discografía
          </Link>
        </Mega>
      ) : null}

      {open === "temas" ? (
        <Mega label="Temas">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="flex items-baseline justify-between border border-transparent px-3 py-3 transition hover:border-gold hover:bg-bg"
              >
                <span className="font-serif text-xl">{category.name}</span>
                <span className="text-xs tabular-nums text-gold">{category.count}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/categorias"
            className="mt-3 inline-block text-xs uppercase tracking-[0.16em] text-gold hover:text-ink"
          >
            Todos los temas
          </Link>
        </Mega>
      ) : null}

      {open === "movil" ? (
        <div id="menu-movil" className="menu-in max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-line md:hidden">
          <form action="/buscar" className="flex border-b border-line">
            <label className="sr-only" htmlFor="q-movil">
              Buscar canción
            </label>
            <input
              id="q-movil"
              name="q"
              placeholder="Canción o disco"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none"
            />
            <button type="submit" className="px-5 text-xs uppercase tracking-[0.16em] text-gold">
              Buscar
            </button>
          </form>
          <Link href="/tops" className="block border-b border-line px-5 py-4 font-serif text-2xl">
            Tops
          </Link>
          <p className="px-5 pt-4 text-xs uppercase tracking-[0.18em] text-gold">Discos</p>
          <div className="px-2 py-2">
            {[...albums].reverse().map((album) => (
              <Link
                key={album.slug}
                href={`/disco/${album.slug}`}
                className="flex items-baseline justify-between px-3 py-2"
              >
                <span>{album.title}</span>
                <span className="text-xs text-mute">{album.year}</span>
              </Link>
            ))}
          </div>
          <p className="px-5 pt-2 text-xs uppercase tracking-[0.18em] text-gold">Temas</p>
          <div className="px-2 py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="flex items-baseline justify-between px-3 py-2"
              >
                <span>{category.name}</span>
                <span className="text-xs text-gold">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MenuButton({
  label,
  expanded,
  active,
  onClick,
  onOpen,
}: {
  label: string;
  expanded: boolean;
  active: boolean;
  onClick: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onMouseEnter={onOpen}
      onClick={onClick}
      className={`px-3 py-2 text-sm transition ${
        expanded || active ? "text-gold" : "text-mute hover:text-ink"
      }`}
    >
      {label}
      <span className="ml-1 inline-block text-[10px]">{expanded ? "▴" : "▾"}</span>
    </button>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm transition ${active ? "text-gold" : "text-mute hover:text-ink"}`}
    >
      {children}
    </Link>
  );
}

function Mega({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="menu-in border-t border-line bg-paper" role="region" aria-label={label}>
      <div className="mx-auto max-w-6xl px-5 py-5">{children}</div>
    </div>
  );
}
