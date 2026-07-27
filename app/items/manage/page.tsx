"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import api, { uploadImage } from "@/lib/api";
import {
  Home,
  Plus,
  Eye,
  Trash2,
  MapPin,
  Loader2,
  AlertCircle,
  X as XIcon,
  Pencil,
  Package,
  Upload,
  Calendar,
  Bed,
  Bath,
  Square,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface Property {
  _id: string;
  title: string;
  shortDescription: string;
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
  status: string;
  views: number;
  createdAt: string;
}

const PIE_COLORS = ["#0d9488", "#14b8a6", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

function buildViewsChartData(properties: Property[]) {
  const monthMap: Record<string, number> = {};
  properties.forEach((p) => {
    const d = new Date(p.createdAt);
    const key = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
    monthMap[key] = (monthMap[key] || 0) + (p.views || 0);
  });
  const entries = Object.entries(monthMap).slice(-7);
  return entries.map(([month, views]) => ({ month, views }));
}

function buildCategoryPieData(properties: Property[]) {
  const map: Record<string, number> = {};
  properties.forEach((p) => {
    const label = p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1);
    map[label] = (map[label] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function buildStatusPieData(properties: Property[]) {
  const map: Record<string, number> = {};
  properties.forEach((p) => {
    const label = p.status.charAt(0).toUpperCase() + p.status.slice(1);
    map[label] = (map[label] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function AnalyticsSection({ properties }: { properties: Property[] }) {
  const viewsData = buildViewsChartData(properties);
  const categoryData = buildCategoryPieData(properties);
  const statusData = buildStatusPieData(properties);
  const totalViews = properties.reduce((s, p) => s + (p.views || 0), 0);
  const totalValue = properties.reduce((s, p) => s + p.price, 0);
  const activeCount = properties.filter((p) => p.status === "active").length;

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `৳${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `৳${(price / 100000).toFixed(1)} L`;
    return `৳${price.toLocaleString()}`;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-bold text-secondary-900">Property Analytics</h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Properties",
            value: properties.length,
            icon: Home,
            color: "bg-primary-50 text-primary-600",
          },
          {
            label: "Active Listings",
            value: activeCount,
            icon: TrendingUp,
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Total Views",
            value: totalViews.toLocaleString(),
            icon: Eye,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Portfolio Value",
            value: formatPrice(totalValue),
            icon: DollarSign,
            color: "bg-accent-50 text-accent-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-secondary-100 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-medium text-secondary-500 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <div className="bg-white rounded-xl border border-secondary-100 p-6">
          <h3 className="text-sm font-semibold text-secondary-700 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary-500" />
            Views Over Time
          </h3>
          {viewsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="url(#viewsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-secondary-400 text-sm">
              No data yet. Add properties to see analytics.
            </div>
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-secondary-100 p-6">
          <h3 className="text-sm font-semibold text-secondary-700 mb-4 flex items-center gap-2">
            <PieChartIcon size={16} className="text-primary-500" />
            Properties by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-secondary-400 text-sm">
              No data yet. Add properties to see analytics.
            </div>
          )}
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl border border-secondary-100 p-6">
          <h3 className="text-sm font-semibold text-secondary-700 mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-primary-500" />
            Properties by Status
          </h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-secondary-400 text-sm">
              No data yet. Add properties to see analytics.
            </div>
          )}
        </div>

        {/* Price Distribution Bar Chart */}
        <div className="bg-white rounded-xl border border-secondary-100 p-6">
          <h3 className="text-sm font-semibold text-secondary-700 mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-primary-500" />
            Price by Property (Top 8)
          </h3>
          {properties.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={properties
                  .slice()
                  .sort((a, b) => b.price - a.price)
                  .slice(0, 8)
                  .map((p) => ({
                    name: p.title.length > 16 ? p.title.slice(0, 16) + "..." : p.title,
                    price: p.price / 100000,
                  }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  formatter={(val) => `৳${(Number(val ?? 0) * 100000).toLocaleString()}`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  }}
                />
                <Bar dataKey="price" radius={[6, 6, 0, 0]} fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-secondary-400 text-sm">
              No data yet. Add properties to see analytics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ManagePropertiesContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, any>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState("");

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/properties/my-properties");
      if (response.data.success) {
        setProperties(response.data.data.properties);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch properties");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

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
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      sold: "bg-red-100 text-red-700",
      rented: "bg-blue-100 text-blue-700",
    };
    return badges[status] || "bg-secondary-100 text-secondary-700";
  };

  return (
    <div className="min-h-screen bg-secondary-50 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              Manage Properties
            </h1>
            <p className="text-secondary-600 mt-1">
              View and manage all your listed properties
            </p>
          </div>
          <Link
            href="/items/add"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} />
            Add New Property
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 animate-pulse">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-secondary-200 rounded-xl" />
                ))}
              </div>
              <div className="h-64 bg-secondary-200 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            {/* Analytics Dashboard */}
            {properties.length > 0 && <AnalyticsSection properties={properties} />}

            {/* Property List */}
            {properties.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <Package className="mx-auto text-secondary-300 mb-4" size={64} />
                <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                  No Properties Yet
                </h2>
                <p className="text-secondary-600 mb-6">
                  You haven&apos;t listed any properties yet. Start by adding your first
                  property to reach potential buyers.
                </p>
                <Link
                  href="/items/add"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  <Plus size={20} />
                  Add Your First Property
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-40 h-32 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                          {property.images && property.images.length > 0 ? (
                            <Image
                              src={property.images[0]}
                              alt={property.title}
                              fill
                              sizes="160px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Home className="text-secondary-300" size={32} />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(
                                    property.status
                                  )}`}
                                >
                                  {property.status.charAt(0).toUpperCase() +
                                    property.status.slice(1)}
                                </span>
                                <span className="text-xs text-secondary-500">
                                  {property.purpose === "buy" ? "For Sale" : "For Rent"}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-secondary-900 truncate">
                                {property.title}
                              </h3>
                              <div className="flex items-center gap-1 text-secondary-500 text-sm mt-1">
                                <MapPin size={14} />
                                <span className="truncate">{property.location}</span>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <p className="text-lg font-bold text-primary-600">
                                {formatPrice(property.price)}
                              </p>
                              {property.purpose === "rent" && (
                                <p className="text-xs text-secondary-500">/month</p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-secondary-500">
                            {property.bedrooms > 0 && (
                              <span className="flex items-center gap-1">
                                <Bed size={14} />
                                {property.bedrooms} Beds
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Bath size={14} />
                              {property.bathrooms} Baths
                            </span>
                            {property.areaSize > 0 && (
                              <span className="flex items-center gap-1">
                                <Square size={14} />
                                {property.areaSize} sqft
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {property.views || 0} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(property.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mt-4">
                            <Link
                              href={`/explore/${property._id}`}
                              className="inline-flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors"
                            >
                              <Eye size={16} />
                              View Details
                            </Link>
                            <button
                              onClick={() => {
                                setEditingProperty(property);
                                setEditImageFile(null);
                                setEditImagePreview("");
                                setEditFormData({
                                  title: property.title,
                                  shortDescription: property.shortDescription || "",
                                  description: property.description,
                                  price: property.price,
                                  location: property.location,
                                  division: property.division,
                                  propertyType: property.propertyType,
                                  purpose: property.purpose,
                                  bedrooms: property.bedrooms,
                                  bathrooms: property.bathrooms,
                                  areaSize: property.areaSize,
                                });
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(property._id)}
                              disabled={deletingId === property._id}
                              className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                            >
                              {deletingId === property._id ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                <Trash2 size={16} />
                              )}
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-secondary-100">
              <div>
                <h2 className="text-xl font-bold text-secondary-900">Edit Property</h2>
                <p className="text-secondary-500 text-sm mt-1">Update your property listing</p>
              </div>
              <button
                onClick={() => setEditingProperty(null)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <XIcon size={20} className="text-secondary-500" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsUpdating(true);
                try {
                  let updatedImages = editingProperty.images;

                  if (editImageFile) {
                    const uploadedUrl = await uploadImage(editImageFile);
                    updatedImages = [uploadedUrl];
                  }

                  const response = await api.put(
                    `/properties/${editingProperty._id}`,
                    {
                      title: editFormData.title,
                      shortDescription: editFormData.shortDescription,
                      description: editFormData.description,
                      price: Number(editFormData.price),
                      location: editFormData.location,
                      division: editFormData.division,
                      propertyType: editFormData.propertyType,
                      purpose: editFormData.purpose,
                      bedrooms: Number(editFormData.bedrooms),
                      bathrooms: Number(editFormData.bathrooms),
                      areaSize: Number(editFormData.areaSize),
                      images: updatedImages,
                    }
                  );
                  if (response.data.success) {
                    setProperties((prev) =>
                      prev.map((p) =>
                        p._id === editingProperty._id
                          ? { ...p, ...response.data.data.property }
                          : p
                      )
                    );
                    setEditingProperty(null);
                  }
                } catch (err: any) {
                  setError(err.response?.data?.message || "Failed to update property");
                } finally {
                  setIsUpdating(false);
                }
              }}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.title || ""}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editFormData.shortDescription || ""}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={editFormData.description || ""}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Price (BDT)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editFormData.price || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.location || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={editFormData.propertyType || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, propertyType: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Purpose
                  </label>
                  <select
                    value={editFormData.purpose || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, purpose: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                  >
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editFormData.bedrooms || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editFormData.bathrooms || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Area Size (sqft)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editFormData.areaSize || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, areaSize: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Property Image
                </label>
                {editImagePreview || (editFormData.images && editFormData.images[0]) ? (
                  <div className="relative">
                    <img
                      src={editImagePreview || editFormData.images?.[0] || ""}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border border-secondary-200"
                    />
                    {editImagePreview && (
                      <button
                        type="button"
                        onClick={() => { setEditImageFile(null); setEditImagePreview(""); }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <XIcon size={14} />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-secondary-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-colors">
                    <Upload className="w-8 h-8 text-secondary-400 mb-1" />
                    <span className="text-sm text-secondary-500">Click to upload</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 5 * 1024 * 1024) { setError("Image must be less than 5MB"); return; }
                        setEditImageFile(file);
                        const reader = new FileReader();
                        reader.onload = (ev) => setEditImagePreview(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="flex-1 px-4 py-2.5 border border-secondary-200 text-secondary-700 rounded-lg font-medium text-sm hover:bg-secondary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManagePropertiesPage() {
  return (
    <ProtectedRoute>
      <ManagePropertiesContent />
    </ProtectedRoute>
  );
}
