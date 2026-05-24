import { Bell, ChevronDown } from "lucide-react";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Assignment" }: HeaderProps) {
  return (
    <div className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <button className="hover:text-gray-900">←</button>
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <span className="font-medium text-gray-900">{title}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="relative p-1.5 hover:bg-gray-100 rounded-lg">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">J</span>
          </div>
          <span className="text-sm text-gray-700">John Doe</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}