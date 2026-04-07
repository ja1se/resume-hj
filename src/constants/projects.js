// src/constants/projects.js

export const PROJECTS = [
  {
    id: "muji",
    title: "무인양품",
    tags: ["UX Research", "Redesign"],
    description: "무인양품 앱의 html,css,js 리디자인 프로젝트. 사용자 여정 분석을 통해 핵심 불편사항을 도출하고 개선된 정보 구조를 제안함.",
    image: "/src/assets/images/muji-scroll.webp",      // 세로로 긴 스크린샷 경로
    imageHeight: "200%",                    // 프레임 대비 이미지 높이 비율
    color: "#F5F0EB",                       // 섹션 배경색
    translateYOutput: ["0%", "-40%"],       // useTransform output 범위
  },
  {
    id: "nyansvene",
    title: "냥스베네",
    tags: ["Brand Identity", "UI Design"],
    description: "커피스틱 브랜드 '냥스베네' 영상 프로젝트.",
    image: "/src/assets/images/nyansvene-scroll.webp",
    imageHeight: "210%",
    color: "#FFF8F0",
    translateYOutput: ["0%", "-42%"],
  },
  {
    id: "soulblend",
    title: "소울blend",
    tags: ["App Design", "Interaction"],
    description: "사주 앱 '소울블렌드'의 인터랙션 디자인 및 프로토타이핑 프로젝트.",
    image: "/src/assets/images/soulblend-scroll.webp",
    imageHeight: "220%",
    color: "#F0F0F5",
    translateYOutput: ["0%", "-45%"],
  },
  {
    id: "wakuwaku",
    title: "와쿠와쿠",
    tags: ["Service Design", "UX"],
    description: "일본 드라마 OTT 앱 '와쿠와쿠'의 서비스 디자인 및 UX 개선 프로젝트.",
    image: "/src/assets/images/wakuwaku-scroll.webp",
    imageHeight: "200%",
    color: "#F5F5F0",
    translateYOutput: ["0%", "-40%"],
  },
];
