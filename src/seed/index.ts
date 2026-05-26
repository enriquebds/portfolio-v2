import payload from 'payload'
import config from '../../payload.config'
import { Certification, Project, Skill } from '@/types/payload-types'

async function seed() {
  await payload.init({ config })
  console.log('🌱 Starting seed...')

  const existing = await payload.find({ collection: 'experience', limit: 1 })
  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'experience',
      data: {
        company: 'Group Link One™',
        role: 'Front-end Developer',
        startDate: '2023-03-01',
        endDate: null,
        location: 'Vila Olímpia, São Paulo — SP',
        current: true,
        order: 1,
        description: [
          { bullet: 'Desenvolvo e mantenho plataformas B2B SaaS para AIoT e cidades inteligentes (GL Utilities, Dataoris, Sonarprint)' },
          { bullet: 'Criei e mantenho biblioteca de autenticação compartilhada utilizada em 100% dos projetos da empresa' },
          { bullet: 'Criei e mantenho biblioteca de componentes reutilizáveis utilizada em 3 plataformas por 5 desenvolvedores' },
          { bullet: 'Desenvolvi 20+ custom hooks React aumentando produtividade e reusabilidade do time' },
          { bullet: 'Contribuí com módulos backend em NestJS e Express para integração com dispositivos IoT' },
          { bullet: 'Conduzo code reviews rigorosos promovendo boas práticas e arquitetura limpa no time' },
        ],
        stack: [
          { tech: 'React' }, { tech: 'TypeScript' }, { tech: 'JavaScript' },
          { tech: 'Redux' }, { tech: 'Zustand' }, { tech: 'Styled-components' },
          { tech: 'Vite' }, { tech: 'Vitest' }, { tech: 'Node.js' },
          { tech: 'NestJS' }, { tech: 'Express' }, { tech: 'PostgreSQL' },
          { tech: 'Docker' }, { tech: 'Git' }, { tech: 'Figma' },
        ],
      },
    })
    console.log('✅ Experience seeded')
  }

  const existingCerts = await payload.find({ collection: 'certifications', limit: 1 })
  if (existingCerts.totalDocs === 0) {
    const certs = [
      { title: 'React: Como os componentes funcionam', issuer: 'Alura', type: 'certification', date: '2023', order: 1 },
      { title: 'Git e Github: Estratégias de ramificação, conflitos e Pull Requests', issuer: 'Alura', type: 'certification', date: '2023', order: 2 },
      { title: 'Nest.js: Criando uma API Restful', issuer: 'Alura', type: 'certification', date: '2023', order: 3 },
      { title: 'Linux II: Programas, processos e pacotes', issuer: 'Alura', type: 'certification', date: '2023', order: 4 },
      { title: 'Git e Github: Controle e compartilhe seu código', issuer: 'Alura', type: 'certification', date: '2022', order: 5 },
      { title: 'Full Stack Development Certificate', issuer: 'Kenzie Academy Brasil', type: 'degree', date: 'jan/2023', order: 6 },
      { title: 'Front End Development Certificate', issuer: 'Kenzie Academy Brasil', type: 'degree', date: 'jan/2023', order: 7 },
      { title: 'Engenharia de Software', issuer: 'Estácio', type: 'degree', date: 'out/2025', order: 8 },
      { title: 'Desenvolvimento Web Full Stack (2.000h)', issuer: 'Kenzie Academy Brasil', type: 'degree', date: 'jan/2022 – jan/2023', order: 9 },
    ]
    for (const cert of certs) {
      await payload.create({ collection: 'certifications', data: cert as Certification })
    }
    console.log('✅ Certifications seeded')
  }

  const existingSkills = await payload.find({ collection: 'skills', limit: 1 })
  if (existingSkills.totalDocs === 0) {
    const skills = [
      { name: 'React', category: 'frontend', level: 'avancado', icon: 'SiReact', order: 1 },
      { name: 'TypeScript', category: 'frontend', level: 'avancado', icon: 'SiTypescript', order: 2 },
      { name: 'JavaScript ES6+', category: 'frontend', level: 'avancado', icon: 'SiJavascript', order: 3 },
      { name: 'Redux', category: 'frontend', level: 'avancado', icon: 'SiRedux', order: 4 },
      { name: 'Zustand', category: 'frontend', level: 'avancado', icon: 'SiZustand', order: 5 },
      { name: 'Styled-components', category: 'frontend', level: 'avancado', icon: 'SiStyledcomponents', order: 6 },
      { name: 'React Hooks', category: 'frontend', level: 'avancado', icon: 'SiReact', order: 7 },
      { name: 'Vite', category: 'frontend', level: 'avancado', icon: 'SiVite', order: 8 },
      { name: 'Vitest', category: 'frontend', level: 'intermediario', icon: 'SiVitest', order: 9 },
      { name: 'Responsive Web Design', category: 'frontend', level: 'avancado', icon: 'SiCss3', order: 10 },
      { name: 'Acessibilidade Web', category: 'frontend', level: 'intermediario', icon: 'SiCss3', order: 11 },
      { name: 'Node.js', category: 'backend', level: 'avancado', icon: 'SiNodedotjs', order: 1 },
      { name: 'NestJS', category: 'backend', level: 'intermediario', icon: 'SiNestjs', order: 2 },
      { name: 'Express', category: 'backend', level: 'intermediario', icon: 'SiExpress', order: 3 },
      { name: 'PostgreSQL', category: 'backend', level: 'intermediario', icon: 'SiPostgresql', order: 4 },
      { name: 'REST API', category: 'backend', level: 'avancado', icon: 'SiReact', order: 5 },
      { name: 'GraphQL', category: 'backend', level: 'intermediario', icon: 'SiGraphql', order: 6 },
      { name: 'Docker', category: 'devops', level: 'intermediario', icon: 'SiDocker', order: 1 },
      { name: 'CI/CD', category: 'devops', level: 'basico', icon: 'SiGit', order: 2 },
      { name: 'Git', category: 'devops', level: 'avancado', icon: 'SiGit', order: 3 },
      { name: 'Code Review', category: 'softskills', level: 'avancado', icon: 'SiGithub', order: 1 },
      { name: 'Scrum/Agile', category: 'softskills', level: 'avancado', icon: 'SiJira', order: 2 },
      { name: 'Figma', category: 'softskills', level: 'intermediario', icon: 'SiFigma', order: 3 },
    ]
    for (const skill of skills) {
      await payload.create({ collection: 'skills', data: skill as Skill })
    }
    console.log('✅ Skills seeded')
  }

  const existingProjects = await payload.find({ collection: 'projects', limit: 1 })
  if (existingProjects.totalDocs === 0) {
    const projects = [
      { title: 'GL Utilities', slug: 'gl-utilities', description: 'Plataforma B2B SaaS para gestão de utilities e monitoramento de consumo energético em cidades inteligentes.', status: 'coming-soon', featured: true, order: 1, stack: [{ tech: 'React' }, { tech: 'TypeScript' }, { tech: 'NestJS' }, { tech: 'PostgreSQL' }] },
      { title: 'Dataoris', slug: 'dataoris', description: 'Dashboard de monitoramento em tempo real para dispositivos AIoT com mapas interativos e analytics avançados.', status: 'coming-soon', featured: true, order: 2, stack: [{ tech: 'React' }, { tech: 'TypeScript' }, { tech: 'Redux' }, { tech: 'WebSocket' }] },
      { title: 'Portfólio v2', slug: 'portfolio-v2', description: 'Portfólio pessoal construído com Next.js 15, Payload CMS 3 e PostgreSQL. Design "Terminal meets Editorial".', status: 'coming-soon', featured: false, order: 3, githubUrl: 'https://github.com/enriquebds/portfolio-v2', stack: [{ tech: 'Next.js' }, { tech: 'Payload CMS' }, { tech: 'PostgreSQL' }, { tech: 'Framer Motion' }] },
    ]
    for (const project of projects) {
      await payload.create({ collection: 'projects', data: project as Project })
    }
    console.log('✅ Projects seeded')
  }

  console.log('🎉 Seed complete!')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
