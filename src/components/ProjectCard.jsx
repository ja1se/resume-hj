import { cn } from "../utils/cn";
import Button from "./Button";

/**
 * ProjectCard Component
 * @param {Object} project - 프로젝트 데이터 (id, title, tags, description, image, etc.)
 * @param {boolean} reverse - 이미지와 텍스트 위치 반전 여부
 * @param {string} className - 추가 클래스
 */
const ProjectCard = ({ project, reverse = false, className }) => {
  const { title, tags, description, image, color } = project;

  return (
    <div 
      className={cn(
        "flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 lg:py-20 px-6",
        reverse && "lg:flex-row-reverse",
        className
      )}
    >
      {/* Text Section */}
      <div className="flex-1 flex flex-col items-start gap-8 max-w-[500px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-violet-400 font-light text-[20px] lg:text-[24px]">
            <span>[</span>
            <span className="text-slate-500 text-[18px] lg:text-[20px]">{tags?.join(", ")}</span>
            <span>]</span>
          </div>
          <h2 className="text-[40px] lg:text-[56px] font-medium text-slate-800 leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-slate-600 text-[16px] lg:text-[18px] leading-relaxed">
          <p className="whitespace-pre-wrap">{description}</p>
          <div className="grid grid-cols-[120px_1fr] gap-y-2 text-[15px] lg:text-[16px]">
            <span className="font-medium text-slate-800">기술 스택 |</span>
            <span className="font-light">React, Tailwind CSS, Framer Motion</span>
            <span className="font-medium text-slate-800">작업 기간 |</span>
            <span className="font-light">4주</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="primary">기획서 보기</Button>
          <Button size="sm" variant="outline">깃허브 보기</Button>
          <Button size="sm" variant="ghost">페이지 보기</Button>
        </div>
      </div>

      {/* Browser Frame Section */}
      <div className="flex-1 w-full max-w-[600px]">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
          {/* Toolbar */}
          <div className="absolute top-0 left-0 w-full h-8 bg-slate-100 flex items-center px-4 gap-1.5 z-10 border-b border-slate-200">
            <div className="w-3 h-3 rounded-full bg-[#F3605C]" />
            <div className="w-3 h-3 rounded-full bg-[#F8BE39]" />
            <div className="w-3 h-3 rounded-full bg-[#50C845]" />
          </div>
          
          {/* Content / Image */}
          <div className="absolute inset-0 pt-8 flex items-center justify-center">
            {image ? (
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover object-top hover:object-bottom transition-all duration-[5s] ease-in-out cursor-pointer"
              />
            ) : (
              <div 
                className="w-full h-full" 
                style={{ backgroundColor: color || "#f8fafc" }} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
