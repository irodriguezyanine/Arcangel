import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SongIndex } from "@/components/site";
import { categories, categorySongs, getCategory, songAlbum } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Tema" };
  return { title: category.name, description: category.line };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = categorySongs(category.id).sort((a, b) => {
    const year = songAlbum(b).year - songAlbum(a).year;
    if (year !== 0) return year;
    return a.track - b.track;
  });

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-gold">{items.length} temas</p>
      <h1 className="mt-3 font-serif text-5xl">{category.name}</h1>
      <p className="mt-4 max-w-xl text-lg text-mute">{category.line}</p>
      <div className="mt-10">
        <SongIndex items={items} showAlbum />
      </div>
    </main>
  );
}
