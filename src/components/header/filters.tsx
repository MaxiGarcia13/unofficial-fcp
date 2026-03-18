import type { Gender } from '@/types'
import { navigate } from 'astro:transitions/client'
import { useParams } from '@/hooks/useParams'
import { CategoryGroupSelect } from '../category-select'
import { GenderSwitch } from '../gender-switch'

export function Filters() {
  const { params } = useParams()

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (params.get('group').length === 0)
      return

    navigate(`/group-info?${params.toString()}`)
  }

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
          value={params.get?.('gender') as Gender || 'MASCULINO'}
          onChange={value => params.set('gender', value)}
        />
      </div>

      <div className="min-w-0 flex-1 sm:min-w-48">
        <CategoryGroupSelect
          name="group"
          label="Grupo / categoría"
          value={params.get?.('group')}
          onChange={value => params.set('group', value)}
        />
      </div>

      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/50 focus:ring-offset-2 focus:ring-offset-gray-900 sm:self-end"
      >
        Buscar
      </button>
    </form>
  )
}
