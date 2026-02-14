
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-sans font-medium text-[0.88rem] tracking-[0.04em] transition-all duration-220 text-center flex items-center justify-center";
  
  const variants = {
    primary: "bg-deep text-white hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(160,80,96,0.3)] disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none",
    ghost: "border border-rose text-deep hover:bg-rose/10 hover:border-deep active:bg-rose/20"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
