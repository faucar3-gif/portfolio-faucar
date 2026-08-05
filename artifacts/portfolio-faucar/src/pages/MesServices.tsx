import { motion } from 'framer-motion';
import { Globe, Palette, Settings, Database, TrendingUp, Lightbulb } from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    title: 'Développement Web',
    desc: 'Création de sites vitrines, applications web et plateformes e-commerce rapides, sécurisées et évolutives.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Palette,
    title: 'Design UI/UX',
    desc: 'Conception d\'interfaces utilisateur esthétiques centrées sur l\'expérience et la conversion.',
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: Lightbulb,
    title: 'Consulting IT',
    desc: 'Accompagnement stratégique pour le choix de vos technologies et l\'architecture de vos projets digitaux.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    icon: Settings,
    title: 'Maintenance & Support',
    desc: 'Mises à jour, correctifs de sécurité et optimisation continue de vos infrastructures existantes.',
    color: 'from-emerald-400 to-green-500'
  },
  {
    icon: TrendingUp,
    title: 'SEO & Performance',
    desc: 'Optimisation du temps de chargement et du référencement naturel pour une meilleure visibilité.',
    color: 'from-cyan-400 to-teal-400'
  },
  {
    icon: Database,
    title: 'Formation',
    desc: 'Transfert de compétences sur les technologies web modernes (React, Node.js, bonnes pratiques).',
    color: 'from-indigo-500 to-blue-500'
  }
];

export default function MesServices() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Mes <span className="text-primary">Services</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Une gamme complète de prestations pour vous accompagner dans votre transformation digitale, de l'idée à la production.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative h-full"
          >
            {/* Hover glow effect background */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
            
            <div className="relative h-full p-8 rounded-2xl bg-card border border-border shadow-lg transition-transform duration-500 group-hover:-translate-y-2 flex flex-col">
              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} bg-opacity-10 shadow-inner`}>
                <service.icon size={28} className="text-white drop-shadow-md" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CTA Bottom */}
      <div className="mt-24 text-center p-12 rounded-3xl bg-gradient-to-b from-card to-background border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
        
        <h2 className="text-3xl font-display font-bold mb-4 relative z-10">Un besoin spécifique ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10">
          Chaque projet est unique. Contactez-moi pour que nous puissions discuter de la solution technique la plus adaptée à vos enjeux.
        </p>
        <button className="relative z-10 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform">
          Demander un devis personnalisé
        </button>
      </div>
    </div>
  );
}
