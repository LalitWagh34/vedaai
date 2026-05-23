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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] min-h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          <span className="font-semibold text-gray-900">VedaAI</span>
        </div>
      </div>

      {/* Create Assignment Button */}
      <div className="p-3">
        <Link
          href="/assignments/create"
          className="flex items-center gap-2 bg-gray-900 text-white rounded-full px-3 py-2 text-sm w-full hover:bg-gray-700 transition-colors"
        >
          <Plus size={14} />
          Create Assignment
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
        >
          <Settings size={15} />
          Settings
        </Link>
        <div className="flex items-center gap-2 px-3 py-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-xs font-medium text-orange-600">D</span>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">Delhi Public School</p>
            <p className="text-xs text-gray-500">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </aside>
  );
}