
import React from 'react';

interface EyebrowProps {
  text: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-[18px] h-[1px] bg-rose"></div>
      <span className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-dusty">
        {text}
      </span>
    </div>
  );
};

export default Eyebrow;
