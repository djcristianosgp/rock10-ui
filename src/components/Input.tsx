import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      clearable = false,
      onClear,
      inputSize = 'md',
      fullWidth = true,
      disabled,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const sizeClasses = {
      sm: 'h-8 px-2.5 text-xs rounded-lg',
      md: 'h-10 px-3.5 text-sm rounded-xl',
      lg: 'h-12 px-4 text-base rounded-xl',
    };

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-dark-text"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {startIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 dark:text-dark-text-muted">
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            value={value}
            className={cn(
              'w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 font-medium transition-all focus:outline-none focus:bg-white dark:focus:bg-dark-bg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-gray-100 dark:disabled:bg-dark-surface disabled:opacity-60 disabled:cursor-not-allowed',
              sizeClasses[inputSize],
              startIcon && 'pl-10',
              (endIcon || (clearable && value)) && 'pr-10',
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-300',
              className
            )}
            {...props}
          />

          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {!clearable && endIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-gray-400 dark:text-dark-text-muted">
              {endIcon}
            </div>
          )}
        </div>

        {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-gray-500 dark:text-dark-text-muted">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
