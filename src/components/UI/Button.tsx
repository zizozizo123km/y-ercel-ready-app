import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...rest
}) => {

  // Base classes applied to all buttons
  const baseClasses = 'flex items-center justify-center font-semibold transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';

  // Classes based on size
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }[size];

  // Classes based on variant (mimicking Facebook styling)
  const variantClasses = {
    // Primary (Standard Facebook Blue)
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400 disabled:hover:bg-blue-400',
    // Secondary (Neutral/Light Grey, common for post actions or secondary CTAs)
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:bg-gray-100',
    // Danger (Red)
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400 disabled:hover:bg-red-400',
    // Text (For link-style buttons, like "Comment" or "Share")
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-200 p-0',
  }[variant];

  const fullWidthClass = fullWidth ? 'w-full' : 'w-auto';

  const loadingClasses = loading ? 'opacity-70 cursor-wait' : '';
  
  const finalClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${fullWidthClass} ${loadingClasses} ${className}`;

  // Determine if the button should be disabled
  const isDisabled = disabled || loading;

  const getSpinnerColor = () => {
    return (variant === 'primary' || variant === 'danger') ? 'text-white' : 'text-gray-500';
  }

  return (
    <button
      className={finalClasses}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          {/* Simple SVG Loading Spinner */}
          <svg 
            className={`animate-spin h-5 w-5 ${getSpinnerColor()} ${variant !== 'text' ? 'mr-3' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {variant !== 'text' ? children : null}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;