import type { Player } from '@/types';
import { useEffect } from 'react';
import { useResults } from '@/hooks/use-results';
import { request } from '@/utils/request';
import { Switch } from '../switch';
import { PlayersStepError } from './players-step-error';
import { PlayersStepSkeleton } from './players-step-skeleton';

interface RoundOption {
  value: `tanda-${number}`;
  label: string;
}

interface PlayersStepProps {
  gender: string;
  group: string;
  teamName: string;
  editedPlayers: Player[];
  currentPlayersPage: number;
  roundOptions: RoundOption[];
  isVisible: boolean;
  onPlayerChange: (player: Player) => void;
  onPlayersPageChange: (page: number) => void;
  onSeeSummary: () => void;
  onBackToRounds: () => void;
}

export function PlayersStep({
  gender,
  group,
  teamName,
  editedPlayers,
  currentPlayersPage,
  roundOptions,
  isVisible,
  onPlayerChange,
  onPlayersPageChange,
  onSeeSummary,
  onBackToRounds,
}: PlayersStepProps) {
  const { data, error, loading, fetchResult } = useResults<{ players: Player[] }>(
    () =>
      request<{ players: Player[] }>('/api/team', {
        params: {
          gender,
          group,
          name: teamName,
        },
      }),
    [gender, group, teamName],
  );
  const players = data?.players ?? [];
  const playersPageCount = Math.ceil(players.length / 3);
  const boundedPlayersPage = Math.max(0, Math.min(currentPlayersPage, Math.max(playersPageCount - 1, 0)));
  const isLastPage = boundedPlayersPage >= playersPageCount - 1;
  const playersSliceStart = boundedPlayersPage * 3;
  const visiblePlayers = players.slice(playersSliceStart, playersSliceStart + 3)
    .map((basePlayer) => {
      const editedPlayer = editedPlayers.find((player) => player.position === basePlayer.position);
      return editedPlayer ? { ...basePlayer, ...editedPlayer } : basePlayer;
    });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (boundedPlayersPage !== currentPlayersPage) {
      onPlayersPageChange(boundedPlayersPage);
    }
  }, [isVisible, boundedPlayersPage, currentPlayersPage, onPlayersPageChange]);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return <PlayersStepSkeleton />;
  }

  if (error) {
    return <PlayersStepError message={error.message} onRetry={fetchResult} />;
  }

  return (
    <section className="border-cantabria-border bg-cantabria-surface rounded border p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="text-cantabria-muted text-xs font-medium tracking-wide uppercase">Paso 2 de 3</span>
        <h3 className="text-cantabria-text text-sm font-medium">Completar jugadores</h3>
        <p className="text-cantabria-muted text-sm">
          Completa la información de los jugadores en bloques de 3 y avanza hasta terminar la plantilla.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-cantabria-text text-sm font-medium">Jugadores</h3>
        <span className="text-cantabria-muted text-sm">
          {`Bloque ${boundedPlayersPage + 1} de ${Math.max(playersPageCount, 1)}`}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {visiblePlayers.map((player) => (
          <li key={`${player.name} ${player.surname}`} className="flex flex-col gap-2">
            <span className="text-cantabria-text text-sm">
              {`${player.position} - `}
              {`${player.name} ${player.surname}`}
            </span>

            <Switch
              name={`side-${player.position}`}
              label="Posición"
              value={player.side}
              onChange={(value) => onPlayerChange({ ...player, side: value })}
              options={[
                { value: 'left', label: 'Izquierda' },
                { value: 'right', label: 'Derecha' },
                { value: 'both', label: 'Ambos' },
              ]}
            />
            <Switch
              name={`status-${player.position}`}
              label="Estado"
              value={player.status}
              onChange={(value) => onPlayerChange({ ...player, status: value as Player['status'] })}
              options={[
                { value: 'present', label: 'Presente' },
                { value: 'absent', label: 'Ausente' },
                ...roundOptions,
              ]}
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="border-cantabria-border bg-cantabria-surface text-cantabria-text rounded border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          onClick={boundedPlayersPage === 0
            ? onBackToRounds
            : () => onPlayersPageChange(boundedPlayersPage - 1)}
        >
          {boundedPlayersPage === 0 ? 'Volver a tandas' : 'Anterior'}
        </button>

        <button
          type="button"
          className="border-cantabria-border bg-cantabria-surface text-cantabria-text rounded border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isLastPage && boundedPlayersPage >= playersPageCount - 1}
          onClick={isLastPage ? onSeeSummary : () => onPlayersPageChange(boundedPlayersPage + 1)}
        >
          {isLastPage ? 'Ver resumen' : 'Siguiente'}
        </button>
      </div>
    </section>
  );
}
