import type { TableColumn } from '@/components/table/types';

export interface RankingEntry {
  name: string;
  wonGames: number;
  lostGames: number;
}

export interface StatsResponse {
  playersRanking: RankingEntry[];
  couplesRanking: RankingEntry[];
}

export interface RankingRow extends RankingEntry {
  balance: number;
}

export const rankingColumns: TableColumn<RankingRow>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'wonGames', label: 'Ganados' },
  { key: 'lostGames', label: 'Perdidos' },
  { key: 'balance', label: 'Balance' },
];

export function withBalance(ranking: RankingEntry[]): RankingRow[] {
  return (ranking ?? []).map(entry => ({
    ...entry,
    balance: entry.wonGames - entry.lostGames,
  }));
}

export function topRanking(ranking: RankingEntry[], limit: number): RankingRow[] {
  return withBalance(ranking).slice(0, limit);
}
