import type { Player } from '@/types';
import { SparklesIcon } from '@/assets/icons/sparkles';

interface SummaryStepProps {
  rounds: string;
  players: Player[];
  onBackToPlayers: () => void;
  onGenerateLineup: () => void;
}

export function SummaryStep({ rounds, players, onBackToPlayers, onGenerateLineup }: SummaryStepProps) {
  const configuredPlayers = players.filter((player) => player.side || player.status);

  return (
    <section className="border-cantabria-border bg-cantabria-surface rounded border p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="text-cantabria-muted text-xs font-medium tracking-wide uppercase">Paso 3 de 4</span>
        <h3 className="text-cantabria-text text-sm font-medium">Resumen de configuración</h3>
        <p className="text-cantabria-muted text-sm">
          Revisa las tandas y la configuración de todos los jugadores antes de continuar.
        </p>
      </div>

      <div className="border-cantabria-border mb-4 rounded border p-3">
        <span className="text-cantabria-muted text-xs tracking-wide uppercase">Tandas</span>
        <p className="text-cantabria-text mt-1 text-sm font-medium">{rounds}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {configuredPlayers.map((player) => (
          <li key={player.position} className="border-cantabria-border text-cantabria-text rounded border p-3 text-sm">
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
          className="border-cantabria-border bg-cantabria-surface text-cantabria-text rounded border px-4 py-2 text-sm font-medium"
          onClick={onBackToPlayers}
        >
          Volver a jugadores
        </button>

        <button
          type="button"
          className="border-cantabria-red bg-cantabria-red flex items-center gap-2 rounded border px-4 py-2 text-sm font-medium text-white hover:border-red-700 hover:bg-red-700"
          onClick={onGenerateLineup}
        >
          <SparklesIcon className="h-4 w-4" />
          Generar alineación
        </button>
      </div>
    </section>
  );
}
