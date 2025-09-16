import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import type { Player } from '@/types/game';

interface FinalScoreScreenProps {
  players: Player[];
  totalRounds: number;
  onRestart: () => void;
}

const FinalScoreScreen = ({ players, totalRounds, onRestart }: FinalScoreScreenProps) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-soft">
            <span className="text-2xl">🏁</span>
            <span className="text-xl font-bold text-primary">Finale nach {totalRounds} Runden</span>
          </div>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" />
              Sieger: {winner?.name ?? '—'} ({winner?.score ?? 0} Punkte)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {sorted.map((player, index) => (
                <div key={player.id} className={`flex items-center justify-between p-4 rounded-lg ${index === 0 ? 'bg-gradient-success text-white' : 'bg-secondary/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-white/20 text-white' : 'bg-primary text-white'}`}>{index + 1}</div>
                    <span className="font-medium text-base sm:text-lg">{player.name}</span>
                  </div>
                  <div className="font-bold">{player.score} Punkte</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={onRestart} className="h-12 px-8 bg-gradient-primary">Neues Spiel</Button>
        </div>
      </div>
    </div>
  );
};

export default FinalScoreScreen;

