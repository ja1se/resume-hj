import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../utils/cn";
import { useIsMobile } from "../hooks/useIsMobile";

/**
 * ProjectImage Component with Scroll Animation
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @param {Array} translateYOutput - ["0%", "-40%"] 등 useTransform output 범위
 * @param {string} className - 추가 클래스
 */
const ProjectImage = ({ src, alt, translateYOutput = ["0%", "-40%"], className }) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const MotionImg = motion.img;

  // 스크롤 진행도 감지 (섹션 기준)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 스크롤 진행도에 따른 이미지 이동 (모바일에서는 애니메이션 비활성화)
  const y = useTransform(
    scrollYProgress, 
    [0.1, 0.9], 
    translateYOutput, 
    { clamp: true }
  );

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-white",
        className
      )}
    >
      {src ? (
        <MotionImg
          src={src}
          alt={alt}
          style={{ y: isMobile ? 0 : y }}
          className="w-full h-auto min-h-full object-cover object-top will-change-transform"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300">
          No Image
        </div>
      )}
    </div>
  );
};

export default ProjectImage;
