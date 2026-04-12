import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Logo = ({ className }) => {
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current.querySelectorAll("path, circle");
      
      // 1. 초기 상태 설정 (선이 보이지 않도록)
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fillOpacity: 0, // 처음엔 내부 색상 투명하게
        });
      });

      // 2. 드로잉 애니메이션 (선이 그려짐)
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2,
        onComplete: () => {
          // 3. 드로잉 완료 후 내부 색상 채우기
          gsap.to(paths, {
            fillOpacity: 1,
            duration: 1,
            ease: "power1.out",
          });
        }
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg 
      ref={svgRef}
      width="316" 
      height="159" 
      viewBox="0 0 316 159" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M86.5117 0C116.216 0.000172973 142.424 13.6728 158.001 34.501C173.578 13.673 199.785 0.00110263 229.489 0.000976562C250.498 0.000976562 269.757 6.84043 284.744 18.2129C292.519 17.2329 303.707 13.4826 311.675 3.41211C309.335 11.1192 304.743 22.3673 299.065 32.0459C309.706 45.1724 316 61.4153 316 79.001C316 122.631 277.268 158.001 229.489 158.001C199.784 158.001 173.577 144.328 158 123.499C142.423 144.327 116.216 158 86.5117 158C38.7332 158 0.000201416 122.63 0 79C0 61.4119 6.29481 45.1665 16.9385 32.0391C11.2624 22.3621 6.67353 11.1174 4.33398 3.41211C12.2988 13.4789 23.4817 17.2303 31.2559 18.2119C46.2429 6.83928 65.5027 0 86.5117 0ZM86.5117 9.875C43.6611 9.875 10.3992 41.1537 9.88184 78.125L9.875 79C9.8752 116.351 43.3237 148.125 86.5117 148.125C113.195 148.125 136.433 135.847 150.092 117.585L158 107.011L165.907 117.585C179.566 135.848 202.805 148.126 229.489 148.126C272.339 148.126 305.6 116.847 306.118 79.876L306.125 79.001C306.125 41.6494 272.677 9.87598 229.489 9.87598C202.805 9.8761 179.567 22.153 165.908 40.415L158.001 50.9893L150.093 40.415C136.648 22.4379 113.919 10.261 87.7598 9.88477L86.5117 9.875Z" 
        fill="url(#paint0_linear_2168_1526)"
        stroke="url(#paint0_linear_2168_1526)"
        strokeWidth="1"
      />
      <path 
        d="M157.177 145.227L136.026 92.5156H176.989L157.177 145.227Z" 
        fill="#FCD963" 
        stroke="url(#paint1_linear_2168_1526)" 
        strokeWidth="9.875"
      />
      <circle 
        cx="79.2751" cy="79" r="34.1479" 
        transform="rotate(11.0658 79.2751 79)" 
        fill="#FCD963" 
        stroke="url(#paint2_linear_2168_1526)" 
        strokeWidth="9.875"
      />
      <circle 
        cx="237.054" cy="79.1035" r="34.2361" 
        transform="rotate(11.0658 237.054 79.1035)" 
        fill="#FCD963" 
        stroke="url(#paint3_linear_2168_1526)" 
        strokeWidth="9.875"
      />
      <defs>
        <linearGradient id="paint0_linear_2168_1526" x1="-2.35438e-06" y1="79.0005" x2="316" y2="79.0005" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2168_1526" x1="136.026" y1="118.871" x2="176.989" y2="118.871" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
        <linearGradient id="paint2_linear_2168_1526" x1="40.1897" y1="79" x2="118.361" y2="79" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
        <linearGradient id="paint3_linear_2168_1526" x1="197.88" y1="79.1035" x2="276.228" y2="79.1035" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
