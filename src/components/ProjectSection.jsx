import React from "react";
import { cn } from "../utils/cn";
import ProjectImage from "./ProjectImage";
import Button from "./Button";
import { useIsMobile } from "../hooks/useIsMobile";

/**
 * ProjectSection Component
 * @param {Object} project - 프로젝트 데이터
 * @param {boolean} reverse - 이미지와 텍스트 위치 반전 여부
 * @param {string} className - 추가 클래스
 */
const ProjectSection = ({ project, reverse = false, className }) => {
  const { 
    id, 
    number, 
    subtitle, 
    title, 
    techStack, 
    duration, 
    image, 
    color, 
    translateYOutput,
    frameType 
  } = project;
  
  const isMobile = useIsMobile();

  return (
    <section 
      id={id}
      className={cn(
        "relative w-full min-h-[150vh] lg:min-h-[250vh] flex flex-col items-center",
        className
      )}
      style={{ backgroundColor: color || "#ffffff" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Area */}
          <div 
            className={cn(
              "flex flex-col items-start gap-8 lg:gap-12",
              reverse ? "lg:order-2" : "lg:order-1"
            )}
          >
            {/* Project Header (Subtitle & Title) */}
            <div className="flex flex-col gap-3 relative">
              <span className="absolute -top-10 -left-4 text-[120px] font-display text-slate-900/5 leading-none select-none">
                0{number}
              </span>
              <span className="text-[#a078f5] font-medium text-[16px] lg:text-[18px] tracking-[0.2em] uppercase">
                {subtitle}
              </span>
              <h2 className="text-[48px] lg:text-[64px] font-medium text-[#1f2937] leading-[1.1] font-display">
                {title}
              </h2>
            </div>

            {/* Project Details List - Simplified */}
            <div className="flex flex-col gap-5 text-[#64748b] text-[16px] lg:text-[18px] leading-relaxed max-w-[480px]">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[#1f2937] text-[14px] uppercase tracking-wider">Technical Stack</span>
                <p className="font-light">{techStack}</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[#1f2937] text-[14px] uppercase tracking-wider">Duration</span>
                <p className="font-light">{duration}</p>
              </div>
            </div>

            {/* Action Buttons - Outline Style */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="sm" variant="outline" className="rounded-full">기획서</Button>
              <Button size="sm" variant="outline" className="rounded-full">GitHub</Button>
              <Button size="sm" variant="outline" className="rounded-full">Live View</Button>
            </div>
          </div>

          {/* Device Frame Section */}
          <div 
            className={cn(
              "w-full flex justify-center",
              reverse ? "lg:order-1" : "lg:order-2"
            )}
          >
            {frameType === "mobile" ? (
              /* iPhone Frame */
              <div className="relative w-[300px] aspect-[1/2.03] bg-[#1a1a1a] rounded-[50px] border-[8px] border-[#333] shadow-2xl overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] absolute right-4" />
                </div>
                {/* Content */}
                <div className="absolute inset-0 bg-white">
                  <ProjectImage 
                    src={image} 
                    alt={title} 
                    translateYOutput={translateYOutput} 
                  />
                </div>
              </div>
            ) : (
              /* Desktop Browser Frame */
              <div className="w-full max-w-[620px] relative aspect-[4/3.2] rounded-[16px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-slate-200 bg-white">
                {/* Browser Toolbar */}
                <div className="absolute top-0 left-0 w-full h-[28px] lg:h-[36px] bg-[#fbf6fd] flex items-center px-4 lg:px-5 gap-2 z-10 border-b border-slate-100">
                  <div className="w-2.5 h-2.5 lg:w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 lg:w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 lg:w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                {/* Content */}
                <div className="absolute inset-0 pt-[28px] lg:pt-[36px]">
                  <ProjectImage 
                    src={image} 
                    alt={title} 
                    translateYOutput={translateYOutput} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
