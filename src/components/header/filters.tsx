import type { Gender } from '@/types';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CategoryGroupSelect } from '../category-select';
import { GenderSwitch } from '../gender-switch';

const FILTERS_STORAGE_KEY = 'unofficial-fcp.filters';
const DEFAULT_GENDER: Gender = 'MASCULINO';

export function Filters(props: { gender?: Gender; group?: string }) {
  const initialGender = props.gender ?? DEFAULT_GENDER;
  const initialGroup = props.group ?? '';
  const filtersStorage = useLocalStorage<{ gender: Gender; group: string }>(FILTERS_STORAGE_KEY);

  const stored = filtersStorage.get();

  const [gender, setGender] = useState<Gender>(stored?.gender ?? initialGender);
  const [group, setGroup] = useState(stored?.group ?? initialGroup);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!group.length || !gender.length)
      return;

    navigate(`/${gender}-${group}`);
  };

  const handleGenderChange = (value: Gender) => {
    setGender(value);
    setGroup('');

    filtersStorage.set({
      gender: value,
      group: '',
    });
  };

  const handleGroupChange = (value: string) => {
    setGroup(value);

    filtersStorage.set({
      gender,
      group: value,
    });
  };

  return (
    <form
      className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4"
      aria-label="Filtros de búsqueda"
      onSubmit={handleSubmit}
    >
      <div className="shrink-0 sm:max-w-none">
        <GenderSwitch
          name="gender"
          label="Género"
          value={gender}
          onChange={handleGenderChange}
        />
      </div>

      <div className="min-w-0 flex-1 sm:min-w-48">
        <CategoryGroupSelect
          name="group"
          label="Grupo / Categoría"
          gender={gender}
          value={group}
          onChange={handleGroupChange}
        />
      </div>

      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-lg bg-cantabria-red px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-red-700 active:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cantabria-red focus-visible:ring-offset-2 focus-visible:ring-offset-cantabria-surface sm:self-end"
      >
        Buscar
      </button>
    </form>
  );
}
