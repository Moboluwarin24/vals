
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import { shuffleArray } from '../utils';

interface JigsawProps {
  onSuccess: () => void;
}

const Jigsaw: React.FC<JigsawProps> = ({ onSuccess }) => {
  const [board, setBoard] = useState<(number | null)[]>(Array(9).fill(null));
  const [tray, setTray] = useState<number[]>([]);
  const [selectedTrayIdx, setSelectedTrayIdx] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const init = useCallback(() => {
    const pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    setTray(shuffleArray(pieces));
    setBoard(Array(9).fill(null));
    setSelectedTrayIdx(null);
  }, []);

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          init();
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const isSolved = board.every((val, idx) => val === idx);
    if (isSolved && board.every(v => v !== null)) {
      setIsSuccess(true);
      setTimeout(onSuccess, 2000);
    }
  }, [board, onSuccess]);

  const handleTrayClick = (idx: number) => {
    if (selectedTrayIdx === idx) {
      setSelectedTrayIdx(null);
    } else {
      setSelectedTrayIdx(idx);
    }
  };

  const handleBoardClick = (idx: number) => {
    if (selectedTrayIdx !== null) {
      const newBoard = [...board];
      const newTray = [...tray];
      const pieceToPlace = tray[selectedTrayIdx];

      if (newBoard[idx] !== null) {
        newTray.push(newBoard[idx]!);
      }

      newBoard[idx] = pieceToPlace;
      newTray.splice(selectedTrayIdx, 1);

      setBoard(newBoard);
      setTray(newTray);
      setSelectedTrayIdx(null);
    } else {
      if (board[idx] !== null) {
        const newBoard = [...board];
        const newTray = [...tray];
        newTray.push(newBoard[idx]!);
        newBoard[idx] = null;
        setBoard(newBoard);
        setTray(newTray);
      }
    }
  };

  const Piece = ({ id, size, img }: { id: number, size: number, img: HTMLImageElement }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !img) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const draw = () => {
        const imgWidth = img.naturalWidth || img.width || 600;
        const imgHeight = img.naturalHeight || img.height || 600;

        const sourceSize = Math.min(imgWidth, imgHeight);
        const sourceXStart = (imgWidth - sourceSize) / 2;
        const sourceYStart = (imgHeight - sourceSize) / 2;
        
        const pieceSourceSize = sourceSize / 3;
        const sx = sourceXStart + (id % 3) * pieceSourceSize;
        const sy = sourceYStart + Math.floor(id / 3) * pieceSourceSize;

        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(
          img,
          sx, sy, pieceSourceSize, pieceSourceSize,
          0, 0, size, size
        );

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, size, size);
      };

      if (img.complete) {
        draw();
      } else {
        img.onload = draw;
      }
    }, [id, size, img]);

    return <canvas ref={canvasRef} width={size} height={size} className="block rounded-[6px] shadow-sm" />;
  };

  if (!image) {
    return (
      <div className="flex flex-col items-center">
        <Card className="border-t-4 border-t-rose">
          <Eyebrow text="Puzzle 3 of 4 · Jigsaw" />
          <h2 className="text-[1.85rem] font-serif mb-2 leading-tight">Pick a Memory</h2>
          <p className="text-[0.88rem] leading-[1.85] text-muted italic mb-8">
            "choose your own difficulty, don't say I did nothing for you"
          </p>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-[240px] border-2 border-dashed border-rose/30 bg-blush/30 rounded-[20px] flex flex-col items-center justify-center cursor-pointer hover:bg-blush/50 hover:border-rose/50 transition-all group mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform mb-4">
              📸
            </div>
            <p className="text-[0.82rem] font-sans font-medium text-deep">Tap to upload a photo</p>
            <p className="text-[10px] text-dusty uppercase tracking-widest mt-2">JPG, PNG, OR GIF</p>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleManualUpload} 
            accept="image/*" 
            className="hidden" 
          />
          
          <p className="text-[0.75rem] text-center text-ink leading-relaxed opacity-60 px-4">
            Pick a photo of us, or anything you like. I'll split it into pieces for you to solve.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Card>
        <Eyebrow text="Puzzle 3 of 4 · Jigsaw" />
        <h2 className="text-[1.85rem] font-serif mb-4 leading-tight">A Memory Scrambled</h2>
        
        <p className="text-[0.88rem] leading-[1.85] text-ink mb-6">
          A moment frozen in time has been divided. Return each piece to its rightful place to unlock the next step.
        </p>

        <div className="mb-8">
          <div className="grid grid-cols-3 gap-[6px] bg-border-soft border border-border-soft p-[6px] rounded-[16px] overflow-hidden mx-auto w-fit shadow-inner">
            {board.map((pieceId, i) => (
              <div 
                key={i}
                onClick={() => handleBoardClick(i)}
                className={`w-[96px] h-[96px] cursor-pointer transition-all duration-300 ${pieceId === null ? 'bg-blush/40 border border-dashed border-rose/40 flex items-center justify-center hover:bg-blush/60' : 'bg-white'}`}
              >
                {pieceId === null ? (
                  <span className="text-rose/30 text-3xl font-serif">?</span>
                ) : (
                  <Piece id={pieceId} size={96} img={image} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="text-center text-[10px] font-sans font-medium text-dusty uppercase tracking-[0.15em] mb-4">Remaining Pieces</p>
          <div className="flex flex-wrap justify-center gap-3 bg-blush/20 p-5 rounded-[20px] border border-border-soft min-h-[110px]">
            {tray.map((pieceId, i) => (
              <div 
                key={i} 
                onClick={() => handleTrayClick(i)}
                className={`w-[74px] h-[74px] rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedTrayIdx === i ? 'ring-[3px] ring-deep ring-offset-2 shadow-xl scale-110' : 'border border-border-soft opacity-90 hover:opacity-100 shadow-sm'}`}
              >
                <Piece id={pieceId} size={74} img={image} />
              </div>
            ))}
            {tray.length === 0 && !isSuccess && (
              <p className="text-[0.82rem] italic text-dusty self-center">All pieces are on the board.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
             <Button variant="ghost" onClick={() => setImage(null)} className="flex-1 text-[0.75rem] py-2">
              New Image
            </Button>
            <Button variant="ghost" onClick={init} className="flex-1 text-[0.75rem] py-2">
              Reset
            </Button>
          </div>

          {isSuccess && (
            <div className="bg-success border border-success-border rounded-[14px] p-4 animate-rise text-center">
              <p className="text-success-text text-[0.85rem] font-medium">
                ✓ Beautifully done. The final challenge awaits...
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Jigsaw;
