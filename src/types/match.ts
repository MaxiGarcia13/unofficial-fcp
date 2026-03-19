export interface Match {
  date?: string;
  awayTeam?: string;
  homeTeam?: string;
  location?: string;
  rounds?: string;
}

export interface CalendarMatches {
  upcoming: Record<string, Match[]>;
  thisWeek: Match[];
}
