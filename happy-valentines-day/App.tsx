
import React, { useState } from 'react';
import { Screen } from './types';
import ProgressBar from './components/ProgressBar';
import Landing from './screens/Landing';
import Riddle from './screens/Riddle';
import Cipher from './screens/Cipher';
import Jigsaw from './screens/Jigsaw';
import MemoryMatch from './screens/MemoryMatch';
import FinalReveal from './screens/FinalReveal';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Landing);

  const navigateTo = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Landing:
        return <Landing onStart={() => navigateTo(Screen.Puzzle1)} />;
      case Screen.Puzzle1:
        return <Riddle onSuccess={() => navigateTo(Screen.Puzzle2)} />;
      case Screen.Puzzle2:
        return <Cipher onSuccess={() => navigateTo(Screen.Puzzle3)} />;
      case Screen.Puzzle3:
        return <Jigsaw onSuccess={() => navigateTo(Screen.Puzzle4)} />;
      case Screen.Puzzle4:
        return <MemoryMatch onSuccess={() => navigateTo(Screen.FinalReveal)} />;
      case Screen.FinalReveal:
        return <FinalReveal />;
      default:
        return <Landing onStart={() => navigateTo(Screen.Puzzle1)} />;
    }
  };

  const showProgress = [
    Screen.Puzzle1,
    Screen.Puzzle2,
    Screen.Puzzle3,
    Screen.Puzzle4
  ].includes(currentScreen);

  return (
    <main className="min-h-screen py-12 px-6 md:py-20 flex flex-col items-center">
      {showProgress && <ProgressBar currentScreen={currentScreen} />}
      <div className="w-full max-w-[540px]">
        {renderScreen()}
      </div>
      
      <footer className="mt-20 mb-8 opacity-30 text-deep text-[10px] uppercase tracking-[0.2em] font-sans">
        Made with care for you
      </footer>
    </main>
  );
};

export default App;
