import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";
import ArchiveCard from "./ArchiveCard";
import { cn } from "../utils/cn";
import { SITE_LINKS } from "../constants/links";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Archive images
import archiveRupa from "../assets/images/archive-rupa.png";
import ele1 from "../assets/images/ele1.png";
import ele2 from "../assets/images/ele2.png";
import ele4 from "../assets/images/ele4.png";

gsap.registerPlugin(ScrollTrigger);

const ArchiveSection = ({ id, className }) => {
  const sectionRef = useRef(null);

  const ARCHIVE_PROJECTS = [
    {
      id: 1,
      title: "RUPA from SoulBlend",
      image: archiveRupa,
      href: SITE_LINKS.archive.rupa?.link,
    },
    {
      id: 2,
      title: "Branding Identity",
      image: ele2,
      href: "#",
    },
    {
      id: 3,
      title: "UI Design System",
      image: ele4,
      href: "#",
    },
    {
      id: 4,
      title: "Web Accessibility",
      image: ele1,
      href: "#",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Archive Cards: 랜덤 입체 등장 (About 섹션 패턴 복제)
      gsap.from(".archive-card-wrapper", {
        y: 60,
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.15,
          from: "random",
        },
        scrollTrigger: {
          trigger: ".archive-swiper-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "relative bg-white w-full overflow-hidden",
        "lg:py-32 flex flex-col items-center",
        className,
      )}
    >
      <div className="w-full flex flex-col items-center">
        {/* 1. Header Area */}
        <div className="mb-12 lg:mb-12 w-full">
          <SectionHeader
            title="Archive"
            description="어제보다 조금 더 성장한 오늘의 기록들이 차곡차곡 모였습니다."
            className="pb-0 w-full"
          />
        </div>

        {/* 2. Swiper Carousel */}
        <div className="archive-swiper-container w-full px-6 lg:px-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="archive-swiper !pt-0 !pb-16 overflow-visible! [&_.swiper-slide]:overflow-visible! [&_.swiper-pagination-bullet]:bg-violet-300 [&_.swiper-pagination-bullet]:opacity-60 [&_.swiper-pagination-bullet-active]:bg-violet-400 [&_.swiper-pagination-bullet-active]:opacity-100"
          >
            {ARCHIVE_PROJECTS.map((item) => (
              <SwiperSlide key={item.id} className="archive-card-wrapper">
                <ArchiveCard
                  title={item.title}
                  image={item.image}
                  href={item.href}
                  className="w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ArchiveSection;
