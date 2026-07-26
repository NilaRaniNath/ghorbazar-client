"use client";

import Link from "next/link";
import Image from "next/image";
import { Building, Home, Store, TreePine, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Apartments",
    description: "Modern living spaces in prime locations across Dhaka and Chattogram",
    icon: Building,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    count: "250+",
    href: "/explore?type=apartment",
    color: "from-primary-500 to-primary-600",
  },
  {
    title: "Family Houses",
    description: "Spacious homes perfect for families seeking comfort and privacy",
    icon: Home,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
    count: "180+",
    href: "/explore?type=house",
    color: "from-secondary-600 to-secondary-700",
  },
  {
    title: "Commercial",
    description: "Office spaces, shops, and commercial properties for your business",
    icon: Store,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
    count: "120+",
    href: "/explore?type=commercial",
    color: "from-accent-500 to-accent-600",
  },
  {
    title: "Land & Plots",
    description: "Investment opportunities with premium land and plots in growing areas",
    icon: TreePine,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    count: "90+",
    href: "/explore?type=land",
    color: "from-primary-600 to-primary-700",
  },
];

export function PropertyCategories() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            Browse by Category
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Explore Property Types
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            From modern apartments to spacious family homes, find the perfect property
            type that matches your lifestyle and investment goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.count} Properties</span>
                  <span className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
