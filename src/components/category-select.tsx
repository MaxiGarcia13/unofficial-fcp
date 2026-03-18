import type { SelectProps } from './select'
import { Select } from './select'

interface CategoryGroupSelectProps extends Omit<SelectProps, 'options'> {}

const placeholder = { value: '', label: 'Seleccionar grupo…' }

const categoryOptions = [
  '1ª CATEGORIA MASCULINA - GRUPO A',
  '1ª CATEGORIA MASCULINA - GRUPO B',
  '2ª CATEGORIA MASCULINA - GRUPO A',
  '2ª CATEGORIA MASCULINA - GRUPO B',
  '2ª CATEGORIA MASCULINA - GRUPO C',
  '3ª CATEGORIA MASCULINA - GRUPO A',
  '3ª CATEGORIA MASCULINA - GRUPO B',
  '3ª CATEGORIA MASCULINA - GRUPO C',
  '3ª CATEGORIA MASCULINA - GRUPO D',
  '4ª CATEGORIA MASCULINA - GRUPO A',
  '4ª CATEGORIA MASCULINA - GRUPO B',
  '4ª CATEGORIA MASCULINA - GRUPO C',
  '4ª CATEGORIA MASCULINA - GRUPO D',
  '5ª CATEGORIA MASCULINA - GRUPO A',
  '5ª CATEGORIA MASCULINA - GRUPO B',
  '5ª CATEGORIA MASCULINA - GRUPO C',
  '5ª CATEGORIA MASCULINA - GRUPO D',
  '6ª CATEGORIA MASCULINA - GRUPO A',
  '6ª CATEGORIA MASCULINA - GRUPO B',
  '6ª CATEGORIA MASCULINA - GRUPO C',
  '6ª CATEGORIA MASCULINA - GRUPO D',
  '6ª CATEGORIA MASCULINA - GRUPO E',
  '6ª CATEGORIA MASCULINA - GRUPO F',
].map(option => ({ value: option, label: option }))

const options = [placeholder, ...categoryOptions]

/** Category / group picker — full width in filter rows; styles live in `Select`. */
export function CategoryGroupSelect({ className, ...props }: CategoryGroupSelectProps) {
  return (
    <Select
      {...props}
      className={['w-full min-w-0', className].filter(Boolean).join(' ')}
      options={options}
    />
  )
}
