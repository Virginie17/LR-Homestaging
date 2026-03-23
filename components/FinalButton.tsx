"use client";
import { trackEvent } from '../lib/analytics';

interface FinalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function FinalButton({ children, onClick, className }: FinalButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
