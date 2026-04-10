import { cn } from '../utils/cn';
import Button from './Button';

// Assets
import newMe from '../assets/images/new-me.png';
import eleMask from '../assets/images/ele-mask.png';

const Hero = ({ className }) => {
  return (
    <section 
      id="home"
      className={cn(
        "relative w-full h-[600px] pt-20 flex items-center justify-center overflow-hidden",
        "bg-[#FDFCFE]", // 기본 배경 (매우 연한 바이올렛 틴트)
        className
      )}
    >
      {/* 몽환적인 그라데이션 배경 레이어 (Rule 2 준수) */}
      <div className="absolute inset-0 z-0">
        {/* 우측 상단 메인 바이올렛 포인트 */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#EDE9FE] rounded-full blur-[120px] opacity-60" />
        
        {/* 좌측 하단 은은한 그라데이션 */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#F5F3FF] rounded-full blur-[100px] opacity-40" />
        
        {/* 전체적인 인디고-바이올렛 흐름 */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FDFCFE] to-[#EDE9FE]/30" />
      </div>

      {/* Main Content Wrapper (z-10) */}
      <div 
        className={cn(
          "relative z-10 w-full px-6 lg:px-20",
          "flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-6"
        )}
      >
        
        {/* Text Container */}
        <div className="relative w-full max-w-[350px] lg:w-[350px] flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-6">
          {/* Detail Icon */}
          <div 
            className={cn(
              "hero-icon absolute w-16 lg:w-24 h-auto opacity-80 pointer-events-none",
              "-top-8 lg:top-1 left-1/2 -translate-x-1/2 lg:left-36 lg:translate-x-0"
            )}
          >
            <img src={eleMask} alt="" className="w-[70px] h-auto object-contain rounded-[12px]" />
          </div>
          
          <div className="hero-text-item">
            <h2 
              className={cn(
                "text-slate-900 text-[28px] lg:text-[32px] font-medium leading-[1.4] lg:leading-[1.5]",
                "tracking-tight mb-6"
              )}
            >
              브랜드의<span className="text-violet-500 block lg:inline lg:ml-20">숨은 결</span>을<br />
              찾아내는 <span className="text-violet-500">시각적 통역사</span>,<br />
              <span className="text-violet-500">조희진</span> 입니다.
            </h2>
          </div>

          <div className="hero-text-item">
            <p className="text-slate-500 text-sm lg:text-base font-light leading-[1.75] mb-8 max-w-xs lg:max-w-md">
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
        <div className="hero-image relative w-full max-w-[280px] lg:w-[300px] lg:shrink-0">
          <img 
            src={newMe} 
            alt="Heejin Cho" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Simplified Right Indicator */}
      <div 
        className={cn(
          "absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex",
          "flex-col items-center gap-4 opacity-40"
        )}
      >
        <div className="w-px h-20 bg-gradient-to-b from-violet-300 to-violet-600" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-light tracking-widest uppercase text-violet-500">
          You become what you repeatedly do.
        </span>
      </div>
    </section>
  );
};

export default Hero;
