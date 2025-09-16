import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Player } from '@/types/game';
import { playSuccessSound } from '@/utils/sounds';

interface GameMasterRevealProps {
  gameMaster: Player | null;
  onContinue: () => void;
}

const GameMasterReveal = ({ gameMaster, onContinue }: GameMasterRevealProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
    playSuccessSound();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-warm p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-soft">
        <CardHeader className="text-center bg-gradient-primary text-white rounded-t-lg">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl md:text-4xl">🧠</span>
            DudenGuess
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10">
          <div className="flex flex-col items-center gap-6">
            <div className={`relative w-40 h-40 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center shadow-soft transition-all duration-700 ${animate ? 'scale-110 rotate-3' : 'scale-90 opacity-80'}`}>
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <div className="text-primary font-extrabold text-4xl">
                {gameMaster ? gameMaster.name.charAt(0).toUpperCase() : '?'}
              </div>
            </div>
            <div className={`text-center transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <div className="text-muted-foreground mb-2">Der Game Master ist</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{gameMaster?.name}</div>
            </div>

            <Button
              onClick={onContinue}
              size="lg"
              className="h-12 sm:h-14 md:h-16 px-6 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl bg-gradient-success hover:shadow-glow transition-all duration-300"
            >
              Los geht's
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameMasterReveal;

