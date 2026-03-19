import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/classes';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional fixed width (e.g. "100%", "4rem") */
  width?: string | number;
  /** Optional fixed height (e.g. "1rem", "2.5rem") */
  height?: string | number;
}

export function Skeleton({
  className,
  width,
  height,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-pulse rounded-lg bg-gray-600/50',
        className,
      )}
      style={{
        ...style,
        ...(width != null && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height != null && { height: typeof height === 'number' ? `${height}px` : height }),
      }}
      {...rest}
    />
  );
}
