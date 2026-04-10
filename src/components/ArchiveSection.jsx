import React from "react";
import SectionHeader from "./SectionHeader";
import ArchiveCard from "./ArchiveCard";
import { cn } from "../utils/cn";

// Archive images
import ele1 from '../assets/images/ele1.png'
import ele2 from '../assets/images/ele2.png'
import ele4 from '../assets/images/ele4.png'

const ARCHIVE_PROJECTS = [
  {
    id: 1,
    title: "Deloitte",
    description: "Project was about precision and detail oriented web development.",
    image: ele1,
    href: "#"
  },
  {
    id: 2,
    title: "Branding Identity",
    description: "Creative branding and visual identity for a startup.",
    image: ele2,
    href: "#"
  },
  {
    id: 3,
    title: "UI Design System",
    description: "Scalable design system for multi-platform applications.",
    image: ele4,
    href: "#"
  },
  {
    id: 4,
    title: "Web Accessibility",
    description: "Improving user experience for diverse accessibility needs.",
    image: ele1,
    href: "#"
  },
  {
    id: 5,
    title: "AI OTT Platform",
    description: "Future of media streaming with personalized AI curation.",
    image: ele2,
    href: "#"
  },
  {
    id: 6,
    title: "Design Tokens",
    description: "Building a consistent design language across platforms.",
    image: ele4,
    href: "#"
  }
];

const ArchiveSection = ({ id, className }) => {
  return (
    <section 
      id={id} 
      className={cn("relative bg-white w-full py-32", className)}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* 1. Header Area */}
        <div className="mb-20">
          <SectionHeader 
            title="Archive"
            description="어제보다 조금 더 성장한 오늘의 기록들이 차곡차곡 모였습니다."
            className="pb-0 w-full" 
          />
        </div>
        
        {/* 2. Responsive Grid Layout */}
        <div className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ARCHIVE_PROJECTS.map((item) => (
            <div key={item.id} className="flex justify-center">
              <ArchiveCard 
                title={item.title}
                description={item.description}
                image={item.image}
                href={item.href}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiveSection;
