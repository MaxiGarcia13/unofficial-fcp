import { cn } from '../utils/classes'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  children: React.ReactNode
}

export function Field({ label, children, id, ...props }: FieldProps) {
  return (
    <div className={cn('relative', props.className)} {...props}>
      {
        label
        && (
          <label htmlFor={id} className="block mb-2.5 text-sm font-medium text-heading">
            {label}
          </label>
        )
      }
      {children}
    </div>
  )
}
