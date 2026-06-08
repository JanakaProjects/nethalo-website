import React from 'react';
import cn from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className,
  ...rest
}) => {
  const baseClasses = cn(
    'font-medium',
    'rounded-xl',
    'flex',
    'items-center',
    'justify-center',
    'transition',
    'duration-300',
    'ease-out',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-brand-blue',
    {
      'py-2 px-4 text-sm': size === 'sm',
      'py-3 px-6 text-base': size === 'md',
      'py-4 px-8 text-lg': size === 'lg',
      'w-full': fullWidth,
    }
  );

  const variantClasses = cn({
    'glass-button': true,
    'bg-brand-blue text-white border-brand-blue': variant === 'primary',
    'bg-white text-brand-blue border-white': variant === 'secondary',
    'bg-transparent text-brand-blue border-brand-blue': variant === 'outline',
    'bg-transparent text-white': variant === 'ghost',
    'bg-red-600 text-white border-red-600': variant === 'danger',
    'opacity-50 cursor-not-allowed': disabled || loading,
  });

  return (
    <button
      className={cn(baseClasses, variantClasses, className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};