import type { RankingRow, StatsResponse } from './stats-ranking';
import type { Gender } from '@/types';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
import { request } from '@/utils/request';
import { rankingColumns, withBalance } from './stats-ranking';

export function TeamStats({
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
          Mejores jugadores
        </h2>

        <Table<RankingRow>
          className="w-full"
          columns={rankingColumns}
          data={playersRanking}
          loading={loading}
          error={error}
          onRetry={fetchResult}
          emptyMessage="Sin datos de ranking de jugadores"
          fillHeight={false}
          getRowKey={row => `${row.name}-players`}
        />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-cantabria-text">
          Mejores parejas
        </h2>

        <Table<RankingRow>
          className="w-full"
          columns={rankingColumns}
          data={couplesRanking}
          loading={loading}
          error={error}
          onRetry={fetchResult}
          emptyMessage="Sin datos de ranking de parejas"
          fillHeight={false}
          getRowKey={row => `${row.name}-couples`}
        />
      </div>
    </section>
  );
}
