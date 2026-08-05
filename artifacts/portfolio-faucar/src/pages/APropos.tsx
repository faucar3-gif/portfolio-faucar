import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { Download, GraduationCap, Briefcase, Award } from 'lucide-react';

const SKILLS = [
  { name: 'HTML/CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React / Next.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'SQL / NoSQL', level: 85 },
];

const EXPERIENCE = [
  {
    title: 'Consultant IT Indépendant',
    company: 'Monsieur Faucar',
    period: '2020 - Présent',
    desc: 'Accompagnement de startups et PME dans leur transformation digitale. Création d\'applications web sur-mesure et conseil en architecture.',
  },
  {
    title: 'Lead Développeur Full-Stack',
    company: 'TechVision Agency',
    period: '2018 - 2020',
    desc: 'Direction d\'une équipe de 4 développeurs. Refonte complète du système interne et migration vers une architecture micro-services.',
  },
  {
    title: 'Développeur Front-End',
    company: 'Digital Studio',
    period: '2016 - 2018',
    desc: 'Développement d\'interfaces interactives pour des clients grand compte. Intégration de maquettes pixel-perfect.',
  }
];

export default function APropos() {
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2 });

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            À <span className="text-primary">Propos</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Passionné par la technologie depuis mon plus jeune âge, je combine une solide 
            expertise technique avec une sensibilité prononcée pour le design. Mon objectif : 
            transformer vos idées complexes en interfaces élégantes et performantes.
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 rounded-full bg-card border border-border hover:bg-muted transition-colors flex items-center gap-2 font-medium">
              <Download size={18} />
              Télécharger mon CV
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24" ref={skillsRef}>
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
            <Award className="text-primary" />
            Compétences Techniques
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {SKILLS.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-primary" />
              Parcours
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-muted before:to-transparent">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative pl-12 md:pl-0 md:flex md:items-center">
                  <div className="md:w-1/2 md:text-right md:pr-12 md:pb-6">
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <div className="text-primary font-medium mb-1">{exp.company}</div>
                  </div>
                  <div className="absolute left-0 top-1 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background z-10" />
                  <div className="md:w-1/2 md:pl-12 pb-6">
                    <div className="text-sm text-muted-foreground mb-2 px-3 py-1 bg-muted inline-block rounded-full">
                      {exp.period}
                    </div>
                    <p className="text-muted-foreground text-sm">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary" />
              Formation
            </h2>
            <div className="space-y-8">
              <div className="p-6 rounded-xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="text-sm text-primary font-medium mb-2">2014 - 2016</div>
                <h3 className="font-bold text-lg mb-1">Master en Ingénierie Logicielle</h3>
                <p className="text-muted-foreground">Université Paris Descartes</p>
              </div>
              <div className="p-6 rounded-xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
                <div className="text-sm text-secondary font-medium mb-2">2011 - 2014</div>
                <h3 className="font-bold text-lg mb-1">Licence Informatique</h3>
                <p className="text-muted-foreground">Université d'Abomey-Calavi</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
