import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import { SignUpForm } from './components/Auth/SignUpForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { useAuthStore } from './store/auth';
import { initializeStorage } from './lib/supabase/storage';
import { isAppError } from './utils/error';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const user = useAuthStore((state) => state.user);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initStorage = async () => {
      if (!user) {
        setStorageError(null);
        return;
      }

      const handleError = (error: Error) => {
        if (!mounted) return;

        if (isAppError(error)) {
          switch (error.code) {
            case 'STORAGE_AUTH_REQUIRED':
              setStorageError('Please sign in to access storage.');
              break;
            case 'STORAGE_PERMISSION_DENIED':
              setStorageError('Storage access denied. Please sign out and sign in again.');
              break;
            default:
              setStorageError(error.message);
          }
        } else {
          setStorageError('Failed to initialize storage. Please try again.');
        }
      };

      await initializeStorage(handleError);
    };

    initStorage();

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {storageError && (
            <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-100 border-b border-red-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-red-700">{storageError}</div>
                  <button
                    onClick={() => setStorageError(null)}
                    className="ml-4 text-red-700 hover:text-red-900"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}

          <Routes>
            <Route path="/login" element={
              !user ? (
                <div className="flex min-h-screen items-center justify-center">
                  <LoginForm />
                </div>
              ) : (
                <Navigate to="/dashboard" />
              )
            } />
            <Route path="/signup" element={
              !user ? (
                <div className="flex min-h-screen items-center justify-center">
                  <SignUpForm />
                </div>
              ) : (
                <Navigate to="/dashboard" />
              )
            } />
            <Route path="/dashboard/*" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}