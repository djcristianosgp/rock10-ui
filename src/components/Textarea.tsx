import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = true,
      disabled,
      rows = 3,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-dark-text"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={cn(
            'w-full p-3 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium rounded-xl transition-all focus:outline-none focus:bg-white dark:focus:bg-dark-bg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-gray-100 dark:disabled:bg-dark-surface disabled:opacity-60 disabled:cursor-not-allowed resize-y',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-300',
            className
          )}
          {...props}
        />

        {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-gray-500 dark:text-dark-text-muted">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
