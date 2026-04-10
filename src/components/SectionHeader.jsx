import { cn } from "../utils/cn";

/**
 * SectionHeader Component - Static Version
 * @param {string} title - 섹션 제목
 * @param {string} description - 섹션 설명 문구
 * @param {string} className - 컨테이너 추가 클래스
 */

const SectionHeader = ({ title, description, className }) => {
  return (
    <div
      className={cn(
        "w-full px-6 lg:px-20 z-20 bg-white",
        "flex flex-col items-center text-center",
        className,
      )}
    >
      <div className="header-content flex flex-col items-center overflow-hidden w-full">
        <div className="title-wrapper overflow-hidden">
          <h2
            className={cn(
              "header-title font-display font-semibold text-[#a78bfa]",
              "text-[32px] lg:text-[64px] leading-[1.2]",
            )}
          >
            {title}
          </h2>
        </div>
        {description && (
          <div className="desc-wrapper max-w-2xl text-center overflow-hidden">
            <p
              className={cn(
                "header-desc text-[#a78bfa] font-light uppercase tracking-wider mt-2",
                "text-[12px] lg:text-[14px] lg:leading-relaxed",
              )}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
