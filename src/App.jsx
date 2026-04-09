import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import ProjectSection from './components/ProjectSection'
import Footer from './components/Footer'
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

      <Footer />
    </div>
  );
};

export default App;
