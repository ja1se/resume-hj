import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '../utils/cn';
import Button from './Button';

// Assets
import newMe from '../assets/images/new-me.png';
import eleMask from '../assets/images/ele-mask.png';

const Hero = ({ className }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Background decorative text animation
      tl.from(".hero-bg-text", {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: "power3.out"
      });

      // Main text elements staggered
      tl.from(".hero-text-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      }, "-=1");

      // Character image animation
      tl.from(".hero-image", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.8");

      // Detail icon floating animation
      gsap.to(".hero-icon", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home"
      ref={sectionRef}
      className={cn(
        "relative w-full py-36 overflow-hidden bg-white font-sans flex items-center justify-center",
        className
      )}
    >
      {/* Background Decorative Text */}
      <div className="hero-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-20 rotate-[16.09deg]">
        <h1 className="text-[#a78bfa] text-[200px] font-medium leading-none tracking-[-0.04em] whitespace-nowrap">
          FLEXUncovering the hidden textures of a brand.
        </h1>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col gap-6 md:flex-row items-center justify-center lg:px-6 max-w-[1400px] w-full mx-auto">
        
        {/* Text Container */}
        <div className="relative w-[350px] items-start text-left pl-6">
          {/* Detail Icon */}
          <div className="hero-icon absolute w-[70px] top-1 left-36 w-24 h-auto opacity-80 pointer-events-none">
            <img src={eleMask} alt="" className="w-full h-full object-contain" />
          </div>
          
          <div className="hero-text-item">
            <h2 className="text-[#333] text-[32px] font-medium leading-[1.5] tracking-tight mb-6">
              브랜드의<span className="text-[#a78bfa] ml-20">숨은 결</span>을<br />
              찾내는 <span className="text-[#a78bfa]">시각적 통역사</span>,<br />
              <span className="text-[#a78bfa]">조희진</span> 입니다.
            </h2>
          </div>

          <div className="hero-text-item">
            <p className="text-[#4b5563] text-base font-light leading-[1.75] mb-8 max-w-md">
              부엉이의 부리부리한 눈처럼 날카로운 통찰력으로 문제의 핵심을 꿰뚫다!
            </p>
          </div>

          <div className="hero-text-item flex gap-4">
            <Button 
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              GitHub
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => window.open('#', '_blank')}
            >
              Resume
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-image relative w-[300px] lg:shrink-0">
          <img 
            src={newMe} 
            alt="Heejin Cho" 
            className="w-[300px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Simplified Right Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 opacity-40">
        <div className="w-px h-20 bg-gradient-to-b from-[#c4b5fd] to-[#7c3aed]" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-xs font-light tracking-widest uppercase text-[#a78bfa]">
          You become what you repeatedly do.
        </span>
      </div>
    </section>
  );
};

export default Hero;
