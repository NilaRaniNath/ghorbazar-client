"use client";

import { useQuery } from "@tanstack/react-query";
import api, { apiEndpoints } from "@/lib/api";

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  division: string;
  price: number;
  propertyType: string;
  purpose: "buy" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  status: string;
  createdAt: string;
}

interface UsePropertiesParams {
  type?: string;
  purpose?: string;
  division?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export function useProperties(params: UsePropertiesParams = {}) {
  return useQuery({
    queryKey: ["properties", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const response = await api.get(
        `${apiEndpoints.properties.list}?${searchParams.toString()}`
      );
      return response.data;
    },
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: async () => {
      const response = await api.get(apiEndpoints.properties.detail(id));
      return response.data.property;
    },
    enabled: !!id,
  });
}
