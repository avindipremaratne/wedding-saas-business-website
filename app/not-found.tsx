import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-mist px-6 py-24 text-center text-ink">
      <h1 className="mb-4 font-serif text-5xl font-light">Page not found</h1>
      <p className="mb-10 max-w-md font-sans font-light text-charcoal">
        We couldn&apos;t find that page.
      </p>
      <Link href="/" className="font-sans text-xs uppercase tracking-[0.2em] text-ink underline underline-offset-4 hover:text-taupe">
        Back to home
      </Link>
    </main>
  );
}
