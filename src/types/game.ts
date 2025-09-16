export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface DudenWord {
  word: string;
  definition: string;
}

export type GameState = 'setup' | 'playing' | 'scoring';

export interface GameData {
  players: Player[];
  currentRound: number;
  gameState: GameState;
  currentWord: DudenWord | null;
  gameMasterId: string | null;
}