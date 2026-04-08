import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Card, CardHeader, CardTitle, CardContent } from './components/Card'
import ResumeCard from './components/ResumeCard'
import ProjectSection from './components/ProjectSection'
import Contact from './components/Contact'
import ArchiveCard from './components/ArchiveCard'
import { PROJECTS } from './constants/projects'

// Archive images (using existing assets)
import ele1 from './assets/images/ele1.png'
import ele2 from './assets/images/ele2.png'
import ele4 from './assets/images/ele4.png'

const ARCHIVE_PROJECTS = [
  {
    id: 1,
    title: "Deloitte Project",
    description: "Precision and details focused web development project.",
    image: ele1,
    href: "#"
  },
  {
    id: 2,
    title: "Branding Identity",
    description: "Creative branding and visual identity for a startup.",
    image: ele2,
    href: "#"
  },
  {
    id: 3,
    title: "UI Design System",
    description: "Scalable design system for multi-platform applications.",
    image: ele4,
    href: "#"
  }
];

const App = () => {
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Nav activeLink={activeLink} onLinkClick={setActiveLink} />

      <main className="pt-0">
        {/* Hero Section */}
        <Hero />

        <div className="max-w-[1280px] mx-auto px-6 py-32 space-y-40">
          {/* Experience Section (Introduction) */}
          <section id="about" className="scroll-mt-32">
            <div className="flex flex-col gap-12">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">Experience</h2>
                <p className="text-lg text-slate-500 max-w-2xl">교육 과정 및 실무 경험을 통해 쌓아온 역량입니다.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResumeCard 
                  date="2025.10 - 2026 Present"
                  title={"챗GPT 생성형 AI를 활용한 반응형 웹콘텐츠\n(영상제작&코딩) 개발기획자 양성과정"}
                  items={[
                    "MBC아카데미컴퓨터학원",
                    "UI/UX 디자인 및 프론트엔드 개발 프로젝트 수행"
                  ]}
                />
                <ResumeCard 
                  date="2024.03 - 2025.02"
                  title="프리랜서 디자이너"
                  items={[
                    "다수의 브랜드 아이덴티티 및 웹사이트 디자인",
                    "고객사 커뮤니케이션 및 프로젝트 관리"
                  ]}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Projects Section */}
        <div id="projects">
          {PROJECTS.map((project, index) => (
            <ProjectSection 
              key={project.id} 
              project={project} 
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-32 space-y-40">
          {/* Archive Section */}
          <section id="archive" className="scroll-mt-32">
            <div className="flex flex-col gap-12">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">Archive</h2>
                <p className="text-lg text-slate-500 max-w-2xl">다양한 실험적 프로젝트와 소규모 작업물들을 모아둔 공간입니다.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ARCHIVE_PROJECTS.map((item) => (
                  <ArchiveCard 
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    href={item.href}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
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
