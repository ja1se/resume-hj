import React, { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * ProjectImage Component
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @param {string[]} translateYOutput - useTransform의 output 범위 (e.g., ["0%", "-50%"])
 * @param {string} className - 추가 클래스
 */
const ProjectImage = ({ src, alt, translateYOutput = ["0%", "-50%"], className }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // clamp: true 를 적용하여 범위 외 값 방지
  const translateY = useTransform(scrollYProgress, [0, 1], translateYOutput, { clamp: true });

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-slate-100",
        className
      )}
    >
      {src ? (
        <m.img
          src={src}
          alt={alt}
          style={{ y: translateY, willChange: "transform" }}
          className="w-full h-auto min-h-full object-cover object-top"
          transition={{ ease: "linear" }}
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
