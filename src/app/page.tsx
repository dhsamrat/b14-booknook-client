import Banner from "@/components/Banner";
import FeaturedAuthors from "@/components/FeaturedAuthors";
import ReadingHabit from "@/components/ReadingHabit";
import Testimonials from "@/components/Testimonials";
import WhyChooseBookNook from "@/components/WhyChooseBookNook";

export default function Home() {
  return (
    <div>
      <main>
      {/* Hero Section */}
      <Banner />

      {/* Featured Books */}

      <WhyChooseBookNook />
      

      {/* Other Sections */}

      <FeaturedAuthors />
      
      <ReadingHabit />

      <Testimonials />
      
    </main>
    </div>
  );
}
