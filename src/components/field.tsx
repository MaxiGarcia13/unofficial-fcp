import { cn } from '@/utils/classes'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  children: React.ReactNode
}

export function Field({ label, children, id, ...props }: FieldProps) {
  return (
    <div className={cn('block text-gray-400', props.className)} {...props}>
      {
        label
        && (
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-100">
            {label}
          </label>
        )
      }
      {children}
    </div>
  )
}
