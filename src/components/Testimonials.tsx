
const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Regular Reader",
    initial: "SA",
    review:
      "BookNook has made discovering new books so easy. I love the clean design and the amazing collection of books!",
    rating: 5,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Rakib Hasan",
    role: "Book Lover",
    initial: "RH",
    review:
      "A wonderful platform for book lovers. The borrowing experience is simple, and I can easily find books I enjoy.",
    rating: 5,
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    initial: "NJ",
    review:
      "I really appreciate how organized everything is. BookNook helps me explore different categories and build my reading habit.",
    rating: 5,
    color: "bg-sky-100 text-sky-700",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Reader Experiences
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Readers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover what our readers think about their experience
            with BookNook.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1 text-lg text-amber-400">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>

              {/* Review */}
              <p className="min-h-24 text-sm leading-7 text-gray-600">
                "{item.review}"
              </p>

              <div className="my-6 h-px bg-gray-100" />

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${item.color}`}
                >
                  {item.initial}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
