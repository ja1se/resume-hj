import React, { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

/**
 * ProjectPopup Component - Snappy Modal with Gradient Overlay & Circle Expansion
 * @param {boolean} isOpen - 팝업 열림 상태
 * @param {function} onClose - 팝업 닫기 함수
 * @param {object} project - 프로젝트 데이터
 * @param {object} mousePos - 클릭된 마우스 좌표 {x, y}
 */
const ProjectPopup = ({ isOpen, onClose, project, mousePos }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (isOpen && cardRef.current && overlayRef.current) {
      // 1. 전역 마우스 좌표를 카드 내부의 로컬 좌표로 변환
      const rect = cardRef.current.getBoundingClientRect();
      const localX = mousePos.x - rect.left;
      const localY = mousePos.y - rect.top;

      const tl = gsap.timeline();

      // 초기 상태 설정
      tl.set(overlayRef.current, { opacity: 0, visibility: "visible" })
        .set(cardRef.current, {
          clipPath: `circle(0% at ${localX}px ${localY}px)`,
          visibility: "visible",
          opacity: 1,
        })
        // 애니메이션: 배경 페이드인과 카드 확장
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          cardRef.current,
          {
            clipPath: `circle(150% at ${localX}px ${localY}px)`,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .fromTo(
          contentRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.3",
        );

      // 스크롤 잠금
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mousePos]);

  const handleClose = () => {
    const rect = cardRef.current.getBoundingClientRect();
    const localX = mousePos.x - rect.left;
    const localY = mousePos.y - rect.top;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // 닫을 때도 더 빠르게 축소
    tl.to(contentRef.current, {
      y: 10,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(cardRef.current, {
        clipPath: `circle(0% at ${localX}px ${localY}px)`,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.35",
      );
  };

  if (!isOpen) return null;

  return createPortal(
    /* 상단 여백(pt-28/pt-36)을 늘려 내비게이션 바 영역을 확보 */
    <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto pt-28 pb-12 px-6 lg:pt-30 lg:pb-20 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* 1. 배경 (Overlay): 투명 그라데이션 + 블러 + 클릭 시 닫힘 */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-neutral-900/20 backdrop-blur-lg invisible"
      />

      {/* 2. 팝업 카드 (Popup Card): 내부 스크롤 제거, 높이 자동 조절 */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()} // 카드 내부 클릭 시 닫힘 방지
        className="relative w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-[25px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] invisible z-[110]"
      >
        {/* Close Button: 이제 카드 내부에 절대 좌표로 위치하여 카드와 함께 움직임 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 lg:top-8 lg:right-8 z-[120] p-4 hover:rotate-90 transition-transform duration-300 group cursor-pointer"
        >
          <div className="relative w-6 h-6 lg:w-8 lg:h-8">
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-900 rotate-45 group-hover:bg-violet-600 transition-colors duration-300" />
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-900 -rotate-45 group-hover:bg-violet-600 transition-colors duration-300" />
          </div>
        </button>

        {/* Content Section: 이제 버튼의 간섭 없이 완벽한 중앙 정렬 */}
        <div
          ref={contentRef}
          className="px-8 py-24 lg:px-20 lg:py-24 flex flex-col items-center"
        >
          <div className="w-full flex flex-col gap-16 lg:gap-24">
            {/* Header Section */}
            <div className="flex flex-col gap-6 items-center text-center">
              <span className="text-violet-500 font-medium tracking-[0.2em] uppercase text-xs lg:text-sm">
                {project.subtitle}
              </span>
              <h2 className="text-4xl lg:text-7xl font-display font-bold text-slate-900 leading-tight">
                {project.title}
              </h2>
              <div className="w-20 h-1 bg-violet-300 mt-2 rounded-full" />
            </div>

            {/* Main Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Trouble Shooting
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light text-lg lg:text-xl">
                    {project.troubleShooting}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 p-8 bg-violet-200/10 rounded-[32px]">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
                      Duration
                    </span>
                    <span className="text-slate-800 font-semibold text-base lg:text-lg">
                      {project.duration}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
                      Contribution
                    </span>
                    <span className="text-slate-800 font-semibold text-base lg:text-lg">
                      {project.contribution}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.split(",").map((tech, i) => (
                      <span
                        key={i}
                        className="px-5 py-2 bg-white border border-slate-100 text-slate-600 rounded-2xl text-sm font-medium shadow-sm"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-center w-full">
                {project.figmaEmbed ? (
                  <div className="w-full aspect-video rounded-[32px] overflow-hidden border border-slate-100 shadow-xl">
                    <iframe
                      className="w-full h-full"
                      src={project.figmaEmbed}
                      allowFullScreen
                      title="Figma Prototype"
                    ></iframe>
                  </div>
                ) : (
                  <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 w-full group">
                    <img
                      src={project.detailImage || project.image}
                      alt={project.title}
                      className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Project Details Footer */}
            <div className="pt-12 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-light">
              <span className="tracking-wide">
                © 2026 Heejin Cho. All rights reserved.
              </span>
              <span className="italic opacity-80">
                "You will never know until you try."
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProjectPopup;
