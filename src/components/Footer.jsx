import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser"; // EmailJS 라이브러리
import { cn } from "../utils/cn";
import Button from "./Button";

const ContactItem = ({ label, value }) => (
  <div className="py-6 px-8 flex items-center justify-center md:justify-start gap-[18px] w-full bg-transparent">
    {/* 아이콘 영역: 크기를 살짝 줄여 더 미니멀하게 조정 */}
    <div className="shrink-0 size-[44px] rounded-full bg-gradient-to-br from-violet-200 to-violet-500 shadow-sm" />
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold">
        {label}
      </span>
      <span className="text-slate-700 font-light text-[15px] leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
        {value}
      </span>
    </div>
  </div>
);

const Footer = ({ className }) => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  // EmailJS 전송 핸들러 (환경 변수 활용)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey,
      )
      .then(() => {
        alert("문의가 성공적으로 전송되었습니다. 소중한 메시지 감사합니다! 😁");
        formRef.current.reset();
      })
      .catch((error) => {
        alert(
          "전송에 실패했습니다. 다시 시도해 주세요: " + JSON.stringify(error),
        );
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <footer
      id="contact"
      className={cn(
        "relative pt-28 pb-10 px-6 bg-gradient-to-b from-white via-[#F5F3FF] to-[#EDE9FE]",
        className,
      )}
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16 items-center">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-[42px] lg:text-[56px] font-medium text-slate-800 font-display leading-tight">
            Let's <span className="text-violet-400 italic">Work</span> Together
          </h2>
          <div className="header-desc text-[#a78bfa] font-medium uppercase tracking-wider mt-2 text-[12px] lg:text-[14px] lg:leading-relaxed">
            <p>사소한 디테일이 모여 큰 감동을 만든다고 믿습니다.</p>
            <p>컨택은 다음 채널을 통해 노크해 주세요. :D</p>
          </div>
        </div>

        {/* 2. Main Content: Form (위) + Card (아래) */}
        <div className="w-full flex flex-col items-center gap-20">
          {/* EmailJS Form: 상단 배치 및 중앙 정렬 최적화 */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-10 bg-white/40 p-8 lg:p-12 rounded-[32px] border border-white/60 backdrop-blur-sm shadow-sm"
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
                  className="w-full bg-transparent border-b border-slate-200 py-3 px-1 focus:border-violet-400 outline-none transition-all placeholder:text-slate-300 font-light"
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
                  className="w-full bg-transparent border-b border-slate-200 py-3 px-1 focus:border-violet-400 outline-none transition-all placeholder:text-slate-300 font-light"
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
                placeholder="전하고 싶은 메시지를 남겨주세요"
                className="w-full bg-transparent border-b border-slate-200 px-1 focus:border-violet-400 outline-none transition-all placeholder:text-slate-300 font-light"
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

          {/* Contact Card: 가로 길이 균등 배분 버전 */}
          <div
            className="w-full max-w-[900px] bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-xl shadow-violet-100/30"
            style={{
              backgroundImage:
                "linear-gradient(168deg, #ffffff 12%, #f5f3ff 116%)",
            }}
          >
            {/* md:grid-cols-3를 사용하여 가로 길이를 1:1:1로 강제 고정합니다. */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <ContactItem label="Phone" value={import.meta.env.VITE_CONTACT_PHONE || "010 8860 2480"} />
              <ContactItem label="Email" value={import.meta.env.VITE_CONTACT_EMAIL || "hiijaise@gmail.com"} />
              <ContactItem label="Socials" value={import.meta.env.VITE_CONTACT_SOCIAL || "Tistory Blog"} />
            </div>
          </div>
        </div>
        {/* Bottom Copyright */}
        <div className="w-full pt-12 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-xs font-light tracking-widest">
            © 2026 HEEJIN CHO PORTFOLIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
