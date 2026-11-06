export default function WhyChooseBookNook() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-sm font-semibold text-emerald-700">
            WHY BOOKNOOK?
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Your Reading Journey Starts Here
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            We make discovering, borrowing, and enjoying books simple.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-3 md:gap-7">
          {[
            {
              icon: "📚",
              title: "Vast Collection",
              description:
                "Explore books from different categories, authors, and subjects.",
            },
            {
              icon: "🔖",
              title: "Easy Borrowing",
              description:
                "Find your favorite book and borrow available copies with ease.",
            },
            {
              icon: "🌱",
              title: "Grow Your Knowledge",
              description:
                "Discover new ideas and develop a lifelong reading habit.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-[#faf9f6] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="text-4xl sm:text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900 sm:text-xl">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}