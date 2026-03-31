interface PlayersStepErrorProps {
  message: string;
  onRetry: () => void;
}

export function PlayersStepError({ message, onRetry }: PlayersStepErrorProps) {
  return (
    <section className="rounded border border-cantabria-border bg-cantabria-surface p-4">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-cantabria-text">
          No se pudo cargar la información de jugadores.
        </p>
        <p className="text-sm text-cantabria-muted">{message}</p>
        <button
          type="button"
          className="self-start rounded border border-cantabria-border bg-cantabria-surface px-4 py-2 text-sm font-medium text-cantabria-text"
          onClick={onRetry}
        >
          Reintentar
        </button>
      </div>
    </section>
  );
}
