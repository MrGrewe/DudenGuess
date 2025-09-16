import { useGame } from '@/hooks/useGame';
import PlayerSetup from '@/components/PlayerSetup';
import GameMasterScreen from '@/components/GameMasterScreen';
import ScoringScreen from '@/components/ScoringScreen';

const Index = () => {
  const {
    gameData,
    addPlayer,
    removePlayer,
    startGame,
    startScoring,
    selectWinner,
    nextRound,
    resetGame
  } = useGame();

  const currentGameMaster = gameData.players.find(p => p.id === gameData.gameMasterId);

  const handleSelectWinner = (playerId: string) => {
    selectWinner(playerId);
  };

  if (gameData.gameState === 'setup') {
    return (
      <PlayerSetup
        players={gameData.players}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onStartGame={startGame}
      />
    );
  }

  if (gameData.gameState === 'playing' && gameData.currentWord) {
    return (
      <GameMasterScreen
        currentWord={gameData.currentWord}
        currentRound={gameData.currentRound}
        players={gameData.players}
        onWordSolved={startScoring}
        gameMaster={currentGameMaster || null}
      />
    );
  }

  if (gameData.gameState === 'scoring' && gameData.currentWord) {
    return (
      <ScoringScreen
        players={gameData.players}
        onSelectWinner={handleSelectWinner}
        onNextRound={nextRound}
        currentRound={gameData.currentRound}
        lastWord={gameData.currentWord.word}
        selectedWinner={gameData.selectedWinner}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">🧠 DudenGuess</h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">Das ultimative Duden-Ratespiel</p>
        <button 
          onClick={resetGame}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Neues Spiel starten
        </button>
      </div>
    </div>
  );
};

export default Index;
