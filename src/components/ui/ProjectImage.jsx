import React, { useRef } from "react";
import { cn } from "../../utils/cn";

/**
 * ProjectImage Component
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @param {string} className - 추가 클래스
 */
const ProjectImage = ({ src, alt, className }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-slate-100",
        className
      )}
    >
      {src ? (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full h-auto min-h-full object-cover object-top will-change-transform"
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
