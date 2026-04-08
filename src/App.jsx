import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import ProjectHeader from './components/ProjectHeader'
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
          <ProjectHeader />
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

      <footer id="contact" className="bg-slate-900 py-24 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Let's Work Together</h2>
            <p className="text-slate-400 text-lg max-w-md">새로운 프로젝트와 기회에 대해 이야기 나누고 싶습니다. 언제든 연락 주세요.</p>
            <div className="flex gap-6">
              {/* Social icons could go here */}
            </div>
          </div>
          <Contact />
        </div>
        <div className="max-w-[1280px] mx-auto mt-24 pt-8 border-t border-slate-800 text-center lg:text-left">
          <p className="text-slate-600 text-sm">© 2026 OSKA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
