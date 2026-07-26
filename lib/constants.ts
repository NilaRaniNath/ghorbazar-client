export const APP_NAME = "GhorBazar";
export const APP_DESCRIPTION =
  "Your trusted real estate platform in Bangladesh";

export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
] as const;

export const DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
] as const;

export const PROPERTY_STATUS = ["active", "pending", "sold", "rented"] as const;

export const PRICE_RANGES = [
  { min: 0, max: 5000000, label: "Under ৳50 Lakh" },
  { min: 5000000, max: 10000000, label: "৳50 Lakh - ৳1 Crore" },
  { min: 10000000, max: 25000000, label: "৳1 Crore - ৳2.5 Crore" },
  { min: 25000000, max: Infinity, label: "Above ৳2.5 Crore" },
] as const;

export const NAV_ROUTES = {
  loggedOut: [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/buy" },
    { name: "Rent", href: "/rent" },
  ],
  loggedIn: [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/buy" },
    { name: "Rent", href: "/rent" },
    { name: "Favorites", href: "/favorites" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Post Property", href: "/post-property" },
  ],
} as const;
