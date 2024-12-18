import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function Input({ 
  label, 
  icon,
  className = '',
  ...props 
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          className={`shadow appearance-none border rounded w-full py-2 
            ${icon ? 'px-10' : 'px-3'} 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}