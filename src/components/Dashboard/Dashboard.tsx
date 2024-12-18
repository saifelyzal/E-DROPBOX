import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardContent } from './DashboardContent';
import { DashboardProvider } from './context/DashboardContext';

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <DashboardContent />
        </div>
      </div>
    </DashboardProvider>
  );
}