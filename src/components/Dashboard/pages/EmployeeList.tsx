import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { EmployeeTable } from '../components/EmployeeTable';
import { useAuthStore } from '../../../store/auth';

export function EmployeeList() {
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
        {isAdmin && (
          <Button icon={<Plus size={20} />}>
            Add Employee
          </Button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <EmployeeTable isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}