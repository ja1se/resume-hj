import { useState, useLayoutEffect, useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import ProjectSection from './components/ProjectSection'
import Footer from './components/Footer'
import ArchiveSection from './components/ArchiveSection'
import { PROJECTS } from './constants/projects'

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const projectsRef = useRef(null);
  const projectsHeaderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Immediate Projects Header Animation
      gsap.fromTo("#projects .header-title, #projects .header-desc", 
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );

      // 2. Projects Header Pinning (Separate ScrollTrigger)
      ScrollTrigger.create({
        trigger: projectsHeaderRef.current,
        start: "top top",
        end: "+=400",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        refreshPriority: 1,
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Nav activeLink={activeLink} onLinkClick={setActiveLink} />

      <main className="pt-0">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section (Experience/Education) */}
        <About />

        {/* Projects Section */}
        <div id="projects" ref={projectsRef}>
          <div ref={projectsHeaderRef} className="w-full bg-white z-10">
            <SectionHeader 
              title="ProJects" 
              description="수많은 고민과 시도의 흔적들이 이 프로젝트 안에 고스란히 담겨 있습니다." 
            />
          </div>
          {PROJECTS.map((project, index) => (
            <ProjectSection 
              key={project.id} 
              project={project} 
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Archive Section */}
        <ArchiveSection id="archive" />
      </main>

      <Footer />
    </div>
  );
};

export default App;
