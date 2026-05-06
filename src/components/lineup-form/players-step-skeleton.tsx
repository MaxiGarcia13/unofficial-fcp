import { Skeleton } from '../skeleton';

export function PlayersStepSkeleton() {
  return (
    <section className="border-cantabria-border bg-cantabria-surface rounded border p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="text-cantabria-muted text-xs font-medium tracking-wide uppercase">Paso 2 de 3</span>
        <h3 className="text-cantabria-text text-sm font-medium">Completar jugadores</h3>
        <p className="text-cantabria-muted text-sm">Cargando jugadores...</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border-cantabria-border rounded border p-3">
            <Skeleton className="mb-3 h-4 w-48" />
            <Skeleton className="mb-2 h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
