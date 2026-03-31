import type { TableColumn } from '@/components/table/types';
import type { Gender, Player } from '@/types';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
import { request } from '@/utils/request';

interface TeamResponse {
  players: Player[];
}

const playerColumns: TableColumn<Player>[] = [
  {
    key: 'position',
    label: 'Pos.',
  },
  {
    key: 'name',
    label: 'Nombre',
  },
  {
    key: 'surname',
    label: 'Apellido',
  },
  {
    key: 'totalPoints',
    label: 'Puntos',
  },
];

const comparePlayerColumns: TableColumn<Player>[] = [
  {
    key: 'position',
    label: 'Pos.',
    className: 'hidden md:table-cell',
  },
  {
    key: 'name',
    label: 'Jugador',
  },
  {
    key: 'totalPoints',
    label: 'Pts.',
    className: 'text-right',
  },
];

export function TeamPlayersTable({
  gender,
  group,
  teamName,
  variant = 'normal',
}: {
  gender: Gender;
  group: string;
  teamName: string;
  variant?: 'normal' | 'compare';
}) {
  const { data, error, loading, fetchResult } = useResults<TeamResponse>(
    () =>
      request<TeamResponse>('/api/team', {
        params: {
          gender,
          group,
          name: teamName,
        },
      }),
    [gender, group, teamName],
  );

  const decodePlayers = (players: Player[]) => {
    if (!players?.length)
      return [];

    if (variant === 'compare') {
      return players.map((player) => {
        const name = player.name.split(' ')[0];
        const surname = player.surname.split(' ').map(word => word.charAt(0)).join('.');

        return ({
          ...player,
          name: `${name} ${surname}.`,
        });
      });
    }

    return players;
  };

  const players = decodePlayers(data?.players);
  const totalPoints = (data?.players ?? []).reduce(
    (acc, player) => acc + player.totalPoints,
    0,
  );

  return (
    <div className="h-full w-full">
      <Table<Player>
        className="w-full h-full"
        columns={variant === 'compare' ? comparePlayerColumns : playerColumns}
        data={players}
        loading={loading}
        error={error}
        onRetry={fetchResult}
        emptyMessage="Sin jugadores para este equipo"
        fillHeight={false}
        getRowKey={row => `${row.position}-${row.name}-${row.surname}`}
      />
      {!loading && !error && players.length > 0 && (
        <div className="mt-3 flex justify-end text-sm gap-1">
          <span className="text-cantabria-muted">Total:</span>

          <span className="font-semibold text-cantabria-text">
            {totalPoints}
            {' '}
            pts.
          </span>
        </div>
      )}
    </div>
  );
}
