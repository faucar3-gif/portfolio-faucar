import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Terminal, MonitorSmartphone } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const roles = ['Développeur Web', 'Consultant IT', 'Créateur de Solutions'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.substring(0, typedText.length - 1)
        : currentRole.substring(0, typedText.length + 1);

      timeout = setTimeout(() => setTypedText(nextText), isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const projectsCount = useCountUp(50, 2000, statsInView);
  const clientsCount = useCountUp(30, 2000, statsInView);
  const yearsCount = useCountUp(5, 1500, statsInView);
  const satisfactionCount = useCountUp(100, 2000, statsInView);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Disponible pour de nouvelles missions
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            Bonjour, je suis <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Monsieur Faucar
            </span>
          </h1>
          
          <div className="h-12 md:h-16 mb-8 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl text-muted-foreground font-display">
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Je conçois des expériences digitales sur mesure. 
            Alliant design minimaliste et performances techniques pour donner vie à vos projets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-effect flex items-center justify-center gap-2"
            >
              Discuter d'un projet
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="/portfolio" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-card border border-border text-card-foreground font-medium hover:bg-muted transition-all flex items-center justify-center gap-2"
            >
              Voir mon travail
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 border-y border-border bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border">
            {[
              { label: 'Projets livrés', value: projectsCount, suffix: '+' },
              { label: 'Clients satisfaits', value: clientsCount, suffix: '+' },
              { label: 'Années d\'expérience', value: yearsCount, suffix: '+' },
              { label: 'Satisfaction', value: satisfactionCount, suffix: '%' }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Intro / Expertise */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Expertise technique & <br />
                <span className="text-primary">Vision créative</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Mon approche se situe à l'intersection du code pur et du design émotionnel. Je ne crée pas de simples sites web, je construis des écosystèmes digitaux qui convertissent.
              </p>
              <Link href="/a-propos" className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                En savoir plus sur mon parcours <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid gap-6">
              {[
                { icon: Terminal, title: 'Développement Front-End', desc: 'Interfaces réactives, accessibles et animées avec précision.' },
                { icon: Code, title: 'Architecture Back-End', desc: 'API robustes, bases de données optimisées et sécurité sans faille.' },
                { icon: MonitorSmartphone, title: 'UI/UX Design', desc: 'Parcours utilisateurs intuitifs et esthétiques mémorables.' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-panel group hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
