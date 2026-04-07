import React from "react";
import { cn } from "../../utils/cn";

/**
 * Card Component
 * @param {string} variant - "default" | "outline" | "ghost"
 * @param {string} className - 추가 클래스
 * @param {React.ReactNode} children - 카드 내용
 */
const Card = ({ variant = "default", className, children, ...props }) => {
  const variants = {
    default: "bg-white shadow-sm border border-slate-200/50",
    outline: "bg-transparent border border-slate-200",
    ghost: "bg-slate-50/50 border-none",
    glass: "bg-white/80 backdrop-blur-md border border-white/20 shadow-lg",
  };

  return (
    <div
      className={cn(
        "rounded-[20px] overflow-hidden transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 * shadcn/ui 스타일의 하위 컴포넌트들
 */
const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-xl font-semibold leading-none tracking-tight text-slate-900", className)}
    {...props}
  />
);

const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-slate-500", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({ className, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
