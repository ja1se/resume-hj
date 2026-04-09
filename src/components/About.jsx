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
      // Header Animation
      gsap.from(".about-header-item", {
        scrollTrigger: {
          trigger: ".about-header",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Profile Section Animation
      gsap.from(".about-profile", {
        scrollTrigger: {
          trigger: ".about-profile",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Resume Grid Animation
      gsap.from(".about-resume-col", {
        scrollTrigger: {
          trigger: ".about-resume-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn("w-full pb-32 bg-white relative overflow-hidden", className)}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-20">
        
        {/* Header Section */}
        <div className="about-header relative">
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
        <div className="about-profile flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-10">
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
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl">🎓</div>
              <h2 className="font-display font-medium text-[#a78bfa] text-[36px] lg:text-[48px]">Education</h2>
            </div>
            
            <div className="flex flex-col gap-6">
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
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl">💡</div>
              <h2 className="font-display font-medium text-[#a78bfa] text-[36px] lg:text-[48px]">Experience</h2>
            </div>
            
            <div className="flex flex-col gap-6">
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
