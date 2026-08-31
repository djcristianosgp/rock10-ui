import { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  actions,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        {breadcrumb && <div className="text-xs text-gray-500 mb-0.5">{breadcrumb}</div>}
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text tracking-tight">
            {title}
          </h1>
          {badge && <div>{badge}</div>}
        </div>
        {description && (
          <div className="text-sm text-gray-500 dark:text-dark-text-muted mt-0.5 font-medium">
            {description}
          </div>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">{actions}</div>
      )}
    </div>
  );
}

export default PageHeader;
