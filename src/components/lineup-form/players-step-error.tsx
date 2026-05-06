interface PlayersStepErrorProps {
  message: string;
  onRetry: () => void;
}

export function PlayersStepError({ message, onRetry }: PlayersStepErrorProps) {
  return (
    <section className="border-cantabria-border bg-cantabria-surface rounded border p-4">
      <div className="flex flex-col gap-3">
        <p className="text-cantabria-text text-sm">
          No se pudo cargar la información de jugadores.
        </p>
        <p className="text-cantabria-muted text-sm">{message}</p>
        <button
          type="button"
          className="border-cantabria-border bg-cantabria-surface text-cantabria-text self-start rounded border px-4 py-2 text-sm font-medium"
          onClick={onRetry}
        >
          Reintentar
        </button>
      </div>
    </section>
  );
}
