import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export async function uploadImage(file: File): Promise<string> {
  const reader = new FileReader();
  const base64 = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const res = await api.post("/upload/image", { image: base64 });
  return res.data.data.url;
}

export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    demoLogin: "/auth/demo-login",
    me: "/auth/me",
    profile: "/auth/profile",
    favorites: "/auth/favorites",
  },
  properties: {
    list: "/properties",
    detail: (id: string) => `/properties/${id}`,
    create: "/properties",
    update: (id: string) => `/properties/${id}`,
    delete: (id: string) => `/properties/${id}`,
    search: "/properties/search",
  },
  upload: {
    image: "/upload/image",
  },
};
