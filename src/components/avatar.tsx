import { cn } from '@/utils/classes';

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent';
}

export function Avatar({ tone = 'neutral', className, children, ...props }: AvatarProps) {
  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full border border-cantabria-border text-xs font-semibold text-cantabria-text',
        tone === 'accent' ? 'bg-cantabria-red/20' : 'bg-cantabria-dark',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
