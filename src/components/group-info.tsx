import type { TableColumn } from '@/components/table/types';
import type { Group } from '@/types/group-info';
import type { Ranking } from '@/types/ranking';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
import { useParams } from '@/hooks/useParams';
import { request } from '@/utils/request';
import { MatchBlock } from './match-block';

const rankingColumns: TableColumn<Ranking>[] = [
  { key: 'position', label: 'Pos.', className: 'w-14' },
  { key: 'team', label: 'Equipo' },
  { key: 'matchups', label: 'Enfrentamientos' },
  { key: 'pointsWon', label: 'Pts.' },
  { key: 'matchesPlayed', label: 'PJ' },
  { key: 'matchesWon', label: 'PG' },
];

export function GroupInfo() {
  const { params } = useParams();

  const { data, error, loading, fetchResult } = useResults<Group>(
    () =>
      request<Group>('/api/group-info', {
        params: {
          gender: params.get('gender'),
          group: params.get('group'),
        },
      }),
    [params.toString()],
  );

  const ranking = data?.ranking ?? [];
  const calendar = data?.calendarMatches;

  return (
    <div className="flex min-w-0 flex-col gap-8 w-full mt-4">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-100 w-full">Tabla de posiciones</h2>

        <Table<Ranking>
          className="w-full"
          columns={rankingColumns}
          data={ranking}
          loading={loading}
          error={error}
          emptyMessage="Sin datos de clasificación"
          fillHeight={false}
          getRowKey={row => `${row.position}-${row.team}`}

        />
        {error && (
          <button
            type="button"
            onClick={() => fetchResult()}
            className="mt-3 text-sm text-blue-400 hover:text-blue-300"
          >
            Reintentar
          </button>
        )}
      </section>

      {!loading && !error && calendar && (
        <section>
          <h2 className="text-lg font-semibold text-gray-100">Calendario</h2>
          <MatchBlock title="Esta semana" matches={calendar.thisWeek ?? []} />
          {Object.entries(calendar.upcoming ?? {}).map(([label, matches]) => (
            <MatchBlock key={label} title={label} matches={matches} />
          ))}
        </section>
      )}
    </div>
  );
}
