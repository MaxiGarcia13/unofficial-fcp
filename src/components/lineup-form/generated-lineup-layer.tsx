import type { Player } from '@/types';
import { useEffect, useState } from 'react';

export function GeneratedLineupLayer(props: { rounds: string; players: Player[] }) {
  const [lineups, setLineups] = useState<string[]>([]);

  const fetchLineups = async () => {
    const response = await fetch('/api/ia', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: JSON.stringify({
        rounds: props.rounds,
        players: props.players,
      }),
    });

    const reader = response.body?.getReader();

    const decoder = new TextDecoder();
    let result = '';
    while (true) {
      const { done, value } = await reader?.read();
      if (done)
        break;
      result += decoder.decode(value, { stream: true });
    }

    setLineups(result.split('\n'));
  };

  useEffect(() => {
    fetchLineups();
  }, [props.rounds, props.players]);

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
