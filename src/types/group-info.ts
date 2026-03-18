import type { CalendarMatches } from './match'
import type { Ranking } from './ranking'

/** Response shape for the group-info API */
export interface GroupInfo {
  calendarMatches: CalendarMatches
  ranking: Ranking[]
}
