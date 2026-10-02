import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/header";
import { PhotoCollage, SiteFooter } from "@/components/site";
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

const club =
  "Club de fans oficial de Alamicos Reggaeton Futbol club de Austin La marashhhh";

export const metadata: Metadata = {
  metadataBase: new URL("https://arcangel-pi.vercel.app"),
  title: {
    default: "Arcángel · La Maravilla",
    template: "%s · Arcángel",
  },
  description: club,
  openGraph: {
    title: "Arcángel · La Maravilla",
    description: club,
    url: "https://arcangel-pi.vercel.app",
    siteName: "Arcángel · La Maravilla",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcángel · La Maravilla",
    description: club,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${newsreader.variable} h-full`}>
      <body className="min-h-full antialiased">
        <PhotoCollage />
        <div className="relative z-10 flex min-h-full flex-col">
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
        </div>
      </body>
    </html>
  );
}
