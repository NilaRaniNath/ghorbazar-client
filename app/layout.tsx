import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GhorBazar - Your Trusted Real Estate Platform",
  description:
    "Find your dream home in Bangladesh. Browse apartments, houses, and commercial properties on GhorBazar.",
  keywords: [
    "real estate",
    "property",
    "Bangladesh",
    "GhorBazar",
    "apartment",
    "house",
    "rent",
    "buy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {children}
            <ChatWidget />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
