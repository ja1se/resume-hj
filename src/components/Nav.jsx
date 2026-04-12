import { useState, useEffect } from "react";
import { cn } from "../utils/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { SITE_LINKS } from "../constants/links";
import logo from "../assets/images/logo.svg";

/**
 * Navigation Component Props
 * @param {string} theme - "light" | "dark"
 * @param {string} position - "fixed" | "sticky" | "relative"
 * @param {Array} links - { label: string, href: string }[]
 * @param {string} activeLink - 현재 활성화된 링크의 href
 * @param {function} onLinkClick - 링크 클릭 핸들러
 */

const Nav = ({
  theme = "light",
  position = "fixed",
  links = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT ME", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "ARCHIVE", href: "#archive" },
    { label: "CONTACT", href: "#contact" },
  ],
  activeLink = "#home",
  onLinkClick,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const THEME_STYLES = {
    light: cn(
      isScrolled 
        ? "bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm py-0" 
        : "bg-transparent border-transparent py-2"
    ),
    dark: cn(
      isScrolled 
        ? "bg-slate-950/80 backdrop-blur-md border-slate-800 shadow-lg py-0" 
        : "bg-transparent border-transparent py-2"
    ),
  };

  return (
    <nav
      className={cn(
        "top-0 left-0 w-full z-50 border-b transition-all duration-500",
        position,
        THEME_STYLES[theme],
        className
      )}
    >
      <div className="w-full flex justify-center h-[72px] px-6 lg:px-20 transition-all duration-500">
        <div className="w-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center min-w-[120px] lg:min-w-[172px]">
            <a 
              href="#home" 
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                onLinkClick?.("#home");
              }}
            >
              <img 
                src={logo} 
                alt="OSKA Logo" 
                className={cn(
                  "flex w-auto transition-all duration-500",
                  isScrolled ? "h-7 lg:h-[38px]" : "h-8 lg:h-[47px]"
                )} 
              />
            </a>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-0 lg:gap-1">
            {links.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => onLinkClick?.(href)}
                  className={cn(
                    "px-2 lg:px-4 py-2 rounded-full",
                    "text-[13px] lg:text-[16px] font-light transition-all duration-200",
                    "hover:cursor-pointer hover:text-violet-600",
                    activeLink === href 
                      ? "text-violet-600 font-medium" 
                      : isScrolled ? "text-slate-800" : "text-slate-900"
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Social Actions */}
          <div 
            className={cn(
              "hidden lg:flex items-center justify-end min-w-[172px]"
            )}
          >
            <a 
              href={SITE_LINKS.common.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 group"
            >
              <FontAwesomeIcon icon={faGithub} className="text-slate-700 text-xl transition-colors duration-300 hover:text-violet-500" />
            </a>
            <a 
              href={SITE_LINKS.common.blog} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 group"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-slate-700 text-lg transition-colors duration-300 hover:text-violet-500" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
