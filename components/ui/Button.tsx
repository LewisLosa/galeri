import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className = '', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      ghost: 'bg-black/50 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white',
    };

    const sizeClasses = {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
      <button ref={ref} className={classes} disabled={isLoading} {...props}>
        {isLoading ? (
          <div className="w-5 h-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';