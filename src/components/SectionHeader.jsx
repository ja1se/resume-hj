import React from "react";
import { cn } from "../utils/cn";

/**
 * SectionHeader Component
 * @param {string} title - 섹션 제목 (예: About Me, ProJects, Archive)
 * @param {string} description - 섹션 설명 문구
 * @param {string} className - 컨테이너 추가 클래스
 */
const SectionHeader = ({ title, description, className }) => {
  return (
    <div className={cn("max-w-[1400px] mx-20 px-6 flex flex-col items-start", className)}>
      <h2 className="header-title font-display font-semibold text-[#a78bfa] text-[64px] leading-[1.2]">
        {title}
      </h2>
      {description && (
        <div className="max-w-2xl text-center lg:text-left">
          <p className="header-desc text-[#a78bfa] text-[14px] font-light lg:leading-relaxed uppercase tracking-wider">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
