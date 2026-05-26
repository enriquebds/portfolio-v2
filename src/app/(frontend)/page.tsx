export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '../../../payload.config'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { MemoryGame } from '@/components/sections/MemoryGame/MemoryGame'
import { Certifications } from '@/components/sections/Certifications'
import { Contact } from '@/components/sections/Contact'
import type { ExperienceItem, ProjectItem, CertificationItem, SkillItem } from '@/types'

async function getData() {
  try {
    const payload = await getPayload({ config })

    const [experienceRes, projectsRes, certsRes, skillsRes] = await Promise.all([
      payload.find({ collection: 'experience', sort: 'order', limit: 20 }),
      payload.find({ collection: 'projects', sort: 'order', limit: 20 }),
      payload.find({ collection: 'certifications', sort: 'order', limit: 20 }),
      payload.find({ collection: 'skills', sort: 'order', limit: 50 }),
    ])

    const experiences: ExperienceItem[] = experienceRes.docs.map((doc) => ({
      id: String(doc.id),
      company: doc.company || '',
      role: doc.role || '',
      startDate: doc.startDate || '',
      endDate: doc.endDate || null,
      location: doc.location || '',
      bullets: (doc.description || []).map((d) => d.bullet || '').filter(Boolean),
      stack: (doc.stack || []).map((s) => s.tech || '').filter(Boolean),
      current: doc.current || false,
      order: doc.order || 0,
    }))

    const projects: ProjectItem[] = projectsRes.docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title || '',
      slug: doc.slug || '',
      description: doc.description || '',
      stack: (doc.stack || []).map((s) => s.tech || '').filter(Boolean),
      githubUrl: doc.githubUrl || undefined,
      liveUrl: doc.liveUrl || undefined,
      status: doc.status || 'draft',
      featured: doc.featured || false,
      order: doc.order || 0,
    }))

    const certifications: CertificationItem[] = certsRes.docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title || '',
      issuer: doc.issuer || '',
      type: doc.type || 'certification',
      date: doc.date || '',
      credentialUrl: doc.credentialUrl || undefined,
      order: doc.order || 0,
    }))

    const skills: SkillItem[] = skillsRes.docs.map((doc) => ({
      id: String(doc.id),
      name: doc.name || '',
      category: doc.category || 'frontend',
      level: doc.level || 'intermediario',
      icon: doc.icon || '',
      order: doc.order || 0,
    }))

    return { experiences, projects, certifications, skills }
  } catch {
    return {
      experiences: [] as ExperienceItem[],
      projects: [] as ProjectItem[],
      certifications: [] as CertificationItem[],
      skills: [] as SkillItem[],
    }
  }
}

export default async function HomePage() {
  const { experiences, projects, certifications, skills } = await getData()

  return (
    <>
      <Hero />
      <About />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <MemoryGame />
      <Certifications certifications={certifications} />
      <Contact />
    </>
  )
}
