"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import {
  Sparkles,
  MapPin,
  DollarSign,
  Home,
  Bed,
  Loader2,
  AlertCircle,
  Brain,
  Zap,
  Target,
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
}

interface Recommendation {
  property: Property;
  reason: string;
  matchScore: number;
}

interface AIResponse {
  recommendations: Recommendation[];
  aiSummary: string;
  totalAnalyzed: number;
}

const budgetRanges = [
  { label: "Under ৳50 Lakh", value: 5000000 },
  { label: "৳50 Lakh - 1 Crore", value: 10000000 },
  { label: "৳1 Crore - 2 Crore", value: 20000000 },
  { label: "৳2 Crore - 5 Crore", value: 50000000 },
  { label: "Any Budget", value: 0 },
];

const locationOptions = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Gulshan",
  "Banani",
  "Dhanmondi",
  "Uttara",
  "Mirpur",
];

const propertyTypes = [
  { label: "Any Type", value: "all" },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Commercial", value: "commercial" },
  { label: "Land", value: "land" },
];

const purposeOptions = [
  { label: "Any", value: "all" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
];

export function RecommendationSection() {
  const [recommendations, setRecommendations] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("");
  const [purpose, setPurpose] = useState("all");

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError("");
    setRecommendations(null);

    try {
      const preferences: any = {};

      if (budget > 0) preferences.budget = budget;
      if (location) preferences.location = location;
      if (propertyType !== "all") preferences.propertyType = propertyType;
      if (bedrooms) preferences.bedrooms = Number(bedrooms);
      if (purpose !== "all") preferences.purpose = purpose;

      const response = await api.post("/ai/recommend", preferences);

      if (response.data.success) {
        setRecommendations(response.data.data);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "AI recommendations are temporarily unavailable. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Powered by AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            AI Smart Property Matcher
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Our AI analyzes your preferences and matches them with the perfect properties.
            Get personalized recommendations in seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                <DollarSign size={16} className="text-primary-500" />
                Budget Range
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                <MapPin size={16} className="text-primary-500" />
                Preferred Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">Any Location</option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                <Home size={16} className="text-primary-500" />
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                <Bed size={16} className="text-primary-500" />
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                <Target size={16} className="text-primary-500" />
                Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {purposeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGetRecommendations}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Get AI Recommendations
                  </>
                )}
              </button>
            </div>
          </div>

          {isLoading && (
            <div className="mt-8 text-center py-12">
              <div className="relative inline-block">
                <div className="w-20 h-20 border-4 border-primary-200 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="text-primary-600 animate-pulse" size={32} />
                </div>
              </div>
              <p className="mt-6 text-secondary-600 font-medium">
                AI is analyzing properties for you...
              </p>
              <p className="mt-2 text-secondary-400 text-sm">
                Matching your preferences with available listings
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {recommendations && (
          <div className="mt-8">
            <div className="bg-primary-50 rounded-xl p-6 mb-8 border border-primary-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="text-primary-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">
                    AI Summary
                  </h3>
                  <p className="text-secondary-600">{recommendations.aiSummary}</p>
                  <p className="text-secondary-400 text-sm mt-2">
                    Analyzed {recommendations.totalAnalyzed} properties
                  </p>
                </div>
              </div>
            </div>

            {recommendations.recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.recommendations.map((rec) => (
                  <div key={rec.property._id} className="relative">
                    <div className="absolute -top-3 left-4 z-10">
                      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        <Zap size={12} />
                        {rec.matchScore}% Match
                      </div>
                    </div>

                    <PropertyCard property={rec.property} />

                    <div className="mt-2 p-3 bg-secondary-50 rounded-lg border border-secondary-100">
                      <div className="flex items-start gap-2">
                        <Sparkles size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                        <p className="text-secondary-600 text-sm leading-relaxed">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <p className="text-secondary-500">
                  No matching properties found. Try adjusting your preferences.
                </p>
              </div>
            )}

            <div className="text-center mt-8">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                View All Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
