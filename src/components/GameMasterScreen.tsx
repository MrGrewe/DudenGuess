import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, BookOpen, Trophy } from 'lucide-react';
import { playSuccessSound } from '@/utils/sounds';
import type { DudenWord, Player } from '@/types/game';

interface GameMasterScreenProps {
  currentWord: DudenWord;
  currentRound: number;
  players: Player[];
  onWordSolved: () => void;
  gameMaster: Player | null;
}

const GameMasterScreen = ({ 
  currentWord, 
  currentRound, 
  players, 
  onWordSolved,
  gameMaster 
}: GameMasterScreenProps) => {
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
          </div>
        </div>

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
            <div className="text-xl leading-relaxed text-foreground bg-secondary/30 p-6 rounded-lg border-l-4 border-primary">
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
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground bg-quiz/10 p-6 rounded-xl border-2 border-dashed border-quiz/30">
                {currentWord.word}
              </div>
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
            className="h-16 px-12 text-xl bg-gradient-success hover:shadow-glow transition-all duration-300"
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