import { cn } from '@/utils/classes';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: React.ReactNode;
}

export function Field({ label, children, id, ...props }: FieldProps) {
  return (
    <div className={cn('block text-cantabria-muted', props.className)} {...props}>
      {
        label
        && (
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-cantabria-text">
            {label}
          </label>
        )
      }
      {children}
    </div>
  );
}
