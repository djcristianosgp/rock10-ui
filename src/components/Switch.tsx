import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  description?: string;
  switchSize?: 'sm' | 'md' | 'lg';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, checked, disabled, switchSize = 'md', id, onChange, ...props }, ref) => {
    const switchId = id || (typeof label === 'string' ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const trackSizes = {
      sm: 'w-8 h-4.5',
      md: 'w-11 h-6',
      lg: 'w-14 h-7.5',
    };

    const thumbSizes = {
      sm: 'w-3.5 h-3.5 translate-x-0.5 peer-checked:translate-x-4',
      md: 'w-5 h-5 translate-x-0.5 peer-checked:translate-x-5.5',
      lg: 'w-6.5 h-6.5 translate-x-0.5 peer-checked:translate-x-7',
    };

    return (
      <label
        htmlFor={switchId}
        className={cn(
          'inline-flex items-center gap-3 select-none cursor-pointer group',
          disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
          className
        )}
      >
        <div className="relative inline-flex items-center shrink-0">
          <input
            id={switchId}
            ref={ref}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'rounded-full bg-gray-200 dark:bg-dark-surface-light peer-checked:bg-primary-500 transition-colors duration-200 ease-in-out border border-transparent shadow-inner',
              trackSizes[switchSize]
            )}
          />
          <div
            className={cn(
              'absolute bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out pointer-events-none',
              thumbSizes[switchSize]
            )}
          />
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text leading-tight">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
export default Switch;
