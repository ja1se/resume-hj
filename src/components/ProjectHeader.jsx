import React from "react";
import { cn } from "../utils/cn";

const ProjectHeader = ({ className }) => {
  return (
    <div className={cn("max-w-[1400px] mx-auto px-6 lg:px-12 py-32 flex flex-col items-center lg:items-start", className)}>
      <h2 className="font-display font-semibold text-[#a78bfa] text-[64px] lg:text-[96px] leading-[1.2] lg:leading-[1.5] text-center lg:text-left">
        ProJects
      </h2>
      <div className="mt-4 max-w-2xl text-center lg:text-left">
        <p className="text-[#a78bfa] text-[14px] lg:text-[16px] font-light leading-relaxed uppercase tracking-wider">
          수많은 고민과 시도의 흔적들이 이 프로젝트 안에 고스란히 담겨 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ProjectHeader;
