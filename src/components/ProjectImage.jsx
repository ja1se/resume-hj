import { cn } from "../utils/cn";

/**
 * ProjectImage Component - Static Version with Hover & Click (Expansion Trigger)
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @param {function} onClick - 클릭 시 실행할 함수 (마우스 좌표 전달)
 * @param {string} className - 추가 클래스
 */
const ProjectImage = ({ src, alt, onClick, className }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "relative w-full h-full overflow-hidden bg-white cursor-pointer group",
        className
      )}
    >
      {/* 1. Main Image */}
      {src ? (
        <div className="relative w-full h-full overflow-hidden bg-white cursor-pointer group flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto min-h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300">
          No Image
        </div>
      )}

      {/* 2. Hover Overlay (Rule 5-1) */}
      <div className={cn(
        "absolute inset-0 bg-black/40 flex items-center justify-center",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "backdrop-blur-[2px]"
      )}>
        <div
          className="text-white text-xl border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black pointer-events-none"
        >
          View Details
        </div>
      </div>
    </div>
  );
};

export default ProjectImage;
