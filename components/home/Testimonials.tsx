"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahman Ahmed",
    role: "Business Owner",
    location: "Gulshan, Dhaka",
    rating: 5,
    text: "GhorBazar made finding our family home incredibly easy. The verified listings gave us confidence, and the AI matching saved us hours of searching. Highly recommended!",
    avatar: "RA",
  },
  {
    name: "Fatima Khan",
    role: "Software Engineer",
    location: "Banani, Dhaka",
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. GhorBazar's support team guided me through every step. Found my dream apartment within a week!",
    avatar: "FK",
  },
  {
    name: "Karim Hassan",
    role: "NRI Investor",
    location: "Sylhet",
    rating: 5,
    text: "Living abroad, I needed a trustworthy platform to invest in property back home. GhorBazar's verified agents and secure process made it seamless.",
    avatar: "KH",
  },
  {
    name: "Nusrat Jahan",
    role: "Doctor",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    text: "The instant alerts feature is fantastic! I got notified about a price drop on a property I was watching and saved 5 lakh. Thank you, GhorBazar!",
    avatar: "NJ",
  },
  {
    name: "Arif Rahman",
    role: "Entrepreneur",
    location: "Chattogram",
    rating: 5,
    text: "Listed my commercial property and received genuine inquiries within hours. The platform attracts serious buyers. Sold my property in just 2 weeks!",
    avatar: "AR",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 md:py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what thousands of happy
            homeowners and property seekers have to say about GhorBazar.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10 relative">
                    <Quote
                      size={48}
                      className="absolute top-6 right-6 text-primary-100"
                    />

                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="fill-accent-400 text-accent-400"
                        />
                      ))}
                    </div>

                    <p className="text-secondary-700 text-lg leading-relaxed mb-8 relative z-10">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-lg">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-secondary-900">
                          {testimonial.name}
                        </p>
                        <p className="text-secondary-500 text-sm">
                          {testimonial.role} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-secondary-600 hover:text-primary-600"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentIndex === index
                      ? "bg-primary-600"
                      : "bg-secondary-300 hover:bg-secondary-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-secondary-600 hover:text-primary-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
