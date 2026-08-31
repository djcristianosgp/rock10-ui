import { SVGProps } from 'react';
import { cn } from '../utils/cn';

export interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'full' | 'icon';
  themeMode?: 'auto' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({
  variant = 'full',
  themeMode = 'auto',
  size = 'md',
  className,
  ...props
}: LogoProps) {
  const sizeClasses = {
    sm: variant === 'full' ? 'h-6 w-auto' : 'h-6 w-6',
    md: variant === 'full' ? 'h-8 w-auto' : 'h-8 w-8',
    lg: variant === 'full' ? 'h-10 w-auto' : 'h-10 w-10',
    xl: variant === 'full' ? 'h-12 w-auto' : 'h-12 w-12',
  };

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        <rect width="40" height="40" rx="10" fill="#0EA571" />
        <path
          d="M12 28V12H21C23.7614 12 26 14.2386 26 17C26 19.7614 23.7614 22 21 22H16V28H12Z"
          fill="white"
        />
        <path
          d="M20 21L26 28H21L16.5 22.5H20V21Z"
          fill="#FF6B35"
        />
        <circle cx="28" cy="14" r="3" fill="#FF6B35" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      {/* Icon Emblem */}
      <rect width="40" height="40" rx="10" fill="#0EA571" />
      <path
        d="M12 28V12H21C23.7614 12 26 14.2386 26 17C26 19.7614 23.7614 22 21 22H16V28H12Z"
        fill="white"
      />
      <path
        d="M20 21L26 28H21L16.5 22.5H20V21Z"
        fill="#FF6B35"
      />
      <circle cx="28" cy="14" r="3" fill="#FF6B35" />

      {/* Typography ROCK */}
      <text
        x="48"
        y="28"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill={themeMode === 'light' ? '#0F1419' : themeMode === 'dark' ? '#FFFFFF' : 'currentColor'}
        letterSpacing="-0.5px"
      >
        ROCK
      </text>

      {/* Typography 10 */}
      <text
        x="112"
        y="28"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="20"
        fontWeight="900"
        fill="#0EA571"
      >
        10
      </text>
    </svg>
  );
}

export default Logo;
