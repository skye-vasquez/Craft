'use client';

type BadgeVariant = 'submitted' | 'reviewed' | 'pending' | 'failed' | 'success' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  submitted: 'bg-nb-yellow',
  reviewed: 'bg-nb-green',
  pending: 'bg-nb-orange',
  failed: 'bg-nb-red text-white',
  success: 'bg-nb-teal',
  default: 'bg-nb-gray',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1
        font-heading font-bold text-sm uppercase tracking-wide
        border-3 border-nb-black
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
