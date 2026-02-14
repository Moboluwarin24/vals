
import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const steps = [
    { title: "A Riddle", desc: "A single question with one quiet answer. It's easier than you think." },
    { title: "A Cipher", desc: "A short phrase that has been shifted in disguise. The key is right there." },
    { title: "A Jigsaw", desc: "Nine pieces, one picture. Put things back together where they belong." },
    { title: "Memory Match", desc: "Find all eight pairs and the final door opens." }
  ];

  return (
    <div className="flex flex-col items-center">
      <Card>
        <div className="flex justify-center mb-6 text-rose text-[1.4rem] tracking-[0.3em] font-serif">
          ✦ ✦ ✦
        </div>
        
        <Eyebrow text="Something made with care" />
        
        <h1 className="text-[2.6rem] font-serif leading-[1.15] mb-6">
          A Small Hunt.<br />
          <span className="italic text-dusty">A Big Secret.</span>
        </h1>
        
        <p className="text-[0.88rem] leading-[1.85] text-ink mb-8">
          Someone made this specifically for you. It's a journey through four quiet puzzles that lead to a message. There are no timers, no pressure, and no rush.
        </p>
        
        <div className="w-[32px] h-[1px] bg-rose mb-8"></div>
        
        <div className="space-y-4 mb-10">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-start gap-4 pb-4 ${i < steps.length - 1 ? 'border-b border-border-soft' : ''}`}>
              <div className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-petal border border-rose flex items-center justify-center text-deep text-[12px] font-sans font-medium">
                {i + 1}
              </div>
              <div>
                <h4 className="text-[0.88rem] font-medium font-sans text-ink">{step.title}</h4>
                <p className="text-[0.82rem] leading-[1.6] text-muted font-sans font-light italic">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button onClick={onStart} className="w-full">
          Begin →
        </Button>

        <p className="mt-8 text-center text-[0.75rem] text-rose font-light tracking-wide">
          Take your time. There is no rush here.
        </p>
      </Card>
    </div>
  );
};

export default Landing;
