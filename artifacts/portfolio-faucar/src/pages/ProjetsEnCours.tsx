import { motion } from 'framer-motion';
import { Loader, Timer, AlertCircle } from 'lucide-react';

const IN_PROGRESS = [
  {
    id: 1,
    title: 'Plateforme FinTech B2B',
    client: 'Confidentiel',
    progress: 75,
    status: 'Tests Beta',
    description: 'Développement d\'une application web sécurisée pour la gestion de flux financiers. Intégration d\'API bancaires complexes.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    expected: 'Octobre 2024'
  },
  {
    id: 2,
    title: 'Refonte Site E-commerce',
    client: 'Boutique Mode Locale',
    progress: 40,
    status: 'Développement Front-end',
    description: 'Migration d\'une ancienne boutique vers Shopify avec un thème Headless sur mesure pour des performances maximales.',
    tech: ['Next.js', 'Shopify Storefront API', 'TailwindCSS'],
    expected: 'Novembre 2024'
  },
  {
    id: 3,
    title: 'App de Réservation de Salles',
    client: 'Espace Coworking',
    progress: 15,
    status: 'Conception UI/UX',
    description: 'Création d\'une application mobile de gestion de plannings et réservation d\'espaces avec paiement intégré.',
    tech: ['React Native', 'Firebase', 'Figma'],
    expected: 'Janvier 2025'
  }
];

export default function ProjetsEnCours() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-sm font-medium">
          <Loader size={14} className="animate-spin" />
          Work in Progress
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Projets <span className="text-primary">En Cours</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Un aperçu transparent de mon atelier numérique actuel. Découvrez les projets sur lesquels je travaille en ce moment.
        </p>
      </div>

      <div className="grid gap-8">
        {IN_PROGRESS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden group"
          >
            {/* Animated progress background subtle tint */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-primary/5 transition-all duration-1000 ease-out z-0"
              style={{ width: `${project.progress}%` }}
            />
            
            <div className="flex-1 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display font-bold">{project.title}</h2>
                <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                  Client: {project.client}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                {project.tech.map(t => (
                  <span key={t} className="text-xs px-2 py-1 border border-border rounded bg-background">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-64 flex flex-col justify-center relative z-10 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span>Progression</span>
                <span className="text-primary">{project.progress}%</span>
              </div>
              
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-6">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle size={16} className="text-secondary" />
                  <span className="truncate">{project.status}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer size={16} />
                  Livraison: {project.expected}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
