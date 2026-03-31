import type { RankingEntry, RankingRow, StatsResponse } from './stats-ranking';
import type { Gender } from '@/types';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
import { request } from '@/utils/request';
import { rankingColumns, topRanking } from './stats-ranking';

interface TeamStats {
  playersRanking: RankingEntry[];
  couplesRanking: RankingEntry[];
}

const TOP_LIMIT = 5;

function rankingScore(ranking: RankingRow[]): number {
  return ranking.reduce((score, row) => score + row.balance, 0);
}

function compareLabel(team1Name: string, team2Name: string, team1Score: number, team2Score: number): string {
  if (team1Score === team2Score) {
    return `Empate (${team1Score})`;
  }

  return team1Score > team2Score
    ? `${team1Name} mejor (${team1Score} vs ${team2Score})`
    : `${team2Name} mejor (${team2Score} vs ${team1Score})`;
}

export function TeamStatsCompare({
  gender,
  group,
  team1Name,
  team2Name,
}: {
  gender: Gender;
  group: string;
  team1Name: string;
  team2Name: string;
}) {
  const team1 = useResults<TeamStats>(
    async () => request<StatsResponse>('/api/stats', {
      params: {
        gender,
        group,
        team: team1Name,
      },
    }),
    [gender, group, team1Name],
  );

  const team2 = useResults<TeamStats>(
    async () => request<StatsResponse>('/api/stats', {
      params: {
        gender,
        group,
        team: team2Name,
      },
    }),
    [gender, group, team2Name],
  );

  const team1Players = topRanking(team1.data?.playersRanking ?? [], TOP_LIMIT);
  const team2Players = topRanking(team2.data?.playersRanking ?? [], TOP_LIMIT);
  const team1Couples = topRanking(team1.data?.couplesRanking ?? [], TOP_LIMIT);
  const team2Couples = topRanking(team2.data?.couplesRanking ?? [], TOP_LIMIT);

  const playersComparison = compareLabel(
    team1Name,
    team2Name,
    rankingScore(team1Players),
    rankingScore(team2Players),
  );
  const couplesComparison = compareLabel(
    team1Name,
    team2Name,
    rankingScore(team1Couples),
    rankingScore(team2Couples),
  );

  return (
    <section className="flex flex-col gap-4 mt-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cantabria-text">
            Mejores 5 jugadores
          </h2>
          <span className="text-sm text-cantabria-muted">{playersComparison}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

          <Table<RankingRow>
            className="w-full"
            columns={rankingColumns}
            data={team1Players}
            loading={team1.loading}
            error={team1.error}
            onRetry={team1.fetchResult}
            emptyMessage="Sin ranking de jugadores"
            fillHeight={false}
            getRowKey={row => `${row.name}-players-team1`}
          />

          <Table<RankingRow>
            className="w-full"
            columns={rankingColumns}
            data={team2Players}
            loading={team2.loading}
            error={team2.error}
            onRetry={team2.fetchResult}
            emptyMessage="Sin ranking de jugadores"
            fillHeight={false}
            getRowKey={row => `${row.name}-players-team2`}
          />

        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cantabria-text">
            Mejores 5 parejas
          </h2>
          <span className="text-sm text-cantabria-muted">{couplesComparison}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

          <Table<RankingRow>
            className="w-full"
            columns={rankingColumns}
            data={team1Couples}
            loading={team1.loading}
            error={team1.error}
            onRetry={team1.fetchResult}
            emptyMessage="Sin ranking de parejas"
            fillHeight={false}
            getRowKey={row => `${row.name}-couples-team1`}
          />

          <Table<RankingRow>
            className="w-full"
            columns={rankingColumns}
            data={team2Couples}
            loading={team2.loading}
            error={team2.error}
            onRetry={team2.fetchResult}
            emptyMessage="Sin ranking de parejas"
            fillHeight={false}
            getRowKey={row => `${row.name}-couples-team2`}
          />
        </div>
      </div>
    </section>
  );
}
