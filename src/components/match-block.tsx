import type { Gender, Match } from '@/types';
import { navigate } from 'astro:transitions/client';

export function MatchBlock({
  title,
  matches,
  gender,
  group,
}: {
  title: string;
  matches: Match[];
  gender: Gender;
  group: string;
}) {
  if (matches.length === 0)
    return null;
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-sm font-semibold text-cantabria-text">{title}</h3>
      <ul className="space-y-4 text-sm text-cantabria-muted">
        {matches.map((m, i) => (
          <li
            key={`${m.date}-${m.homeTeam}-${m.awayTeam}-${i}`}
            className="rounded-lg border border-cantabria-border bg-cantabria-surface px-3 py-2"
          >
            <button
              type="button"
              className="w-full text-left bg-transparent p-0 m-0 border-0 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (!m.homeTeam || !m.awayTeam) {
                  return;
                }
                navigate(
                  `/${gender}-${group}/compare/${encodeURIComponent(
                    m.homeTeam,
                  )}-${encodeURIComponent(m.awayTeam)}`,
                );
              }}
              disabled={!m.homeTeam || !m.awayTeam}
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
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
