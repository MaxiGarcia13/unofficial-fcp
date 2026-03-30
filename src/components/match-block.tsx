import type { Gender, Match } from '@/types';
import { navigate } from 'astro:transitions/client';
import { Avatar } from '@/components/avatar';

const TIME_REGEX = /\b([01]?\d|2[0-3]):[0-5]\d\b/;
const DATE_SEPARATORS_REGEX = /[-,|]/g;
const EMPTY_VALUE = '—';

function getTeamInitials(teamName?: string) {
  if (!teamName) {
    return EMPTY_VALUE;
  }

  return teamName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('');
}

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

  function splitDateTime(value?: string) {
    if (!value) {
      return { date: undefined, time: undefined };
    }

    const trimmed = value.trim();
    const timeMatch = trimmed.match(TIME_REGEX);
    if (!timeMatch) {
      return { date: trimmed, time: undefined };
    }

    const time = timeMatch[0];
    const date = trimmed.replace(time, '').replace(DATE_SEPARATORS_REGEX, ' ').trim();
    return { date: date || undefined, time };
  }

  return (
    <div className="overflow-hidden rounded-lg border border-cantabria-border bg-cantabria-surface/70">
      <div className="flex items-center justify-between border-b border-cantabria-border bg-cantabria-dark-muted/30 px-4 py-3">
        <h3 className="text-sm font-semibold text-cantabria-text">{title}</h3>
      </div>

      <ul className="divide-y divide-cantabria-border text-cantabria-text">
        {matches.map((m, i) => {
          const dateInfo = splitDateTime(m.date);
          const centerLabel = dateInfo.time ?? m.rounds ?? EMPTY_VALUE;

          return (
            <li
              key={`${m.date}-${m.homeTeam}-${m.awayTeam}-${i}`}
              className="bg-cantabria-surface/30"
            >
              <button
                type="button"
                className="w-full cursor-pointer border-0 bg-transparent px-4 py-4 text-left transition-colors duration-150 hover:bg-cantabria-dark-muted/35 focus:outline-none focus-visible:bg-cantabria-dark-muted/35 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cantabria-red/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                onClick={() => {
                  if (!m.homeTeam || !m.awayTeam) {
                    return;
                  }
                  navigate(
                    `/${gender}-${group}/compare/${m.homeTeam}-${m.awayTeam}`,
                  );
                }}
                disabled={!m.homeTeam || !m.awayTeam}
              >
                {dateInfo.date && (
                  <span className="mb-2 block text-right text-xs text-cantabria-muted">
                    {dateInfo.date}
                  </span>
                )}

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="flex items-center justify-end gap-2 text-right">
                    <span className="truncate text-base font-medium text-cantabria-text max-w-[100px] md:max-w-[250px]">
                      {m.homeTeam ?? EMPTY_VALUE}
                    </span>
                    <Avatar tone="neutral">{getTeamInitials(m.homeTeam)}</Avatar>
                  </div>

                  <span className="text-2xl font-bold tracking-tight text-cantabria-text">
                    {centerLabel}
                  </span>

                  <div className="flex items-center gap-2">
                    <Avatar tone="accent">{getTeamInitials(m.awayTeam)}</Avatar>
                    <span className="truncate text-base font-medium text-cantabria-text max-w-[100px] md:max-w-[250px]">
                      {m.awayTeam ?? EMPTY_VALUE}
                    </span>
                  </div>
                </div>

                {m.location && (
                  <span className="mt-2 block text-center text-xs text-cantabria-muted">
                    {m.location}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
