import React, { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

/**
 * ProjectPopup Component - GSAP Clip-path Expansion
 * @param {boolean} isOpen - 팝업 열림 상태
 * @param {function} onClose - 팝업 닫기 함수
 * @param {object} project - 프로젝트 데이터
 * @param {object} mousePos - 클릭된 마우스 좌표 {x, y}
 */
const ProjectPopup = ({ isOpen, onClose, project, mousePos }) => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const displayImage = project.detailImage || project.image;

  useLayoutEffect(() => {
    if (isOpen && popupRef.current) {
      // 1. 확장 애니메이션 (Expansion)
      const tl = gsap.timeline();

      tl.set(popupRef.current, {
        clipPath: `circle(0% at ${mousePos.x}px ${mousePos.y}px)`,
        visibility: "visible",
      })
        .to(popupRef.current, {
          clipPath: `circle(150% at ${mousePos.x}px ${mousePos.y}px)`,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        );

      // 스크롤 잠금 (Rule 5-3)
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mousePos]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(contentRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }).to(popupRef.current, {
      clipPath: `circle(0% at ${mousePos.x}px ${mousePos.y}px)`,
      duration: 0.6,
      ease: "power3.inOut",
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popupRef}
      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md overflow-y-auto invisible"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed cursor-pointer top-16 right-8 lg:top-20 lg:right-12 z-[110] p-4 hover:rotate-90 transition-transform duration-300 group"
      >
        <div className="relative w-8 h-8">
          <span className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-900 rotate-45 group-hover:bg-violet-600" />
          <span className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-900 -rotate-45 group-hover:bg-violet-600" />
        </div>
      </button>

      {/* Popup Content */}
      <div
        ref={contentRef}
        className="relative w-full min-h-screen px-6 py-24 lg:px-20 lg:py-36 flex flex-col items-center"
      >
        <div className="max-w-5xl w-full flex flex-col gap-16 lg:gap-24">
          {/* Header Section */}
          <div className="flex flex-col gap-6 items-center text-center">
            <span className="text-violet-500 font-medium tracking-[0.2em] uppercase text-sm lg:text-base">
              {project.subtitle}
            </span>
            <h2 className="text-5xl lg:text-[80px] font-display font-bold text-slate-900 leading-none">
              {project.title}
            </h2>
            <div className="w-20 h-1 bg-violet-100 mt-4" />
          </div>

          {/* Main Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl lg:text-2xl font-medium text-slate-900 font-display">
                  Trouble Shooting
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {project.troubleShooting}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    Duration
                  </span>
                  <span className="text-slate-700 font-medium">
                    {project.duration}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    Contribution
                  </span>
                  <span className="text-slate-700 font-medium">
                    {project.contribution}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.split(",").map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-light"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full min-h-[500px] lg:min-h-full">
              {project.figmaEmbed ? (
                /* 1. 피그마 임베드가 있는 경우 */
                <iframe
                  style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                  width="100%"
                  height="450"
                  src={project.figmaEmbed}
                  allowFullScreen
                  title="Figma Prototype"
                ></iframe>
              ) : (
                /* 2. 일반 이미지만 있는 경우 (기존 로직) */
                <div className="rounded-[24px] overflow-hidden shadow-lg w-full">
                  <img
                    src={project.detailImage || project.image}
                    alt={project.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Project Details Footer */}
          <div className="w-full h-px bg-slate-100" />
          <div className="flex justify-between items-center text-slate-400 text-sm font-light">
            <span>© 2026 Heejin Cho. All rights reserved.</span>
            <span>You will never know until you try.</span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProjectPopup;
