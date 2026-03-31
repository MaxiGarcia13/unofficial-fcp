import type { Player } from '@/types';

export function GeneratedLineupLayer(props: { rounds: string; players: Player[] }) {
  console.log({ ...props });

  return (
    <section className="rounded border border-cantabria-border bg-cantabria-surface p-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-cantabria-muted">Paso 4 de 4</span>
        <h3 className="text-sm font-medium text-cantabria-text">Alineación generada</h3>
        <p className="text-sm text-cantabria-muted">
          Se ha generado una nueva capa con la alineación para continuar con la siguiente acción.
        </p>
      </div>
    </section>
  );
}
