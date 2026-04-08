import React, { useRef } from "react";
import { cn } from "../../utils/cn";
import ProjectImage from "./ProjectImage";
import Button from "./Button";
import { useIsMobile } from "../../hooks/useIsMobile";

/**
 * ProjectSection Component
 * @param {Object} project - 프로젝트 데이터 (id, title, tags, description, image, color, translateYOutput)
 * @param {boolean} reverse - 이미지와 텍스트 위치 반전 여부
 * @param {string} className - 추가 클래스
 */
const ProjectSection = ({ project, reverse = false, className }) => {
  const { id, title, tags, description, image, color, translateYOutput } = project;
  const isMobile = useIsMobile();

  return (
    <section 
      id={id}
      className={cn(
        "relative w-full min-h-[150vh] lg:min-h-[250vh]", // 스크롤 여유 확보
        className
      )}
      style={{ backgroundColor: color || "#f8fafc" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Area */}
          <div 
            className={cn(
              "flex flex-col items-start gap-10 max-w-[560px]",
              reverse ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-violet-400 font-light text-[22px] lg:text-[26px]">
                <span>[</span>
                <span className="text-slate-500 text-[18px] lg:text-[22px]">{tags?.join(", ")}</span>
                <span>]</span>
              </div>
              <h2 className="text-[48px] lg:text-[64px] font-medium text-slate-800 leading-[1.1] tracking-tight">
                {title}
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-slate-600 text-[18px] lg:text-[20px] leading-relaxed">
              <p className="whitespace-pre-wrap">{description}</p>
              <div className="grid grid-cols-[130px_1fr] gap-y-3 pt-4 border-t border-slate-200/50">
                <span className="font-medium text-slate-800">기술 스택 |</span>
                <span className="font-light">React, Tailwind CSS, GSAP</span>
                <span className="font-medium text-slate-800">작업 기간 |</span>
                <span className="font-light">4주</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="sm" variant="primary" className="rounded-[50px]">기획서 보기</Button>
              <Button size="sm" variant="outline" className="rounded-[50px]">깃허브 보기</Button>
              <Button size="sm" variant="ghost" className="rounded-[50px]">페이지 보기</Button>
            </div>
          </div>

          {/* Browser Frame Section */}
          <div 
            className={cn(
              "w-full flex justify-center",
              reverse ? "lg:order-1" : "lg:order-2"
            )}
          >
            <div className="w-full max-w-[620px] relative aspect-[4/3.2] rounded-[24px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-white/40 bg-white">
              {/* Browser Toolbar (macOS Style) */}
              <div className="absolute top-0 left-0 w-full h-[36px] bg-[#fdfaf6] flex items-center px-5 gap-2 z-10 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              
              {/* Scrolled Image Content */}
              <div className="absolute inset-0 pt-[36px]">
                <ProjectImage 
                  src={image} 
                  alt={title} 
                  translateYOutput={translateYOutput} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
