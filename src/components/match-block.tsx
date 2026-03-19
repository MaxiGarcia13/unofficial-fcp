import type { Match } from '@/types';

export function MatchBlock({ title, matches }: { title: string; matches: Match[] }) {
  if (matches.length === 0)
    return null;
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-sm font-semibold text-cantabria-text">{title}</h3>
      <ul className="space-y-2 text-sm text-cantabria-muted">
        {matches.map((m, i) => (
          <li
            key={`${m.date}-${m.homeTeam}-${m.awayTeam}-${i}`}
            className="rounded-lg border border-cantabria-border bg-cantabria-surface px-3 py-2"
          >
            <span className="text-cantabria-text">
              {m.homeTeam ?? '—'}
              {' vs '}
              {m.awayTeam ?? '—'}
            </span>
            {m.date && (
              <span className="mt-1 block text-xs text-cantabria-muted">{m.date}</span>
            )}
            {(m.location || m.rounds) && (
              <span className="mt-0.5 block text-xs text-cantabria-muted">
                {[m.location, m.rounds].filter(Boolean).join(' · ')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
