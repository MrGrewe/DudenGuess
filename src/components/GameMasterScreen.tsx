import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, BookOpen, Trophy, Beer } from 'lucide-react';
import { playSuccessSound } from '@/utils/sounds';
import type { DudenWord, Player, DrinkEvent, GameMode } from '@/types/game';

interface GameMasterScreenProps {
  currentWord: DudenWord;
  currentRound: number;
  players: Player[];
  onWordSolved: () => void;
  gameMaster: Player | null;
  isWordRevealed?: boolean;
  onRevealWord?: () => void;
  gameMode?: GameMode;
  activeDrinkEvent?: DrinkEvent | null;
  activeDrinkEventTargetId?: string | null;
}

const GameMasterScreen = ({ 
  currentWord, 
  currentRound, 
  players, 
  onWordSolved,
  gameMaster,
  isWordRevealed = true,
  onRevealWord,
  gameMode = 'normal',
  activeDrinkEvent,
  activeDrinkEventTargetId
}: GameMasterScreenProps) => {
  const targetName = players.find(p => p.id === activeDrinkEventTargetId)?.name;
  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-soft">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold text-primary">DudenGuess</span>
            <Badge variant="secondary" className="ml-2">
              Runde {currentRound}
            </Badge>
            {gameMode === 'trinkspiel' && (
              <Badge className="ml-2 bg-amber-500 text-white">
                <Beer className="w-4 h-4 mr-1" /> Trinkspiel
              </Badge>
            )}
          </div>
        </div>

        {gameMode === 'trinkspiel' && activeDrinkEvent && (
          <Card className="shadow-glow border-amber-300">
            <CardHeader className="bg-amber-100 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Beer className="w-5 h-5" /> Trink-Event: {activeDrinkEvent.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="text-amber-900">
                <div className="font-medium mb-1">{activeDrinkEvent.description}</div>
                {targetName && (
                  <div className="text-sm">Betroffen: <span className="font-semibold">{targetName}</span></div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Master Info */}
        {gameMaster && (
          <Card className="bg-gradient-game text-white shadow-glow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5" />
                <span className="font-medium">Game Master:</span>
                <span className="font-bold">{gameMaster.name}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Definition Card */}
        <Card className="shadow-soft">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              Duden-Definition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground bg-secondary/30 p-6 rounded-lg border-l-4 border-primary">
              "{currentWord.definition}"
            </div>
          </CardContent>
        </Card>

        {/* Secret Word Card */}
        <Card className="shadow-soft border-2 border-quiz">
          <CardHeader className="bg-quiz text-quiz-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Eye className="w-6 h-6" />
              Gesuchtes Wort
              <Badge variant="secondary" className="ml-auto">
                Nur für Game Master
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground bg-quiz/10 p-6 rounded-xl border-2 border-dashed border-quiz/30 ${!isWordRevealed ? 'blur-md select-none' : ''}`}>
                {currentWord.word}
              </div>
              {!isWordRevealed && (
                <Button onClick={onRevealWord} variant="secondary" className="mx-auto">
                  Aufdecken
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Players Scoreboard */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" />
              Spielerstand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-accent' : 'bg-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    {player.score} Punkte
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Solved Button */}
        <div className="text-center">
          <Button
            onClick={() => {
              playSuccessSound();
              onWordSolved();
            }}
            size="lg"
            className="h-12 sm:h-14 md:h-16 px-6 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl bg-gradient-success hover:shadow-glow transition-all duration-300"
          >
            <CheckCircle className="w-8 h-8 mr-4" />
            Gelöst! Punkte vergeben ✅
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameMasterScreen;