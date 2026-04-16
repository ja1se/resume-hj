import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../utils/cn";
import Button from "./Button";
import SectionHeader from "./SectionHeader";
import ResumeCard from "./ResumeCard";
import avatarMeAni from "../assets/images/avatar-me-ani.png";
import avatarVd from "../assets/avatar-video.mp4";
import ele1 from "../assets/images/ele1.png";
import GraduateIcon from "../assets/images/graduate.png";
import EarthIcon from "../assets/images/earth.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faCircleStop, faPlay } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const About = ({ className }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [lang, setLang] = useState("ko-KR");
  const nameKR = import.meta.env.VITE_CONTACT_NAMEKR;
  const nameEN = import.meta.env.VITE_CONTACT_NAMEEN;
  const nameJP = import.meta.env.VITE_CONTACT_NAMEJP;
  const birthDate = import.meta.env.VITE_CONTACT_BIRTH;
  const addressHere = import.meta.env.VITE_CONTACT_ADDRESS;
  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE;
  const emailAddress = import.meta.env.VITE_CONTACT_EMAIL;
  const bioTexts = {
    "ko-KR": `안녕하세요! 유연한 분석가, ${nameKR}이라고 합니다.. 잘 부탁해요!`,
    "ja-JP": `こんにちは！柔軟な分析家、${nameJP}と申します。よろしくお願いします！`,
  };

  const handleSpeak = (targetLang = "ko-KR") => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentCharIndex(-1);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return;
    }

    setLang(targetLang);
    const utterance = new SpeechSynthesisUtterance(bioTexts[targetLang]);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => {
      if (targetLang === "ja-JP") {
        // 일본어 여성 목소리
        return (
          voice.lang === "ja-JP" &&
          (voice.name.includes("Google") ||
            voice.name.includes("Haruka") ||
            voice.name.includes("Nanami"))
        );
      } else {
        // 한국어 여성 목소리
        return (
          voice.lang === "ko-KR" &&
          (voice.name.includes("Google") ||
            voice.name.includes("Heami") ||
            voice.name.includes("SunHi"))
        );
      }
    });
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = targetLang;
    utterance.rate = targetLang === "ja-JP" ? 0.9 : 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (videoRef.current) videoRef.current.play();
    };

    // 일본어일 때와 한국어일 때 설정 차별화
    utterance.lang = targetLang;
    utterance.rate = targetLang === "ja-JP" ? 0.9 : 1.0; // 일본어는 조금 더 천천히

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (videoRef.current) videoRef.current.play();
    };

    utterance.onboundary = (event) => {
      if (event.name === "word" || event.name === "sentence") {
        setCurrentCharIndex(event.charIndex);
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentCharIndex(-1);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentCharIndex(-1);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // 텍스트 하이라이트 로직 (일본어 대응)
  const renderHighlightedText = () => {
    const currentText = bioTexts[lang];

    const words =
      lang === "ko-KR"
        ? currentText.split(" ")
        : currentText.split(/(?<=[はがにをもた、。])/);

    let cumulativeIndex = 0;

    return words.map((word, index) => {
      const startIndex = cumulativeIndex;
      const endIndex = startIndex + word.length;

      cumulativeIndex += word.length + (lang === "ko-KR" ? 1 : 0);

      const isCurrentWord =
        isSpeaking &&
        currentCharIndex >= startIndex &&
        currentCharIndex < endIndex;

      return (
        <span
          key={`${lang}-${index}`}
          className={cn(
            "inline-block mr-1.5 transition-all duration-300",
            isCurrentWord
              ? "text-violet-600 font-bold underline decoration-violet-300 transform scale-105"
              : "text-slate-600",
          )}
        >
          {word}
        </span>
      );
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 헤더 데코 이미지 전용 애니메이션
      gsap.from(".about-header-wrapper img", {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-header-wrapper",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. Profile Section: 이미지와 텍스트 순차 등장 (Repeatable)
      gsap.from(".about-profile .reveal-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-profile",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Resume Cards: 랜덤 입체 등장 (Repeatable)
      gsap.from(".resume-card-wrapper", {
        y: 50,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)",
        stagger: {
          each: 0.15,
          from: "random",
        },
        scrollTrigger: {
          trigger: ".about-resume-grid",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 4. 서브 헤더 (Education, Experience)
      gsap.from(".about-sub-header", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-resume-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={cn(
        "w-full pb-20 lg:pb-32 bg-white relative overflow-visible",
        "flex flex-col items-center",
        className,
      )}
    >
      <div
        className={cn(
          "w-full px-6 lg:px-20",
          "flex flex-col items-center gap-12 lg:gap-20",
        )}
      >
        {/* Header Section */}
        <div className="about-header-wrapper pt-20 relative w-full">
          <SectionHeader
            title="About Me"
            description={
              <>
                어떤 상황에도 넓은 시야를 확보하는 부엉이처럼 객관적인 거리를
                유지하며 <br className="hidden lg:block" />
                문제를 바라보는 정확한 원인을 찾아내는 유연한 분석가입니다.{" "}
              </>
            }
            className="pb-0"
          />

          <div className="absolute right-0 top-12 w-48 lg:w-72 opacity-60 hidden lg:block pointer-events-none">
            <img
              src={ele1}
              alt=""
              className="w-full h-auto object-contain rounded-[12px]"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div
          className={cn(
            "about-profile w-full flex flex-col lg:flex-row items-center justify-center gap-8 pb-12",
          )}
        >
          {/* Avatar Video/Image */}
          <div className="relative group reveal-item">
            <div
              className={cn(
                "w-32 h-32 lg:w-[180px] lg:h-[300px] shrink-0 p-1",
                "rounded-3xl overflow-hidden shadow-lg relative bg-white",
              )}
            >
              <video
                ref={videoRef}
                src={avatarVd}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isSpeaking ? "opacity-100" : "opacity-0 absolute inset-0",
                )}
                muted
                playsInline
                loop
              />
              <img
                src={avatarMeAni}
                alt="heejincho"
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isSpeaking ? "opacity-0" : "opacity-100",
                )}
              />
            </div>

            {/* Speak Button Overlay */}
            <Button
              variant="ghost"
              onClick={() => handleSpeak()}
              className={cn(
                "absolute right-2 bottom-18 w-10 h-10 lg:w-8 h-8 min-h-0 p-0",
                "rounded-full flex items-center justify-center",
                "bg-neutral-100 text-neutral-300 shadow-lg hover:bg-neutral-300 text-neutral-400 transition-all transform",
                "z-30",
              )}
              title={isSpeaking ? "Stop Speaking" : "Start Speaking"}
            >
              <FontAwesomeIcon
                icon={isSpeaking ? faCircleStop : faVolumeHigh}
              />
            </Button>
            <div className="flex flex-col mt-2 p-2 gap-4">
              <div className="flex gap-2">
                {/* 한국어 버튼 */}
                <Button
                  variant="ghost"
                  onClick={() => handleSpeak("ko-KR")}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-sm hover:bg-violet-200 transition-colors focus:bg-violet-300 min-h-0"
                >
                  <FontAwesomeIcon icon={faPlay} /> KR
                </Button>
                {/* 일본어 버튼 추가 */}
                <Button
                  variant="ghost"
                  onClick={() => handleSpeak("ja-JP")}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-sm hover:bg-pink-200 transition-colors focus:bg-pink-300 min-h-0"
                >
                  <FontAwesomeIcon icon={faPlay} /> JP
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="reveal-item">
              <h3 className="text-slate-800 font-medium text-[20px] lg:text-[22px]">
                {nameKR} | {nameEN}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 text-slate-600 text-[16px] font-light reveal-item">
              <div className="px-4 py-1 bg-violet-50 rounded-full inline-block self-center lg:self-start">
                {birthDate}
              </div>
              <div className="px-4 py-1">{addressHere}</div>
              <div className="px-4 py-1 bg-violet-50 rounded-full inline-block self-center lg:self-start">
                {phoneNumber}
              </div>
              <div className="px-4 py-1">{emailAddress}</div>
            </div>
            <p className="flex flex-row leading-relaxed text-slate-600 text-[16px] font-light reveal-item">
              {renderHighlightedText()}
            </p>
          </div>
        </div>

        {/* Resume Grid Section */}
        <div className="about-resume-grid w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Education Column */}
          <div className="about-resume-col flex flex-col gap-10">
            <div className="about-sub-header flex flex-col items-center bg-white/90 backdrop-blur-sm lg:backdrop-blur-none z-10">
              <div className="w-[70px] h-[70px] text-3xl lg:text-4xl">
                <img src={GraduateIcon} alt="Graduate" />
              </div>
              <h2 className="font-display font-medium text-violet-400 text-[32px] lg:text-[48px]">
                Education
              </h2>
            </div>

            <div className="about-resume-list flex flex-col gap-6">
              <div className="resume-card-wrapper">
                <ResumeCard
                  date="2025.10 - 2026 Present"
                  title={
                    "챗GPT 생성형 AI를 활용한 반응형 웹콘텐츠\n(영상제작&코딩) 개발기획자 양성과정"
                  }
                  items={[
                    "MBC아카데미컴퓨터학원",
                    "기획, 디자인, 개발 과정에서 디자인, 영상, 코딩 툴 숙달",
                  ]}
                />
              </div>
              <div className="resume-card-wrapper">
                <ResumeCard
                  date="2012.03 - 2016.06"
                  title="한양 여자 대학교 일본어통번역학과 졸업"
                  items={[
                    "2012.06~07 도쿄 올림픽 기념 청소년센터 일본어학연수과정 수료",
                    "2016 우등상 수상",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Experience Column */}
          <div className="about-resume-col flex flex-col gap-10">
            <div className="about-sub-header flex flex-col items-center bg-white/90 backdrop-blur-sm lg:backdrop-blur-none z-10">
              <div className="w-[70px] h-[70px] text-3xl lg:text-4xl">
                <img src={EarthIcon} alt="Earth" />
              </div>
              <h2 className="font-display font-medium text-violet-400 text-[32px] lg:text-[48px]">
                Experience
              </h2>
            </div>

            <div className="about-resume-list flex flex-col gap-6">
              <div className="resume-card-wrapper">
                <ResumeCard
                  date="2025.01 - 2026 Present"
                  title="서울시 블로그메이트 활동"
                  items={["한강 드론 축제 등 서울시 홍보 블로그 포스팅 작성"]}
                />
              </div>
              <div className="resume-card-wrapper">
                <ResumeCard
                  date="2016.01 - 2016.02"
                  title="도쿄 타카다노바바 신와 외국어 아카데미 수료"
                  items={["일본 현지에서 일본어 어학 기술 습득"]}
                />
              </div>
              <div className="resume-card-wrapper">
                <ResumeCard
                  date="2015.09 - 2016.01"
                  title="일본 호텔 해외취업 연수과정"
                  items={["한양여자대학교와 한국 한국산업인력공단 주최 연수"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
