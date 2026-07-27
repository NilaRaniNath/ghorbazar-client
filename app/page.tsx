import { Hero } from "@/components/home/Hero";
import { PropertyCategories } from "@/components/home/PropertyCategories";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { RecommendationSection } from "@/components/home/RecommendationSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Statistics } from "@/components/home/Statistics";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PropertyCategories />
      <FeaturedListings />
      <RecommendationSection />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
