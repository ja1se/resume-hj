import { useLayoutEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import gsap from 'gsap';

const HashIcon = ({ className }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("shrink-0", className)}
  >
    <defs>
      <linearGradient id="marquee-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path 
      d="M9 4L7 20M17 4L15 20M4 9H20M4 15H20" 
      stroke="url(#marquee-icon-grad)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
  </svg>
);

const WhiteHashIcon = ({ className }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("shrink-0", className)}
  >
    <path 
      d="M9 4L7 20M17 4L15 20M4 9H20M4 15H20" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
  </svg>
);

const marqueeItems = [
  "Design", "Development", "Testing", "Deployment", "Research", 
  "Documentation", "Feedback", "Iteration", "Launch", "Evaluation"
];

const MarqueeRow = ({ items, direction = 'left', variant = 'light', className }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = gsap.utils.toArray(track.children);
    
    let totalWidth = 0;
    children.forEach(item => {
      totalWidth += item.offsetWidth + parseFloat(window.getComputedStyle(item).marginRight || 0);
    });

    const moveDistance = totalWidth / 2;
    
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" }
    });

    if (direction === 'left') {
      tl.to(track, {
        x: `-=${moveDistance}`,
        duration: 30,
      });
    } else {
      gsap.set(track, { x: -moveDistance });
      tl.to(track, {
        x: `+=${moveDistance}`,
        duration: 30,
      });
    }

    const onEnter = () => gsap.to(tl, { timeScale: 0, duration: 0.5 });
    const onLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.5 });

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mouseleave', onLeave);
    }

    return () => {
      tl.kill();
      if (container) {
        container.removeEventListener('mouseenter', onEnter);
        container.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [direction]);

  const duplicatedItems = [...items, ...items];
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "overflow-hidden whitespace-nowrap py-5 marquee-container border-y relative",
        variant === 'light' 
          ? "bg-white text-violet-400 border-violet-100" 
          : "bg-gradient-to-r from-violet-300 to-violet-600 text-white border-transparent",
        className
      )}
    >
      <div 
        ref={trackRef}
        className="flex items-center w-max gap-12"
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 shrink-0">
            {variant === 'light' ? <HashIcon /> : <WhiteHashIcon />}
            <span className={cn(
              "text-lg lg:text-xl font-light uppercase tracking-widest font-sans",
              variant === 'light' ? "text-violet-400" : "text-white"
            )}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Marquee = ({ className }) => {
  return (
    <div className={cn("relative z-[100] w-full h-[300px] flex items-center justify-center overflow-hidden -mt-25", className)}>
      <MarqueeRow 
        items={marqueeItems} 
        direction="left" 
        variant="light" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] rotate-3 z-[110]"
      />
      <MarqueeRow 
        items={marqueeItems} 
        direction="right" 
        variant="dark" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] -rotate-7 z-[105]"
      />
    </div>
  );
};

export default Marquee;
