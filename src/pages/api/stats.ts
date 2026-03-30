import type { PlayedMatch } from '../../types/match';
import { API_KEY, API_URL } from 'astro:env/server';

interface RankingEntry {
  name: string;
  wonGames: number;
  lostGames: number;
}

interface StatsResponse {
  playersRanking: RankingEntry[];
  couplesRanking: RankingEntry[];
}

function parseSetScore(setScore: string): [number, number] | null {
  const [leftRaw, rightRaw] = setScore.split('/');
  const left = Number(leftRaw);
  const right = Number(rightRaw);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return null;
  }

  return [left, right];
}

function didTargetTeamWinRound(score: string, isLocalMatch: boolean): boolean {
  let targetSets = 0;
  let rivalSets = 0;

  const sets = score.split(' ').map(setScore => setScore.trim()).filter(Boolean);

  for (const setScore of sets) {
    const parsedSet = parseSetScore(setScore);

    if (!parsedSet) {
      continue;
    }

    const [left, right] = parsedSet;

    if (left === right) {
      continue;
    }

    const targetWonSet = isLocalMatch ? left > right : right > left;

    if (targetWonSet) {
      targetSets += 1;
    } else {
      rivalSets += 1;
    }
  }

  return targetSets > rivalSets;
}

function normalizePlayers(players: string[]): string[] {
  return players.map(player => player.trim()).filter(Boolean);
}

function extractCouple(round: { players: string[] }): string[] {
  if (!Array.isArray(round.players) || round.players.length === 0) {
    return [];
  }

  return normalizePlayers(round.players).slice(0, 2);
}

interface RankingCounter {
  wonGames: number;
  lostGames: number;
}

function updateCounter(
  rankingMap: Map<string, RankingCounter>,
  key: string,
  didWin: boolean
) {
  const current = rankingMap.get(key) ?? { wonGames: 0, lostGames: 0 };

  if (didWin) {
    current.wonGames += 1;
  } else {
    current.lostGames += 1;
  }

  rankingMap.set(key, current);
}

function sortRanking(rankingMap: Map<string, RankingCounter>): RankingEntry[] {
  return Array.from(rankingMap.entries())
    .sort((a, b) => {
      const aBalance = a[1].wonGames - a[1].lostGames;
      const bBalance = b[1].wonGames - b[1].lostGames;

      return (
        bBalance - aBalance ||
        b[1].wonGames - a[1].wonGames ||
        a[1].lostGames - b[1].lostGames ||
        a[0].localeCompare(b[0])
      );
    })
    .map(([name, counters]) => ({ name, ...counters }));
}

export async function GET({ request }) {
  const { searchParams } = new URL(request.url);

  const group = searchParams.get('group');
  const team = searchParams.get('team');
  const gender = searchParams.get('gender');

  if (!group || !team || !gender) {
    return new Response(JSON.stringify({ message: 'Group, team and gender are required' }), { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}/played-matches?${searchParams.toString()}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    const awayMatches: PlayedMatch[] = data.awayMatches ?? [];
    const localMatches: PlayedMatch[] = data.localMatches ?? [];

    const playersRankingMap = new Map<string, RankingCounter>();
    const couplesRankingMap = new Map<string, RankingCounter>();

    const registerWins = (matches: PlayedMatch[], isLocalMatch: boolean) => {
      for (const match of matches) {
        const rounds = match.teams ?? match.rounds ?? [];

        for (const round of rounds) {
          const teamWonRound = didTargetTeamWinRound(round.score, isLocalMatch);

          const couplePlayers = extractCouple(round);

          if (couplePlayers.length < 2) {
            continue;
          }

          const coupleName = `${couplePlayers[0]} / ${couplePlayers[1]}`;
          updateCounter(couplesRankingMap, coupleName, teamWonRound);

          for (const player of couplePlayers) {
            updateCounter(playersRankingMap, player, teamWonRound);
          }
        }
      }
    };

    registerWins(localMatches, true);
    registerWins(awayMatches, false);

    const stats: StatsResponse = {
      playersRanking: sortRanking(playersRankingMap),
      couplesRanking: sortRanking(couplesRankingMap),
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        ...response.headers,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error({ error });
    const status = 500;
    const message = 'Internal server error';

    return new Response(JSON.stringify({ message }), { status });
  }
}
