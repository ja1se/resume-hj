# 🎨 Design System Guide (v1.1)

이 문서는 포트폴리오의 일관된 브랜드 정체성을 유지하기 위한 디자인 시스템을 정의합니다.

---

## 1. Typography System (Fonts)

디자인 스타일에 따라 두 가지 폰트 시스템을 사용합니다.

| 스타일 구분 | 적용 폰트 | Tailwind Class | 비고 |
| :--- | :--- | :--- | :--- |
| **Display** | Unbounded | `font-display` | 메인 슬로건, 히어로 섹션 (`resume-typo/display`) |
| **Standard** | A2Z Font | `font-sans` | 본문, 인터페이스, 일반 텍스트 (`resume-typo/body`) |

---

## 2. Color System & Tailwind Mapping

창의적인 바이올렛(Oska)과 신뢰감 있는 슬레이트(Neutral) 계열을 조합합니다.

### 🟣 Primary Palette (Oska)
메인 브랜드 컬러로 창의성과 개성을 강조합니다.
- **Primary (Main):** `#8B5CF6` (`violet-500`) - 브랜드 핵심 컬러
- **Primary Light:** `#EDE9FE` (`violet-100`) - 태그 배경, 보조 강조
- **Primary Dark:** `#6D28D9` (`violet-700`) - 버튼 Hover, 텍스트 포인트
- **Gradation:** 디자인 가이드의 `Color/Gradation` 적용 (바이올렛-인디고 계열)

### ⚪ Neutral & Semantic
가독성과 구조적 안정성을 담당하는 무채색 계열입니다.
- **Base Text:** `#111827` (`slate-900`) - 주요 헤드라인 및 본문 텍스트
- **Muted Text:** `#6B7280` (`slate-500`) - 부연 설명, 캡션
- **Surface:** `#F3F4F6` (`slate-100`) - 섹션 구분선, 카드 테두리, 배경

---

## 3. UI Typography Hierarchy

모든 섹션 헤더는 `SectionHeader` 공통 컴포넌트를 사용하여 일관성을 유지합니다.

*   **H1 (Display):** `text-4xl` (36px) / `font-bold` / `font-display` / `text-[#333]`
    *   *Usage:* 히어로 섹션 메인 타이틀
*   **H2 (Section Title):** `text-[64px]` / `font-semibold` / `font-display` / `text-[#a78bfa]`
    *   *Usage:* 각 섹션의 헤더 제목 (About, Projects, Archive)
*   **H3/H4 (Sub-headline):** `text-xl` (20px) / `font-medium` / `font-sans` / `text-[#333]`
    *   *Usage:* 카드 제목, 이름 (조희진 | HEEJIN CHO 등)
*   **Body (Main):** `text-base` (16px) / `font-light` / `font-sans` / `text-[#4b5563]`
    *   *Usage:* 일반 본문 텍스트
*   **Caption/Description:** `text-[14px]` / `font-light` / `font-sans` / `text-[#a78bfa]`
    *   *Usage:* 섹션 헤더 설명 문구, 부연 설명

---

## 4. Component Standards

*   **SectionHeader**: 모든 섹션의 시작점에 위치하며, 좌측 정렬(`items-start`)을 기본으로 합니다.
*   **Button**: `outline` 스타일을 기본으로 하며, `rounded-full`과 영문 텍스트(GitHub, Resume)를 사용합니다.
*   **Footer**: 기존 Contact 섹션을 통합하여 하단에 고정 배치합니다.
