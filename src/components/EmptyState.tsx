import { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'error' | 'search';
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action,
  variant = 'default'
}: EmptyStateProps): JSX.Element => {

  // Icon variants
  const iconVariants = {
    default: "text-primary-500 bg-primary-50 dark:bg-primary-950/20",
    error: "text-red-500 bg-red-50 dark:bg-red-950/20",
    search: "text-secondary-500 bg-secondary-50 dark:bg-secondary-950/20"
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[300px] sm:min-h-[400px] animate-fadeIn group"
    )}>
      {icon && (
        <div className={cn(
          "flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 text-4xl sm:text-[48px] rounded-full transition-all duration-200 group-hover:scale-105 group-hover:bg-opacity-80",
          iconVariants[variant]
        )}>
          {icon}
        </div>
      )}
      
      <div className="max-w-[500px] mb-6 space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-dark-text leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button 
          className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md transition-all duration-200 cursor-pointer hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0 min-h-[44px]"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
