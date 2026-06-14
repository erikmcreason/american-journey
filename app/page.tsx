import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white">
      <h1 className="text-6xl font-bold mb-6">
        The American Journey
      </h1>

      <p className="text-xl max-w-2xl text-center px-8">
        Helping immigrants successfully navigate assimilation,
        opportunity, citizenship, and prosperity in America.
      </p>

      <Link
        href="/journey"
        className="mt-8 px-6 py-3 bg-white text-blue-950 rounded-lg font-semibold"
      >
        Begin Your Journey
      </Link>
    </main>
  );
}