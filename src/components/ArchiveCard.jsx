import { cn } from '../utils/cn';

/**
 * ArchiveCard Component (based on ArcCon Figma design)
 * @param {string} title - 프로젝트 제목
 * @param {string} description - 프로젝트 설명
 * @param {string} image - 이미지 경로
 * @param {string} href - 링크
 * @param {string} className - 추가 클래스
 */
const ArchiveCard = ({ title, image, href, className }) => {
  return (
    <div className={cn("flex flex-col items-start w-[350px]", className)}>
      <div className="bg-white border-[1px] border-[#d1d5db] flex flex-col items-center overflow-hidden pt-[20px] px-[1px] pb-[1px] relative rounded-[15px] shrink-0 w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image Area (arc-img) */}
        <div className="w-[calc(100%-40px)] aspect-[369/358] relative rounded-[10px] overflow-hidden bg-slate-100 shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="absolute inset-0 size-full object-cover transition-transform group-hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              No Image
            </div>
          )}
        </div>

        {/* Info Area (arc-box) */}
        <div className="w-full p-[20px] flex items-start justify-between gap-[12px]">
          <div className="flex flex-col gap-[4px] flex-1">
            {/* arc-title */}
            <h3 className="text-[19.9px] font-light text-[#1f2937] leading-[1.5] whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </h3>
          </div>
          
          {/* arc-icon (Button) */}
          <a 
            href={href || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 size-[51.7px] rounded-full border-[1px] border-[#d1d5db] flex items-center justify-center transition-all duration-200 hover:border-[#a78bfa] hover:text-[#a78bfa]"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
