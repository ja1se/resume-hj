# 프로젝트 가이드: 4대 프로젝트 중심 개인 포트폴리오 구현 및 최적화

---

## 1. 프로젝트 개요

- **목표**: 무인양품, 냥스베네, 소울블렌드, 와쿠와쿠 4개 프로젝트의 'Sticky Frame & Inner Scroll' 인터랙션 구현
...

- **기술 스택**: React, Tailwind CSS, GSAP (ScrollTrigger), Lucide/FontAwesome, React Hooks, Swiper.js
- **페이지 구조**: 히어로 → 소개 → 프로젝트 → 아카이브 → 컨택트 섹션으로 이어지는 싱글 페이지 구성.

---

## 2. 핵심 인터랙션: PROJECTS 섹션 (Sticky & Image Scroll)

각 프로젝트 섹션은 다음과 같은 특수 동작을 포함해야 함:

- **구조**: 좌측(설명글 영역), 우측(이미지 프레임 영역) 혹은 우측(설명글 영역), 좌측(이미지 프레임 영역)
- **동작**:
  1. 사용자가 섹션에 진입하면 우측 혹은 좌측의 **이미지 프레임(Frame)**은 화면 상단에 고정(`sticky`)됨.
  2. 스크롤이 진행되는 동안, 프레임 내부에 있는 **세로로 긴 프로젝트 스크린샷 이미지**가 아래에서 위로 부드럽게 이동함.
  3. 좌측의 설명글 스크롤이 끝나면 우측 프레임의 고정도 해제되어 다음 섹션으로 넘어감.

---

## 2-1. GSAP 기반 풀페이지 스크롤 전략

프로젝트의 성격에 따라 Framer Motion 대신 또는 함께 사용할 수 있는 GSAP ScrollTrigger 전략입니다.

### 전략 A: 섹션 레이어드 스냅 (Layered Pinning)
- **효과**: 이전 프로젝트 섹션이 화면에 고정(Pin)된 상태에서, 다음 프로젝트가 아래에서 위로 슬라이드되며 이전 화면을 덮는 방식.
- **Framer Motion 조합**: 배경 전환과 고정 로직은 GSAP ScrollTrigger가 담당하고, 내부의 세부 요소(텍스트 페이드인 등)는 Framer Motion의 `whileInView`로 처리.
- **추천**: 무인양품, 와쿠와쿠처럼 비주얼이 강조되어야 하는 프로젝트.

### 전략 B: 가로 슬라이드 전환 (Horizontal Scroller)
- **효과**: 세로로 스크롤을 내리지만, 특정 프로젝트 섹션(예: 아카이브)에서는 화면이 가로로 이동하며 여러 작업을 나열.
- **Framer Motion 조합**: `useScroll`로 가로 이동을 구현하기보다 GSAP의 `scrub` 기능을 사용하는 것이 성능 면에서 훨씬 부드러움.
- **추천**: 아카이브(Archive) 섹션의 여러 카드 노출용.

### 전략 C: 텍스트 하이라이트 & 줌 (Text Reveal & Zoom)
- **효과**: 스크롤에 따라 프로젝트 제목이 화면 전체로 커지거나(Zoom), 회색 글자가 흰색으로 서서히 채워지는 효과.
- **Framer Motion 조합**: 단순 줌은 Framer Motion이 쉽지만, 정밀한 텍스트 색상 채우기는 GSAP의 `clip-path` 애니메이션이 더 정교함.
- **추천**: 프로젝트 진입 전 인트로(Intro) 문구 강조용.

---

## 3. 프로젝트 데이터 구조 명세

`constants/projects.js`에 정의할 데이터 스키마는 아래와 같다. Gemini CLI가 이 구조를 기준으로 컴포넌트를 생성하도록 명시한다.

```js
// constants/projects.js

export const PROJECTS = [
  {
    id: "muji",
    title: "무인양품",
    tags: ["UX Research", "Redesign"],
    description: "무인양품 앱의 html,css,js 리디자인 프로젝트. 사용자 여정 분석을 통해 핵심 불편사항을 도출하고 개선된 정보 구조를 제안함.",
    image: "/images/muji-scroll.png",      // 세로로 긴 스크린샷 경로
    imageHeight: "200%",                    // 프레임 대비 이미지 높이 비율
    color: "#F5F0EB",                       // 섹션 배경색
    translateYOutput: ["0%", "-40%"],       // useTransform output 범위
  },
  {
    id: "nyansvene",
    title: "냥스베네",
    tags: ["Brand Identity", "UI Design"],
    description: "커피스틱 브랜드 '냥스베네' 영상 프로젝트.",
    image: "/images/nyansvene-scroll.png",
    imageHeight: "210%",
    color: "#FFF8F0",
    translateYOutput: ["0%", "-42%"],
  },
  {
    id: "soulblend",
    title: "소울블렌드",
    tags: ["App Design", "Interaction"],
    description: "사주 앱 '소울블렌드'의 인터랙션 디자인 및 프로토타이핑 프로젝트.",
    image: "/images/soulblend-scroll.png",
    imageHeight: "220%",
    color: "#F0F0F5",
    translateYOutput: ["0%", "-45%"],
  },
  {
    id: "wakuwaku",
    title: "와쿠와쿠",
    tags: ["Service Design", "UX"],
    description: "일본 드라마 OTT 앱 '와쿠와쿠'의 서비스 디자인 및 UX 개선 프로젝트.",
    image: "/images/wakuwaku-scroll.png",
    imageHeight: "200%",
    color: "#F5F5F0",
    translateYOutput: ["0%", "-40%"],
  },
];
```

> **주의**: `imageHeight`와 `translateYOutput`은 실제 이미지 비율에 따라 조정 필요. 이미지가 길수록 output 범위를 더 크게 설정한다.

---

## 4. 스크롤 파라미터 기준값

`useScroll` + `useTransform` 적용 시 아래 기준값을 초기값으로 사용하고, 시각적 검토 후 fine-tuning한다.

```md
- scrollYProgress input : [0, 1]  ← 섹션 진입(0) ~ 섹션 이탈(1)
- translateY output     : ["0%", "-40%"]  ← 이미지 높이에 따라 조정
- 이미지 최소 권장 높이 : 뷰포트의 180% 이상 (너무 짧으면 스크롤 전에 이미지가 끝남)
- sticky 기준           : top-0, z-index: 10
- 프레임 권장 높이      : 100vh (뷰포트 전체)
- 이미지 width          : 100% (프레임에 꽉 차도록)
```

### 파라미터 조정 기준

| 이미지 높이 | translateY output 권장 범위 |
|------------|----------------------------|
| 180% vh    | `["0%", "-35%"]`           |
| 200% vh    | `["0%", "-40%"]`           |
| 220% vh    | `["0%", "-45%"]`           |
| 250% vh    | `["0%", "-52%"]`           |

---

## 5. 반응형 처리 전략

모바일 환경에서 `sticky` + `inner scroll`은 레이아웃이 깨지거나 UX가 저하될 수 있으므로, 브레이크포인트별 전략을 분리한다.

```md
- Desktop (lg 이상, 1024px~) : Sticky Frame & Inner Scroll 풀 적용
- Tablet  (md,  768px~1023px): sticky 유지, 이미지 translateY 범위 축소 (약 60% 수준)
- Mobile  (sm 이하, ~767px)  : sticky 해제, 이미지 단순 노출로 fallback (overflow-hidden 제거)
- breakpoint 기준            : Tailwind `lg:` (1024px)
```

### 코드 적용 예시

```jsx
// Desktop: sticky + framer motion 적용
// Mobile: 일반 블록으로 fallback

<div className="lg:sticky lg:top-0 lg:overflow-hidden">
  <motion.img style={{ y: isMobile ? 0 : translateY }} ... />
</div>
```

> `isMobile` 판별은 `window.innerWidth` 또는 Tailwind의 `useBreakpoint` 훅 활용 권장.

---

## 6. 성능 최적화 체크리스트

빌드 전 아래 항목을 반드시 점검한다.

### 이미지 최적화
- [ ] 모든 스크롤 이미지를 **WebP 포맷**으로 변환 (PNG 대비 약 30~50% 용량 절감)
- [ ] 이미지 최대 width: **1200px** (레티나 대응 시 2x → 2400px)
- [ ] `loading="lazy"` 또는 React의 lazy loading 적용

### 애니메이션 성능
- [ ] `will-change: transform` 적용 확인 (GPU 가속 활성화)
- [ ] Framer Motion **`LazyMotion` + `domAnimation`** 적용으로 번들 경량화

```jsx
import { LazyMotion, domAnimation, m } from "framer-motion";

<LazyMotion features={domAnimation}>
  <m.img style={{ y: translateY }} ... />
</LazyMotion>
```

- [ ] `useTransform`의 불필요한 재계산 방지 → 의존성 최소화

### 빌드 품질
- [ ] `npm run build` 시 **Unused variables / Import errors** 0건 확인
- [ ] **Tree-shaking** 정상 동작 확인 (불필요한 라이브러리 미포함)
- [ ] Lighthouse 성능 점수 **80점 이상** 목표

---

## 7. 섹션 간 전환 규칙

각 프로젝트 섹션이 자연스럽게 연결되도록 아래 규칙을 적용한다.

```md
- 각 프로젝트 섹션 최소 높이 : 250vh (스크롤 여유 확보 필수)
- 섹션 진입 시               : 배경색 fade-in 전환 (200ms ease)
- 섹션 이탈 시               : opacity 0으로 fade-out 후 다음 섹션 진입
- 프로젝트 간 구분자(divider): 없음 (배경색 차이로 구분, 직접 연결)
- 배경색 전환                : 각 프로젝트의 `color` 필드값 사용
```

### 전환 애니메이션 예시

```jsx
<motion.section
  style={{ backgroundColor: project.color }}
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  viewport={{ once: false, amount: 0.1 }}
>
```

---

## 8. Gemini CLI 실행 및 구현 명령

### 단계 1: Sticky 및 내부 이미지 스크롤 로직 구현

> "Figma MCP로 프로젝트 섹션을 분석해줘. 특히 우측 이미지 영역은 다음 조건으로 코드를 작성해줘:
> 1. `sticky top-0`를 사용하여 프레임 자체는 화면에 고정할 것.
> 2. `overflow-hidden` 속성을 가진 프레임 안에 세로가 긴 이미지를 배치할 것.
> 3. `framer-motion`의 `useScroll`과 `useTransform`을 사용하여, 해당 섹션의 스크롤 진행도(0 to 1)에 따라 이미지의 `translateY` 값이 변하도록 하여 내부 이미지가 위로 올라가는 효과를 줄 것.
> 4. 프로젝트 데이터는 `constants/projects.js`에서 import하여 사용할 것.
> 5. 반응형 처리: `lg:` 미만에서는 sticky 해제 및 translateY 비활성화 처리할 것."

### 단계 2: 빌드 테스트 및 디버깅

> "구현된 스크롤 로직이 `npm run build` 시 에러를 발생시키지 않는지 확인해줘. 특히:
> - `useRef`가 해당 섹션을 정확히 참조하고 있는지
> - 이미지 경로(`/images/*.webp`)가 올바른지
> - `Unused variables` 및 `Import errors`가 없는지
> - `will-change: transform`이 이미지에 적용되어 있는지
> 위 항목을 디버깅하고 수정해줘."

### 단계 3: 프로젝트 최적화 및 정리

> "작업이 완료되면 다음을 실행해:
> 1. 사용하지 않는 기본 파일(`App.css`, `logo.svg` 등) 삭제.
> 2. `package.json`에서 미사용 의존성 체크 후 삭제 명령어 제안.
> 3. 4개의 프로젝트 데이터가 `constants/projects.js`에 올바르게 분리되어 있는지 확인.
> 4. `LazyMotion + domAnimation`이 적용되어 있는지 확인하고, 미적용 시 추가해줘.
> 5. Lighthouse 성능 점수를 측정하고 주요 개선 포인트를 제안해줘."

---

## 8-1. GSAP + Framer Motion 하이브리드 구현 명령

> "GSAP과 Framer Motion을 조합하여 프로젝트 섹션의 몰입감을 높여줘:
> 1. **GSAP ScrollTrigger**: 각 `ProjectSection`이 화면 상단에 도달할 때 `pin: true`를 적용해 섹션을 고정할 것.
> 2. **Framer Motion 연동**: 섹션이 고정된 동안 내부의 프로젝트 설명(`ProjectCard`)과 이미지(`ProjectImage`)는 `useTransform`을 통해 스크롤 속도에 반응하도록 설정할 것.
> 3. **GSAP Snap**: 사용자가 스크롤을 멈췄을 때 항상 특정 프로젝트 섹션의 정중앙에 위치하도록 보정할 것.
> 4. **성능 및 안전성**: GSAP 애니메이션에도 `will-change: transform`을 활용하고, React의 `useLayoutEffect` 내에서 안전하게 생성/소멸(cleanup)되도록 작성할 것."

---

## 9. 최종 디렉토리 구조

```
src/
├── components/                     # 모든 UI 컴포넌트 관리
│   ├── Nav.jsx                     # 네비게이션 바
│   ├── SectionHeader.jsx           # 모든 섹션의 공통 헤더 (64px 타이틀)
│   ├── Button.jsx                  # 공통 버튼 (outline 중심)
│   ├── ProjectSection.jsx          # GSAP Snap + Sticky 가 적용된 메인 섹션
│   ├── ProjectImage.jsx            # 프레임 내부 스크롤 이미지
│   ├── ProjectCard.jsx             # 프로젝트 상세 설명
│   ├── ResumeCard.jsx              # About 섹션용 카드
│   ├── ArchiveSection.jsx          # 가로 스크롤 아카이브
│   ├── ArchiveCard.jsx             # 아카이브용 개별 카드
│   └── Footer.jsx                  # 통합된 컨택트 및 푸터
├── constants/
│   └── projects.js                 # 프로젝트 메타데이터
├── hooks/
│   └── useIsMobile.js              # 반응형 분기 훅
├── utils/
│   └── cn.js                       # 클래스 병합 유틸리티
├── assets/
│   └── images/                     # 이미지 에셋
├── App.jsx                         # 전체 조립
└── main.jsx                        # 엔트리포인트
```

---

## 10. GSAP 스크롤 전략 심화

### 10-1. 섹션별 스냅 (Snap)
- **적용**: `ProjectSection`
- **목표**: 사용자가 스크롤할 때 각 프로젝트 섹션의 시작점에 화면이 딱 맞게 고정되도록 구현.
- **코드**: `ScrollTrigger`의 `snap: { snapTo: [0, 1], ... }` 설정을 통해 부드러운 전환 제공.

### 10-2. 가로 스크롤 (Horizontal Scroll)
- **적용**: `ArchiveSection`
- **목표**: 수직 스크롤을 유지하면서 카드 리스트가 가로로 밀리는 연출. `pin: true`와 `scrub`을 활용.
- **카드 규격**: 개별 카드를 감싸는 `archive-card-wrapper`는 `w-[350px]` 고정 너비를 사용하여 리스트의 일관성을 유지함.

---

## 10. UI 컴포넌트 설계: Props 기반 커스터마이징

포트폴리오에서 반복 사용되는 Nav, Card, Button 컴포넌트를 Props로 완전히 제어 가능한 구조로 설계한다.
컴포넌트 내부에 스타일을 하드코딩하지 않고, Props → Tailwind 클래스 매핑 패턴을 사용한다.

---

### 10-1. Nav 컴포넌트

#### Props 명세

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `theme` | `"light" \| "dark"` | `"light"` | 배경/텍스트 색상 테마 |
| `position` | `"fixed" \| "sticky" \| "relative"` | `"fixed"` | 포지션 방식 |
| `showLogo` | `boolean` | `true` | 로고 표시 여부 |
| `links` | `{ label: string, href: string }[]` | `[]` | 네비게이션 링크 배열 |
| `activeLink` | `string` | `""` | 현재 활성화된 링크의 href |
| `onLinkClick` | `(href: string) => void` | - | 링크 클릭 핸들러 |

#### 구현 예시

```jsx
// components/Nav.jsx

const THEME_STYLES = {
  light: "bg-white text-gray-900 border-b border-gray-100",
  dark:  "bg-gray-950 text-white border-b border-gray-800",
};

const Nav = ({
  theme = "light",
  position = "fixed",
  showLogo = true,
  links = [],
  activeLink = "",
  onLinkClick,
}) => {
  return (
    <nav className={`${position} top-0 left-0 w-full z-50 px-8 py-4 flex items-center justify-between ${THEME_STYLES[theme]}`}>
      {showLogo && (
        <span className="text-lg font-semibold tracking-tight">
          YOUR NAME
        </span>
      )}
      <ul className="flex gap-8">
        {links.map(({ label, href }) => (
          <li key={href}>
            <button
              onClick={() => onLinkClick?.(href)}
              className={`text-sm transition-opacity ${
                activeLink === href ? "opacity-100 font-medium" : "opacity-40 hover:opacity-70"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

#### 사용 예시

```jsx
<Nav
  theme="dark"
  position="fixed"
  links={[
    { label: "Projects", href: "#projects" },
    { label: "About",    href: "#about"    },
    { label: "Contact",  href: "#contact"  },
  ]}
  activeLink="#projects"
  onLinkClick={(href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}
/>
```

---

### 10-2. Card 컴포넌트

#### Props 명세

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `"default" \| "outlined" \| "filled"` | `"default"` | 카드 스타일 변형 |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 카드 크기 (padding 기준) |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `"md"` | 모서리 둥글기 |
| `shadow` | `"none" \| "sm" \| "md" \| "lg"` | `"sm"` | 그림자 강도 |
| `bgColor` | `string` | `"bg-white"` | 배경색 (Tailwind 클래스) |
| `hoverable` | `boolean` | `false` | hover 시 lift 효과 여부 |
| `onClick` | `() => void` | - | 클릭 핸들러 (있으면 cursor-pointer) |
| `children` | `ReactNode` | - | 카드 내부 콘텐츠 |

#### 구현 예시

```jsx
// components/Card.jsx

const VARIANT_STYLES = {
  default:  "bg-white",
  outlined: "bg-transparent border border-gray-200",
  filled:   "bg-gray-50",
};

const SIZE_STYLES = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const RADIUS_STYLES = {
  none: "rounded-none",
  sm:   "rounded-sm",
  md:   "rounded-xl",
  lg:   "rounded-2xl",
  full: "rounded-3xl",
};

const SHADOW_STYLES = {
  none: "",
  sm:   "shadow-sm",
  md:   "shadow-md",
  lg:   "shadow-lg",
};

const Card = ({
  variant = "default",
  size = "md",
  radius = "md",
  shadow = "sm",
  bgColor,
  hoverable = false,
  onClick,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={[
        bgColor ?? VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        RADIUS_STYLES[radius],
        SHADOW_STYLES[shadow],
        hoverable && "transition-transform duration-200 hover:-translate-y-1 hover:shadow-md",
        onClick  && "cursor-pointer",
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
};

export default Card;
```

#### 사용 예시

```jsx
{/* 프로젝트 태그 카드 */}
<Card variant="outlined" size="sm" radius="full" shadow="none">
  <span className="text-xs text-gray-500">UX Research</span>
</Card>

{/* 프로젝트 정보 카드 */}
<Card variant="filled" size="lg" radius="lg" shadow="md" hoverable onClick={() => openProject(id)}>
  <h3>{title}</h3>
  <p>{description}</p>
</Card>

{/* 배경색 직접 지정 */}
<Card bgColor="bg-amber-50" radius="lg" shadow="none">
  ...
</Card>
```

---

### 10-3. Button 컴포넌트

#### Props 명세

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "outline"` | `"primary"` | 버튼 스타일 변형 |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 버튼 크기 |
| `fullWidth` | `boolean` | `false` | 부모 너비 100% 여부 |
| `loading` | `boolean` | `false` | 로딩 스피너 표시 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `leftIcon` | `ReactNode` | - | 텍스트 좌측 아이콘 |
| `rightIcon` | `ReactNode` | - | 텍스트 우측 아이콘 |
| `onClick` | `() => void` | - | 클릭 핸들러 |
| `children` | `ReactNode` | - | 버튼 텍스트 |

#### 구현 예시

```jsx
// components/Button.jsx

const VARIANT_STYLES = {
  primary:   "bg-gray-900 text-white hover:bg-gray-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost:     "bg-transparent text-gray-900 hover:bg-gray-100",
  outline:   "bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white",
};

const SIZE_STYLES = {
  sm: "h-8  px-4 text-xs gap-1.5",
  md: "h-10 px-6 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2.5",
};

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth  && "w-full",
        isDisabled && "opacity-40 cursor-not-allowed pointer-events-none",
      ].filter(Boolean).join(" ")}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
```

#### 사용 예시

```jsx
{/* 기본 사용 */}
<Button variant="primary" onClick={() => openProject()}>
  프로젝트 보기
</Button>

{/* 아이콘 포함 */}
<Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
  자세히 보기
</Button>

{/* 로딩 상태 */}
<Button variant="primary" loading={isSubmitting} fullWidth>
  전송 중...
</Button>

{/* Ghost 버튼 */}
<Button variant="ghost" size="lg">
  돌아가기
</Button>
```

---

### 10-4. 컴포넌트 설계 원칙

```md
1. 단일 책임 원칙  : 각 컴포넌트는 UI 렌더링만 담당. 비즈니스 로직은 외부에서 주입(Props/Callback).
2. 스타일 중앙화   : variant/size 등 스타일 변형은 컴포넌트 상단의 STYLES 객체에서 일괄 관리.
3. className 병합  : 조건부 클래스는 배열 + filter(Boolean) + join(" ") 패턴으로 처리.
4. 타입 안전성     : PropTypes 또는 TypeScript interface로 Props 타입을 명시한다.
5. 접근성(A11y)    : button 요소에 aria-disabled, aria-busy 등 ARIA 속성을 적용한다.
6. 확장 가능성     : className prop을 추가로 허용하여 개별 인스턴스에서 오버라이드 가능하게 한다.
```

#### `className` 오버라이드 패턴 (공통 적용 권장)

```jsx
// 모든 컴포넌트에 className prop 추가
const Button = ({ ..., className = "", ... }) => (
  <button className={`${VARIANT_STYLES[variant]} ... ${className}`}>
    ...
  </button>
);

// 사용 시 개별 오버라이드
<Button variant="primary" className="rounded-full tracking-widest uppercase text-xs">
  ENTER SITE
</Button>
```

---

## 11. 구현 가이드라인 (Core Rules)

- **Visual Fidelity**: 프레임 내부 이미지의 스크롤 속도가 좌측 글의 길이와 조화를 이루도록 `input/output` 범위를 정교하게 설정한다.
- **Error Handling**: 빌드 시 발생하는 `Unused variables`나 `Import errors`를 즉시 수정한다.
- **Clean Cleanup**: 불필요한 폴더와 파일을 정리하여 최종 결과물을 가볍게 유지한다.
- **Data-Driven**: 프로젝트 데이터는 반드시 `constants/projects.js`에서 중앙 관리한다. 컴포넌트 내 하드코딩 금지.
- **Performance First**: 애니메이션은 `transform`과 `opacity`만 사용한다 (layout thrashing 방지).
- **Responsive Always**: 모든 인터랙션은 모바일 fallback을 전제로 구현한다.

---

## 12. 기술적 정합성 및 성능 최적화 심화 (v1.1 보완)

기존 가이드의 논리적 허점을 보완하고, 실제 구현 시 발생할 수 있는 레이아웃 및 성능 이슈를 해결하기 위한 심화 지침이다.

### 12-1. 스타일 병합 유틸리티 도입 (`src/utils/cn.js`)

가이드 10-4의 `filter(Boolean).join(" ")` 방식은 Tailwind 클래스 충돌(예: 기본 `p-6`과 외부 주입 `p-4` 충돌)을 해결하지 못한다. 따라서 아래 유틸리티 사용을 원칙으로 한다.

```javascript
// src/utils/cn.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 조건부 클래스 병합 및 Tailwind 클래스 충돌 방지 유틸리티
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

- **적용**: 모든 UI 컴포넌트(`Button`, `Card`, `Nav`)의 className 처리에 `cn()` 함수를 적용한다.

### 12-2. 스크롤 애니메이션 정밀 제어 (Framer Motion)

`useTransform` 사용 시 섹션 범위를 벗어날 때 이미지가 계속 움직이거나 위치가 튀는 현상을 방지한다.

- **Clamp 옵션 필수**: `useTransform(scrollYProgress, [0, 1], ["0%", "-40%"], { clamp: true })`를 적용하여 애니메이션 범위를 엄격히 제한한다.
- **GPU 가속**: 이미지 컴포넌트에 `will-change: transform`을 명시하여 브라우저의 레이어 합성(Compositing)을 유도한다.

### 12-3. 이미지 로딩 전략 (LCP 및 성능 최적화)

단순한 lazy 로딩은 첫 화면(LCP) 성능을 저하시킬 수 있으므로 섹션 순서에 따라 전략을 차등 적용한다.

- **첫 번째 프로젝트 (무인양품)**:
  - `loading="eager"` 적용
  - `fetchpriority="high"` (지원 브라우저 기준) 설정으로 초기 렌더링 속도 확보
- **후속 프로젝트**:
  - `loading="lazy"` 적용으로 불필요한 네트워크 리소스 낭비 방지
- **포맷**: 반드시 **WebP** 또는 **AVIF**를 우선 사용한다.

### 12-4. 안전한 반응형 하이드레이션 (Hydration)

SSR 환경이나 브라우저 초기 렌더링 시 `window` 객체 참조 에러를 방지하기 위해 `useEffect` 기반의 상태 관리를 수행한다.

```javascript
// hooks/useIsMobile.js
import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile(); // 초기 실행
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};
```

---

## 13. 섹션 간 레이아웃 및 Z-Index 설계

연속된 Sticky 섹션 구현 시 레이아웃이 겹치거나 가려지는 문제를 방지하기 위한 규칙이다.

- **Z-Index 스택**: 각 `ProjectSection`은 위에서 아래로 순차적인 스택 구조를 가진다. 아래 섹션이 위 섹션 위로 자연스럽게 덮이며 올라오도록 z-index를 설계하거나, sticky 컨테이너의 독립적인 쌓임 맥락(Stacking Context)을 유지한다.
- **배경색 보간 (Color Interpolation)**: 단순히 색을 바꾸는 대신, framer-motion의 `useTransform(scrollYProgress, [0, 1], [colorA, colorB])`를 활용해 스크롤에 따라 배경색이 부드럽게 변하도록 구현하는 것을 권장한다.
- **모바일 Fallback**: 모바일(`lg` 미만)에서는 sticky를 `relative`로 변경하고, `imageHeight`를 `auto`로 조절하여 사용자가 끊김 없이 콘텐츠를 읽을 수 있도록 배치한다.

---

## 14. Gemini CLI 최종 구현 명령 (Final Prompt)

아래 프롬프트를 사용하여 최종 구현을 진행한다.

> "수정된 가이드라인(v1.1)에 따라 `ProjectSection.jsx`와 `Ui.jsx`를 작성해줘.
> 
> 1. 모든 컴포넌트의 클래스 병합은 `src/utils/cn.js` 유틸리티를 사용할 것.
> 2. `useTransform` 적용 시 반드시 `{ clamp: true }` 옵션을 포함하여 애니메이션 범위를 제한할 것.
> 3. 첫 번째 프로젝트인 '무인양품' 섹션 이미지에는 `loading="eager"`를, 나머지는 `lazy`를 적용할 것.
> 4. `useIsMobile` 훅을 사용하여 모바일 환경(1024px 미만)에서는 `translateY` 애니메이션과 `sticky` 속성이 완전히 비활성화되도록 조건부 스타일링을 적용할 것.
> 5. `framer-motion`의 `m` 컴포넌트와 `LazyMotion`을 사용하여 번들 사이즈를 최적화할 것."�� 사이즈를 최적화할 것."��스를 적절히 cleanup할 것."�� 사이즈를 최적화할 것."