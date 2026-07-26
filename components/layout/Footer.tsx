"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "Press & Media", href: "/press" },
  ],
  explore: [
    { name: "Buy Property", href: "/explore?purpose=buy" },
    { name: "Rent Property", href: "/explore?purpose=rent" },
    { name: "Sell Property", href: "/items/add" },
    { name: "Featured Listings", href: "/explore?sort=popular" },
  ],
  property: [
    { name: "Apartments", href: "/explore?type=apartment" },
    { name: "Family Houses", href: "/explore?type=house" },
    { name: "Commercial", href: "/explore?type=commercial" },
    { name: "Land & Plots", href: "/explore?type=land" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/ghorbazar" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/ghorbazar" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/ghorbazar" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/ghorbazar" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/ghorbazar" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 border-b border-secondary-800">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold">GhorBazar</span>
            </Link>
            <p className="text-secondary-400 mb-6 max-w-sm">
              Bangladesh&apos;s most trusted real estate platform. Find your dream
              home with verified listings and secure transactions.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-secondary-400">
                <MapPin size={18} className="text-primary-400 flex-shrink-0" />
                <span>Zindabazar, Sylhet 3100, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-400">
                <Phone size={18} className="text-primary-400 flex-shrink-0" />
                <a href="tel:+8801712345678" className="hover:text-white transition-colors">
                  +880 1712-345678
                </a>
              </div>
              <div className="flex items-center gap-3 text-secondary-400">
                <Mail size={18} className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@ghorbazar.com" className="hover:text-white transition-colors">
                  info@ghorbazar.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-secondary-400">
                <Clock size={18} className="text-primary-400 flex-shrink-0" />
                <span>Sat - Thu: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Property Types</h3>
            <ul className="space-y-3">
              {footerLinks.property.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-400 text-sm">
            © {new Date().getFullYear()} GhorBazar. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
