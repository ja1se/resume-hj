import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { cn } from "../utils/cn";

const SIZE_STYLES = {
  sm: "px-[27.87px] py-[8.96px] text-[16px] min-h-[46px]",
  lg: "px-[45.21px] py-[14.53px] text-[28px] min-h-[71px] w-full sm:w-[165px]",
};

const VARIANT_STYLES = {
  primary: "border border-slate-500 text-slate-500 hover:border-violet-500 hover:text-violet-500 hover:bg-violet-50",
  outline: "border border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-500 hover:bg-violet-50",
  ghost: "text-slate-600 hover:bg-slate-100",
};

const Button = forwardRef(({
  size = "sm",
  variant = "outline",
  href,
  target,
  disabled,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  const internalRef = useRef(null);
  const buttonRef = ref || internalRef;

  const spawnRipple = (e, { color, scale, duration }) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - d / 2;
    const y = e.clientY - rect.top - d / 2;

    const circle = document.createElement("span");
    Object.assign(circle.style, {
      position: "absolute",
      width: `${d}px`,
      height: `${d}px`,
      left: `${x}px`,
      top: `${y}px`,
      borderRadius: "50%",
      background: color,
      transform: "scale(0)",
      pointerEvents: "none",
    });

    el.appendChild(circle);

    gsap.to(circle, {
      scale,
      opacity: 0,
      duration,
      ease: "none",
      onComplete: () => circle.remove(),
    });
  };

  const handleClick = (e) => {
    spawnRipple(e, { color: "rgba(124, 58, 237, 0.2)", scale: 2.5, duration: 0.65 });
    onClick?.(e);
  };

  const handleMouseEnter = (e) => {
    spawnRipple(e, { color: "rgba(124, 58, 237, 0.12)", scale: 2.5, duration: 0.5 });
  };

  const baseClasses = cn(
    "relative overflow-hidden inline-flex items-center justify-center rounded-full font-light transition-all duration-200 whitespace-nowrap active:scale-95 cursor-pointer",
    SIZE_STYLES[size],
    VARIANT_STYLES[variant],
    disabled && "opacity-50 cursor-not-allowed grayscale active:scale-100",
    className
  );

  const commonProps = {
    ref: buttonRef,
    className: baseClasses,
    onClick: !disabled ? handleClick : undefined,
    onMouseEnter: !disabled ? handleMouseEnter : undefined,
    ...props,
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        {...commonProps}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button disabled={disabled} {...commonProps}>
      <span className="relative z-10">{children}</span>
    </button>
  );
});

Button.displayName = "Button";

export default Button;
