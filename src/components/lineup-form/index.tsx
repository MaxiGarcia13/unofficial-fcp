import type { LineupFormProps, Step } from './types';
import type { Player } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { GeneratedLineupLayer } from './generated-lineup-layer';
import { PlayersStep } from './players-step';
import { RoundsStep } from './rounds-step';
import { SummaryStep } from './summary-step';
import { parseUrlNavigationState } from './url.utils';
import { validateRounds } from './validation.utils';

export function LineupForm({ gender, group, teamName }: LineupFormProps) {
  const roundsKey = `fcp-lineup-rounds-${gender}-${group}-${teamName}`;
  const playersKey = `fcp-lineup-players-${gender}-${group}-${teamName}`;

  const [rounds, setRounds] = useState<string>('');
  const [currentPlayersPage, setCurrentPlayersPage] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<Step>('rounds');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

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

  const { values: roundValues, error: roundsError } = validateRounds(rounds);
  const hasValidRounds = rounds.trim().length > 0 && !roundsError;
  const shouldShowPlayersStep = hasValidRounds && (currentStep === 'players' || currentStep === 'generated');
  const shouldShowSummaryStep = hasValidRounds && currentStep === 'summary';
  const shouldShowGeneratedLayer = hasValidRounds && currentStep === 'generated';
  const roundOptions = roundValues.map((_, index) => ({
    value: `tanda-${index + 1}` as const,
    label: `Tanda ${index + 1}`,
  }));
  return (
    <div className="flex flex-col gap-6">
      <RoundsStep
        rounds={rounds}
        roundsError={roundsError}
        hasValidRounds={hasValidRounds}
        onRoundsChange={(value) => {
          setRounds(value);
          setCurrentStep('rounds');
          setCurrentPlayersPage(0);
        }}
        onNextStep={() => {
          setCurrentStep('players');
        }}
      />

      <PlayersStep
        gender={gender}
        group={group}
        teamName={teamName}
        editedPlayers={players}
        currentPlayersPage={currentPlayersPage}
        roundOptions={roundOptions}
        isVisible={shouldShowPlayersStep}
        onPlayerChange={handlePlayerChange}
        onPlayersPageChange={(nextPage) => {
          setCurrentPlayersPage(Math.max(nextPage, 0));
        }}
        onSeeSummary={() => {
          setCurrentStep('summary');
        }}
      />

      {shouldShowSummaryStep && (
        <SummaryStep
          rounds={rounds}
          players={players}
          onBackToPlayers={() => {
            setCurrentStep('players');
          }}
          onGenerateLineup={() => {
            setCurrentStep('generated');
          }}
        />
      )}

      {shouldShowGeneratedLayer && <GeneratedLineupLayer rounds={rounds} players={players} />}
    </div>
  );
}
