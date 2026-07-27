"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Home,
  AlertCircle,
} from "lucide-react";

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
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
];

const purposeOptions = [
  { value: "all", label: "Buy & Rent" },
  { value: "buy", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ExplorePageContent />
    </Suspense>
  );
}

function ExplorePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [filters, setFilters] = useState({
    q: "",
    type: "all",
    purpose: "all",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
    page: 1,
  });

  useEffect(() => {
    setFilters({
      q: searchParams.get("q") || "",
      type: searchParams.get("type") || "all",
      purpose: searchParams.get("purpose") || "all",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "newest",
      page: Number(searchParams.get("page")) || 1,
    });
    setIsMounted(true);
  }, [searchParams]);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (filters.q) params.append("q", filters.q);
      if (filters.type !== "all") params.append("type", filters.type);
      if (filters.purpose !== "all") params.append("purpose", filters.purpose);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sort) params.append("sort", filters.sort);
      params.append("page", String(filters.page));
      params.append("limit", "8");

      const response = await api.get(`/properties?${params.toString()}`);

      if (response.data.success) {
        setProperties(response.data.data.properties);
        setPagination(response.data.data.pagination);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch properties. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.purpose !== "all") params.set("purpose", filters.purpose);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sort !== "newest") params.set("sort", filters.sort);
    if (filters.page > 1) params.set("page", String(filters.page));

    const queryString = params.toString();
    router.push(`/explore${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [filters, router, isMounted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePriceChange = (key: "minPrice" | "maxPrice", value: string) => {
    const numValue = value.replace(/[^0-9]/g, "");
    setFilters((prev) => ({ ...prev, [key]: numValue, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      q: "",
      type: "all",
      purpose: "all",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters =
    filters.q ||
    filters.type !== "all" ||
    filters.purpose !== "all" ||
    filters.minPrice ||
    filters.maxPrice;

  return (
    <div className="min-h-screen bg-secondary-50 pt-16">
      <div className="bg-white border-b border-secondary-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400"
                size={20}
              />
              <input
                type="text"
                value={filters.q}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, q: e.target.value }))
                }
                placeholder="Search by location, property name, or area..."
                className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border rounded-lg font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? "bg-primary-50 border-primary-300 text-primary-700"
                  : "bg-white border-secondary-200 text-secondary-700 hover:bg-secondary-50"
              }`}
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </button>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[140px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </form>

          {showFilters && (
            <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Purpose
                  </label>
                  <select
                    value={filters.purpose}
                    onChange={(e) =>
                      handleFilterChange("purpose", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    {purposeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Min Price (BDT)
                  </label>
                  <input
                    type="text"
                    value={filters.minPrice}
                    onChange={(e) => handlePriceChange("minPrice", e.target.value)}
                    placeholder="e.g., 5000000"
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Max Price (BDT)
                  </label>
                  <input
                    type="text"
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
                    placeholder="e.g., 25000000"
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-red-600 font-medium text-sm transition-colors"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pagination && (
          <div className="mb-6">
            <p className="text-secondary-600">
              Showing{" "}
              <span className="font-semibold text-secondary-900">
                {properties.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-secondary-900">
                {pagination.total}
              </span>{" "}
              properties
              {filters.q && (
                <span>
                  {" "}
                  for &quot;<span className="text-primary-600">{filters.q}</span>
                  &quot;
                </span>
              )}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Home className="mx-auto text-secondary-300 mb-4" size={64} />
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              No Properties Found
            </h2>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              We couldn&apos;t find any properties matching your search criteria.
              Try adjusting your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 border border-secondary-200 rounded-lg font-medium text-secondary-600 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {[...Array(pagination.totalPages)].map((_, i) => {
                  const page = i + 1;
                  const isCurrent = page === filters.page;
                  const showPage =
                    page === 1 ||
                    page === pagination.totalPages ||
                    Math.abs(page - filters.page) <= 1;

                  if (!showPage) {
                    if (page === filters.page - 2 || page === filters.page + 2) {
                      return (
                        <span
                          key={page}
                          className="px-2 text-secondary-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        isCurrent
                          ? "bg-primary-600 text-white"
                          : "border border-secondary-200 text-secondary-600 hover:bg-secondary-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 border border-secondary-200 rounded-lg font-medium text-secondary-600 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
