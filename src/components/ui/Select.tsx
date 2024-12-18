import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Select({ 
  label, 
  error, 
  icon,
  className = '',
  children,
  ...props 
}: SelectProps) {
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
        <select
          className={`
            shadow appearance-none border rounded w-full 
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
}