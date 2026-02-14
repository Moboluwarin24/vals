
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import { PUZZLE_CONTENT } from '../constants';

interface RiddleProps {
  onSuccess: () => void;
}

const Riddle: React.FC<RiddleProps> = ({ onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleanAnswer = answer.toLowerCase().trim();
    if (PUZZLE_CONTENT.riddle.answers.includes(cleanAnswer)) {
      setIsSuccess(true);
      setError('');
      setTimeout(onSuccess, 1700);
    } else {
      if (cleanAnswer === '') {
        setError('Type your answer in the field above, then press Check.');
      } else {
        setError('Not quite. Think about what grows the more freely you share it.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 350);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card className={isShaking ? 'animate-shake' : ''}>
        <Eyebrow text="Puzzle 1 of 4 · Riddle" />
        <h2 className="text-[1.85rem] font-serif mb-4 leading-tight">The First Question</h2>
        
        <p className="text-[0.88rem] leading-[1.85] text-ink mb-8">
          A riddle is often a feeling described sideways. The answer is something you already know well—trust your first instinct.
        </p>

        <div className="relative bg-blush border border-border-soft rounded-[14px] p-7 mb-8">
          <span className="absolute top-2 left-4 font-serif text-[4rem] text-rose opacity-40 leading-none">“</span>
          <p className="font-serif italic text-[1.2rem] leading-[1.9] text-center pt-4 whitespace-pre-line">
            {PUZZLE_CONTENT.riddle.question}
          </p>
        </div>

        <div className="border-l-2 border-rose bg-blush p-4 mb-8">
          <p className="text-[0.82rem] leading-[1.9] italic text-muted">
            The first word that comes to mind is probably right. Don't overthink—this is a hunt made of warmth, not tricks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
          <input 
            type="text" 
            placeholder="One word..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSuccess}
            className="flex-grow bg-white border border-border rounded-[12px] px-4 py-3 font-sans text-[0.88rem] focus:outline-none focus:border-rose transition-colors"
          />
          <Button type="submit" disabled={isSuccess}>
            Check
          </Button>
        </form>

        {error && (
          <p className={`text-[0.83rem] mb-4 ${error.includes('✓') ? 'text-success-text' : 'text-deep'}`}>
            {error}
          </p>
        )}

        <button 
          onClick={() => setShowHint(!showHint)}
          className="text-rose text-[0.82rem] underline font-light mb-4 block"
        >
          {showHint ? 'Hide hint' : 'Show a hint'}
        </button>

        {showHint && (
          <div className="border border-dashed border-rose rounded-[12px] p-4 mb-4">
            <p className="text-[0.82rem] italic text-muted leading-relaxed">
              {PUZZLE_CONTENT.riddle.hint}
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-success border border-success-border rounded-[12px] p-4 animate-rise">
            <p className="text-success-text text-[0.83rem] font-medium">
              ✓ That's it. Love — it was always the answer. Moving forward...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Riddle;
