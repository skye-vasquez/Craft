'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block font-heading font-bold text-lg mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            font-body text-lg
            border-3 border-nb-black
            bg-white
            focus:outline-none focus:ring-0 focus:shadow-nb
            placeholder:text-nb-gray-dark
            ${error ? 'border-nb-red' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-nb-red font-bold text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
