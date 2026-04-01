import type { LineupFormProps } from './types';
import { GeneratedLineupLayer } from './generated-lineup-layer';
import { PlayersStep } from './players-step';
import { RoundsStep } from './rounds-step';
import { SummaryStep } from './summary-step';
import { useLineupFormState } from './use-lineup-form-state';

export function LineupForm({ gender, group, teamName }: LineupFormProps) {
  const {
    rounds,
    players,
    currentPlayersPage,
    roundsError,
    hasValidRounds,
    roundOptions,
    shouldShowRoundsStep,
    shouldShowPlayersStep,
    shouldShowSummaryStep,
    shouldShowGeneratedLayer,
    onRoundsChange,
    onNextStep,
    onPlayerChange,
    onPlayersPageChange,
    onSeeSummary,
    onBackToRounds,
    onBackToPlayers,
    onGenerateLineup,
  } = useLineupFormState({ gender, group, teamName });

  return (
    <div className="flex flex-col gap-6">
      {shouldShowRoundsStep && (
        <RoundsStep
          rounds={rounds}
          roundsError={roundsError}
          hasValidRounds={hasValidRounds}
          onRoundsChange={onRoundsChange}
          onNextStep={onNextStep}
        />
      )}

      <PlayersStep
        gender={gender}
        group={group}
        teamName={teamName}
        editedPlayers={players}
        currentPlayersPage={currentPlayersPage}
        roundOptions={roundOptions}
        isVisible={shouldShowPlayersStep}
        onPlayerChange={onPlayerChange}
        onPlayersPageChange={onPlayersPageChange}
        onSeeSummary={onSeeSummary}
        onBackToRounds={onBackToRounds}
      />

      {shouldShowSummaryStep && (
        <SummaryStep
          rounds={rounds}
          players={players}
          onBackToPlayers={onBackToPlayers}
          onGenerateLineup={onGenerateLineup}
        />
      )}

      {shouldShowGeneratedLayer && <GeneratedLineupLayer rounds={rounds} players={players} />}
    </div>
  );
}
