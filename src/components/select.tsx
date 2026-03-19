import { useId } from 'react';
import { cn } from '@/utils/classes';
import { Field } from './field';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  options: { value: string; label: string }[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Select({
  options,
  label,
  className,
  id,
  name,
  value,
  onChange,
  ...props
}: SelectProps) {
  const selectId = id || name || useId();

  return (
    <Field label={label} id={selectId} className={cn('group min-w-0', className)}>
      <div className="relative">
        <select
          id={selectId}
          name={name}
          className={cn(
            'w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-cantabria-border bg-cantabria-surface py-2.5 pl-3 pr-10',
            'text-sm text-cantabria-text',
            'transition-colors duration-150',
            'hover:border-cantabria-dark hover:bg-cantabria-dark-muted',
            'focus:border-cantabria-red focus:outline-none focus:ring-1 focus:ring-cantabria-red',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-cantabria-muted group-focus-within:text-cantabria-red"
          aria-hidden
        >
          <ChevronIcon />
        </span>
      </div>
    </Field>
  );
}
