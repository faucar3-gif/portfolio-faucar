import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Search, PenTool, Code, FlaskConical, Rocket, RefreshCcw } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Découverte & Stratégie',
    desc: 'Tout commence par l\'écoute. Nous analysons vos besoins, vos objectifs et votre marché pour définir une stratégie technique pertinente et réaliste.',
    details: ['Audit des besoins', 'Étude de faisabilité', 'Cahier des charges']
  },
  {
    icon: PenTool,
    title: 'Conception UI/UX',
    desc: 'Je conçois des wireframes puis des maquettes haute fidélité pour que vous puissiez visualiser l\'expérience utilisateur avant d\'écrire la moindre ligne de code.',
    details: ['Wireframing', 'Maquettes interactives', 'Design System']
  },
  {
    icon: Code,
    title: 'Développement',
    desc: 'L\'étape où la magie opère. J\'écris un code propre, moderne et performant, en vous tenant informé régulièrement de l\'avancée du projet.',
    details: ['Architecture technique', 'Développement Front/Back', 'Intégration API']
  },
  {
    icon: FlaskConical,
    title: 'Tests & Qualité',
    desc: 'Aucun projet ne sort sans être rigoureusement testé sur différents appareils et navigateurs pour garantir une robustesse optimale.',
    details: ['Tests unitaires', 'Recettage multi-devices', 'Optimisation des performances']
  },
  {
    icon: Rocket,
    title: 'Livraison & Déploiement',
    desc: 'Mise en ligne de la solution sur un environnement de production sécurisé. Je m\'occupe de toute l\'infrastructure.',
    details: ['Configuration serveur', 'Mise en production', 'Formation utilisateur']
  },
  {
    icon: RefreshCcw,
    title: 'Suivi & Évolution',
    desc: 'Mon travail ne s\'arrête pas à la livraison. Je reste disponible pour la maintenance, les mises à jour et les futures évolutions.',
    details: ['Monitoring', 'Maintenance préventive', 'Nouvelles features']
  }
];

export default function MonProcessus() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20 max-w-5xl">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Mon <span className="text-primary">Processus</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Une méthodologie agile et transparente, pensée pour transformer votre vision en réalité tout en maîtrisant les délais et les coûts.
        </p>
      </div>

      <div className="relative">
        {/* Central timeline line (desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-secondary/50 to-background z-0" />
        
        {/* Left timeline line (mobile) */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-secondary/50 to-background z-0" />

        <div className="space-y-12 md:space-y-24 relative z-10">
          {STEPS.map((step, index) => (
            <StepItem key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepItem({ step, index }: { step: typeof STEPS[0], index: number }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-center w-full group">
      
      {/* Content Side (Left for even, Right for odd on desktop) */}
      <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:order-3 md:pl-16'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-lg hover:border-primary/50 transition-colors"
        >
          <div className={`text-5xl font-display font-bold text-primary/10 absolute -top-4 ${isEven ? 'md:-right-4 left-4 md:left-auto' : '-left-4 md:-left-4'}`}>
            0{index + 1}
          </div>
          <h3 className="text-2xl font-display font-bold mb-3 relative z-10">{step.title}</h3>
          <p className="text-muted-foreground mb-4 relative z-10">
            {step.desc}
          </p>
          <ul className={`text-sm text-foreground/80 space-y-2 relative z-10 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-center gap-2">
                {!isEven && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                {detail}
                {isEven && <span className="w-1.5 h-1.5 rounded-full bg-secondary hidden md:block" />}
                {isEven && <span className="w-1.5 h-1.5 rounded-full bg-secondary md:hidden block" />}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Center Icon */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-8 md:static md:w-16 h-16 md:mx-auto md:order-2 flex-shrink-0 flex items-center justify-center -translate-x-1/2 md:translate-x-0"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-4 border-card flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] group-hover:scale-110 transition-all">
          <step.icon className="text-primary w-5 h-5 md:w-6 md:h-6" />
        </div>
      </motion.div>
      
      {/* Empty space for the other side on desktop */}
      <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:order-3' : 'md:order-1'}`} />
    </div>
  );
}
