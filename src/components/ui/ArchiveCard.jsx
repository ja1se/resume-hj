import React from 'react';
import { cn } from '../../utils/cn';

const ArchiveCard = ({ title, description, image, href, className }) => {
  return (
    <div className={cn("group relative w-full", className)}>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-0.5 transition-all hover:shadow-xl hover:-translate-y-1">
        {/* Image Area */}
        <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-slate-100">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="absolute inset-0 size-full object-cover transition-transform group-hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              No Image
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="p-5 flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="text-xl font-light text-slate-900 leading-tight">
              {title}
            </h3>
            <p className="text-sm font-light text-slate-500 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          
          <a 
            href={href || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 size-12 rounded-full border border-slate-200 flex items-center justify-center transition-colors hover:bg-slate-50 hover:border-slate-400"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
