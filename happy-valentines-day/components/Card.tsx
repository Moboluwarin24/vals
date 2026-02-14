
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-border-soft rounded-[18px] p-8 md:p-11 shadow-[0_6px_40px_rgba(160,80,96,0.11)] w-full max-w-[540px] animate-rise ${className}`}>
      {children}
    </div>
  );
};

export default Card;
