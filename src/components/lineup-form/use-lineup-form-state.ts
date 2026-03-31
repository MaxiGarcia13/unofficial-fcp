import type { Step } from './types';
import type { Player } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseUrlNavigationState } from './url.utils';
import { validateRounds } from './validation.utils';

interface UseLineupFormStateParams {
  gender: string;
  group: string;
  teamName: string;
}

export function useLineupFormState({ gender, group, teamName }: UseLineupFormStateParams) {
  const roundsKey = `fcp-lineup-rounds-${gender}-${group}-${teamName}`;
  const playersKey = `fcp-lineup-players-${gender}-${group}-${teamName}`;

  const [rounds, setRounds] = useState<string>('');
  const [currentPlayersPage, setCurrentPlayersPage] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<Step>('rounds');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

  useEffect(() => {
    setIsStorageHydrated(false);

    const storedRounds = localStorage.getItem(roundsKey) ?? '';
    const storedPlayersRaw = localStorage.getItem(playersKey);
    let parsedStoredPlayers: Player[] = [];

    if (storedPlayersRaw) {
      try {
        const parsed = JSON.parse(storedPlayersRaw) as Player[];
        if (Array.isArray(parsed)) {
          parsedStoredPlayers = parsed;
        }
      } catch {
        parsedStoredPlayers = [];
      }
    }

    setPlayers(parsedStoredPlayers);
    const { page: pageFromUrl, step: stepFromUrl } = parseUrlNavigationState();
    setRounds(storedRounds);
    setCurrentPlayersPage(pageFromUrl);
    setCurrentStep(stepFromUrl);
    setIsStorageHydrated(true);
  }, [roundsKey, playersKey]);

  useEffect(() => {
    if (!isStorageHydrated) {
      return;
    }

    localStorage.setItem(roundsKey, rounds);
    const playersForStorage = players
      .filter(player => player.side || player.status)
      .map(player => ({
        position: player.position,
        side: player.side,
        status: player.status,
      }));
    localStorage.setItem(playersKey, JSON.stringify(playersForStorage));
  }, [isStorageHydrated, rounds, players, roundsKey, playersKey]);

  useEffect(() => {
    if (!isStorageHydrated) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPlayersPage));
    params.set('step', currentStep);
    const nextSearch = params.toString();
    const nextUrl = nextSearch ? `${window.location.pathname}?${nextSearch}` : window.location.pathname;

    window.history.replaceState(null, '', nextUrl);
  }, [isStorageHydrated, currentPlayersPage, currentStep]);

  const handlePlayerChange = useCallback((player: Player) => {
    setPlayers((currentPlayers) => {
      const index = currentPlayers.findIndex(p => p.position === player.position);
      const newPlayers = [...currentPlayers];

      if (index === -1) {
        newPlayers.push(player);
      } else {
        newPlayers[index] = player;
      }

      return newPlayers;
    });
  }, []);

  const { values: roundValues, error: roundsError } = validateRounds(rounds);
  const hasValidRounds = rounds.trim().length > 0 && !roundsError;
  const roundOptions = useMemo(() => roundValues.map((_, index) => ({
    value: `tanda-${index + 1}` as const,
    label: `Tanda ${index + 1}`,
  })), [roundValues]);

  return {
    rounds,
    players,
    currentPlayersPage,
    roundsError,
    hasValidRounds,
    roundOptions,
    shouldShowPlayersStep: hasValidRounds && (currentStep === 'players' || currentStep === 'generated'),
    shouldShowSummaryStep: hasValidRounds && currentStep === 'summary',
    shouldShowGeneratedLayer: hasValidRounds && currentStep === 'generated',
    onRoundsChange: (value: string) => {
      setRounds(value);
      setCurrentStep('rounds');
      setCurrentPlayersPage(0);
    },
    onNextStep: () => {
      setCurrentStep('players');
    },
    onPlayerChange: handlePlayerChange,
    onPlayersPageChange: (nextPage: number) => {
      setCurrentPlayersPage(Math.max(nextPage, 0));
    },
    onSeeSummary: () => {
      setCurrentStep('summary');
    },
    onBackToPlayers: () => {
      setCurrentStep('players');
    },
    onGenerateLineup: () => {
      setCurrentStep('generated');
    },
  };
}
