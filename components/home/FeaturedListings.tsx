"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { ArrowRight } from "lucide-react";

interface Property {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  location: string;
  division: string;
  propertyType: string;
  purpose: string;
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  images: string[];
  views?: number;
}

export function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get("/properties?limit=4&sort=newest");
        if (response.data.success) {
          setProperties(response.data.data.properties);
        }
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
              Featured Properties
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
              Latest Listings
            </h2>
            <p className="text-secondary-600 max-w-xl">
              Handpicked properties from top locations across Bangladesh, updated daily.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 mt-6 md:mt-0 text-primary-600 hover:text-primary-700 font-medium group"
          >
            View All Properties
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-secondary-500">
              No properties available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
