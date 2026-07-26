"use client";

import { useState, FormEvent } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["GhorBazar Headquarters", "Gulshan-2, Dhaka 1212", "Bangladesh"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+880 1700-000000", "+880 2-9876543"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["support@ghorbazar.com", "info@ghorbazar.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sun - Thu: 9:00 AM - 6:00 PM", "Friday: Closed", "Saturday: 10:00 AM - 4:00 PM"],
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulated submission — no backend endpoint required for now
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-primary-100 text-lg leading-relaxed">
              Have a question, suggestion, or need help finding the perfect property?
              We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-1">
                  Send Us a Message
                </h2>
                <p className="text-secondary-500 mb-8">
                  Fill out the form below and our team will get back to you within 24
                  hours.
                </p>

                {status === "success" && (
                  <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="text-primary-600 flex-shrink-0" size={20} />
                    <p className="text-primary-700 text-sm">
                      Message sent successfully! We&apos;ll get back to you soon.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    <p className="text-red-700 text-sm">
                      Something went wrong. Please try again later.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-900 mb-1">
                          {info.title}
                        </h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-secondary-500 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden">
                <div className="h-56 bg-gradient-to-br from-primary-100 to-teal-50 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      <path d="M0,200 Q200,100 400,200 T800,200" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-300" />
                      <path d="M0,250 Q200,150 400,250 T800,250" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-200" />
                      <circle cx="400" cy="200" r="8" fill="currentColor" className="text-primary-600" />
                      <circle cx="400" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-400" opacity="0.5" />
                    </svg>
                  </div>
                  <MapPin className="w-10 h-10 text-primary-600 mb-2 relative z-10" />
                  <p className="text-primary-800 font-semibold relative z-10">
                    Gulshan-2, Dhaka
                  </p>
                  <p className="text-primary-500 text-sm relative z-10">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
