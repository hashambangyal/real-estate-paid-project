"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Building2,
  Users,
  Tag,
  MapPin,
  MessageSquare,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useAdminCache } from "@/context/AdminCacheContext";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutGrid,
    apiUrls: ["/api/dashboard/stats"],
  },
  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building2,
    apiUrls: [
      "/api/properties/stats?timeframe=7d",
      "/api/properties?page=1&limit=12&sortBy=createdAt&sortOrder=desc",
    ],
  },
  {
    name: "Agents",
    href: "/admin/agents",
    icon: Users,
    apiUrls: ["/api/agent"],
  },
  {
    name: "Amenities",
    href: "/admin/amenities",
    icon: Tag,
    apiUrls: ["/api/amenities"],
  },
  {
    name: "Cities",
    href: "/admin/cities",
    icon: MapPin,
    apiUrls: ["/api/cities"],
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
    apiUrls: [
      "/api/inquiry/stats",
      "/api/inquiry?page=1&limit=15&sortBy=createdAt&sortOrder=desc",
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { prefetch, prefetchAllAdminRoutes } = useAdminCache();

  // Prefetch all key admin data in the background after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchAllAdminRoutes();
    }, 600);

    return () => clearTimeout(timer);
  }, [prefetchAllAdminRoutes]);

  const handleMouseEnter = (apiUrls) => {
    if (apiUrls && apiUrls.length > 0) {
      apiUrls.forEach((url) => prefetch(url));
    }
  };

  return (
    <aside className="w-64 h-screen bg-white flex flex-col justify-between p-5 border-r border-gray-100 select-none sticky top-0">
      <div>
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 px-2 mb-8 mt-1 select-none">
          <Image
            src="/logo.png"
            alt="Inmobiliaria Hersu"
            width={36}
            height={36}
            className="w-9 h-9 object-contain drop-shadow-sm"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-[8px] tracking-[0.22em] font-medium text-[#1A1D20] uppercase leading-tight font-sans">
              INMOBILIARIA
            </span>
            <span className="text-[15px] tracking-[0.14em] font-serif text-[#1A1D20] font-normal leading-tight mt-0.5">
              HERSU
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[12px] font-medium text-gray-400 px-3 mb-2 font-sans tracking-tight">
            Main Menu
          </h3>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => handleMouseEnter(item.apiUrls)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14px] transition-all ${
                      isActive
                        ? "bg-[#0B6051] text-white font-medium shadow-sm"
                        : "text-[#6B7280] hover:text-[#1A1D20] hover:bg-[#F7F8FA] font-normal"
                    }`}
                  >
                    <Icon className={`w-[19px] h-[19px] stroke-[1.8] ${isActive ? "text-white" : "text-[#6B7280]"}`} />
                    <span className="flex-1 text-left">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer - Logout */}
      <div className="pt-6 px-3 border-t border-gray-50">
        <LogoutButton />
      </div>
    </aside>
  );
}

