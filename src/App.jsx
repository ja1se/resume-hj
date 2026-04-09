import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import ProjectSection from './components/ProjectSection'
import Contact from './components/Contact'
import ArchiveSection from './components/ArchiveSection'
import { PROJECTS } from './constants/projects'

const App = () => {
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Nav activeLink={activeLink} onLinkClick={setActiveLink} />

      <main className="pt-0">
        {/* Hero Section */}
        <Hero />

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

        {/* Archive Section (GSAP Horizontal Scroll) */}
        <ArchiveSection id="archive" />
      </main>

      <footer id="contact" className="relative pt-28 pb-10 px-6 lg:px-[256px] bg-gradient-to-b from-[rgba(196,181,253,0)] via-[#a078f5] via-[67.7%] to-[#7c3aed] to-[97.7%]">
...

          <div className="space-y-4">
            <h2 className="text-[48px] font-medium text-white/65 font-display leading-[1.11]">Let's Work Together</h2>
            <div className="text-white/65 text-base font-light leading-relaxed font-sans">
              <p>사소한 디테일이 모여 큰 감동을 만든다고 믿습니다.</p>
              <p>컨택은 다음 채널을 통해 노크해 주세요. :D</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Contact />
          </div>
        </div>
        <div className="max-w-[1393px] mx-auto mt-20 pt-7 border-t border-white/10 text-center">
          <p className="text-white/45 text-xs font-light font-sans">© 2026 Heejin Cho portfolio All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
