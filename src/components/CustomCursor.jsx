import { useEffect, useRef } from "react";
import gsap from "gsap";
import useIsMobile from "../hooks/useIsMobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const innerRef = useRef(null); // 내부 점
  const outerRef = useRef(null); // 외부 선 원

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      // 1. 내부 점: 마우스 끝에 딱 붙어서 정확한 클릭 위치를 안내 (빠른 반응)
      gsap.to(innerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1, 
        ease: "power2.out",
      });

      // 2. 외부 선 원: 부드럽게 뒤따라오며 시각적 여운을 남김 (느린 반응)
      gsap.to(outerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.5, 
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* 내부 실점: 보랏빛 포인트 */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-3 h-3 bg-violet-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      
      {/* 외부 선 원: 몽환적인 가이드라인 */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-12 h-12 border border-violet-500/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ borderWidth: '1px' }}
      />
    </>
  );
};

export default CustomCursor;