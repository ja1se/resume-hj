# 🎨 Design System Guide

이 문서는 포트폴리오의 일관된 브랜드 정체성을 유지하기 위한 디자인 시스템을 정의합니다.

---

## 1. Typography System (Fonts)

포트폴리오의 성격에 맞춰 '직관적이고 정갈한' 인상을 주기 위해 두 가지 메인 폰트를 사용합니다.

- **Display Font: Unbounded**
  - **용도**: 섹션 대제목(H1, H2), 장식용 텍스트, 브랜드 키워드.
  - **특징**: SemiBold(600)를 기본으로 사용하며, 현대적이고 기하학적인 인상을 줍니다.
- **Sans Font: A2Z**
  - **용도**: 본문 텍스트, 설명 문구, 리스트 아이템.
  - **특징**: Light(300)와 Regular(400)를 교차 사용하여 가독성과 우아한 분위기를 동시에 확보합니다.

---

## 2. Color System & Tailwind Mapping

감성적인 바이올렛 톤을 메인으로, 안정적인 슬레이트 계열을 보조로 사용합니다.

### Primary Palette (Oska - Violet)
- **`violet-500` (`oska.DEFAULT`)**: 메인 포인트 컬러, 주요 버튼 배경.
- **`violet-100` (`oska.light`)**: 배경 강조용 틴트, 부드러운 그라데이션.
- **`violet-700` (`oska.dark`)**: 깊이감 있는 텍스트 강조, 호버 상태.
- **`violet-400` (`accent`)**: 섹션 헤더 타이틀, 활성화된 페이지네이션 도트.

### Neutral Palette (Neutral - Slate)
- **`slate-900` (`neutral.base`)**: 기본 텍스트, 높은 가독성 확보.
- **`slate-500` (`neutral.muted`)**: 부연 설명, 메타 데이터.
- **`slate-100` (`neutral.surface`)**: 보조 배경색, 카드 테두리 구분.

---

## 3. UI Typography Hierarchy

Tailwind 설정을 기반으로 한 일관된 폰트 계층 구조입니다.

- **Level 1 (Hero/Section Title)**: `text-h1` / `text-4xl` ~ `text-6xl` / Unbounded
- **Level 2 (Sub-section/Module Title)**: `text-h2` / `text-2xl` ~ `text-3xl` / Unbounded or A2Z
- **Level 3 (Card/Info Title)**: `text-h3` / `text-xl` / A2Z Medium
- **Body (Standard Content)**: `text-body` / `text-base` / A2Z Light
- **Caption (Label/Metadata)**: `text-caption` / `text-xs` / A2Z Regular / `tracking-widest`

---

## 4. Component Standards

모든 UI 컴포넌트는 다음의 시각적 원칙을 따릅니다.

- **Corner Radius**: 
  - 카드 및 이미지 프레임: `rounded-[15px]` ~ `rounded-[24px]`
  - 버튼 및 태그: `rounded-full`
- **Shadow & Depth**:
  - 기본 상태에서는 얇은 테두리(`border border-slate-200`)로 평면성을 유지.
  - 호버 시 `shadow-lg` 또는 `shadow-xl`과 함께 `hover:-translate-y-1` 애니메이션을 적용하여 입체감 부여.
- **Micro-Interactions**:
  - `GSAP back.out(1.7)` 효과를 표준으로 사용하여, 모든 요소가 정지된 상태에서 살아있는 듯한 리드미컬한 반응을 보이도록 설정.
  - Swiper 등 슬라이드 요소는 `overflow: visible`을 유지하여 호버 효과가 잘리지 않도록 설계.


