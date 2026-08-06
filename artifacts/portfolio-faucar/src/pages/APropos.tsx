import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

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
    title: { fr: 'Développeur Web Freelance', en: 'Freelance Web Developer', es: 'Desarrollador Web Freelance' },
    company: 'Faucar AMETEPE — Indépendant',
    period: '2023 - Présent',
    desc: {
      fr: 'Conception et développement de sites vitrines, applications web et solutions numériques pour des entreprises et des particuliers. Gestion de projets de A à Z, du cahier des charges à la mise en ligne.',
      en: 'Design and development of showcase websites, web applications and digital solutions for businesses and individuals. Full project management from specifications to deployment.',
      es: 'Diseño y desarrollo de sitios web, aplicaciones y soluciones digitales para empresas y particulares. Gestión completa de proyectos desde las especificaciones hasta la puesta en línea.',
    },
  },
  {
    title: { fr: 'Étudiant en Informatique', en: 'Computer Science Student', es: 'Estudiante de Informática' },
    company: 'LES COURS SONOU — Bénin',
    period: '2024 - 2027',
    desc: {
      fr: "Formation en Licence Informatique avec une spécialisation en développement web et logiciel. Participation à des projets académiques, hackathons et initiatives open source.",
      en: 'Bachelor in Computer Science with a specialization in web and software development. Participation in academic projects, hackathons and open source initiatives.',
      es: 'Licenciatura en Informática con especialización en desarrollo web y software. Participación en proyectos académicos, hackathons e iniciativas de código abierto.',
    },
  },
  {
    title: { fr: 'Créateur de Solutions Numériques', en: 'Digital Solutions Creator', es: 'Creador de Soluciones Digitales' },
    company: { fr: 'Projets personnels & académiques', en: 'Personal & academic projects', es: 'Proyectos personales y académicos' },
    period: '2025 - Présent',
    desc: {
      fr: "Développement d'applications web et mobiles, construction d'une expertise progressive en technologies modernes (React, Node.js, bases de données).",
      en: 'Development of web and mobile applications, building progressive expertise in modern technologies (React, Node.js, databases).',
      es: 'Desarrollo de aplicaciones web y móviles, construcción de experiencia progresiva en tecnologías modernas (React, Node.js, bases de datos).',
    },
  },
];

export default function APropos() {
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2 });
  const { t, lang } = useLang();
  const at = t.about;

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-primary">{at.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {at.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-24" ref={skillsRef}>
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
            <Award className="text-primary" />
            {at.skillsTitle}
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
              {at.experienceTitle}
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-muted before:to-transparent">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative pl-12 md:pl-0 md:flex md:items-center">
                  <div className="md:w-1/2 md:text-right md:pr-12 md:pb-6">
                    <h3 className="font-bold text-lg">{exp.title[lang] ?? exp.title.fr}</h3>
                    <div className="text-primary font-medium mb-1">
                      {typeof exp.company === 'string' ? exp.company : (exp.company[lang] ?? exp.company.fr)}
                    </div>
                  </div>
                  <div className="absolute left-0 top-1 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background z-10" />
                  <div className="md:w-1/2 md:pl-12 pb-6">
                    <div className="text-sm text-muted-foreground mb-2 px-3 py-1 bg-muted inline-block rounded-full">
                      {exp.period}
                    </div>
                    <p className="text-muted-foreground text-sm">{exp.desc[lang] ?? exp.desc.fr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary" />
              {at.educationTitle}
            </h2>
            <div className="space-y-8">
              <div className="p-6 rounded-xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
                <div className="text-sm text-secondary font-medium mb-2">{at.education.licence.period}</div>
                <h3 className="font-bold text-lg mb-1">{at.education.licence.title}</h3>
                <p className="text-muted-foreground">{at.education.licence.school}</p>
                <span className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-medium">
                  {at.education.licence.badge}
                </span>
              </div>
              <div className="p-6 rounded-xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="text-sm text-primary font-medium mb-2">{at.education.bac.period}</div>
                <h3 className="font-bold text-lg mb-1">{at.education.bac.title}</h3>
                <p className="text-muted-foreground">{at.education.bac.school}</p>
                <span className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                  {at.education.bac.badge}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
