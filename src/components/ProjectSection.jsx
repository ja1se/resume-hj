import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../utils/cn";
import ProjectImage from "./ProjectImage";
import ProjectPopup from "./ProjectPopup";
import Button from "./Button";
import { SITE_LINKS } from "../constants/links";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ project, reverse = false, className }) => {
  const {
    id,
    number,
    subtitle,
    title,
    techStack,
    duration,
    image,
    contribution,
  } = project;

  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 텍스트 컨텐츠 순차 등장 (Staggered Fade-Up)
      gsap.from(".animate-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. 이미지 프레임 입체 등장 (Scaling Reveal)
      gsap.from(".animate-frame", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. 배경 숫자 (Floating Background Number)
      gsap.from(".bg-number", {
        x: reverse ? 50 : -50,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  const handleOpenPopup = (pos) => {
    setMousePos(pos);
    setIsOpen(true);
  };

  // 1. 공통 조건 변수화
  const isRightAlign = title === "와쿠와쿠" || title === "소울블렌드";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "py-32 px-6 lg:px-56 flex flex-col items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="w-full w-[300px] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-6">
        {/* Text Area */}
        <div
          className={cn(
            "project-text-content w-full lg:w-[400px] flex flex-col justify-center gap-6 lg:gap-10",
            "z-20 relative",
            isRightAlign
              ? "lg:items-end lg:text-right"
              : "lg:items-start lg:text-left",
            reverse ? "lg:order-2" : "lg:order-1",
          )}
        >
          {/* Header */}
          <div className="flex flex-col gap-2 lg:gap-3 relative">
            <span
              className={cn(
                "bg-number absolute -top-8 lg:-top-10 text-[80px] lg:text-[120px] font-display text-slate-900/5 leading-none select-none",
                isRightAlign ? "-right-2 lg:-right-4" : "-left-2 lg:-left-4",
              )}
            >
              0{number}
            </span>
            <span className="animate-text text-violet-500 font-medium text-sm lg:text-[18px] tracking-[0.2em] uppercase">
              {subtitle}
            </span>
            <h2 className="animate-text text-4xl lg:text-[64px] font-medium text-slate-800 leading-[1.1] font-display">
              {title}
            </h2>
          </div>

          {/* Details */}
          <div className="animate-text flex flex-col gap-4 lg:gap-5 text-slate-500 text-base lg:text-[18px] leading-relaxed max-w-[480px]">
            {[
              { label: "Technical Stack", value: techStack },
              { label: "Output", value: `${duration} / ${contribution}` },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="font-medium text-slate-800 text-xs lg:text-[14px] uppercase tracking-wider">
                  {item.label}
                </span>
                <p className="font-light">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            className={cn(
              "animate-text flex flex-wrap gap-3 pt-2",
              isRightAlign && "justify-end",
            )}
          >
            {!["nyansvene", "soulblend"].includes(id) && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  window.open(SITE_LINKS.projects[id]?.github || "#", "_blank")
                }
              >
                GitHub
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() =>
                window.open(SITE_LINKS.projects[id]?.plan || "#", "_blank")
              }
            >
              기획서 보기
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() =>
                window.open(SITE_LINKS.projects[id]?.result || "#", "_blank")
              }
            >
              결과물 보기
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div
          className={cn(
            "animate-frame project-image-frame w-full max-w-[620px] relative flex",
            isRightAlign ? "justify-center" : "justify-start",
            reverse ? "lg:order-1" : "lg:order-2",
          )}
        >
          {/* 프레임 제거: 그림자와 둥근 모서리만 적용하여 깔끔하게 노출 */}
          <div className="w-full relative overflow-hidden rounded-[12px] lg:rounded-[20px] shadow-xl border border-slate-100 bg-white">
            <ProjectImage
              src={image}
              alt={title}
              onClick={handleOpenPopup}
              className="w-full h-auto object-cover display-block"
            />
          </div>
        </div>
      </div>

      <ProjectPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        project={project}
        mousePos={mousePos}
      />
    </section>
  );
};

export default ProjectSection;
