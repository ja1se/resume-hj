# 프로젝트 가이드: Hero 섹션 Three.js 워터 리플 효과 이식 (v1.2)

본 문서는 CodePen의 Three.js 셰이더 효과를 '감성 미니멀리즘' 포트폴리오의 Hero 섹션 배경으로 정밀하게 이식하기 위한 전략입니다.

---

## 1. 구현 전략 및 기술 요구사항

### A. 필수 패키지 설치
```bash
npm install three
```

### B. 핵심 이식 포인트 (Gemini 최적화)
1.  **Canvas & Container**: `Hero.jsx` 내부에 `canvasRef`를 연결한 `<canvas>`를 배치하고, 부모 컨테이너의 크기를 자동으로 추적합니다.
2.  **Lifecycle Management**: 
    -   `useLayoutEffect`를 사용하여 브라우저 페인트 전 초기화를 완료합니다.
    -   `renderer.setPixelRatio(window.devicePixelRatio)`를 적용하여 고해상도 디스플레이(Retina)에서 선명도를 확보합니다.
3.  **Shader Implementation**: 
    -   Vertex/Fragment Shader를 별도 상수로 분리하여 가독성을 높입니다.
    -   `u_time`, `u_resolution`, `u_mouse` 유니폼 변수를 표준 명명 규칙에 따라 정의합니다.
4.  **Resource Cleanup (Critical)**: 
    -   반환 함수에서 `geometry.dispose()`, `material.dispose()`, `renderer.dispose()`를 명시하여 GPU 메모리 누수를 원천 차단합니다.

---

## 2. Gemini CLI 실행 명령어 (프롬프트 최적화)

아래 명령어를 복사하여 실행하면 최적의 구현 결과를 얻을 수 있습니다.

> "지정된 CodePen(https://codepen.io/sabosugi/pen/GgjMxYz)의 Three.js 워터 리플 셰이더를 Hero.jsx 배경으로 이식해줘.
> 
> 1. **구조**: `absolute inset-0 z-0` 캔버스를 배치하고 기존 텍스트 콘텐츠(`z-10`)를 그 위에 띄울 것.
> 2. **셰이더**: 
>    - CodePen의 GLSL 로직을 `ShaderMaterial`로 이식.
>    - 마우스 좌표(`u_mouse`)에 따라 리플이 상호작용하도록 추가 구현할 것.
>    - `u_time`을 활용해 정적인 상태에서도 미세한 물결(Ambient wave)이 유지되도록 파라미터 조정.
> 3. **최적화**: 
>    - `ResizeObserver` 또는 `window.resize` 이벤트를 통해 캔버스 크기와 `u_resolution`을 동기화할 것.
>    - `antialias: true` 옵션을 켜고, 픽셀 비율을 장치에 맞게 설정할 것.
> 4. **클린업**: 컴포넌트 언마운트 시 모든 Three.js 리소스를 완벽히 dispose 처리할 것."

---

## 3. 디자인 및 성능 가이드 (v1.1 준수)

-   **미니멀리즘 유지**: 리플의 강도(`strength`)와 속도(`speed`)를 낮게 설정하여 배경이 콘텐츠(텍스트)를 압도하지 않도록 합니다.
-   **배경 대비**: 셰이더의 기본 색상을 `Design.md`에 정의된 `Surface (#F3F4F6)` 또는 흰색 배경과 조화로운 바이올렛 톤으로 미세하게 조정합니다.
-   **성능**: 불필요한 `console.log`를 제거하고, `requestAnimationFrame`의 콜백 내에서 무거운 연산을 피합니다.

---

**💡 Gemini CLI 팁:** 이 파일의 내용을 바탕으로 구현을 시작할 준비가 되었다면, **"heroback.md 가이드에 따라 Three.js를 설치하고 Hero.jsx에 워터 리플 효과를 구현해줘"**라고 요청하세요.
