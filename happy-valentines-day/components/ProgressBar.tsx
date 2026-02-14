
import React from 'react';
import { Screen } from '../types';

interface ProgressBarProps {
  currentScreen: Screen;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentScreen }) => {
  const screens = [Screen.Puzzle1, Screen.Puzzle2, Screen.Puzzle3, Screen.Puzzle4];
  const currentIndex = screens.indexOf(currentScreen);
  
  if (currentIndex === -1) return null;

  const labels: Record<string, string> = {
    [Screen.Puzzle1]: "Riddle",
    [Screen.Puzzle2]: "Cipher",
    [Screen.Puzzle3]: "Jigsaw",
    [Screen.Puzzle4]: "Memory Match",
  };

  return (
    <div className="w-full max-w-[540px] mb-6 animate-rise">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-dusty">
          Puzzle {currentIndex + 1} of 4 — {labels[currentScreen]}
        </span>
      </div>
      <div className="flex gap-1.5 h-[2px]">
        {screens.map((s, idx) => {
          let color = 'bg-border';
          if (idx < currentIndex) color = 'bg-dusty';
          if (idx === currentIndex) color = 'bg-rose';
          
          return (
            <div 
              key={s} 
              className={`flex-1 rounded-full transition-colors duration-500 ${color}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
