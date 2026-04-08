import React from 'react';
import { cn } from '../utils/cn';

const ContactItem = ({ label, value, iconGradient }) => (
  <div className="border-slate-200 border-b last:border-b-0 py-5 px-7 flex items-center gap-4">
    <div className={cn(
      "shrink-0 size-14 rounded-full bg-gradient-to-r",
      iconGradient || "from-violet-300 to-violet-600"
    )} />
    <div className="flex flex-col gap-0.5">
      <span className="text-slate-800 font-medium text-base leading-relaxed">{label}</span>
      <span className="text-slate-600 font-light text-base leading-relaxed whitespace-pre-line">{value}</span>
    </div>
  </div>
);

const Contact = ({ className }) => {
  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl overflow-hidden w-full max-w-lg",
      className
    )}>
      <ContactItem 
        label="Phone" 
        value="+01 123 654 8096" 
      />
      <ContactItem 
        label="Email" 
        value="gerolddesign@mail.com" 
      />
      <ContactItem 
        label="Address" 
        value={"Warne Park Street Pine,\nFL 33157, New York"} 
      />
    </div>
  );
};

export default Contact;
