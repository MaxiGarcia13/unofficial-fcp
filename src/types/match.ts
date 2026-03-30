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

export interface PlayedMatch {
  homeTeam: string;
  awayTeam: string;
  score: string;
  date: string;
  rounds?: Round[];
  teams?: TeamRound[];
}

export interface Round {
  score: string;
  players: [string, string];
}

export interface TeamRound {
  score: string;
  players: [string, string];
}
