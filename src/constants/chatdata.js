// src/constants/chatData.js
import { PROJECTS } from "./projects";
import { SITE_LINKS } from "./links";

// 와쿠와쿠 프로젝트 데이터
const wakuwaku = PROJECTS.find(p => p.id === "wakuwaku");
const wakuwakuLinks = SITE_LINKS.projects.wakuwaku;

export const CHAT_DATA = {
  intro: `안녕하세요! 지원자 ${import.meta.env.VITE_CONTACT_NAMEKR}의 인공지능 집사, 희지나이입니다.\n무엇을 도와드릴까요? 😁`,
  options: [
    { 
      id: "tech", 
      label: "사용 기술 스택이 궁금해요", 
      answer: "React, GSAP, Tailwind를 주로 사용하고 Figma를 메인으로 포토샵, 일러스트레이터 같은 툴을 활용하며 디자인합니다. 프리미어프로 등 영상 관련 기술적 역량부터 생성형 AI 활용 기술도 가지고 있습니다..:)" 
    },
    { 
      id: "project", 
      label: "추천 프로젝트는?", 
      answer: `최근 '${wakuwaku?.title}' 일본드라마 OTT 서비스 제작을 마쳤습니다! 아래 링크에서 바로 확인해보실 수 있어요.\n\n🔗 보러가기: ${wakuwakuLinks.result}` 
    },
    { 
      id: "contact", 
      label: "연락처를 알고 싶어요", 
      answer: `이메일은 ${import.meta.env.VITE_CONTACT_EMAIL} 입니다.` 
    }
  ]
};
