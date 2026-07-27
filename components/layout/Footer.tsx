"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Quick Links": [
      { label: "Home", href: "/" },
      { label: "Explore", href: "/explore" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    "For Users": [
      { label: "List Property", href: "/items/add" },
      { label: "Manage", href: "/items/manage" },
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms of Service", href: "/about" },
      { label: "Cookie Policy", href: "/about" },
    ],
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-lg font-bold">
                Ghor<span className="text-purple-400">Bazar</span>
              </span>
            </Link>
            <p className="text-secondary-400 text-sm leading-relaxed">
              Your trusted AI-powered real estate marketplace in Bangladesh.
              Find your dream home with smart recommendations.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-purple-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-400 text-sm">
              © {currentYear} GhorBazar. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-secondary-400">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>info@ghorbazar.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
