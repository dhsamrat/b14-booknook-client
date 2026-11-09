"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    subtitle: "Discover Your Next Adventure",
    title: "A World of Stories Awaits You.",
    description:
      "Explore thousands of stories, ideas, and adventures. Find the book that inspires your next journey.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600",
  },
  {
    subtitle: "Read. Learn. Grow.",
    title: "Knowledge Begins With Reading.",
    description:
      "From science to history, discover books that expand your knowledge and open your mind.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600",
  },
  {
    subtitle: "Join Our Reading Community",
    title: "Share the Joy of Reading.",
    description:
      "Borrow your favorite books, explore new authors, and become part of our reading community.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=1600",
  },
];

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );

  useEffect(() => {
    if (!api) return;

    const updateSlide = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateSlide();

    api.on("select", updateSlide);
    api.on("reInit", updateSlide);

    return () => {
      api.off("select", updateSlide);
      api.off("reInit", updateSlide);
    };
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-3 pt-5 sm:px-5 sm:pt-8 md:px-6">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[autoplay]}
        className="relative overflow-hidden rounded-xl sm:rounded-2xl"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className="relative flex min-h-380px items-center justify-center bg-cover bg-center px-5 py-12 text-center sm:min-h-440px sm:px-8 md:min-h-560px md:justify-start md:px-16 md:text-left"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.25)), url('${slide.image}')`,
                }}
              >
                <div className="max-w-2xl text-white">
                  <span className="inline-block rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold sm:text-sm">
                    {slide.subtitle}
                  </span>

                  <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:mt-6 md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-200 sm:text-base md:mx-0 md:mt-5 md:text-lg md:leading-8">
                    {slide.description}
                  </p>

                  <Link
                    href="/books"
                    className="mt-6 inline-block rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:mt-8 sm:px-7 sm:py-4 sm:text-base"
                  >
                    Explore Books
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />

        {/* Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                current === index
                  ? "w-7 bg-emerald-500"
                  : "w-2.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;