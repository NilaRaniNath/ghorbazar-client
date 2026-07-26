"use client";

import Link from "next/link";
import { MapPin, Bed, Bath, Square, Eye, Heart } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
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
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `৳${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `৳${(price / 100000).toFixed(2)} Lakh`;
    }
    return `৳${price.toLocaleString()}`;
  };

  const purposeLabel = property.purpose === "buy" ? "For Sale" : "For Rent";
  const purposeColor =
    property.purpose === "buy" ? "bg-primary-600" : "bg-accent-500";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-secondary-100">
      <div className="relative h-48 overflow-hidden bg-secondary-100">
        {property.images && property.images.length > 0 && !imageError ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-primary-600 text-2xl font-bold">
                  {property.title.charAt(0)}
                </span>
              </div>
              <p className="text-primary-500 text-sm font-medium">
                {property.propertyType.charAt(0).toUpperCase() +
                  property.propertyType.slice(1)}
              </p>
            </div>
          </div>
        )}

        <span
          className={`absolute top-3 left-3 px-3 py-1 ${purposeColor} text-white text-xs font-semibold rounded-full`}
        >
          {purposeLabel}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            size={18}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-secondary-400 hover:text-red-400"
            }
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-secondary-500 text-sm mb-2">
          <MapPin size={14} className="text-primary-500 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-1 hover:text-primary-600 transition-colors">
          {property.title}
        </h3>

        {property.shortDescription && (
          <p className="text-secondary-500 text-sm mb-3 line-clamp-2">
            {property.shortDescription}
          </p>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between border-t border-secondary-100 pt-3">
            <div>
              <p className="text-lg font-bold text-primary-600">
                {formatPrice(property.price)}
                {property.purpose === "rent" && (
                  <span className="text-sm font-normal text-secondary-500">
                    /mo
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 text-secondary-500 text-xs">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed size={14} />
                  {property.bedrooms}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Bath size={14} />
                {property.bathrooms}
              </span>
              {property.areaSize > 0 && (
                <span className="flex items-center gap-1">
                  <Square size={14} />
                  {property.areaSize}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-xs text-secondary-400">
              <Eye size={12} />
              {property.views || 0} views
            </span>
            <Link
              href={`/explore/${property._id}`}
              className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
