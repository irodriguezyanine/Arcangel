import raw from "@/data/catalog.json";

export type CategoryId =
  | "amor"
  | "desamor"
  | "perreo"
  | "bichos"
  | "calle"
  | "flex"
  | "introspeccion";

export type Album = {
  slug: string;
  title: string;
  year: number;
  released: string;
  kind: string;
  label: string;
  blurb: string;
};

export type Song = {
  slug: string;
  title: string;
  album: string;
  track: number;
  categories: CategoryId[];
  version?: boolean;
  skit?: boolean;
  note?: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  line: string;
};

export type Top = {
  id: CategoryId;
  title: string;
  slugs: string[];
};

type Catalog = {
  artist: {
    name: string;
    legalName: string;
    aka: string;
    born: string;
  };
  source: string;
  categories: Category[];
  albums: Album[];
  songs: Song[];
  tops: Top[];
};

const catalog = raw as Catalog;

export const artist = catalog.artist;
export const sourceNote = catalog.source;
export const categories = catalog.categories;
export const albums = catalog.albums;
export const songs = catalog.songs;
export const tops = catalog.tops;

const albumBySlug = new Map(albums.map((album) => [album.slug, album]));
const songBySlug = new Map(songs.map((song) => [song.slug, song]));
const categoryById = new Map(categories.map((category) => [category.id, category]));

export function getAlbum(slug: string) {
  return albumBySlug.get(slug);
}

export function getSong(slug: string) {
  return songBySlug.get(slug);
}

export function getCategory(id: string) {
  return categoryById.get(id as CategoryId);
}

export function albumSongs(slug: string) {
  return songs
    .filter((song) => song.album === slug)
    .sort((a, b) => a.track - b.track);
}

export function isListed(song: Song) {
  return !song.version && !song.skit;
}

export function categorySongs(id: CategoryId) {
  return songs.filter(
    (song) => isListed(song) && song.categories.includes(id),
  );
}

export function unclassifiedSongs() {
  return songs.filter((song) => isListed(song) && song.categories.length === 0);
}

export function songAlbum(song: Song) {
  const album = albumBySlug.get(song.album);
  if (!album) throw new Error(`Disco sin ficha: ${song.album}`);
  return album;
}

export function categoryName(id: CategoryId) {
  return categoryById.get(id)?.name ?? id;
}

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function searchSongs(query: string) {
  const needle = fold(query.trim());
  if (!needle) return [];
  return songs.filter((song) => {
    const album = songAlbum(song);
    return (
      fold(song.title).includes(needle) ||
      fold(album.title).includes(needle) ||
      song.categories.some((id) => fold(categoryName(id)).includes(needle))
    );
  });
}

export function listenUrl(song: Song) {
  const query = encodeURIComponent(`Arcángel ${song.title}`);
  return {
    spotify: `https://open.spotify.com/search/${query}`,
    youtube: `https://www.youtube.com/results?search_query=${query}`,
    letra: `https://genius.com/search?q=${query}`,
  };
}

export function kindLabel(kind: string) {
  if (kind === "colaborativo") return "Colaborativo";
  return "Estudio";
}

export function albumNeighbors(song: Song) {
  const list = albumSongs(song.album);
  const index = list.findIndex((item) => item.slug === song.slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function relatedSongs(song: Song, limit = 6) {
  if (song.categories.length === 0) return [];
  return songs
    .filter(
      (item) =>
        item.slug !== song.slug &&
        isListed(item) &&
        item.categories.some((id) => song.categories.includes(id)),
    )
    .slice(0, limit);
}
