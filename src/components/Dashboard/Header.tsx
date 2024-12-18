import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-1 min-w-0">
            <div className="max-w-2xl relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="ml-4 flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
                alt="User avatar"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}