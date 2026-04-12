import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../utils/cn";
import Button from "./Button";
import { SITE_LINKS } from "../constants/links";

// Assets
import newMe from "../assets/images/new-me.png";
import eleMask from "../assets/images/ele-mask.png";
import BackgroundImage from "../assets/images/hero-bg.png";

const Hero = ({ className }) => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const isInteractive = useRef(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;

    if (!hero || !image) return;

    const ctx = gsap.context(() => {
      // 1. Performance Optimization: quickSetter
      const xSetter = gsap.quickSetter(image, "x", "px");
      const ySetter = gsap.quickSetter(image, "y", "px");

      // 2. Entry Animation Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          isInteractive.current = true;
          startWaveEffect(); // 메인 애니메이션 완료 후 웨이브 효과 시작
        },
      });

      // Step 1: Background Reveal
      tl.from(".hero-bg-layer", {
        opacity: 0,
        scale: 1.1,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      })
        // Step 2: Text & Buttons Sequence
        .from(
          ".hero-text-item",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        // Step 3: Character Reveal
        .from(
          image,
          {
            y: 50,
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )
        // Step 4: Decorative Elements
        .from(
          ".hero-deco",
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.5",
        );

      // 3. Infinite Floating Animation (Character)
      gsap.to(image, {
        y: "-=15",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: tl.duration()
      });

      // 4. Background Gradient Movement (Rich Organic Effect)
      gsap.to(".hero-bg-gradient-1", {
        x: "3%",
        y: "5%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".hero-bg-gradient-2", {
        x: "-4%",
        y: "-6%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 5. Wave Text Effect (Keyword Loop)
      const startWaveEffect = () => {
        const keywords = gsap.utils.toArray(".hero-keyword");
        
        keywords.forEach(word => {
          const text = word.textContent;
          word.innerHTML = "";
          [...text].forEach(char => {
            const span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            span.className = "char opacity-100"; // 불투명도 100% 고정
            word.appendChild(span);
          });
        });

        const loopTl = gsap.timeline({ repeat: -1 });

        keywords.forEach((word) => {
          const chars = word.querySelectorAll(".char");
          
          loopTl
            // 강조 시작 (오직 웨이브 상하 이동만 적용)
            .to(chars, {
              y: -8,
              duration: 0.5,
              stagger: 0.05,
              ease: "back.out(2)",
            })
            // 원복
            .to(chars, {
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.in",
              delay: 0.5
            });
        });
      };

      // 6. Mouse Event Handlers
      const handleMouseMove = (e) => {
        if (!isInteractive.current) return;

        const { clientX, clientY } = e;
        const { width, height, left, top } = hero.getBoundingClientRect();

        const xPos = (clientX - (left + width / 2)) / (width / 2);
        const yPos = (clientY - (top + height / 2)) / (height / 2);

        xSetter(xPos * -25);
        ySetter(yPos * -25);
      };

      const handleMouseLeave = () => {
        if (!isInteractive.current) return;
        gsap.to(image, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseleave", handleMouseLeave);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className={cn(
        "relative w-full h-[600px] pt-20 flex items-center justify-center overflow-hidden",
        "bg-violet-50/30",
        className,
      )}
    >
      {/* 배경 통합 레이어 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* 메인 배경 이미지 */}
        <div className="hero-bg-layer absolute inset-0">
          <img
            src={BackgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* 몽환적인 그라데이션*/}
        <div className="hero-bg-layer hero-bg-gradient-1 absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-violet-100 rounded-full blur-[250px]" />
        <div className="hero-bg-layer hero-bg-gradient-2 absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-violet-200 rounded-full blur-[300px]" />

        {/* 전체적인 오버레이 틴트 */}
        <div className="hero-bg-layer absolute inset-0" />
      </div>

      <div
        className={cn(
          "relative z-10 w-full px-6 lg:px-20",
          "flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-6",
        )}
      >
        {/* Text Container */}
        <div className="relative w-full max-w-[350px] lg:w-[350px] flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-6">
          <div
            className={cn(
              "hero-text-item absolute w-16 lg:w-24 h-auto opacity-80 pointer-events-none",
              "-top-8 lg:top-1 left-1/2 -translate-x-1/2 lg:left-36 lg:translate-x-0",
            )}
          >
            <img
              src={eleMask}
              alt=""
              className="w-[70px] h-auto object-contain rounded-[12px]"
            />
          </div>

          <div className="hero-text-item">
            <h2
              className={cn(
                "text-slate-900 text-[28px] lg:text-[32px] font-medium leading-[1.4] lg:leading-[1.5]",
                "tracking-tight mb-6",
              )}
            >
              브랜드의
              <span className="hero-keyword text-violet-500 block lg:inline lg:ml-20">
                숨은 결
              </span>
              을<br />
              찾아내는 <span className="hero-keyword text-violet-500">시각적 통역사</span>,
              <br />
              <span className="hero-keyword text-violet-500">조희진</span> 입니다.
            </h2>
          </div>

          <div className="hero-text-item">
            <p className="text-slate-500 text-base lg:text-lg font-light leading-[1.8] mb-10 max-w-xs lg:max-w-md">
              부엉이의 부리부리한 눈처럼 날카로운 통찰력으로 문제의 핵심을
              꿰뚫다!
            </p>
          </div>

          <div className="hero-text-item flex gap-4">
            <Button
              size="sm"
              variant="primary"
              className="rounded-full"
              onClick={() => window.open(SITE_LINKS.common.github, "_blank")}
            >
              GitHub
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="rounded-full"
              onClick={() => window.open(SITE_LINKS.common.resume, "_blank")}
            >
              Resume
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div
          ref={imageRef}
          className="hero-image relative w-full max-w-[280px] lg:w-[300px] lg:shrink-0 will-change-transform"
        >
          <img
            src={newMe}
            alt="Heejin Cho"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Decorative Indicator */}
      <div
        className={cn(
          "hero-deco absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex",
          "flex-col items-center gap-4 opacity-40",
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
