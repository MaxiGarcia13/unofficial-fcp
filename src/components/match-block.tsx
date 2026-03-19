import type { Match } from '@/types';

export function MatchBlock({ title, matches }: { title: string; matches: Match[] }) {
  if (matches.length === 0)
    return null;
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-sm font-semibold text-gray-100">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {matches.map((m, i) => (
          <li
            key={`${m.date}-${m.homeTeam}-${m.awayTeam}-${i}`}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2"
          >
            <span className="text-gray-100">
              {m.homeTeam ?? '—'}
              {' vs '}
              {m.awayTeam ?? '—'}
            </span>
            {m.date && (
              <span className="mt-1 block text-xs text-gray-400">{m.date}</span>
            )}
            {(m.location || m.rounds) && (
              <span className="mt-0.5 block text-xs text-gray-400">
                {[m.location, m.rounds].filter(Boolean).join(' · ')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
