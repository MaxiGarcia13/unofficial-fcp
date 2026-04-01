import type { Player } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { Streamdown } from 'streamdown';
import { useLocalStorage } from '@/hooks/use-local-storage';

function getLineupRequestSignature(rounds: string, players: Player[]) {
  const normalizedPlayers = [...players].sort((a, b) => a.position - b.position);
  return JSON.stringify({ rounds: rounds.trim(), players: normalizedPlayers });
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

export function GeneratedLineupLayer(props: { rounds: string; players: Player[] }) {
  const [lineups, setLineups] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const requestSignature = useMemo(
    () => getLineupRequestSignature(props.rounds, props.players),
    [props.rounds, props.players],
  );
  const requestHash = useMemo(() => hashString(requestSignature), [requestSignature]);
  const lineupStorage = useLocalStorage<string>(`fcp-lineup-generated-${requestHash}`);

  const fetchLineups = async () => {
    setErrorMessage(null);
    setLineups([]);

    const cachedLineup = lineupStorage.get();
    if (cachedLineup) {
      setLineups([cachedLineup]);
      return;
    }

    const response = await fetch('/api/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rounds: props.rounds,
        players: props.players,
      }),
    });

    if (!response.ok || !response.body) {
      setErrorMessage('No se pudo generar la alineación. Inténtalo de nuevo.');
      return;
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();
    let fullResponse = '';
    while (true) {
      const { done, value } = await reader?.read();
      if (done)
        break;
      const chunk = decoder.decode(value, { stream: true });
      fullResponse += chunk;
      setLineups(prev => [...prev, chunk]);
    }

    if (fullResponse.trim()) {
      lineupStorage.set(fullResponse);
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
