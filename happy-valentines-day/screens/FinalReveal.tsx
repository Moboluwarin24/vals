
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import { PUZZLE_CONTENT } from '../constants';

const FinalReveal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { letter } = PUZZLE_CONTENT;

  return (
    <div className="flex flex-col items-center">
      {!isOpen ? (
        <Card className="text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-blush border-2 border-rose flex items-center justify-center animate-float">
              <span className="text-3xl">✉️</span>
            </div>
          </div>
          
          <Eyebrow text="The Journey Ends" />
          
          <h2 className="text-[2.2rem] font-serif mb-6 leading-tight">
            You've found the way.
          </h2>
          
          <p className="text-[0.88rem] leading-[1.85] text-ink mb-10">
            Every puzzle is solved, every secret revealed. All that remains is the message that was waiting for you from the very beginning.
          </p>
          
          <Button onClick={() => setIsOpen(true)} className="w-full">
            Open the Letter
          </Button>
        </Card>
      ) : (
        <Card className="relative overflow-hidden border-t-[6px] border-t-rose">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <span className="text-[120px] font-serif leading-none italic">L</span>
          </div>

          <div className="animate-rise">
            <div className="mb-10 flex justify-between items-baseline border-b border-border-soft pb-4">
              <span className="text-[11px] font-sans uppercase tracking-widest text-dusty">Confidential</span>
              <span className="text-[0.88rem] font-serif italic text-muted">{letter.date}</span>
            </div>

            <div className="space-y-8">
              <div className="mb-2">
                <p className="text-[0.82rem] font-sans italic text-dusty mb-6 leading-relaxed border-l-2 border-petal pl-4">
                  "if you're seeing this then you made it to the end, well done"
                </p>
                <h3 className="text-[2.2rem] font-serif italic text-deep">
                  {letter.salutation},
                </h3>
              </div>

              <div className="space-y-6">
                {letter.body.map((para, i) => (
                  <p 
                    key={i} 
                    className="text-[1.05rem] font-serif leading-[1.9] text-ink first-letter:text-3xl first-letter:font-bold first-letter:text-dusty first-letter:mr-1"
                    style={{ animationDelay: `${(i + 1) * 200}ms` }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-10 flex flex-col items-end">
                <div className="w-[100px] h-[1px] bg-rose/40 mb-4"></div>
                <p className="text-[1.2rem] font-serif italic text-deep mb-2">
                  {letter.signOff}
                </p>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-dusty">
                  Always Yours
                </span>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-border-soft flex justify-center">
              <button 
                onClick={() => window.print()}
                className="text-[11px] font-sans uppercase tracking-widest text-dusty hover:text-deep transition-colors"
              >
                [ Save a copy ]
              </button>
            </div>
          </div>
        </Card>
      )}
      
      {isOpen && (
        <div className="mt-12 text-center animate-rise [animation-delay:1500ms]">
          <p className="text-dusty font-serif italic text-[0.95rem]">
            Thank you for being the heart of this story.
          </p>
          <div className="flex justify-center gap-2 mt-4 text-rose">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalReveal;
