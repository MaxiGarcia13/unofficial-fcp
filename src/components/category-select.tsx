import type { SelectProps } from './select'
import type { Gender } from '@/types'
import { Select } from './select'

interface CategoryGroupSelectProps extends Omit<SelectProps, 'options'> {
  gender: Gender
}

const placeholder = { value: '', label: 'Seleccionar grupo…' }

const masculinCategoryOptions = [
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
]

const femeninCategoryOptions = [
  '1ª CATEGORIA FEMENINA - GRUPO A',
  '1ª CATEGORIA FEMENINA - GRUPO B',
  '2ª CATEGORIA FEMENINA - GRUPO A',
  '2ª CATEGORIA FEMENINA - GRUPO B',
  '2ª CATEGORIA FEMENINA - GRUPO C',
  '3ª CATEGORIA FEMENINA - GRUPO A',
  '3ª CATEGORIA FEMENINA - GRUPO B',
  '3ª CATEGORIA FEMENINA - GRUPO C',
  '4ª CATEGORIA FEMENINA - GRUPO A',
  '4ª CATEGORIA FEMENINA - GRUPO B',
  '4ª CATEGORIA FEMENINA - GRUPO C',
  '5ª CATEGORIA FEMENINA - GRUPO A',
  '5ª CATEGORIA FEMENINA - GRUPO B',
  '5ª CATEGORIA FEMENINA - GRUPO C',
  '5ª CATEGORIA FEMENINA - GRUPO D',
]

function categoryOptions(gender: Gender) {
  if (gender === 'MASCULINO') {
    return masculinCategoryOptions.map(option => ({ value: option, label: option }))
  }
  return femeninCategoryOptions.map(option => ({ value: option, label: option }))
}

/** Category / group picker — full width in filter rows; styles live in `Select`. */
export function CategoryGroupSelect({ className, gender, ...props }: CategoryGroupSelectProps) {
  const options = [placeholder, ...categoryOptions(gender)]
  return (
    <Select
      {...props}
      className={['w-full min-w-0', className].filter(Boolean).join(' ')}
      options={options}
    />
  )
}
