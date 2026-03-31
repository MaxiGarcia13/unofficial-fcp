import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/classes';
import { Field } from './field';

export interface SwitchOption<TValue extends string = string> {
  value: TValue;
  label: string;
}

export interface SwitchProps<TValue extends string = string> {
  options: SwitchOption<TValue>[];
  label?: string;
  name?: string;
  value?: TValue;
  onChange?: (value: TValue) => void;
  className?: string;
}

export function Switch<TValue extends string = string>({
  options,
  label,
  name,
  value,
  onChange,
  className,
}: SwitchProps<TValue>) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  if (options.length < 2)
    return null;

  const activeIndex = options.findIndex(option => option.value === value);

  function activateOption(index: number) {
    const next = options[index];
    if (!next)
      return;

    onChange?.(next.value);
  }

  function focusOption(index: number) {
    buttonsRef.current[index]?.focus();
  }

  return (
    <Field
      id={name}
      label={label}
      role="radiogroup"
      aria-label={label}
      className={className}
    >
      <div className="inline-flex overflow-hidden rounded-lg shadow-sm">
        {options.map((option, i) => {
          const isActive = value === option.value;
          const isFirst = i === 0;
          const isLast = i === options.length - 1;

          return (
            <button
              key={option.value}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              type="button"
              role="radio"
              tabIndex={isActive ? 0 : -1}
              aria-checked={isActive}
              onClick={() => activateOption(i)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                  event.preventDefault();
                  const nextIndex = (activeIndex + 1) % options.length;
                  activateOption(nextIndex);
                  focusOption(nextIndex);
                }
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  const previousIndex = (activeIndex - 1 + options.length) % options.length;
                  activateOption(previousIndex);
                  focusOption(previousIndex);
                }
              }}
              className={cn(
                'min-w-22 cursor-pointer border border-cantabria-border px-4 py-2.5 text-sm font-medium transition-colors duration-150',
                !isFirst && '-ml-px',
                isFirst && 'rounded-l-lg',
                isLast && 'rounded-r-lg',
                isActive
                  ? 'relative z-10 border-cantabria-red bg-cantabria-red text-white hover:border-red-700 hover:bg-red-700'
                  : 'border-cantabria-border bg-cantabria-surface text-cantabria-text hover:border-cantabria-muted hover:bg-cantabria-dark-muted',
                'focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cantabria-red focus-visible:ring-offset-2 focus-visible:ring-offset-cantabria-bg',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <input type="hidden" name={name} value={value} />
    </Field>
  );
}
