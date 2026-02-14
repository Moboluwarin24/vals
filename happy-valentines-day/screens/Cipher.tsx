
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import { PUZZLE_CONTENT } from '../constants';

interface CipherProps {
  onSuccess: () => void;
}

const Cipher: React.FC<CipherProps> = ({ onSuccess }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [revealCount, setRevealCount] = useState(-1);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const encoded = PUZZLE_CONTENT.cipher.encoded;
  const decoded = PUZZLE_CONTENT.cipher.decoded;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.toLowerCase().trim() === decoded.toLowerCase().trim()) {
      setIsSuccess(true);
      setError('');
      startReveal();
    } else {
      if (input.trim() === '') {
        setError('Please enter the decoded phrase.');
      } else {
        setError('Not quite. Remember to shift each letter backward by 3.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 350);
      }
    }
  };

  const startReveal = () => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < decoded.length) {
        setRevealCount(i);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onSuccess, 1700);
      }
    }, 55);
  };

  return (
    <div className="flex flex-col items-center">
      <Card className={isShaking ? 'animate-shake' : ''}>
        <Eyebrow text="Puzzle 2 of 4 · Cipher" />
        <h2 className="text-[1.85rem] font-serif mb-4 leading-tight">The Hidden Phrase</h2>
        
        <p className="text-[0.88rem] leading-[1.85] text-ink mb-8">
          A secret message is hidden here. To reveal it, you must reverse the shift. Every letter has been pushed +3 forward.
        </p>

        <div className="bg-blush border border-border rounded-[12px] p-5 mb-8">
          <label className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-dusty block mb-3">Decoding Key</label>
          <ul className="space-y-1.5 text-[0.82rem] font-sans leading-relaxed">
            <li>• Each letter was pushed <span className="font-medium text-deep">+3 forward</span>.</li>
            <li>• To reveal: shift each letter <span className="font-medium text-deep">-3 backward</span>.</li>
            <li>• Example: <span className="text-deep font-medium italic">D → A · H → E · W → T</span></li>
          </ul>
        </div>

        {/* Improved mapping logic: Single pass character loop ensures perfect alignment */}
        <div className="flex flex-wrap justify-center gap-y-8 mb-10 max-w-full">
          {encoded.split('').map((char, idx) => {
            if (char === ' ') {
              // Standard word spacing
              return <div key={idx} className="w-4 h-1" aria-hidden="true" />;
            }
            return (
              <div key={idx} className="flex flex-col items-center gap-2 mx-[3px]">
                <div className="w-[30px] h-[34px] bg-white border border-border rounded-[7px] flex items-center justify-center text-[0.82rem] font-sans font-medium shadow-sm">
                  {char}
                </div>
                <div className="h-[14px] flex items-center justify-center text-[0.72rem] font-sans font-bold text-deep transition-all duration-300">
                  {revealCount >= idx ? decoded[idx].toUpperCase() : ''}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-l-2 border-rose bg-blush p-4 mb-8">
          <p className="text-[0.82rem] leading-[1.9] italic text-muted">
            The phrase is exactly what someone wants to tell you. Type the full decoded message below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
          <input 
            type="text" 
            placeholder="Decoded phrase..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSuccess}
            className="flex-grow bg-white border border-border rounded-[12px] px-4 py-3 font-sans text-[0.88rem] focus:outline-none focus:border-rose transition-colors"
          />
          <Button type="submit" disabled={isSuccess}>
            Check
          </Button>
        </form>

        {error && (
          <p className="text-[0.83rem] mb-4 text-deep">
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
              {PUZZLE_CONTENT.cipher.hint}
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-success border border-success-border rounded-[12px] p-4 animate-rise">
            <p className="text-success-text text-[0.83rem] font-medium">
              ✓ Message decoded. You are halfway there.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Cipher;
