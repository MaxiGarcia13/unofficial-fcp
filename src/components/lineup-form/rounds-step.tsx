import { Input } from '../input';

interface RoundsStepProps {
  rounds: string;
  roundsError: string;
  hasValidRounds: boolean;
  onRoundsChange: (value: string) => void;
  onNextStep: () => void;
}

export function RoundsStep({
  rounds,
  roundsError,
  hasValidRounds,
  onRoundsChange,
  onNextStep,
}: RoundsStepProps) {
  return (
    <section className="border-cantabria-border bg-cantabria-surface rounded border p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="text-cantabria-muted text-xs font-medium tracking-wide uppercase">Paso 1 de 3</span>
        <h3 className="text-cantabria-text text-sm font-medium">Configurar tandas</h3>
        <p className="text-cantabria-muted text-sm">
          Escribe las tandas separadas por guiones (ejemplo: 2-3). La suma total no puede superar 5.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="tandas"
          label="Tandas"
          placeholder="2-3"
          value={rounds}
          error={roundsError}
          onChange={onRoundsChange}
        />

        <button
          type="button"
          className="border-cantabria-border bg-cantabria-surface text-cantabria-text self-start rounded border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!hasValidRounds}
          onClick={onNextStep}
        >
          Siguiente paso
        </button>
      </div>
    </section>
  );
}
