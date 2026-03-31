import { useId } from 'react';
import { cn } from '@/utils/classes';
import { Field } from './field';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function Input({
  label,
  className,
  id,
  name,
  value,
  onChange,
  error,
  ...props
}: InputProps) {
  const inputId = id || name || useId();

  return (
    <Field label={label} id={inputId} className={cn('min-w-0', className)} error={error}>
      <input
        id={inputId}
        name={name}
        className={cn(
          'w-full min-w-0 rounded-lg border border-cantabria-border bg-cantabria-surface px-3 py-2.5',
          'text-sm text-cantabria-text',
          'transition-colors duration-150',
          'hover:border-cantabria-muted hover:bg-cantabria-dark-muted active:bg-cantabria-dark-muted/80',
          'focus:border-cantabria-red focus:outline-none focus:ring-1 focus:ring-cantabria-red',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        {...props}
      />
    </Field>
  );
}
