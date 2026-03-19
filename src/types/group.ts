import type { CalendarMatches } from './match';
import type { Ranking } from './ranking';

export interface Group {
  calendarMatches: CalendarMatches;
  ranking: Ranking[];
}
