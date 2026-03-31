import { Skeleton } from '../skeleton';

export function PlayersStepSkeleton() {
  return (
    <section className="rounded border border-cantabria-border bg-cantabria-surface p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-cantabria-muted">Paso 2 de 3</span>
        <h3 className="text-sm font-medium text-cantabria-text">Completar jugadores</h3>
        <p className="text-sm text-cantabria-muted">Cargando jugadores...</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map(item => (
          <div key={item} className="rounded border border-cantabria-border p-3">
            <Skeleton className="mb-3 h-4 w-48" />
            <Skeleton className="mb-2 h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
