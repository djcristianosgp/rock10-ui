import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, disabled, id, onChange, ...props }, ref) => {
    const checkboxId = id || (typeof label === 'string' ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'inline-flex items-start gap-2.5 select-none cursor-pointer group',
          disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
          className
        )}
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface transition-all flex items-center justify-center peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/30 group-hover:border-primary-500/60 shadow-xs',
              checked && 'bg-primary-500 border-primary-500 text-white'
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
          </div>
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

Checkbox.displayName = 'Checkbox';
export default Checkbox;
