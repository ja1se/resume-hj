import React from 'react';
import { cn } from '../utils/cn';

const ContactItem = ({ label, value }) => (
  <div className="border-[#d1d5db] border-b last:border-b-0 py-5 px-7 flex items-center gap-[18px]">
    <div className="shrink-0 size-[60px] rounded-full bg-gradient-to-r from-violet-300 to-violet-600" />
    <div className="flex flex-col gap-0.5">
      <span className="text-[#1f2937] font-medium text-base leading-relaxed font-sans">{label}</span>
      <span className="text-[#1f2937] font-light text-base leading-relaxed font-sans">{value}</span>
    </div>
  </div>
);

const Footer = ({ className }) => {
  return (
    <footer 
      id="contact" 
      className={cn(
        "relative pt-28 pb-10 px-6 bg-gradient-to-b from-[rgba(196,181,253,0)] via-[#a078f5] to-[#7c3aed]",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="space-y-4">
            <h2 className="text-[48px] font-medium text-white/65 font-display leading-[1.11]">
              Let's Work Together
            </h2>
            <div className="text-white/65 text-base font-light leading-relaxed font-sans">
              <p>사소한 디테일이 모여 큰 감동을 만든다고 믿습니다.</p>
              <p>컨택은 다음 채널을 통해 노크해 주세요. :D</p>
            </div>
          </div>

          {/* Contact Card */}
          <div 
            className="w-[340px] bg-white border border-[#d1d5db] rounded-[10px] overflow-hidden shadow-sm text-left"
            style={{ backgroundImage: "linear-gradient(168deg, #ffffff 12%, #f5f3ff 116%)" }}
          >
            <ContactItem label="Phone" value="010 8860 2480" />
            <ContactItem label="Email" value="hiijaise@gmail.com" />
            <ContactItem label="Socials" value="Tistory Blog" />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="w-full pt-7 border-t border-white/10 text-center">
          <p className="text-white/45 text-xs font-light font-sans">
            © 2026 Heejin Cho portfolio All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
