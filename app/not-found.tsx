import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-24">
      <h1 className="font-serif text-5xl">No está en el archivo</h1>
      <Link href="/" className="mt-6 inline-block text-gold hover:text-ink">
        Volver al inicio
      </Link>
    </main>
  );
}
