"use client";

import Link from "next/link";
import {
  Shield,
  Users,
  MapPin,
  TrendingUp,
  Heart,
  Award,
  Target,
  Zap,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Every listing is verified and every transaction is secure. We believe trust is the foundation of every great real estate experience.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We connect neighbors, families, and businesses with spaces they can truly call home across Bangladesh.",
  },
  {
    icon: Target,
    title: "Innovation",
    description:
      "AI-powered recommendations, smart search, and modern tools that make finding or listing property effortless.",
  },
  {
    icon: Heart,
    title: "Customer Delight",
    description:
      "From first click to final handshake, we ensure every step of your property journey exceeds expectations.",
  },
];

const stats = [
  { value: "10,000+", label: "Properties Listed" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "64", label: "Districts Covered" },
  { value: "98%", label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Rafiq Hossain",
    role: "Founder & CEO",
    description: "Real estate visionary with 15+ years in Bangladesh property markets.",
  },
  {
    name: "Nusrat Jahan",
    role: "Head of Technology",
    description: "Full-stack engineer passionate about AI-driven PropTech solutions.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Head of Operations",
    description: "Ensures seamless property verification and customer support.",
  },
  {
    name: "Sadika Rahman",
    role: "Head of Marketing",
    description: "Builds brand trust and connects GhorBazar with every household.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Making Real Estate{" "}
              <span className="text-accent-400">Simple</span>,{" "}
              <span className="text-primary-200">Smart</span> &{" "}
              <span className="text-white">Accessible</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
              GhorBazar is Bangladesh&apos;s trusted real estate platform, connecting
              thousands of buyers, renters, and sellers with the perfect properties
              using cutting-edge AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-secondary-600 text-lg leading-relaxed mb-4">
                To digitize and simplify Bangladesh&apos;s real estate landscape by
                creating a transparent, accessible, and AI-powered marketplace where
                every person can find their perfect property.
              </p>
              <p className="text-secondary-600 text-lg leading-relaxed">
                We eliminate the friction of traditional property hunting — no more
                unreliable agents, no more incomplete listings. Just smart, verified,
                and personalized property discovery at your fingertips.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-primary-100 hover:shadow-md transition-shadow"
                >
                  <p className="text-3xl font-bold text-primary-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-secondary-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-secondary-500 max-w-2xl mx-auto text-lg">
              Everything we build is guided by principles that put people first.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group p-8 rounded-2xl bg-primary-50 border border-primary-100 hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-white mb-2 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-secondary-500 group-hover:text-primary-100 text-sm leading-relaxed transition-colors">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why GhorBazar */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why GhorBazar?</h2>
            <p className="text-primary-100 max-w-2xl mx-auto text-lg">
              We combine real estate expertise with modern technology to deliver a
              platform unlike anything else in Bangladesh.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Search",
                desc: "Our smart recommendation engine learns your preferences and suggests properties you'll love.",
              },
              {
                icon: Award,
                title: "Verified Listings",
                desc: "Every property is checked for accuracy. No fake listings, no outdated information.",
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                desc: "Access real-time pricing trends and neighborhood analytics to make informed decisions.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-8 h-8 text-accent-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-primary-100 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-secondary-500 max-w-2xl mx-auto text-lg">
              A passionate team dedicated to transforming how Bangladesh buys, sells,
              and rents properties.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-secondary-100 hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-secondary-500 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-secondary-500 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who found their dream home on GhorBazar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Explore Properties
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-secondary-300 text-secondary-700 rounded-xl font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors"
            >
              <Phone size={18} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
