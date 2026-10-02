import type { Metadata } from "next";
import { RankingBoard } from "@/components/ranking";
import { PageHeader } from "@/components/site";
import { albums, isListed, listenUrl, songAlbum, songs } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Ranking",
};

export default function RankingPage() {
  const rows = songs.filter(isListed).map((song) => {
    const album = songAlbum(song);
    return {
      slug: song.slug,
      title: song.title,
      album: album.title,
      albumSlug: album.slug,
      year: album.year,
      spotify: listenUrl(song).spotify,
    };
  });

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <PageHeader title="Ranking">
        Nota de 1 a 10 mientras escuchas. El top queda en este navegador.
      </PageHeader>
      <div className="mt-10">
        <RankingBoard rows={rows} albums={albums.map((album) => album.title)} />
      </div>
    </main>
  );
}
