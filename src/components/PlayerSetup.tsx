import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Play, Users, X } from 'lucide-react';
import { playClickSound } from '@/utils/sounds';
import type { Player } from '@/types/game';

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onStartGame: () => void;
}

const PlayerSetup = ({ players, onAddPlayer, onRemovePlayer, onStartGame }: PlayerSetupProps) => {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && newPlayerName.length >= 2) {
      playClickSound();
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-soft">
        <CardHeader className="text-center bg-gradient-primary text-white rounded-t-lg">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl md:text-4xl">🧠</span>
            DudenGuess
          </CardTitle>
          <p className="text-primary-foreground/80 text-base sm:text-lg">
            Das ultimative Duden-Ratespiel
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-foreground mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg sm:text-xl font-semibold">Spieler hinzufügen</h2>
            </div>
            
            <div className="flex gap-3">
              <Input
                placeholder="Spielername eingeben..."
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-base sm:text-lg h-12"
                maxLength={20}
              />
              <Button 
                onClick={handleAddPlayer}
                disabled={!newPlayerName.trim() || newPlayerName.length < 2}
                className="h-12 px-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Hinzufügen
              </Button>
            </div>

            {players.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-muted-foreground">
                  Spielerliste ({players.length} Spieler)
                </h3>
                <div className="grid gap-2">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          playClickSound();
                          onRemovePlayer(player.id);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button
                onClick={() => {
                  playClickSound();
                  onStartGame();
                }}
                disabled={players.length < 2}
                className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-success hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                <Play className="w-6 h-6 mr-3" />
                🎮 Spiel starten
                {players.length < 2 && (
                  <span className="ml-2 text-sm opacity-75">
                    (min. 2 Spieler)
                  </span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerSetup;