import type { Player } from '@/types';
import { useEffect, useState } from 'react';
import { Streamdown } from 'streamdown';

export function GeneratedLineupLayer(props: { rounds: string; players: Player[] }) {
  const [lineups, setLineups] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLineups = async () => {
    setErrorMessage(null);

    const response = await fetch('/api/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rounds: props.rounds,
        players: props.players,
      }),
    });

    const reader = response.body.getReader();

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader?.read();
      if (done)
        break;
      setLineups(prev => [...prev, decoder.decode(value, { stream: true })]);
    }
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

        <Streamdown>
          {lineups.join('')}
        </Streamdown>

        {errorMessage && (
          <p className="text-sm text-red-300">{errorMessage}</p>
        )}
      </div>
    </section>
  );
}
