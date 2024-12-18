import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

const helpResources = [
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Detailed guides and API references',
    icon: Book,
    link: '#',
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Get help from our support team',
    icon: MessageCircle,
    link: '#',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: 'Send us an email with your questions',
    icon: Mail,
    link: '#',
  },
];

export function Help() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <HelpCircle className="h-6 w-6 text-gray-400 mr-2" />
        <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {helpResources.map((resource) => {
          const Icon = resource.icon;
          
          return (
            <div
              key={resource.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={resource.link}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Learn more &rarr;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Frequently Asked Questions
          </h3>
          <div className="mt-4 space-y-4">
            {/* Add FAQ items here */}
          </div>
        </div>
      </div>
    </div>
  );
}