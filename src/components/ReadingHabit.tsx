import Image from "next/image";
import Link from "next/link";

export default function ReadingHabit() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-10 md:py-20">
      <div>
        <p className="text-sm font-semibold text-emerald-700">
          BUILD A BETTER HABIT
        </p>

        <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
          A Little Reading Every Day Makes a Big Difference.
        </h2>

        <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
          Reading helps you discover new perspectives, improve your
          imagination, build vocabulary, and understand the world around you.
          Start with one book and make reading part of your daily life.
        </p>

        <Link
          href="/books"
          className="mt-7 inline-block rounded-lg bg-emerald-800 px-7 py-3 font-semibold text-white transition hover:bg-emerald-900"
        >
          Start Reading
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <div className="overflow-hidden rounded-2xl">
  <Image
  src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1000"
  alt="Books and reading"
  width={1000}
  height={700}
  className="h-56 w-full object-cover sm:h-72 md:h-350px"
/>
</div>
      </div>
    </section>
  );
}