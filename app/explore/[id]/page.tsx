"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Building,
  Calendar,
  Eye,
  Phone,
  Mail,
  Share2,
  Heart,
  ArrowLeft,
  Car,
  Wifi,
  Shield,
  Zap,
  TreePine,
  Dumbbell,
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Copy,
  User,
} from "lucide-react";

interface Property {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  location: string;
  division: string;
  district?: string;
  area?: string;
  propertyType: string;
  purpose: string;
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  areaUnit: string;
  images: string[];
  features: string[];
  status: string;
  ownerId: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface Owner {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export default function PropertyDetailsPage() {
  const routeParams = useParams();
  const id = routeParams.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await api.get(`/properties/${id}`);

        if (response.data.success) {
          const propertyData = response.data.data.property;
          setProperty(propertyData);

          const relatedResponse = await api.get(
            `/properties?type=${propertyData.propertyType}&purpose=${propertyData.purpose}&limit=4`
          );

          if (relatedResponse.data.success) {
            const filtered = relatedResponse.data.data.properties.filter(
              (p: Property) => p._id !== id
            );
            setRelatedProperties(filtered.slice(0, 4));
          }
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Property not found or failed to load."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `৳${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `৳${(price / 100000).toFixed(2)} Lakh`;
    }
    return `৳${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes("parking") || lowerFeature.includes("car"))
      return <Car size={18} />;
    if (lowerFeature.includes("wifi") || lowerFeature.includes("internet"))
      return <Wifi size={18} />;
    if (lowerFeature.includes("security") || lowerFeature.includes("guard"))
      return <Shield size={18} />;
    if (lowerFeature.includes("generator") || lowerFeature.includes("power"))
      return <Zap size={18} />;
    if (lowerFeature.includes("garden") || lowerFeature.includes("park"))
      return <TreePine size={18} />;
    if (lowerFeature.includes("gym") || lowerFeature.includes("fitness"))
      return <Dumbbell size={18} />;
    return <CheckCircle size={18} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary-200 rounded w-1/4 mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-96 bg-secondary-200 rounded-xl" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 w-20 bg-secondary-200 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-secondary-200 rounded-xl" />
                <div className="h-60 bg-secondary-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={64} />
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">
            Property Not Found
          </h1>
          <p className="text-secondary-600 mb-6">
            {error || "The property you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [];

  const specifications = [
    ...(property.bedrooms > 0
      ? [{ icon: <Bed size={24} />, label: "Bedrooms", value: property.bedrooms }]
      : []),
    {
      icon: <Bath size={24} />,
      label: "Bathrooms",
      value: property.bathrooms,
    },
    ...(property.areaSize > 0
      ? [
          {
            icon: <Square size={24} />,
            label: "Area",
            value: `${property.areaSize} ${property.areaUnit || "sqft"}`,
          },
        ]
      : []),
    {
      icon: <Building size={24} />,
      label: "Property Type",
      value: property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1),
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-secondary-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/explore"
            className="hover:text-primary-600 transition-colors"
          >
            Explore
          </Link>
          <span>/</span>
          <span className="text-secondary-900 truncate max-w-[200px]">
            {property.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-[400px] md:h-[500px] bg-secondary-100">
                {images.length > 0 ? (
                  <>
                    <img
                      src={images[selectedImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === 0 ? images.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 text-white text-sm rounded-full">
                          {selectedImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto bg-primary-200 rounded-full flex items-center justify-center mb-4">
                        <span className="text-primary-600 text-4xl font-bold">
                          {property.title.charAt(0)}
                        </span>
                      </div>
                      <p className="text-primary-600 font-medium text-lg">
                        {property.propertyType.charAt(0).toUpperCase() +
                          property.propertyType.slice(1)}
                      </p>
                    </div>
                  </div>
                )}

                <span
                  className={`absolute top-4 left-4 px-4 py-2 text-white text-sm font-semibold rounded-full ${
                    property.purpose === "buy" ? "bg-primary-600" : "bg-accent-500"
                  }`}
                >
                  {property.purpose === "buy" ? "For Sale" : "For Rent"}
                </span>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart
                      size={20}
                      className={
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-secondary-600"
                      }
                    />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    {copied ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Share2 size={20} className="text-secondary-600" />
                    )}
                  </button>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? "border-primary-500"
                          : "border-transparent hover:border-secondary-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-secondary-500">
                    <MapPin size={18} className="text-primary-500" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl md:text-3xl font-bold text-primary-600">
                    {formatPrice(property.price)}
                  </p>
                  {property.purpose === "rent" && (
                    <p className="text-secondary-500">/month</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500 mb-6 pb-6 border-b border-secondary-100">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Listed {formatDate(property.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={16} />
                  {property.views || 0} views
                </span>
                {property.area && (
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium">
                    {property.area}
                  </span>
                )}
                {property.division && (
                  <span className="px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-xs font-medium">
                    {property.division}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-3">
                  About This Property
                </h2>
                <p className="text-secondary-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.shortDescription && (
                <div className="p-4 bg-primary-50 rounded-xl mb-6">
                  <p className="text-secondary-700">{property.shortDescription}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Key Information
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="p-4 bg-secondary-50 rounded-xl text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      {spec.icon}
                    </div>
                    <p className="text-secondary-500 text-sm mb-1">{spec.label}</p>
                    <p className="font-semibold text-secondary-900">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg"
                    >
                      <span className="text-primary-500">
                        {getFeatureIcon(feature)}
                      </span>
                      <span className="text-secondary-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Contact Agent
              </h2>

              <div className="flex items-center gap-4 mb-6 p-4 bg-secondary-50 rounded-xl">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">GhorBazar Agent</p>
                  <p className="text-sm text-secondary-500">Property Specialist</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href="tel:+8801712345678"
                  className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Phone size={18} className="text-primary-500" />
                  <span className="text-secondary-700">+880 1712-345678</span>
                </a>
                <a
                  href="mailto:agent@ghorbazar.com"
                  className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Mail size={18} className="text-primary-500" />
                  <span className="text-secondary-700">agent@ghorbazar.com</span>
                </a>
              </div>

              <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 mb-3">
                <Phone size={18} />
                Contact Agent
              </button>

              <button className="w-full py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                <Calendar size={18} />
                Book a Tour
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Property Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-500">Property ID</span>
                  <span className="font-mono text-sm text-secondary-700">
                    {property._id.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-500">Type</span>
                  <span className="text-secondary-700 capitalize">
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-500">Purpose</span>
                  <span className="text-secondary-700">
                    {property.purpose === "buy" ? "For Sale" : "For Rent"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-500">Division</span>
                  <span className="text-secondary-700">{property.division}</span>
                </div>
                {property.district && (
                  <div className="flex justify-between py-2 border-b border-secondary-100">
                    <span className="text-secondary-500">District</span>
                    <span className="text-secondary-700">{property.district}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-secondary-500">Listed On</span>
                  <span className="text-secondary-700">
                    {formatDate(property.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary-900">
                Similar Properties
              </h2>
              <Link
                href="/explore"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProperties.map((relatedProperty) => (
                <PropertyCard
                  key={relatedProperty._id}
                  property={relatedProperty}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
