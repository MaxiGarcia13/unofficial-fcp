import type { Gender } from '@/types';
import { useRef, useState } from 'react';
import { cn } from '@/utils/classes';
import { Field } from './field';

const options: { value: Gender; label: string }[] = [
  { value: 'MASCULINO', label: 'Masculino' },
  { value: 'FEMENINO', label: 'Femenino' },
];

export interface GenderSwitchProps {
  label?: string;
  name?: string;
  value?: Gender;
  onChange?: (value: Gender) => void;
}

export function GenderSwitch({ label, name, value = 'MASCULINO', onChange }: GenderSwitchProps) {
  const [active, setActive] = useState<Gender>(value);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  return (
    <Field
      id={name}
      label={label}
      role="radiogroup"
      aria-label={label}
    >
      <div className="inline-flex overflow-hidden rounded-lg shadow-sm">
        {options.map((opt, i) => {
          const isActive = active === opt.value;
          const isFirst = i === 0;
          const isLast = i === options.length - 1;
          return (
            <button
              key={opt.value}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              type="button"
              role="radio"
              tabIndex={value ? 0 : -1}
              aria-checked={isActive}
              onClick={() => {
                setActive(opt.value);
                onChange?.(opt.value);
              }}
              className={cn(
                'min-w-22 border cursor-pointer border-gray-600 px-4 py-2.5 text-sm font-medium transition-colors',
                !isFirst && '-ml-px',
                isFirst && 'rounded-l-lg',
                isLast && 'rounded-r-lg',
                isActive
                  ? 'relative z-10 border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600',
                'focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <input type="hidden" name={name} value={active} />
    </Field>
  );
}
