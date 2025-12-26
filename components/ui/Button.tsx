'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  loading?: boolean;
}

const variantClasses = {
  primary: 'bg-nb-yellow hover:bg-nb-yellow-dark',
  secondary: 'bg-white hover:bg-nb-gray',
  danger: 'bg-nb-red text-white hover:bg-red-500',
  success: 'bg-nb-green hover:bg-green-500',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', loading, disabled, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 px-6 py-3
          font-heading font-bold text-lg
          border-3 border-nb-black shadow-nb
          transition-all duration-100
          hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-nb-sm
          active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-nb
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
