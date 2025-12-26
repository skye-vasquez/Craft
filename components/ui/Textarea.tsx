'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block font-heading font-bold text-lg mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3
            font-body text-lg
            border-3 border-nb-black
            bg-white
            focus:outline-none focus:ring-0 focus:shadow-nb
            placeholder:text-nb-gray-dark
            min-h-[120px] resize-y
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

Textarea.displayName = 'Textarea';
