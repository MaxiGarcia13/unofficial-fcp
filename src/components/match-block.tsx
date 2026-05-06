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
    .map((word) => word[0]?.toUpperCase())
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
    <div className="border-cantabria-border bg-cantabria-surface/70 overflow-hidden rounded-lg border">
      <div className="border-cantabria-border bg-cantabria-dark-muted/30 flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-cantabria-text text-sm font-semibold">{title}</h3>
      </div>

      <ul className="divide-cantabria-border text-cantabria-text divide-y">
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
                className="hover:bg-cantabria-dark-muted/35 focus-visible:bg-cantabria-dark-muted/35 focus-visible:ring-cantabria-red/30 w-full cursor-pointer border-0 bg-transparent px-4 py-4 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
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
                  <span className="text-cantabria-muted mb-2 block text-right text-xs">
                    {dateInfo.date}
                  </span>
                )}

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="flex items-center justify-end gap-2 text-right">
                    <span className="text-cantabria-text max-w-[100px] truncate text-base font-medium md:max-w-[250px]">
                      {m.homeTeam ?? EMPTY_VALUE}
                    </span>
                    <Avatar tone="neutral">{getTeamInitials(m.homeTeam)}</Avatar>
                  </div>

                  <span className="text-cantabria-text text-2xl font-bold tracking-tight">
                    {centerLabel}
                  </span>

                  <div className="flex items-center gap-2">
                    <Avatar tone="accent">{getTeamInitials(m.awayTeam)}</Avatar>
                    <span className="text-cantabria-text max-w-[100px] truncate text-base font-medium md:max-w-[250px]">
                      {m.awayTeam ?? EMPTY_VALUE}
                    </span>
                  </div>
                </div>

                {m.location && (
                  <span className="text-cantabria-muted mt-2 block text-center text-xs">
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
