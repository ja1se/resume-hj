import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../utils/cn";
import SectionHeader from "./SectionHeader";
import ResumeCard from "./ResumeCard";
import newMe from "../assets/images/new-me-ani.png";
import ele1 from "../assets/images/ele1.png";

gsap.registerPlugin(ScrollTrigger);

const About = ({ className }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Immediate Header Animation
      gsap.fromTo(".about-header-item", 
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out"
        }
      );

      // 2. Immediate Profile Section Animation
      gsap.fromTo(".about-profile", 
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2
        }
      );

      // 3. Immediate Resume List Animation
      gsap.fromTo(".about-sub-header, .about-resume-list > *", 
        {
          opacity: 0,
          y: 10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.4
        }
      );

      // 4. Main Header Pinning (ScrollTrigger)
      ScrollTrigger.create({
        trigger: ".about-header",
        start: "top 72px",
        end: "+=400",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // 5. Sub-Headers Pinning (Education & Experience)
      const subHeaders = gsap.utils.toArray(".about-sub-header");
      subHeaders.forEach((header) => {
        ScrollTrigger.create({
          trigger: header,
          start: "top 120px", 
          end: "+=350",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn("w-full pb-32 bg-white relative overflow-visible", className)}
    >
      <div className="max-w-[1400px] mx-20 flex flex-col gap-20">

        {/* Header Section */}
        <div className="about-header relative bg-white z-20 w-full">
          <SectionHeader 
            title="About Me"
            description={<>어떤 상황에도 넓은 시야를 확보하는 부엉이처럼 객관적인 거리를 유지하며 <br className="hidden lg:block" />문제를 바라보는 정확한 원인을 찾아내는 유연한 분석가입니다. </>}
            className="pb-0 about-header-item"
          />

          {/* Decorative Image */}
          <div className="absolute right-0 top-12 w-48 lg:w-72 opacity-60 hidden lg:block">
            <img src={ele1} alt="" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="about-profile flex flex-col pb-12 lg:flex-row items-center justify-center gap-8">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-violet-50 shrink-0 shadow-lg">
            <img src={newMe} alt="heejincho" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div>
              <h3 className="text-[#333] font-medium text-[20px] lg:text-[22px]">조희진 | HEEJIN CHO</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-[#404040] text-[16px] font-light">
              <div className="px-4 py-1 bg-violet-50 rounded-full inline-block self-center lg:self-start">1993.12.</div>
              <div className="px-4 py-1">경기도 화성시 동탄구</div>
              <div className="px-4 py-1 bg-violet-50 rounded-full inline-block self-center lg:self-start">010.8860.2480</div>
              <div className="px-4 py-1">hiijaise@gmail.com</div>
            </div>
          </div>
        </div>

        {/* Resume Grid Section */}
        <div className="about-resume-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Education Column */}
          <div className="about-resume-col flex flex-col gap-10">
            <div className="about-sub-header flex flex-col items-center gap-4">
              <div className="text-4xl">🎓</div>
              <h2 className="font-display font-medium text-[#a78bfa] text-[36px] lg:text-[48px]">Education</h2>
            </div>
            
            <div className="about-resume-list flex flex-col gap-6">
              <ResumeCard 
                date="2025.10 - 2026 Present"
                title={"챗GPT 생성형 AI를 활용한 반응형 웹콘텐츠\n(영상제작&코딩) 개발기획자 양성과정"}
                items={[
                  "MBC아카데미컴퓨터학원",
                  "기획, 디자인, 개발 과정에서 디자인, 영상, 코딩 툴 숙달"
                ]}
              />
              <ResumeCard 
                date="2012.03 - 2016.06"
                title="한양 여자 대학교 일본어통번역학과 졸업"
                items={[
                  "2012.06~07 도쿄 올림픽 기념 청소년센터 일본어학연수과정 수료",
                  "2016 우등상 수상"
                ]}
              />
            </div>
          </div>

          {/* Experience Column */}
          <div className="about-resume-col flex flex-col gap-10">
            <div className="about-sub-header flex flex-col items-center gap-4">
              <div className="text-4xl">💡</div>
              <h2 className="font-display font-medium text-[#a78bfa] text-[36px] lg:text-[48px]">Experience</h2>
            </div>
            
            <div className="about-resume-list flex flex-col gap-6">
              <ResumeCard 
                date="2025.01 - 2026 Present"
                title="서울시 블로그메이트 활동"
                items={[
                  "한강 드론 축제 등 서울시 홍보 블로그 포스팅 작성"
                ]}
              />
              <ResumeCard 
                date="2016.01 - 2016.02"
                title="도쿄 타카다노바바 신와 외국어 아카데미 수료"
                items={[
                  "일본 현지에서 일본어 어학 기술 습득"
                ]}
              />
              <ResumeCard 
                date="2015.09 - 2016.01"
                title="일본 호텔 해외취업 연수과정"
                items={[
                  "한양여자대학교와 한국 한국산업인력공단 주최 연수"
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
