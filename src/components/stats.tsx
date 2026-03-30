import type { TableColumn } from '@/components/table/types';
import type { Gender } from '@/types';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
import { request } from '@/utils/request';

interface RankingEntry {
  name: string;
  wonGames: number;
  lostGames: number;
}

interface StatsResponse {
  playersRanking: RankingEntry[];
  couplesRanking: RankingEntry[];
}

interface StatsRow extends RankingEntry {
  balance: number;
}

const rankingColumns: TableColumn<StatsRow>[] = [
  {
    key: 'name',
    label: 'Nombre',
  },
  {
    key: 'wonGames',
    label: 'Ganados',
  },
  {
    key: 'lostGames',
    label: 'Perdidos',
  },
  {
    key: 'balance',
    label: 'Balance',
  },
];

function withBalance(ranking: RankingEntry[]): StatsRow[] {
  return (ranking ?? []).map(entry => ({
    ...entry,
    balance: entry.wonGames - entry.lostGames,
  }));
}

export function Stats({
  gender,
  group,
  teamName,
}: {
  gender: Gender;
  group: string;
  teamName: string;
}) {
  const { data, error, loading, fetchResult } = useResults<StatsResponse>(
    () =>
      request<StatsResponse>('/api/stats', {
        params: {
          gender,
          group,
          team: teamName,
        },
      }),
    [gender, group, teamName],
  );

  const playersRanking = withBalance(data?.playersRanking ?? []);
  const couplesRanking = withBalance(data?.couplesRanking ?? []);

  return (
    <section className="mt-6 flex flex-col gap-6">
      <div>
        <h2 className="mb-3 text-lg font-semibold text-cantabria-text">
          Quien gana más partidos?
        </h2>

        <Table<StatsRow>
          className="w-full"
          columns={rankingColumns}
          data={playersRanking}
          loading={loading}
          error={error}
          emptyMessage="Sin datos de ranking de jugadores"
          fillHeight={false}
          getRowKey={row => `${row.name}-players`}
        />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-cantabria-text">
          Que pareja gana más partidos?
        </h2>

        <Table<StatsRow>
          className="w-full"
          columns={rankingColumns}
          data={couplesRanking}
          loading={loading}
          error={error}
          emptyMessage="Sin datos de ranking de parejas"
          fillHeight={false}
          getRowKey={row => `${row.name}-couples`}
        />
      </div>

      {error && (
        <button
          type="button"
          onClick={() => fetchResult()}
          className="w-fit text-sm text-cantabria-red hover:text-red-400"
        >
          Reintentar
        </button>
      )}
    </section>
  );
}
