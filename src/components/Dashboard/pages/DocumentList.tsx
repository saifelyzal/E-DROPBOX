import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../ui/Button';
import { DocumentTable } from '../components/DocumentTable';

export function DocumentList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <Button icon={<Plus size={20} />}>
          Upload Document
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Button variant="primary" icon={<Filter size={20} />}>
              Filter
            </Button>
          </div>

          <DocumentTable />
        </div>
      </div>
    </div>
  );
}