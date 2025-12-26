'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  const hoverClasses = hoverable
    ? 'cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-nb-sm transition-all'
    : '';

  return (
    <div
      className={`
        bg-white border-3 border-nb-black shadow-nb p-4 md:p-6
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
