import React, { useState } from "react";
import { cn } from "../utils/cn";
import ProjectImage from "./ProjectImage";
import ProjectPopup from "./ProjectPopup";
import Button from "./Button";

const ProjectSection = ({ project, reverse = false, className }) => {
  const { id, number, subtitle, title, techStack, duration, image, frameType, contribution } = project;
  
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleOpenPopup = (pos) => {
    setMousePos(pos);
    setIsOpen(true);
  };

  // 1. 공통 조건 변수화
  const isRightAlign = title === "와쿠와쿠" || title === "소울블렌드";
  const isMobile = frameType === "mobile";

  return (
    <section id={id} className={cn("px-56 py-32 flex flex-col items-center justify-center", className)}>
      <div className="w-full max-w-[1400px] px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* Text Area */}
        <div className={cn(
          "project-text-content w-full lg:w-[450px] flex flex-col justify-center gap-6 lg:gap-10",
          "z-20 relative",
          isRightAlign ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left",
          reverse ? "lg:order-2" : "lg:order-1"
        )}>
          {/* Header */}
          <div className="flex flex-col gap-2 lg:gap-3 relative">
            <span className={cn(
              "absolute -top-8 lg:-top-10 text-[80px] lg:text-[120px] font-display text-slate-900/5 leading-none select-none",
              isRightAlign ? "-right-2 lg:-right-4" : "-left-2 lg:-left-4"
            )}>
              0{number}
            </span>
            <span className="text-violet-500 font-medium text-sm lg:text-[18px] tracking-[0.2em] uppercase">{subtitle}</span>
            <h2 className="text-4xl lg:text-[64px] font-medium text-slate-800 leading-[1.1] font-display">{title}</h2>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 lg:gap-5 text-slate-500 text-base lg:text-[18px] leading-relaxed max-w-[480px]">
            {[ { label: "Technical Stack", value: techStack }, { label: "Output", value: `${duration} / ${contribution}` } ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="font-medium text-slate-800 text-xs lg:text-[14px] uppercase tracking-wider">{item.label}</span>
                <p className="font-light">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className={cn("flex flex-wrap gap-3 pt-2", isRightAlign && "justify-end")}>
            {["GitHub", "기획서 보기"].map(txt => (
              <Button key={txt} size="sm" variant="outline" className="rounded-full">{txt}</Button>
            ))}
          </div>
        </div>

        {/* Device Frame Section */}
        <div className={cn("project-image-frame w-full max-w-[600px] relative flex", isRightAlign ? "justify-center" : "justify-start", reverse ? "lg:order-1" : "lg:order-2")}>
          <div className={cn(
            isMobile 
              ? "relative w-[300px] aspect-[1/2.03] bg-[#1a1a1a] rounded-[50px] border-[8px] border-[#333] shadow-2xl overflow-hidden" 
              : "w-full max-w-[620px] relative aspect-[4/3.2] rounded-[16px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-slate-200 bg-white"
          )}>
            {!isMobile && (
              <div className="absolute top-0 left-0 w-full h-[28px] lg:h-[36px] bg-[#fbf6fd] flex items-center px-4 lg:px-5 gap-2 z-10 border-b border-slate-100">
                {["#ff5f57", "#febc2e", "#28c840"].map(color => <div key={color} className="w-2.5 h-2.5 lg:w-3 h-3 rounded-full" style={{backgroundColor: color}} />)}
              </div>
            )}
            <div className={cn("absolute inset-0", !isMobile && "pt-[28px] lg:pt-[36px]")}>
              <ProjectImage src={image} alt={title} onClick={handleOpenPopup} />
            </div>
          </div>
        </div>
      </div>

      <ProjectPopup isOpen={isOpen} onClose={() => setIsOpen(false)} project={project} mousePos={mousePos} />
    </section>
  );
};

export default ProjectSection;