import React, { useLayoutEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../utils/cn";
import Button from "./Button";
import { SITE_LINKS } from '../constants/links';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faBlog, faStarOfLife } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const ContactItem = ({ label, value, icon, className }) => (
  <div className={cn("footer-contact-item py-6 px-8 flex items-center justify-center md:justify-start gap-[18px] w-full bg-violet-50/50 dark:bg-violet-900/20 transition-colors duration-300", className)}>
    {/* 아이콘 영역 */}
    <div className="contact-icon shrink-0 size-[44px] rounded-full bg-gradient-to-br from-violet-200 to-violet-500 dark:from-violet-500 dark:to-violet-800 shadow-sm flex items-center justify-center text-white">
      <FontAwesomeIcon icon={icon} className="text-lg" />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold">
        {label}
      </span>
      <span className="text-slate-700 dark:text-slate-300 font-light text-[15px] leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
        {value}
      </span>
    </div>
  </div>
);

const Footer = ({ className }) => {
  const footerRef = useRef(null);
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header & Description
      gsap.from(".footer-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-header",
          start: "top 85%",
        }
      });

      // Sparkle Animation
      gsap.fromTo(
        ".footer-sparkle",
        { opacity: 0, rotate: 0, scale: 0.5 },
        {
          opacity: 1,
          rotate: 360,
          scale: 1,
          duration: 1.8,
          ease: "expo.inOut",
          delay: 1,
          scrollTrigger: {
            trigger: ".footer-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 2. Contact Form
      gsap.from(".footer-form", {
        y: 60,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-form",
          start: "top 80%",
        }
      });

      // 3. Contact Card & Items
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer-card",
          start: "top 80%",
        }
      });

      tl.from(".footer-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(".footer-contact-item", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .from(".contact-icon", {
        scale: 0,
        rotation: -45,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(2)"
      }, "-=1");

      // 4. Bottom Copyright
      gsap.from(".footer-bottom", {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        alert("문의가 성공적으로 전송되었습니다. 소중한 메시지 감사합니다! 😁");
        formRef.current.reset();
      })
      .catch((error) => {
        alert("전송에 실패했습니다. 다시 시도해 주세요: " + JSON.stringify(error));
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className={cn(
        "relative pt-20 pb-10 px-6 bg-gradient-to-b from-white via-violet-50 to-violet-100 dark:from-[#0c0c0c] dark:via-slate-900/50 dark:to-slate-950 transition-colors duration-300",
        className,
      )}
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16 items-center">
        {/* Header Section */}
        <div className="footer-header text-center space-y-4">
          <div className="relative inline-block">
            {/* Sparkle Icon */}
            <div className="footer-sparkle absolute -left-10 -top-1 lg:-left-14 lg:-top-1 text-violet-400 opacity-0 pointer-events-none">
              <FontAwesomeIcon
                icon={faStarOfLife}
                className="text-xl lg:text-2xl"
              />
            </div>
            <h2 className="text-[42px] lg:text-[56px] font-medium text-slate-800 dark:text-slate-100 font-display leading-tight">
              Let's <span className="text-violet-400 italic">Work</span> Together
            </h2>
          </div>
          <div className="header-desc text-violet-400 font-light uppercase tracking-wider mt-2 text-[12px] lg:text-[14px] lg:leading-relaxed">
            <p>사소한 디테일이 모여 큰 감동을 만든다고 믿습니다.</p>
            <p>컨택은 다음 채널을 통해 노크해 주세요. :D</p>
          </div>
        </div>

        {/* 2. Main Content: Form (위) + Card (아래) */}
        <div className="w-full flex flex-col items-center gap-20">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="footer-form w-full flex flex-col gap-10 bg-white/80 dark:bg-slate-900/60 p-8 lg:p-12 rounded-[32px] border border-white/60 dark:border-slate-800/60 backdrop-blur-sm shadow-sm transition-colors duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold ml-1">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="성함을 입력하세요"
                  className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 px-1 text-slate-900 dark:text-slate-100 focus:border-violet-400 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-light"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="답장받을 이메일을 입력하세요"
                  className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 px-1 text-slate-900 dark:text-slate-100 focus:border-violet-400 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-light"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold ml-1">
                Message
              </label>
              <textarea
                name="message"
                required
                placeholder="전하고 싶은 메시지를 남겨주세요 ◡̎"
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 px-1 text-slate-900 dark:text-slate-100 focus:border-violet-400 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-light min-h-[100px]"
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="sm"
                disabled={isSending}
                className="w-full md:w-max uppercase tracking-widest"
              >
                {isSending ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </div>
          </form>

          <div
            className="footer-card w-full max-w-[900px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] overflow-hidden shadow-xl shadow-violet-100/30 dark:shadow-none bg-[linear-gradient(168deg,_#ffffff_12%,_#f5f3ff_116%)] dark:bg-[linear-gradient(168deg,_#0f172a_12%,_#1e1b4b_116%)] transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
              <ContactItem 
                label="Phone" 
                value={import.meta.env.VITE_CONTACT_PHONE} 
                icon={faPhone} 
                className="text-slate-900 dark:text-slate-300" 
              />
              <ContactItem 
                label="Email" 
                value={import.meta.env.VITE_CONTACT_EMAIL} 
                icon={faEnvelope} 
                className="text-slate-900 dark:text-slate-300" 
              />
              <ContactItem 
                label="Socials" 
                icon={faBlog}
                value={
                  <a 
                    href={SITE_LINKS.common.blog}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block min-w-[200px] text-slate-900 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                  >
                    Tistory Blog
                  </a>
                } 
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom w-full pt-12 border-t border-slate-100 dark:border-slate-800 text-center transition-colors duration-300">
          <p className="text-slate-400 dark:text-slate-600 text-xs font-light tracking-widest">
            © 2026 HEEJIN CHO PORTFOLIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
