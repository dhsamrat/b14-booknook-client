
import Image from "next/image";

const authors = [
  {
    name: "Rabindranath Tagore",
    image: "/images/authors/rabindranath-tagore.jpg",
    country: "Indian Bengali Writer",
    books: "Gitanjali, The Home and the World",
    color: "from-emerald-100 to-teal-200",
  },
  {
    name: "Humayun Ahmed",
    image: "/images/authors/humayun-ahmed.jpg",
    country: "Bangladeshi Novelist",
    books: "Nondito Noroke, Himu",
    color: "from-amber-100 to-orange-200",
  },
  {
    name: "George Orwell",
    image: "/images/authors/george-orwell.jpg",
    country: "English Novelist",
    books: "1984, Animal Farm",
    color: "from-sky-100 to-blue-200",
  },
  {
    name: "Jane Austen",
    image: "/images/authors/jane-austen.jpg",
    country: "English Novelist",
    books: "Pride and Prejudice, Emma",
    color: "from-rose-100 to-pink-200",
  },
];

const FeaturedAuthors = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Meet the Writers
        </span>

        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Featured Authors
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Discover the brilliant minds behind the stories and books
          that inspire readers around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((author) => (
          <div
            key={author.name}
            className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Author Image */}
            <div
              className={`relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-linear-to-br ${author.color} ring-4 ring-white shadow-md`}
            >
              <Image
                src={author.image}
                alt={author.name}
                fill
                sizes="112px"
                className="object-cover transition duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-6 text-lg font-bold text-gray-900 transition group-hover:text-emerald-700">
              {author.name}
            </h3>

            <p className="mt-2 text-sm font-medium text-emerald-700">
              {author.country}
            </p>

            <div className="my-5 h-px bg-gray-100" />

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Famous Works
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {author.books}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuthors;
