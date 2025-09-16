import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, ArrowRight, Star } from 'lucide-react';
import { playClickSound, playSuccessSound } from '@/utils/sounds';
import type { Player } from '@/types/game';

interface ScoringScreenProps {
  players: Player[];
  onSelectWinner: (playerId: string) => void;
  onNextRound: () => void;
  currentRound: number;
  lastWord: string;
}

const ScoringScreen = ({ 
  players, 
  onSelectWinner, 
  onNextRound, 
  currentRound,
  lastWord 
}: ScoringScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-soft">
            <span className="text-2xl">🏆</span>
            <span className="text-xl font-bold text-primary">Punktevergabe</span>
            <Badge variant="secondary" className="ml-2">
              Runde {currentRound}
            </Badge>
          </div>
        </div>

        {/* Last Word Info */}
        <Card className="shadow-soft border-2 border-accent">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Das gesuchte Wort war:</p>
              <div className="text-3xl font-bold text-foreground bg-accent/10 py-4 px-6 rounded-xl">
                "{lastWord}"
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Winner Selection */}
        <Card className="shadow-soft">
          <CardHeader className="bg-gradient-success text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Star className="w-6 h-6" />
              Wer hat richtig geraten?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-3">
              {players.map((player) => (
                <Button
                  key={player.id}
                  onClick={() => {
                    playSuccessSound();
                    onSelectWinner(player.id);
                  }}
                  variant="outline"
                  className="h-16 text-left justify-start hover:bg-accent/10 hover:border-accent hover:text-foreground transition-all duration-300"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Aktueller Punktestand: {player.score}
                      </div>
                    </div>
                    <div className="text-accent font-bold">
                      +100 Punkte
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Scoreboard */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" />
              Aktueller Spielerstand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 
                      ? 'bg-gradient-success text-white' 
                      : 'bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-white/20 text-white' : 'bg-primary text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{player.name}</span>
                    {index === 0 && <Trophy className="w-4 h-4 ml-2" />}
                  </div>
                  <Badge variant={index === 0 ? 'secondary' : 'default'}>
                    {player.score} Punkte  
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={() => {
              playClickSound();
              onNextRound();
            }}
            size="lg"
            className="h-16 px-12 text-xl bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <ArrowRight className="w-8 h-8 mr-4" />
            Nächste Runde
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScoringScreen;