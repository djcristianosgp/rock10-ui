import { ReactNode } from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  onClose,
  className,
}: AlertProps) {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />,
    },
    success: {
      container: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    },
    warning: {
      container: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
    },
    danger: {
      container: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/60 text-red-900 dark:text-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />,
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-xl border flex items-start gap-3 relative transition-all',
        style.container,
        className
      )}
    >
      <div className="mt-0.5">{icon || style.icon}</div>
      <div className="flex-1 text-sm">
        {title && <h5 className="font-bold text-sm mb-1">{title}</h5>}
        <div className="font-medium text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;
