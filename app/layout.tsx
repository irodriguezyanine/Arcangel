import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site";
import { sourceNote } from "@/lib/catalog";
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
        <SiteHeader />
        {children}
        <SiteFooter note={sourceNote} />
      </body>
    </html>
  );
}
