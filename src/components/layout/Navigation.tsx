import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { Button } from '../ui/Button';

export function Navigation() {
  const { user, signOut } = useAuthStore();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Employee Credentials Manager
            </h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">{user.email}</span>
            <Button
              onClick={handleSignOut}
              variant="danger"
              icon={<LogOut size={20} />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}