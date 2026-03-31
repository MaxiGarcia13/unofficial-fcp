import type { Gender } from '@/types';
import { Switch } from './switch';

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
  return (
    <Switch<Gender>
      options={options}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
