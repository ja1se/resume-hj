import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const ArchiveSection = ({ className }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const pinItems = gsap.utils.toArray(".archive-card-wrapper");
      
      const totalWidth = pinItems.length * (410 + 40); // card width + gap
      
      gsap.to(pinItems, {
        x: () => -(totalWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={cn("overflow-hidden", className)}>
      <div ref={triggerRef} className="relative h-screen bg-white flex flex-col justify-center">
        <div className="flex flex-col gap-12 w-full">
          {/* Header remains visible but cards scroll */}
          <SectionHeader 
            title="Archive"
            description="어제보다 조금 더 성장한 오늘의 기록들이 차곡차곡 모였습니다."
            className="pb-0 about-header-item w-full" 
          />
          
          <div className="flex gap-10 px-6 lg:px-12 w-fit">
            {ARCHIVE_PROJECTS.map((item) => (
              <div key={item.id} className="archive-card-wrapper shrink-0 w-[410px]">
                <ArchiveCard 
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  href={item.href}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveSection;
