import { cn } from '@/utils/classes';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Badge({ children, ...props }: BadgeProps) {
  return (
    <span
      className={
        cn(
          'shrink-0 self-start rounded-lg px-2.5 py-0.5',
          'border border-cantabria-dark bg-cantabria-dark/40 text-xs font-medium text-cantabria-muted',
        )
      }
      {...props}
    >
      {children}
    </span>
  );
}
