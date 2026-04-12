import { useState, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import ProjectSection from './components/ProjectSection'
import Footer from './components/Footer'
import ArchiveSection from './components/ArchiveSection'
import ScrollToTop from './components/ScrollToTop'
import { PROJECTS } from './constants/projects'

const App = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const loaderRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        duration: 1.2,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        }
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Loading Overlay */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      >
        <svg className="animate-spin h-12 w-12 text-violet-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <Nav activeLink={activeLink} onLinkClick={setActiveLink} />

      <main className="pt-0">
        {/* Hero Section */}
        <Hero />

        {/* Marquee Section */}
        <Marquee />

        {/* About Me Section (Experience/Education) */}
        <About />

        {/* Projects Section */}
        <div id="projects">
          <SectionHeader 
            title="ProJects" 
            description="수많은 고민과 시도의 흔적들이 이 프로젝트 안에 고스란히 담겨 있습니다." 
          />
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
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
