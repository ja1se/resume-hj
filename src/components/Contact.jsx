import React from 'react';
import { cn } from '../utils/cn';

const ContactItem = ({ label, value, iconGradient }) => (
  <div className="border-[#d1d5db] border-b last:border-b-0 py-5 px-7 flex items-center gap-[18px]">
    <div className={cn(
      "shrink-0 size-[60px] rounded-full bg-gradient-to-r",
      iconGradient || "from-violet-300 to-violet-600"
    )} />
    <div className="flex flex-col gap-0.5">
      <span className="text-[#1f2937] font-medium text-base leading-relaxed font-sans">{label}</span>
      <span className="text-[#1f2937] font-light text-base leading-relaxed whitespace-pre-line font-sans">{value}</span>
    </div>
  </div>
);

const Contact = ({ className }) => {
  return (
    <div 
      className={cn(
        "bg-white border border-[#d1d5db] rounded-[10px] overflow-hidden w-full max-w-[484px] shadow-sm",
        className
      )}
      style={{ backgroundImage: "linear-gradient(168deg, #ffffff 12%, #f5f3ff 116%)" }}
    >
      <ContactItem 
        label="Phone" 
        value="010 8860 2480" 
      />
      <ContactItem 
        label="Email" 
        value="hiijaise@gmail.com" 
      />
      <ContactItem 
        label="Socials" 
        value="Tistory Blog" 
      />
    </div>
  );
};

export default Contact;
