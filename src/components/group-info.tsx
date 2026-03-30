import type { TableColumn } from '@/components/table/types';
import type { Gender } from '@/types';
import type { Group } from '@/types/group';
import type { Ranking } from '@/types/ranking';
import { navigate } from 'astro:transitions/client';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
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

export function GroupInfo({ gender, group }: { gender: Gender; group: string }) {
  const { data, error, loading, fetchResult } = useResults<Group>(
    () =>
      request<Group>('/api/group', {
        params: {
          gender,
          group,
        },
      }),
    [],
  );

  const ranking = data?.ranking ?? [];
  const calendar = data?.calendarMatches;

  return (
    <div className="flex min-w-0 w-full flex-col gap-8">
      <section>
        <h2 className="mb-3 w-full text-lg font-semibold text-cantabria-text">
          Tabla de posiciones
        </h2>

        <Table<Ranking>
          className="w-full"
          columns={rankingColumns}
          data={ranking}
          loading={loading}
          error={error}
          onRetry={fetchResult}
          emptyMessage="Sin datos de clasificación"
          fillHeight={false}
          getRowKey={row => `${row.position}-${row.team}`}
          onRowClick={(row) => {
            navigate(`/${gender}-${group}/${row.team}`);
          }}

        />

      </section>

      {!loading && !error && calendar && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-cantabria-text">
            Calendario
          </h2>

          <div className="flex flex-col gap-6">
            <MatchBlock
              title="Esta semana"
              matches={calendar.thisWeek ?? []}
              gender={gender}
              group={group}
            />

            {Object.entries(calendar.upcoming ?? {}).map(([label, matches]) => (
              <MatchBlock
                key={label}
                title={label}
                matches={matches}
                gender={gender}
                group={group}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
