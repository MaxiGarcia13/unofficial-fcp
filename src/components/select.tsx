import { useId } from 'react'
import { cn } from '../utils/classes'
import { Field } from './field'

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: { value: string, label: string }[]
  value: string
  onChange: (value: string) => void
  label?: string
}

export function Select({ options, onChange, ...props }: SelectProps) {
  const id = props.id || props.name || useId()

  return (
    <Field label={props.label} id={id} className={props.className}>
      <select
        id={id}
        className={cn(
          'w-full p-2 rounded',
          'border border-neutral-300 focus:border-blue-500 outline-none',
          'text-heading text-sm placeholder:text-body',
          props.className,
        )}
        onChange={event => onChange?.(event.target.value)}
        {...props}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
