import React from "react";
import { cn } from "../utils/cn";

/**
 * Button Component Props
 * @param {"sm" | "lg"} size - 버튼 크기
 * @param {"primary" | "outline" | "ghost"} variant - 버튼 스타일 변형
 * @param {string} href - 링크 URL (제공 시 <a> 태그로 렌더링)
 * @param {string} target - 링크 타겟 (e.g., "_blank")
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 클래스
 * @param {React.ReactNode} children - 버튼 내용
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - 기타 버튼 속성
 */

const SIZE_STYLES = {
  sm: "px-[27.87px] py-[8.96px] text-[16px] min-h-[46px]",
  lg: "px-[45.21px] py-[14.53px] text-[28px] min-h-[71px] w-full sm:w-[165px]",
};

const VARIANT_STYLES = {
  primary: "border border-slate-500 text-slate-500 hover:border-violet-500 hover:text-violet-500 hover:bg-violet-50",
  outline: "border border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-500 hover:bg-violet-50",
  ghost: "text-slate-600 hover:bg-slate-100",
};

const Button = ({
  size = "sm",
  variant = "outline",
  href,
  target,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-full font-light transition-all duration-200 whitespace-nowrap active:scale-95",
    SIZE_STYLES[size],
    VARIANT_STYLES[variant],
    disabled && "opacity-50 cursor-not-allowed grayscale active:scale-100",
    className
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        className={baseClasses}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
