import React, { useState } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { isAppError } from '../../utils/error';
import { passwordSchema } from '../../services/auth/validation';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const signUp = useAuthStore((state) => state.signUp);

  const validatePassword = (value: string) => {
    try {
      passwordSchema.parse(value);
      setPasswordError(null);
    } catch (err) {
      if (err instanceof Error) {
        setPasswordError(err.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await signUp(email, password);
      setSuccess(true);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error signing up:', err);
      setError(
        isAppError(err) 
          ? err.message 
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Please check your email for the confirmation link!
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<Mail size={20} />}
        />
        
        <div className="mb-6">
          <Input
            label="Password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            icon={<Lock size={20} />}
            minLength={6}
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
          )}
          <p className="mt-1 text-sm text-gray-600">
            Password must contain at least 6 characters, including uppercase, lowercase, and numbers
          </p>
        </div>
        
        <Button
          type="submit"
          loading={loading}
          icon={<UserPlus size={20} />}
          className="w-full"
          disabled={!!passwordError}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}