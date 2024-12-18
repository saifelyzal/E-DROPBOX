import React from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'danger';
  icon?: React.ReactNode;
}

export function Button({ 
  children, 
  loading, 
  variant = 'primary', 
  icon,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center";
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}