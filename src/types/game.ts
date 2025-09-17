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

export type GameMode = 'normal' | 'trinkspiel';

export type DrinkEventType = 'solo' | 'duo' | 'team' | 'rule' | 'push';

export interface DrinkEvent {
  id: string;
  name: string;
  description: string;
  type: DrinkEventType;
  minPlayers?: number;
  intensity?: 1 | 2 | 3;
  rarity?: 'common' | 'uncommon' | 'rare';
  cooldown?: number; // in Event-Triggern
}

export interface GameData {
  players: Player[];
  currentRound: number;
  gameState: GameState;
  currentWord: DudenWord | null;
  gameMasterId: string | null;
  selectedWinner: string | null;
  totalRounds: number; // gewünschte Anzahl Runden insgesamt
  isWordRevealed: boolean; // nur für Runde 1 relevant
  gameMode?: GameMode; // 'normal' default
  activeDrinkEvent?: DrinkEvent | null; // aktuelles Event falls Trinkspiel
  activeDrinkEventTargetId?: string | null; // wer ist betroffen
  activeDrinkEventAmount?: number | null; // Schluckanzahl 1-5
}