import type { Player } from '@/types';
import { SparklesIcon } from '@/assets/icons/sparkles';

interface SummaryStepProps {
  rounds: string;
  players: Player[];
  onBackToPlayers: () => void;
  onGenerateLineup: () => void;
}

export function SummaryStep({ rounds, players, onBackToPlayers, onGenerateLineup }: SummaryStepProps) {
  const configuredPlayers = players.filter(player => player.side || player.status);

  return (
    <section className="rounded border border-cantabria-border bg-cantabria-surface p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-cantabria-muted">Paso 3 de 4</span>
        <h3 className="text-sm font-medium text-cantabria-text">Resumen de configuración</h3>
        <p className="text-sm text-cantabria-muted">
          Revisa las tandas y la configuración de todos los jugadores antes de continuar.
        </p>
      </div>

      <div className="mb-4 rounded border border-cantabria-border p-3">
        <span className="text-xs uppercase tracking-wide text-cantabria-muted">Tandas</span>
        <p className="mt-1 text-sm font-medium text-cantabria-text">{rounds}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {configuredPlayers.map(player => (
          <li key={player.position} className="rounded border border-cantabria-border p-3 text-sm text-cantabria-text">
            <span className="font-medium">{`${player.position} - ${player.name} ${player.surname}`}</span>
            <p className="text-cantabria-muted">
              {`Posición: ${player.side ?? '-'} | Estado: ${player.status ?? '-'}`}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded border border-cantabria-border bg-cantabria-surface px-4 py-2 text-sm font-medium text-cantabria-text"
          onClick={onBackToPlayers}
        >
          Volver a jugadores
        </button>

        <button
          type="button"
          className="rounded border flex items-center gap-2 border-cantabria-red bg-cantabria-red px-4 py-2 text-sm font-medium text-white hover:border-red-700 hover:bg-red-700"
          onClick={onGenerateLineup}
        >
          <SparklesIcon className="w-4 h-4" />
          Generar alineación
        </button>
      </div>
    </section>
  );
}
