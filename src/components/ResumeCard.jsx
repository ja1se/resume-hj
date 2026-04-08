import React from "react";
import { cn } from "../utils/cn";
import { Card } from "./Card";

/**
 * ResumeCard Component
 * @param {string} date - "2025.10 - 2026 Present"
 * @param {string} title - "챗GPT 생성형 AI를 활용한..."
 * @param {string[]} items - ["MBC아카데미컴퓨터학원", ...]
 * @param {string} className - 추가 클래스
 */
const ResumeCard = ({ date, title, items = [], className }) => {
  return (
    <Card className={cn("p-[30px] border-[1px] border-slate-100 shadow-sm hover:shadow-md transition-shadow", className)}>
      <div className="flex flex-col gap-[14px]">
        {/* Date Section */}
        <span className="text-violet-400 font-medium text-[16px] leading-[1.75]">
          {date}
        </span>

        {/* Title Section */}
        <h3 className="text-slate-800 font-medium text-[24px] leading-[1.5] whitespace-pre-wrap">
          {title}
        </h3>

        {/* Details Section */}
        <ul className="flex flex-col gap-1 list-none">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-slate-500 font-light text-[16px] leading-[1.75]"
            >
              <span className="mt-[10px] w-1 h-1 rounded-full bg-slate-300 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ResumeCard;
