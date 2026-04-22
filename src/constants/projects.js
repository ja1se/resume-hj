import imgNyans from "../assets/images/nyansvene-scroll.png";
import imgSoul from "../assets/images/soulblend-scroll.png";
import imgMuji from "../assets/images/muji-scroll.png";
import imgWaku from "../assets/images/wakuwaku-scroll.png";
import detailWaku from "../assets/images/wakuwaku-detail.png";

export const PROJECTS = [
  {
    id: "nyansvene",
    number: "1",
    subtitle: "[ TV 광고 리디자인 ]",
    title: "냥스베네",
    techStack: "클링AI, 프리미어프로, 에펙",
    media: "desktop",
    duration: "1주",
    contribution: "100%",
    troubleShooting: "광고의 메인 캐릭터인 거대한 고양이의 일관성 유지에 어려움이 있었으나 공통적인 키워드 도출을 위한 메인 키워드를 잡아 프롬포트를 최종 작성하였습니다.",
    image: imgNyans,
    imageHeight: "210%",
    translateYOutput: ["0%", "-42%"]
  },
  {
    id: "soulblend",
    number: "2",
    subtitle: "[ 사주앱 UX 리디자인 ]",
    title: "소울블렌드",
    techStack: "피그마, 일러스트레이터",
    media: "mobile",
    duration: "3주",
    contribution: "33%",
    troubleShooting: "프로젝트 초기에는 명확한 가이드 부재로 인해 반복적인 수정이 발생했으나, 이를 해결하고자 디자인 시스템 구축 및 자동화 프로세스를 도입했습니다. Figma Styler와 토큰화 작업을 통해 디자인 시스템을 체계화하여 작업 효율을 획기적으로 개선했으며, 팀 내 UI/UX 디자인과 시스템 설계를 총괄하였습니다.",
    image: imgSoul,
    figmaEmbed: "https://embed.figma.com/proto/RdadqtBfr4xT4o9ZmdVwOK/%EC%86%8C%EC%9A%B8%EB%B8%94%EB%A0%8C%EB%93%9C-%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8?node-id=453-721&p=f&viewport=273%2C818%2C0.11&scaling=scale-down&content-scaling=fixed&starting-point-node-id=522%3A3226&page-id=223%3A2021&embed-host=share",
    imageHeight: "100%",
    translateYOutput: ["0%", "-45%"]
  },
  {
    id: "muji",
    number: "3",
    subtitle: "[ 홈페이지 리디자인 ]",
    title: "무인양품",
    techStack: "HTML, CSS, JS",
    media: "desktop",
    duration: "1주",
    contribution: "100%",
    troubleShooting: "HTML과 CSS, JavaScript를 학습한 후 진행한 첫 프로젝트입니다. 초기 구현 단계에서 .nav(GNB) 영역의 반응형 레이아웃이 무너지는 현상이 발생했으나, position 속성의 계층 구조를 재정비하고 미디어 쿼리 분기점을 세분화하여 다양한 해상도에서도 안정적인 UI를 유지하도록 개선했습니다.",
    image: imgMuji,
    imageHeight: "200%",
    translateYOutput: ["0%", "-40%"]
  },
  {
    id: "wakuwaku",
    number: "4",
    subtitle: "[ 풀사이클 생성형 AI OTT 미디어 서비스 제작 ]",
    title: "와쿠와쿠",
    techStack: "피그마, 스티치, 리액트, 파이썬, 클링AI",
    media: "desktop, mobile",
    duration: "1주",
    contribution: "100%",
    troubleShooting: "Stitch를 활용해 유연한 설계의 바이브 코딩 구조 위에, 하드코딩의 정밀함을 더해 완성한 프로젝트입니다.\ncontainer, box 등 디자인 레이어 명칭 불일치 문제가 있어 div 같은 HTML/CSS 표준 용어로 명칭을 통일하기 위해 플러그인 자동화 툴 활용 및 세밀한 마크다운 작성을 통해 해결하였으며,\n허깅페이스 연동 오류로 500 에러 및 타임아웃 발생한 문제에 대해서는 가볍고 빠른 최신 멀티태스크 모델(ko-sroberta)로 교체하여 끊김 없는 사용 환경을 구축하였습니다.",
    image: imgWaku,
    detailImage: detailWaku,
    imageHeight: "200%",
    translateYOutput: ["0%", "-40%"]
  },
];
