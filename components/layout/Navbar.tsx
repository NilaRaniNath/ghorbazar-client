"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  Home,
  Search,
  Heart,
  PlusCircle,
  LayoutDashboard,
  LogOut,
  User,
  Loader2,
  Info,
  Phone,
} from "lucide-react";

const publicRoutes = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
];

const protectedRoutes = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Add Property", href: "/items/add", icon: PlusCircle },
  { name: "Manage", href: "/items/manage", icon: LayoutDashboard },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const routes = isAuthenticated ? protectedRoutes : publicRoutes;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold text-secondary-900">GhorBazar</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className="flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              >
                <route.icon size={18} />
                {route.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="flex items-center gap-2 text-secondary-400">
                <Loader2 className="animate-spin" size={18} />
                <span className="text-sm">Loading...</span>
              </div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-secondary-700 max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
                >
                  <User size={18} />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} className="text-secondary-600" /> : <Menu size={24} className="text-secondary-600" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-secondary-100">
          <div className="px-4 py-4 space-y-2">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className="flex items-center gap-3 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <route.icon size={20} />
                <span className="font-medium">{route.name}</span>
              </Link>
            ))}

            <div className="border-t border-secondary-100 pt-4 mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-secondary-400 py-3">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Loading...</span>
                </div>
              ) : isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{user.name}</p>
                      <p className="text-sm text-secondary-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-600 hover:bg-red-50 py-3 px-4 rounded-lg w-full transition-colors"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 py-3 px-4 rounded-lg font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={20} />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
