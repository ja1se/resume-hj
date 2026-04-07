import { useState } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import Nav from './components/ui/Nav'
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card'
import ResumeCard from './components/ui/ResumeCard'
import ProjectSection from './components/ui/ProjectSection'
import { PROJECTS } from './constants/projects'

const App = () => {
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Nav activeLink={activeLink} onLinkClick={setActiveLink} />

        <main className="pt-0">
          {/* Hero / Projects Section */}
          <div id="home" className="pt-0" />
          <div id="projects">
            {PROJECTS.map((project, index) => (
              <ProjectSection 
                key={project.id} 
                project={project} 
                reverse={index % 2 !== 0}
              />
            ))}
          </div>

          {/* Other Content */}
          <div className="max-w-[1280px] mx-auto px-6 py-32 space-y-40">
            {/* Resume Section */}
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

            {/* UI Components Showcase */}
            <section className="scroll-mt-32">
              <div className="flex flex-col gap-12">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">UI Components</h2>
                  <p className="text-lg text-slate-500 max-w-2xl">프로젝트에 사용된 공통 UI 컴포넌트들입니다.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card className="hover:border-violet-200 transition-colors">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">기본적인 카드 스타일입니다. 부드러운 그림자와 얇은 테두리가 조화를 이룹니다.</p>
                    </CardContent>
                  </Card>
                  <Card variant="outline" className="hover:bg-slate-50 transition-colors">
                    <CardHeader>
                      <CardTitle>Outline Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">테두리만 있는 깔끔한 스타일로, 배경색이 있는 곳에서 사용하기 좋습니다.</p>
                    </CardContent>
                  </Card>
                  <Card variant="glass" className="bg-violet-50/30 border-violet-100">
                    <CardHeader>
                      <CardTitle>Glass Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">은은한 보라빛 배경과 블러 효과가 적용된 세련된 스타일입니다.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer id="contact" className="bg-slate-900 py-24 px-6">
          <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Let's Work Together</h2>
            <p className="text-slate-400 text-center max-w-md">새로운 프로젝트와 기회에 대해 이야기 나누고 싶습니다. 언제든 연락 주세요.</p>
            <div className="flex gap-6">
              {/* Social icons could go here */}
            </div>
            <p className="text-slate-600 text-sm mt-8">© 2026 OSKA. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
};

export default App;
