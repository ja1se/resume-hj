import { cn } from "../utils/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.svg";

/**
 * Navigation Component Props
 * @param {string} theme - "light" | "dark"
 * @param {string} position - "fixed" | "sticky" | "relative"
 * @param {Array} links - { label: string, href: string }[]
 * @param {string} activeLink - 현재 활성화된 링크의 href
 * @param {function} onLinkClick - 링크 클릭 핸들러
 */

const THEME_STYLES = {
  light: cn(
    "bg-white/95 backdrop-blur-md text-slate-900 border-slate-200 shadow-sm"
  ),
  dark: cn(
    "bg-slate-950/95 backdrop-blur-md text-white border-slate-800 shadow-lg"
  ),
};

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
  return (
    <nav
      className={cn(
        "top-0 left-0 w-full z-50 border-b transition-all duration-300",
        position,
        THEME_STYLES[theme],
        className
      )}
    >
      <div className="w-full flex justify-center h-[72px] px-6 lg:px-20">
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
                className="flex h-8 lg:h-[47px] w-auto" 
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
                    "hover:bg-slate-100/50 hover:text-violet-600",
                    activeLink === href 
                      ? "text-violet-600 font-medium" 
                      : "text-slate-800"
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
              href="https://github.com" 
              target="_blank" 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="text-slate-700 text-xl" />
            </a>
            <a 
              href="https://blog.naver.com" 
              target="_blank" 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-slate-700 text-lg" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
