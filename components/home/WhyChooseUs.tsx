"use client";

import {
  Shield,
  Search,
  Lock,
  Headphones,
  BadgeCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Listings",
    description:
      "Every property undergoes thorough verification before listing. No fake ads, no misleading information.",
  },
  {
    icon: Search,
    title: "AI-Powered Matching",
    description:
      "Our smart algorithm learns your preferences and suggests properties that perfectly match your lifestyle.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "Bank-level encryption protects your data. Verified agents and secure communication channels.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated team is always available to assist you via phone, email, or live chat.",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description:
      "Get real-time notifications for new listings, price drops, and offers matching your criteria.",
  },
  {
    icon: Shield,
    title: "Trusted Platform",
    description:
      "Serving over 50,000+ happy users across Bangladesh with a 98% satisfaction rate.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            Why GhorBazar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Why Choose GhorBazar?
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            We&apos;re not just a property listing platform. We&apos;re your trusted partner
            in finding the perfect home, backed by technology and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-secondary-50 rounded-2xl hover:bg-primary-50 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <feature.icon size={28} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
