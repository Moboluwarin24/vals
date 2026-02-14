
export enum Screen {
  Landing = 'landing',
  Puzzle1 = 'riddle',
  Puzzle2 = 'cipher',
  Puzzle3 = 'jigsaw',
  Puzzle4 = 'memory',
  FinalReveal = 'final',
}

export interface JigsawPiece {
  id: number;
  correctIndex: number;
  currentIndex: number | null; // null if in tray
}

export interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}
