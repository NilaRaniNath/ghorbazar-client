"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Loader2, Bell } from "lucide-react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative px-6 py-12 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary-500/20 rounded-2xl flex items-center justify-center">
                <Bell size={32} className="text-primary-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Ahead of the Market
              </h2>
              <p className="text-secondary-300 text-lg mb-8 max-w-xl mx-auto">
                Get exclusive property alerts, market insights, and new listings
                delivered straight to your inbox. Join 15,000+ subscribers.
              </p>

              {isSubmitted ? (
                <div className="flex items-center justify-center gap-3 p-4 bg-green-500/20 rounded-xl text-green-300">
                  <CheckCircle size={24} />
                  <span className="font-medium">
                    Thank you! You&apos;re now subscribed to property alerts.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <div className="flex-1 relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}

              <p className="text-secondary-400 text-sm mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto mb-8">
            Start your property search today and discover the perfect home for
            you and your family. Thousands of verified properties are waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/explore"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              Explore Properties
              <ArrowRight size={18} />
            </a>
            <a
              href="/items/add"
              className="px-8 py-4 border-2 border-secondary-300 text-secondary-700 rounded-xl font-medium hover:bg-secondary-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              List Your Property
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
