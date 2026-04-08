import React from 'react';
import { cn } from '../utils/cn';
import Button from './Button';

// Assets (Using local assets based on context)
import newMe from '../assets/images/new-me.png';
import eleMask from '../assets/images/ele-mask.png';
import ele1 from '../assets/images/ele1.png';

const Hero = ({ className }) => {
  return (
    <section 
      id="home"
      className={cn(
        "relative w-full h-screen min-h-[800px] overflow-hidden bg-white flex items-center",
        className
      )}
    >
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-[55%] -translate-y-1/2 pointer-events-none select-none opacity-10 rotate-[15deg]">
        <h1 className="text-[240px] font-bold text-violet-500 leading-none tracking-tighter whitespace-nowrap">
          FLEX Uncovering the hidden textures of a brand.
        </h1>
      </div>

      {/* Decorative Circles (Left) */}
      <div className="absolute -left-[10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-violet-100 rounded-full opacity-50" />
      <div className="absolute -left-[15%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-violet-50 rounded-full opacity-30" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start gap-8">
          <div className="relative">
            {/* Small icon element */}
            <div className="absolute -top-12 -left-8 w-24 h-12 opacity-80">
              <img src={eleMask} alt="" className="w-full h-full object-contain" />
            </div>
            
            <h2 className="text-[48px] lg:text-[64px] font-medium text-slate-800 leading-[1.2] tracking-tight">
              브랜드의 <span className="text-violet-400">숨은 결</span>을<br />
              찾아내는 <span className="text-violet-400">시각적 통역사</span>,<br />
              <span className="text-violet-400">조희진</span> 입니다.
            </h2>
          </div>

          <p className="text-slate-500 text-lg lg:text-xl font-light max-w-lg">
            부엉이의 부리부리한 눈처럼 날카로운 통찰력으로<br />
            문제의 핵심을 꿰뚫습니다!
          </p>

          <div className="flex gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="rounded-full px-10 bg-gradient-to-r from-violet-300 to-violet-600 border-none hover:shadow-lg transition-shadow"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              깃허브
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              className="rounded-full px-10 bg-gradient-to-r from-violet-300 to-violet-600 border-none hover:shadow-lg transition-shadow"
              onClick={() => window.open('#', '_blank')}
            >
              이력서
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-center lg:justify-end items-center">
          {/* Main Character Image */}
          <div className="relative w-full max-w-[500px] aspect-square lg:aspect-auto lg:h-[700px]">
            <img 
              src={newMe} 
              alt="조희진" 
              className="w-full h-full object-contain relative z-10"
            />
            
            {/* Floating Decoration elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-100/50 rounded-full blur-3xl" />
            <div className="absolute top-10 -right-10 w-60 h-60 bg-violet-50 rounded-full blur-2xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Right Vertical Text Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 group">
        <div className="w-px h-24 bg-gradient-to-b from-violet-200 to-violet-500" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-xs text-violet-400 font-light tracking-widest uppercase">
          You become what you repeatedly do.
        </span>
      </div>
    </section>
  );
};

export default Hero;
