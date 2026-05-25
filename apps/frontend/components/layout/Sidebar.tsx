"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  FileText,
  Wand2,
  Library,
  Settings,
  Plus,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "My Groups", href: "/groups", icon: Users },
  { label: "Assignments", href: "/assignments", icon: FileText },
  { label: "AI Teacher's Toolkit", href: "/toolkit", icon: Wand2 },
  { label: "My Library", href: "/library", icon: Library },
];

// Bottom nav shows these 4 tabs matching Figma exactly
const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Assignments", href: "/assignments", icon: FileText },
  { label: "Library", href: "/library", icon: Library },
  { label: "AI Toolkit", href: "/toolkit", icon: Wand2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[220px] min-h-screen bg-white border-r border-gray-200 flex-col fixed left-0 top-0">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <span className="font-bold text-gray-900 text-base">VedaAI</span>
          </div>
        </div>

        <div className="p-3">
          <Link
            href="/assignments/create"
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full px-4 py-2.5 text-sm w-full transition-colors font-medium"
          >
            <Plus size={15} />
            Create Assignment
          </Link>
        </div>

        <nav className="flex-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <Settings size={15} />
            Settings
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 mt-1">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-orange-600">D</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">Delhi Public School</p>
              <p className="text-xs text-gray-500 truncate">Bokaro Steel City</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          <span className="font-bold text-gray-900">VedaAI</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-1.5 hover:bg-gray-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full" />
          </button>
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">J</span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav Bar with embedded + button */}

<div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center bg-[#16161a] rounded-full px-2.5 py-2 gap-0.5">
  {mobileNavItems.map((item) => {
    const Icon = item.icon;
    const isActive =
      pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href));
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex flex-col items-center gap-0.5 px-3.5 py-2 rounded-full transition-colors ${
          isActive
            ? "bg-[#2e2e36] text-white"
            : "text-[#9999aa] hover:text-white"
        }`}
      >
        <Icon size={20} />
        <span className="text-[10px] whitespace-nowrap">{item.label}</span>
      </Link>
    );
  })}

  <div className="w-px h-7 bg-[#2e2e36] mx-1" />

  <Link
    href="/assignments/create"
    className="flex items-center gap-1.5 bg-white text-[#16161a] rounded-full px-4 py-2.5 text-xs font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
  >
    <Plus size={14} />
    Create
  </Link>
</div>
    </>
  );
}