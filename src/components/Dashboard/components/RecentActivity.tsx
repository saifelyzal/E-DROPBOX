import React from 'react';
import { FileText, User, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'document',
    title: 'Employee Handbook Updated',
    description: 'New version 2.1 has been uploaded',
    timestamp: '2 hours ago',
    icon: FileText,
  },
  {
    id: 2,
    type: 'employee',
    title: 'New Employee Added',
    description: 'John Doe joined Engineering',
    timestamp: '4 hours ago',
    icon: User,
  },
  {
    id: 3,
    type: 'review',
    title: 'Performance Review Due',
    description: '5 reviews pending for this week',
    timestamp: '1 day ago',
    icon: Clock,
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Activity
        </h3>
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => {
              const Icon = activity.icon;
              
              return (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== activities.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-500" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {activity.title}
                            </span>{' '}
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}