import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, User } from 'lucide-react';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    description: 'Update your personal information and preferences',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive notifications',
  },
  {
    id: 'security',
    title: 'Security',
    icon: Lock,
    description: 'Manage your account security settings',
  },
];

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <SettingsIcon className="h-6 w-6 text-gray-400 mr-2" />
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          
          return (
            <div
              key={section.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Manage settings &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}