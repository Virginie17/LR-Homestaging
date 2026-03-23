"use client";
import { trackEvent } from '../lib/analytics';

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function HeroButton({ children, onClick, className }: HeroButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
