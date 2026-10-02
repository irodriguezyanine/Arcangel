import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/site";
import { albums, categories, categorySongs, sourceNote } from "@/lib/catalog";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: {
    default: "Arcángel · La Maravilla",
    template: "%s · Arcángel",
  },
  description:
    "Archivo editorial de la discografía de Arcángel: temas, tops y categorías. Sin letras.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${newsreader.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader
          albums={albums.map((album) => ({
            slug: album.slug,
            title: album.title,
            year: album.year,
          }))}
          categories={categories.map((category) => ({
            id: category.id,
            name: category.name,
            count: categorySongs(category.id).length,
          }))}
        />
        <div id="contenido" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter note={sourceNote} />
      </body>
    </html>
  );
}
