# 프로젝트 구현 계획서: Sticky & Scroll 포트폴리오

이 문서는 `portfolio-project-guide.md`의 내용을 바탕으로, AI 에이전트가 코드를 직접 구현하기 위해 최적화된 단계별 실행 계획이다.

피그마 링크 :
@https://www.figma.com/design/gxWM89CYblpV7jVsKUoOze/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%F0%9F%92%A1?node-id=2059-4587&m=dev
- 피그마 링크 참고 시 요소를 참고하지 않고 컨테이너만 구현하도록 한다.

---

## 1. 환경 설정 및 의존성 확인

구현 전 다음 라이브러리가 설치되어 있는지 확인하고, 미설치 시 설치 명령어를 실행한다.
- `framer-motion`: 애니메이션 처리
- `tailwind-merge`, `clsx`: 스타일 병합 유틸리티
- `lucide-react`: 아이콘 (권장)

---

## 2. 기초 인프라 구축

### 2-1. 스타일 병합 유틸리티 (`src/utils/cn.js`)
Tailwind 클래스 충돌 방지를 위한 필수 유틸리티.
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### 2-2. 반응형 커스텀 훅 (`src/hooks/useIsMobile.js`)
1024px(lg) 미만 여부를 판별하여 Sticky 애니메이션을 제어함.
```javascript
import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
};
```

---

## 3. 데이터 및 UI 컴포넌트 정의

### 3-1. 프로젝트 데이터 (`src/constants/projects.js`)
4개 프로젝트(무인양품, 냥스베네, 소울블렌드, 와쿠와쿠)의 명세 정의.

### 3-2. 공통 UI (`src/components/ui/`)
- `Nav.jsx`: 테마 및 스크롤 링크 제어.
- `Card.jsx`, `Button.jsx`: `cn()`을 활용한 Props 기반 스타일링.

---

## 4. 핵심 인터랙션 컴포넌트 구현

### 4-1. `ProjectSection.jsx` (컨테이너)
- 전체 섹션의 `height`를 최소 `250vh`로 설정하여 스크롤 여유 확보.
- `useScroll`을 통해 해당 섹션의 `scrollYProgress` 추출.
- 배경색 전환 및 Z-Index 스택 관리.

### 4-2. `ProjectImage.jsx` (이미지 스크롤)
- `lg:sticky top-0` 적용.
- `useTransform(scrollYProgress, [0, 1], translateYOutput, { clamp: true })` 적용.
- `will-change: transform`으로 GPU 가속 활성화.
- 첫 번째 프로젝트(무인양품)는 `loading="eager"`, 나머지는 `lazy` 적용.

---

## 5. 최적화 및 빌드 체크리스트

- [ ] **성능**: `LazyMotion` + `domAnimation` 적용 여부 확인.
- [ ] **이미지**: 모든 경로가 `.webp`이며 `/assets/images/`에 존재하는지 확인.
- [ ] **반응형**: 모바일에서 `sticky`가 `relative`로, `imageHeight`가 `auto`로 변하는지 확인.
- [ ] **품질**: 빌드 시 `Unused variables` 에러가 없는지 확인.

---

## 6. 최종 실행 프롬프트 (Gemini 전용)

> "위에 정의된 `IMPLEMENTATION_PLAN.md`를 바탕으로 프로젝트를 구현해줘. 
> 1. `cn` 유틸리티와 `useIsMobile` 훅을 먼저 생성할 것.
> 2. `ProjectSection` 내부에서 `useTransform` 시 반드시 `{ clamp: true }`를 사용할 것.
> 3. 무인양품 섹션만 이미지 우선순위를 높게 설정할 것.
> 4. 모든 애니메이션 컴포넌트는 `framer-motion`의 `m` 접두사를 사용하여 번들 사이즈를 최소화할 것."
