
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import Eyebrow from '../components/Eyebrow';
import { PUZZLE_CONTENT } from '../constants';
import { shuffleArray } from '../utils';

interface MemoryProps {
  onSuccess: () => void;
}

interface CardState {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC<MemoryProps> = ({ onSuccess }) => {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const symbols = [...PUZZLE_CONTENT.memory.symbols, ...PUZZLE_CONTENT.memory.symbols];
    const shuffled = shuffleArray(symbols).map((s, i) => ({
      id: i,
      symbol: s,
      isFlipped: false,
      isMatched: false
    }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (idx: number) => {
    if (isLocked || cards[idx].isFlipped || cards[idx].isMatched || flippedIndices.includes(idx)) return;

    const newCards = [...cards];
    newCards[idx].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (indices: number[]) => {
    const [idx1, idx2] = indices;
    if (cards[idx1].symbol === cards[idx2].symbol) {
      // Match
      setTimeout(() => {
        const newCards = [...cards];
        newCards[idx1].isMatched = true;
        newCards[idx2].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
        setMatchesFound(prev => prev + 1);
      }, 300);
    } else {
      // Mismatch
      setTimeout(() => {
        const newCards = [...cards];
        newCards[idx1].isFlipped = false;
        newCards[idx2].isFlipped = false;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
      }, 950);
    }
  };

  useEffect(() => {
    if (matchesFound === 8) {
      setTimeout(() => {
        setIsSuccess(true);
        setTimeout(onSuccess, 1700);
      }, 300);
    }
  }, [matchesFound, onSuccess]);

  return (
    <div className="flex flex-col items-center">
      <Card>
        <Eyebrow text="Puzzle 4 of 4 · Memory Match" />
        <h2 className="text-[1.85rem] font-serif mb-4 leading-tight">Remember Everything</h2>
        
        <p className="text-[0.88rem] leading-[1.85] text-ink mb-6">
          Find all eight pairs hidden behind the cards. This final door requires only your attention and a bit of patience.
        </p>

        <div className="bg-blush/50 border border-rose/20 rounded-[14px] p-4 mb-8 text-center italic">
          <p className="text-[0.82rem] text-deep leading-relaxed">
            "bonus points if the pair you solve first is the app we started talking on"
          </p>
        </div>

        <div className="grid grid-cols-4 gap-[9px] w-full max-w-[320px] mx-auto mb-8">
          {cards.map((card, i) => (
            <div 
              key={card.id} 
              className="relative w-full h-[75px] [perspective:700px] cursor-pointer"
              onClick={() => handleCardClick(i)}
            >
              <div className={`relative w-full h-full transition-transform duration-[420ms] [transform-style:preserve-3d] ${card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Back of Card */}
                <div className="absolute inset-0 bg-blush border border-border rounded-[12px] flex items-center justify-center [backface-visibility:hidden]">
                  <span className="text-rose text-[1.5rem] select-none opacity-40 font-serif">?</span>
                </div>
                {/* Front of Card */}
                <div className={`absolute inset-0 border rounded-[12px] flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${card.isMatched ? 'bg-success border-success-border' : 'bg-white border-border shadow-sm'}`}>
                  <img 
                    src={card.symbol} 
                    alt="Social Logo" 
                    className={`w-8 h-8 object-contain transition-opacity duration-300 ${card.isMatched ? 'opacity-100' : 'opacity-90'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[0.83rem] font-sans mb-8">
          Pairs found: <span className="font-bold text-deep">{matchesFound} / 8</span>
        </p>

        <div className="border-l-2 border-rose bg-blush p-4 mb-4">
          <p className="text-[0.82rem] leading-[1.9] italic text-muted">
            Each icon represents a place where our conversations live. Do you remember the very first one?
          </p>
        </div>

        {isSuccess && (
          <div className="bg-success border border-success-border rounded-[12px] p-4 animate-rise mt-4">
            <p className="text-success-text text-[0.83rem] font-medium">
              ✓ All pairs found. The final door is open.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MemoryMatch;
