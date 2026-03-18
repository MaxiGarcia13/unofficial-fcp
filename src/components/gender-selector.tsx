import type { SelectProps } from './select'
import { Select } from './select'

type Gender = 'FEMENINO' | 'MASCULINO'
const options: { value: Gender, label: Gender }[] = [
  { value: 'FEMENINO', label: 'FEMENINO' },
  { value: 'MASCULINO', label: 'MASCULINO' },
]

interface GenderSelectorProps extends Omit<SelectProps, 'value' | 'options'> {
  value?: Gender
  onChange: (value: Gender) => void
}

export function GenderSelector(
  { value = 'MASCULINO', onChange }: GenderSelectorProps,
) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}
