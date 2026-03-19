import type { TableColumn } from '@/components/table/types';
import type { Gender, Player } from '@/types';
import { Table } from '@/components/table/table';
import { useResults } from '@/hooks/use-results';
import { request } from '@/utils/request';

interface TeamResponse {
  players: Player[];
}

const playerColumns: TableColumn<Player>[] = [
  { key: 'position', label: 'Pos.', className: 'w-14' },
  { key: 'name', label: 'Nombre' },
  { key: 'surname', label: 'Apellido' },
  { key: 'totalPoints', label: 'Puntos' },
];

export function TeamPlayersTable({
  gender,
  group,
  teamName,
}: {
  gender: Gender;
  group: string;
  teamName: string;
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

  const players = data?.players ?? [];

  return (
    <>
      <Table<Player>
        className="w-full"
        columns={playerColumns}
        data={players}
        loading={loading}
        error={error}
        emptyMessage="Sin jugadores para este equipo"
        fillHeight={false}
        getRowKey={(row) => `${row.position}-${row.name}-${row.surname}`}
      />

      {error && (
        <button
          type="button"
          onClick={() => fetchResult()}
          className="w-fit text-sm text-cantabria-red hover:text-red-400"
        >
          Reintentar
        </button>
      )}
    </>
  );
}
