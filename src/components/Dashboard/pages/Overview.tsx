import React from 'react';
import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { RecentActivity } from '../components/RecentActivity';

export function Overview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value="150"
          change="+12"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Documents"
          value="1,234"
          change="+89"
          icon={FileText}
          trend="up"
        />
        <StatsCard
          title="Pending Reviews"
          value="23"
          change="-5"
          icon={AlertTriangle}
          trend="down"
        />
        <StatsCard
          title="Completed"
          value="89%"
          change="+2.3%"
          icon={CheckCircle}
          trend="up"
        />
      </div>

      <div className="mt-8">
        <RecentActivity />
      </div>
    </div>
  );
}