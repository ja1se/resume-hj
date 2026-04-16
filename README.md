# GEMINI.md - 프로젝트 컨텍스트 및 지침

## 1. 📋 프로젝트 개요
이 프로젝트는 **React 19**, **Vite 8**, 그리고 **Tailwind CSS 4**를 사용하여 구축된 **현대적이고 감성적인 미니멀리즘 포트폴리오** 웹사이트입니다. **GSAP**를 활용한 고품질 애니메이션과 데이터 중심 아키텍처를 특징으로 하며, 전문 프로젝트, 기술 스택 및 경험을 효과적으로 보여줍니다.

### 1-1. 주요 기술 스택
- **프론트엔드:** React 19 (Hooks, 함수형 컴포넌트)
- **빌드 도구:** Vite 8
- **스타일링:** Tailwind CSS 4 (커스텀 디자인 토큰, 모바일 우선)
- **애니메이션:** GSAP 3 (ScrollTrigger, Timeline, 컨텍스트 관리)
- **컴포넌트:** Swiper 12 (슬라이더), FontAwesome (아이콘)
- **유틸리티:** `clsx` + `tailwind-merge` (`src/utils/cn.js` 사용)
- **배포/도구:** ESLint, PostCSS, EmailJS (문의 폼)

---

## 2. 🚀 빌드 및 실행 방법
| 명령어 | 설명 |
| :--- | :--- |
| `npm install` | 의존성 패키지 설치 |
| `npm run dev` | 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run lint` | 코드 품질을 위한 ESLint 실행 |
| `npm run preview` | 로컬에서 프로덕션 빌드 미리보기 |

---

## 3. 🏗️ 아키텍처 및 컨벤션

### 3-1. 데이터 중심 콘텐츠
모든 프로젝트 메타데이터(제목, 기술 스택, 이미지, 애니메이션 등)는 `src/constants/projects.js`에서 중앙 집중식으로 관리됩니다.
- **지침:** 프로젝트를 추가하거나 수정할 때는 컴포넌트 로직을 수정하는 대신 `PROJECTS` 상수를 업데이트하세요.

### 3-2. 애니메이션 표준 (GSAP)
메모리 누수 방지를 위해 성능과 정리(Clean-up)를 우선시합니다.
- **규칙:** 모든 GSAP 애니메이션에는 `useLayoutEffect`와 `gsap.context()`를 사용하세요.
- **규칙:** 이펙트 정리 시 항상 `ctx.revert()`를 반환하세요.
- **스타일:** 리드미컬하고 생동감 있는 마이크로 인터랙션을 위해 `back.out(1.7)`을 권장합니다.

### 3-3. 스타일링 및 레이아웃
- **유틸리티:** Tailwind 클래스 병합을 위해 `@/utils/cn`의 `cn()` 유틸리티를 사용하세요.
- **반응형:** **모바일 우선(Mobile-First)** 접근 방식을 따릅니다. 저사양 모바일 기기에서 과도한 애니메이션 연산을 제어하려면 `useIsMobile` 훅을 사용하세요.
- **디자인 토큰:** `Design.md`에 정의된 컬러 팔레트와 타이포그래피(Oska Violet & Slate neutrals)를 따르세요.

### 3-4. 시맨틱 HTML
웹 접근성(A11y)과 SEO를 보장하기 위해 의미 있는 태그(`<section>`, `<main>`, `<header>`, `<footer>`, `<article>`)를 사용하세요.

---

## 4. 📂 주요 디렉토리 구조
```
resume-hj/
├── public/
│   ├── fonts/               ← 브랜드 전용 폰트 (Unbounded, A2Z)
│   └── favicon.svg          ← 파비콘
├── src/
│   ├── assets/
│   │   ├── images/          ← 프로젝트 및 인터페이스 이미지 자산
│   │   └── avatar-fin.mp4   ← 히어로 섹션 아바타 영상
│   ├── components/          ← 기능별 UI 컴포넌트
│   │   ├── About.jsx        ← 자기소개 및 경력 섹션
│   │   ├── ArchiveCard.jsx  ← 아카이브 섹션의 개별 카드
│   │   ├── ArchiveSection.jsx ← 아카이브 슬라이더 섹션
│   │   ├── Button.jsx       ← 공통 버튼 컴포넌트
│   │   ├── Card.jsx         ← 범용 카드 레이아웃
│   │   ├── Footer.jsx       ← 하단 정보 및 연락처 섹션
│   │   ├── Hero.jsx         ← 메인 히어로 섹션 (영상 포함)
│   │   ├── Logo.jsx         ← 브랜드 로고 컴포넌트
│   │   ├── Marquee.jsx      ← 흐르는 텍스트 애니메이션 섹션
│   │   ├── Nav.jsx          ← 상단 네비게이션 바
│   │   ├── ProjectCard.jsx  ← 프로젝트 요약 카드
│   │   ├── ProjectImage.jsx ← 프로젝트 이미지 렌더링 컴포넌트
│   │   ├── ProjectPopup.jsx ← 프로젝트 상세 팝업/모달
│   │   ├── ProjectSection.jsx ← 프로젝트 상세 섹션 (스크롤 인터랙션 포함)
│   │   ├── ResumeCard.jsx   ← 이력서 정보 카드
│   │   ├── ScrollToTop.jsx  ← 상단 이동 버튼
│   │   └── SectionHeader.jsx ← 섹션별 공통 제목 헤더
│   ├── constants/
│   │   ├── projects.js      ← 프로젝트 데이터 통합 관리
│   │   └── links.js         ← 소셜 및 외부 링크 관리
│   ├── hooks/
│   │   └── useIsMobile.js   ← 모바일 환경 감지 및 애니메이션 제어
│   ├── utils/
│   │   └── cn.js            ← Tailwind 클래스 병합 유틸리티
│   ├── App.jsx              ← 전체 레이아웃 및 섹션 조립
│   ├── index.css            ← Tailwind CSS 4 설정 및 글로벌 스타일
│   └── main.jsx             ← React 애플리케이션 시작점
├── index.html               ← 진입점 HTML
├── vite.config.js           ← Vite 빌드 설정
└── package.json             ← 프로젝트 의존성 및 스크립트
```

---

## 5. 📝 디자인 참조
- **상세 컴포넌트 사양:** `Components.md` 참조
- **디자인 시스템 규칙:** `Design.md` 참조
- **프로젝트 철학:** `SKILLS.md` 참조
