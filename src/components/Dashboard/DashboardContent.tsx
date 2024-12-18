import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Overview } from './pages/Overview';
import { EmployeeList } from './pages/EmployeeList';
import { DocumentList } from './pages/DocumentList';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';

export function DashboardContent() {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/documents" element={<DocumentList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}