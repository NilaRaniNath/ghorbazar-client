"use client";

import { useEffect, useState } from "react";
import { Building, Users, Star, Clock } from "lucide-react";

const stats = [
  {
    icon: Building,
    value: 500,
    suffix: "+",
    label: "Properties Listed",
    description: "Active listings across Bangladesh",
  },
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Happy Clients",
    description: "Customer satisfaction rate",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "AI Support",
    description: "Always available to assist you",
  },
  {
    icon: Star,
    value: 15,
    suffix: "K+",
    label: "Monthly Visitors",
    description: "Active users on our platform",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto">
            Join the growing community of property seekers and sellers who trust
            GhorBazar for their real estate needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <stat.icon size={32} className="text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white font-medium mb-1">{stat.label}</p>
              <p className="text-primary-200 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
