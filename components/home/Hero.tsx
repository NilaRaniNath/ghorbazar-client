"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Building, TreePine } from "lucide-react";

const quickLinks = [
  { label: "Gulshan", query: "Gulshan" },
  { label: "Banani", query: "Banani" },
  { label: "Dhanmondi", query: "Dhanmondi" },
  { label: "Uttara", query: "Uttara" },
  { label: "Mirpur", query: "Mirpur" },
];

const propertyTypes = [
  { value: "all", label: "All Types", icon: Home },
  { value: "apartment", label: "Apartment", icon: Building },
  { value: "house", label: "House", icon: Home },
  { value: "commercial", label: "Commercial", icon: Building },
  { value: "land", label: "Land", icon: TreePine },
];

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (propertyType !== "all") params.set("type", propertyType);
    router.push(`/explore?${params.toString()}`);
  };

  const handleQuickSearch = (query: string) => {
    router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative h-[65vh] min-h-[480px] max-h-[600px] bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 to-secondary-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6 border border-primary-500/30">
            Bangladesh&apos;s Most Trusted Real Estate Platform
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Find Your Dream{" "}
            <span className="text-primary-400">Home</span>{" "}
            in Bangladesh
          </h1>

          <p className="text-lg md:text-xl text-secondary-300 mb-8 max-w-2xl">
            Discover premium properties across Dhaka, Chattogram, Sylhet and beyond.
            Your perfect home is just a search away.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl p-2 md:p-2 shadow-2xl max-w-3xl"
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2">
                <MapPin className="text-primary-500 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Search by location, area, or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-secondary-900 placeholder-secondary-400 focus:outline-none"
                />
              </div>

              <div className="border-t md:border-t-0 md:border-l border-secondary-200 px-4 py-2">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full md:w-auto text-secondary-600 focus:outline-none bg-transparent cursor-pointer"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="text-secondary-400 text-sm">Popular:</span>
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleQuickSearch(link.query)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors backdrop-blur-sm"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
