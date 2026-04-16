import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../utils/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionHeader Component - Flexible Animation Version
 * @param {string} title - 섹션 제목
 * @param {string} description - 섹션 설명 문구
 * @param {string} className - 컨테이너 추가 클래스
 */

const SectionHeader = ({ title, description, className }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 타이틀 애니메이션 (가장 먼저 등장, 묵직한 이동 거리)
      gsap.from(".header-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. 설명글 애니메이션
      if (description) {
  // .desc-char (글자들)에 애니메이션 적용
  gsap.fromTo(".header-desc", 
    { 
      opacity: 0, 
      y: 10, 
      letterSpacing: "0.2em",
    },
    {
      opacity: 1,
      y: 0,
      letterSpacing: "0em",
      filter: "blur(0px)",
      duration: 1.5,
      stagger: {
        each: 0.05,
        from: "random",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".header-title",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

      // 3. 스파클 아이콘 연출
      gsap.fromTo(
        ".header-sparkle",
        { opacity: 0, rotate: 0, scale: 0.5 },
        {
          opacity: 1,
          rotate: 360,
          scale: 1,
          duration: 1.8,
          ease: "expo.inOut",
          delay: 1.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [description]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full px-6 pt-20 lg:px-20 z-20 bg-white",
        "flex flex-col items-center text-center",
        className,
      )}
    >
      <div className="title-wrapper relative inline-block">
        {/* Sparkle Icon: 우측 상단 배치 */}
        <div className="header-sparkle absolute -left-1 lg:-left-2 lg:-top-1 text-violet-400 opacity-0 pointer-events-none">
          <FontAwesomeIcon
            icon={faStarOfLife}
            className="text-xl lg:text-2xl"
          />
        </div>

        {/* Title */}
        <h2
          className={cn(
            "header-title font-display font-semibold text-violet-400",
            "text-[48px] lg:text-[64px] leading-[1.5]",
          )}
        >
          {title}
        </h2>

        {/* Description */}
        {description && (
          <div className="desc-wrapper mt-2 max-w-md text-center">
            <p
              className={cn(
                "header-desc text-violet-400 font-light uppercase tracking-wider",
                "text-[12px] leading-relaxed lg:text-[14px]",
              )}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
