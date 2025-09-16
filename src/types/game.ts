export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface DudenWord {
  word: string;
  definition: string;
}

export type GameState = 'setup' | 'playing' | 'scoring' | 'finished';

export interface GameData {
  players: Player[];
  currentRound: number;
  gameState: GameState;
  currentWord: DudenWord | null;
  gameMasterId: string | null;
  selectedWinner: string | null;
  totalRounds: number; // gewünschte Anzahl Runden insgesamt
  isWordRevealed: boolean; // nur für Runde 1 relevant
}