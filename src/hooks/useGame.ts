import { useState, useCallback } from 'react';
import type { Player, GameData, DudenWord, GameState } from '@/types/game';

// Sample Duden words for the game
const DUDEN_WORDS: DudenWord[] = [
  {
    word: "Fernweh",
    definition: "das starke Verlangen, in die Ferne zu reisen; Sehnsucht nach fremden Ländern"
  },
  {
    word: "Verschlimmbessern", 
    definition: "durch gut gemeinte Verbesserungsversuche etwas verschlechtern"
  },
  {
    word: "Kopfkino",
    definition: "das Entstehen von Bildern, Vorstellungen im Kopf beim Lesen, Hören von etwas"
  },
  {
    word: "Fremdschämen",
    definition: "Scham empfinden für das Verhalten einer anderen Person"
  },
  {
    word: "Ohrwurm",
    definition: "eine Melodie, die einem nicht mehr aus dem Kopf geht"
  },
  {
    word: "Kummerspeck",
    definition: "zusätzliches Körpergewicht, das durch übermäßiges Essen bei Kummer entstanden ist"
  },
  {
    word: "Verschlimmbessern",
    definition: "etwas durch einen gut gemeinten Verbesserungsversuch verschlechtern"
  },
  {
    word: "Geborgenheit",
    definition: "Zustand des Sichgeborgenfühlens; Sicherheit und Schutz gewährende Umgebung"
  },
  {
    word: "Backpfeifengesicht",
    definition: "Gesicht, das zu einer Ohrfeige herausfordert (derb)"  
  },
  {
    word: "Verschlimmbessern",
    definition: "durch einen wohlmeinenden Eingriff etwas verschlechtern"
  }
];

export const useGame = () => {
  const [gameData, setGameData] = useState<GameData>({
    players: [],
    currentRound: 1,
    gameState: 'setup',
    currentWord: null,
    gameMasterId: null
  });

  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

  const addPlayer = useCallback((name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      score: 0
    };
    
    setGameData(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setGameData(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId)
    }));
  }, []);

  const getRandomWord = useCallback((): DudenWord => {
    const availableWords = DUDEN_WORDS.filter(word => !usedWords.has(word.word));
    
    if (availableWords.length === 0) {
      // Reset used words if all have been used
      setUsedWords(new Set());
      return DUDEN_WORDS[Math.floor(Math.random() * DUDEN_WORDS.length)];
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [usedWords]);

  const startGame = useCallback(() => {
    if (gameData.players.length < 2) return;
    
    // Select random game master
    const randomIndex = Math.floor(Math.random() * gameData.players.length);
    const gameMaster = gameData.players[randomIndex];
    
    const newWord = getRandomWord();
    setUsedWords(prev => new Set([...prev, newWord.word]));
    
    setGameData(prev => ({
      ...prev,
      gameState: 'playing',
      currentWord: newWord,
      gameMasterId: gameMaster.id
    }));
  }, [gameData.players, getRandomWord]);

  const startScoring = useCallback(() => {
    setGameData(prev => ({
      ...prev,
      gameState: 'scoring'
    }));
  }, []);

  const awardPoints = useCallback((playerId: string) => {
    setGameData(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.id === playerId
          ? { ...player, score: player.score + 100 }
          : player
      )
    }));
  }, []);

  const nextRound = useCallback(() => {
    // Select new random game master (different from current one if possible)
    const otherPlayers = gameData.players.filter(p => p.id !== gameData.gameMasterId);
    const newGameMaster = otherPlayers.length > 0 
      ? otherPlayers[Math.floor(Math.random() * otherPlayers.length)]
      : gameData.players[Math.floor(Math.random() * gameData.players.length)];
    
    const newWord = getRandomWord();
    setUsedWords(prev => new Set([...prev, newWord.word]));
    
    setGameData(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      gameState: 'playing',
      currentWord: newWord,
      gameMasterId: newGameMaster.id
    }));
  }, [gameData.players, gameData.gameMasterId, getRandomWord]);

  const resetGame = useCallback(() => {
    setGameData({
      players: [],
      currentRound: 1,
      gameState: 'setup',
      currentWord: null,
      gameMasterId: null
    });
    setUsedWords(new Set());
  }, []);

  return {
    gameData,
    addPlayer,
    removePlayer,
    startGame,
    startScoring,
    awardPoints,
    nextRound,
    resetGame
  };
};