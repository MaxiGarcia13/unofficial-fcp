import type { Gender } from '@/types';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { CategoryGroupSelect } from '../category-select';
import { GenderSwitch } from '../gender-switch';

const FILTERS_STORAGE_KEY = 'unofficial-fcp.filters';
const DEFAULT_GENDER: Gender = 'MASCULINO';

function readStoredFilters() {
  const rawValue = localStorage.getItem(FILTERS_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!parsed) {
      return null;
    }

    return { gender: parsed.gender, group: parsed.group };
  } catch {
    return null;
  }
}

export function Filters(props: { gender?: Gender; group?: string }) {
  const initialGender = props.gender ?? DEFAULT_GENDER;
  const initialGroup = props.group ?? '';

  const stored = readStoredFilters();

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

    localStorage.setItem(
      FILTERS_STORAGE_KEY,
      JSON.stringify({
        gender: value,
        group: '',
      }),
    );
  };

  const handleGroupChange = (value: string) => {
    setGroup(value);

    localStorage.setItem(
      FILTERS_STORAGE_KEY,
      JSON.stringify({
        gender,
        group: value,
      }),
    );
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
          label="Grupo / categoría"
          gender={gender}
          value={group}
          onChange={handleGroupChange}
        />
      </div>

      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-lg bg-cantabria-red px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-cantabria-red focus:ring-offset-2 focus:ring-offset-cantabria-surface sm:self-end"
      >
        Buscar
      </button>
    </form>
  );
}
