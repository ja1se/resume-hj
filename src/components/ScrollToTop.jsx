import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { cn } from "../utils/cn";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 페이지 하단에 도달했는지 확인 (하단에서 100px 이내)
      const isAtBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      
      setIsVisible(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        visibility: "visible",
      });
    } else {
      gsap.to(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (buttonRef.current) buttonRef.current.style.visibility = "hidden";
        }
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div 
      ref={buttonRef}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 invisible opacity-0 translate-y-5"
    >
      <Button
        size="sm"
        variant="outline"
        onClick={scrollToTop}
        className={cn(
          "rounded-full backdrop-blur-sm shadow-lg border-violet-200",
          "flex items-center gap-2 group hover:bg-violet-50"
        )}
      >
        <span className="text-[12px] uppercase tracking-widest font-medium text-violet-500">Back to Top</span>
        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center group-hover:bg-violet-500 transition-colors duration-300">
          <FontAwesomeIcon icon={faArrowUp} className="text-violet-500 group-hover:text-white transition-colors duration-300" />
        </div>
      </Button>
    </div>
  );
};

export default ScrollToTop;
