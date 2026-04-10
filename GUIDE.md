# 프로젝트 가이드: 감성 미니멀리즘 포트폴리오 구현 및 최적화

---

## 1. 프로젝트 개요

- **목표**: 무인양품, 냥스베네, 소울블렌드, 와쿠와쿠 4개 프로젝트 및 'About Me' 섹션 구현.
- **디자인 철학**: 감성 미니멀리즘, 정갈한 여백, 필요한 만큼만 움직이는 절제된 애니메이션을 통해 포트폴리오 브랜드 본질에 집중.
- **기술 스택**: React, Tailwind CSS, GSAP, FontAwesome.

---

## 2. 레이아웃 및 성능 원칙

- **중앙 정렬 (Centering)**:
  - 기존의 `max-w-1400px`와 같은 고정폭 제한 클래스를 모두 제거.
  - 부모 요소에 `flex flex-col items-center`를 적용하고, 내부 콘텐츠는 `flex justify-center`를 통해 화면 중앙에 유연하게 배치.
  - 좌우 기본 패딩(`px-6 lg:px-20`)을 통해 넓은 화면에서도 콘텐츠가 가독성 있게 유지되도록 함.

- **가로 스크롤 방지**:
  - `100vw` 사용 시 발생하는 스크롤바 너비 문제를 방지하기 위해 `width: 100%`를 사용.
  - `html`, `body`에 `overflow-x: hidden`을 기본 적용하여 예기치 않은 가로 밀림 현상 차단.

---

## 3. 최종 디렉토리 구조

```
src/
├── components/                     # UI 구성 요소 (Atomic Design 및 컴포넌트 중심)
│   ├── About.jsx                   # Profile + Resume(Education/Experience)를 포함한 자기소개 섹션
│   ├── ArchiveCard.jsx             # 아카이브 섹션에 최적화된 개별 작업물 카드
│   ├── ArchiveSection.jsx          # 작업물을 정갈한 그리드 시스템으로 나열하는 아카이브 영역
│   ├── Button.jsx                  # 확장성을 고려하여 설계된 공통 버튼 시스템 (Outline 중심)
│   ├── Card.jsx                    # 범용적으로 사용 가능한 컨테이너 컴포넌트
│   ├── Footer.jsx                  # 컨택트 카드와 그라데이션 배경을 포함한 하단 정보 영역
│   ├── Hero.jsx                    # 브랜드의 본질을 전달하는 미니멀리즘 기반의 메인 도입부
│   ├── Marquee.jsx                 # 마퀴
│   ├── Nav.jsx                     # 중앙 정렬 및 반응형 패딩이 적용된 전역 네비게이션 바
│   ├── ProjectCard.jsx             # 프로젝트 설명과 기술 스택을 보여주는 상세 정보 카드
│   ├── ProjectImage.jsx            # useTransform과 clamp 옵션이 적용된 프레임 내 스크롤 이미지
│   ├── ProjectPopup.jsx            # 프로젝트 팝업
│   ├── ProjectSection.jsx          # 이미지 프레임 Sticky 고정과 텍스트 영역이 교차되는 핵심 섹션
│   ├── ResumeCard.jsx              # 학력 및 경력 사항을 일관된 포맷으로 보여주는 카드
│   ├── SectionHeader.jsx           # GSAP Micro-Pin 및 텍스트 강조 효과가 적용된 공통 섹션 헤더
├── constants/
│   └── projects.js                 # 모든 프로젝트 데이터(이미지, 기술스택, 기간 등)의 중앙 관리소
├── hooks/
│   └── useIsMobile.js              # 1024px(lg) 브레이크포인트를 감지하여 애니메이션 활성화를 제어하는 훅
├── utils/
│   └── cn.js                       # tailwind-merge와 clsx를 결합한 복잡한 조건부 클래스 병합 유틸리티
├── assets/
│   └── images/                     # 최적화된 WebP/SVG 이미지 및 데코레이션 에셋
├── App.jsx                         # 전체 섹션 조립 및 레이아웃 설정
├── main.jsx                        # React 엔트리포인트 및 전역 라이브러리 설정
└── index.css                       # 전역 스타일 및 Tailwind CSS 설정
```

---

## 4. 구현 시 주의사항 (Core Rules)

1. **데이터 중심**: 모든 프로젝트 정보는 `constants/projects.js`에서 관리하며, 컴포넌트 내 하드코딩을 지양함.
2. **성능 우선**: 애니메이션은 성능 부하가 적은 `transform`과 `opacity` 속성 위주로 구성.
3. **가독성**: 코드 작성 시 `cn()` 유틸리티를 사용하여 복잡한 조건부 클래스를 깔끔하게 정리.
4. **반응형 검증**: 데스크톱의 화려한 인터랙션이 모바일에서 사용자 경험을 해치지 않도록 항상 Fallback 로직을 우선 검토.

---

## 5. 인터랙션 디테일: 프로젝트 익스팬션 (Expansion)
미니멀한 UI를 유지하면서도 상세 정보를 몰입감 있게 전달하기 위해 GSAP Clip-path 기반의 팝업 시스템을 도입한다.

## 5-1. 호버 인터랙션 (ProjectImage)
트리거: 이미지 프레임(relative group)에 마우스 진입 시.

효과:

bg-black/40 수준의 딤 레이어가 서서히 나타남 (transition-opacity).

'자세히 보기' (Outline 스타일) 버튼이 중앙에 페이드인.

버튼 클릭 시 마우스의 현재 좌표(${x}, ${y})를 팝업 컴포넌트로 전달.

## 5-2. 클릭 애니메이션 및 팝업 (ProjectPopup)
Portal 활용: ProjectPopup.jsx는 createPortal을 통해 DOM 최상위에 렌더링하여 쌓임 맥락(Z-index) 이슈를 원천 차단.

확산 효과 (Expansion):

시작점: 클릭된 마우스 좌표 circle(0% at x y)

끝점: 화면 전체를 덮는 circle(150% at x y)

설정: gsap.timeline을 사용, duration: 0.6, ease: "power3.inOut" 적용.

UI 구성:

배경: backdrop-blur-sm을 적용하여 원본 콘텐츠와의 시각적 분리감 제공.

레이아웃: 정갈한 타이포그래피 중심의 심플한 레이아웃. (디자인 컬러는 Design.md 참고)

## 5-3. 상태 관리 전략
상태 정의: ProjectSection.jsx에서 isOpen(Boolean)과 mousePos({x, y}) 상태를 관리.

스크롤 잠금: 팝업이 활성화된(isOpen === true) 상태에서는 document.body에 overflow: hidden을 강제하여 배경 스크롤을 차단.

---

## 기타
- **이미지 스타일**: 
  - `.elemask` 이미지(데코레이션 요소)에 적용된 움직이는 애니메이션을 제거, w-[70px] 고정.
  - `rounded-[12px]` 속성을 적용하여 정갈하고 정적인 상태로 유지함으로써 신뢰감 있는 분위기 조성.