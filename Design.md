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

PDF에 명시된 상세 위계를 준수하여 구현합니다.

*   **H1 (Display):** `36px` / `Bold` / `Unbounded` / `slate-900`
    *   *Usage:* 히어로 섹션 타이틀
*   **H2 (Section Title):** `28px` / `SemiBold` / `A2Z Font` / `slate-900`
    *   *Usage:* 주요 섹션 제목 (`resume-typo/h2`)
*   **H3/H4 (Sub-headline):** `20px` / `Bold` / `A2Z Font` / `slate-900`
    *   *Usage:* 카드 제목, 소제목 (`resume-typo/h3-h4`)
*   **Body (Main):** `16px` / `Normal` / `A2Z Font` / `slate-700`
    *   *Usage:* 일반 본문 텍스트 (`resume-typo/body`)
*   **Caption:** `12px` / `Medium` / `A2Z Font` / `slate-500`
    *   *Usage:* 데이터 정보, 작은 설명 (`resume-typo/caption`)

---

## 4. Implementation Note

위 설정은 `tailwind.config.js`의 `theme.extend` 섹션에 추가하여 디자인 시스템을 동기화합니다.
