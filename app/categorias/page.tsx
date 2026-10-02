import type { Metadata } from "next";
import Link from "next/link";
import { categories, categorySongs, unclassifiedSongs } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Temas",
};

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-serif text-5xl">Temas</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categoria/${category.id}`}
            className="border border-line bg-paper p-6 hover:border-gold"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-3xl">{category.name}</h2>
              <span className="text-sm text-gold">{categorySongs(category.id).length}</span>
            </div>
            <p className="mt-3 text-mute">{category.line}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-mute">
        {unclassifiedSongs().length} temas siguen sin categoría.
      </p>
    </main>
  );
}
