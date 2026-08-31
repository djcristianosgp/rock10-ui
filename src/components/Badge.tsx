import { HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center font-bold tracking-tight transition-colors select-none shrink-0',
  {
    variants: {
      variant: {
        success:
          'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60',
        danger:
          'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/60',
        warning:
          'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
        info:
          'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60',
        purple:
          'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60',
        neutral:
          'bg-gray-100 dark:bg-dark-surface-light text-gray-700 dark:text-dark-text-muted border border-gray-200 dark:border-dark-border',
        primary:
          'bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/60',
        secondary:
          'bg-secondary-50 dark:bg-secondary-950/30 text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-800/60',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5 gap-1',
        md: 'text-xs px-2.5 py-1 gap-1.5',
      },
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'sm',
      shape: 'pill',
    },
  }
);

const dotColors = {
  success: 'bg-emerald-500',
  danger: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  purple: 'bg-purple-500',
  neutral: 'bg-gray-400',
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
};

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  dot?: boolean;
  pulseDot?: boolean;
}

export function Badge({
  className,
  variant = 'neutral',
  size = 'sm',
  shape = 'pill',
  dot = false,
  pulseDot = false,
  children,
  ...props
}: BadgeProps) {
  const currentVariant = variant || 'neutral';
  const dotColor = dotColors[currentVariant as keyof typeof dotColors] || 'bg-gray-400';

  return (
    <span
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulseDot && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColor
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', dotColor)} />
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
