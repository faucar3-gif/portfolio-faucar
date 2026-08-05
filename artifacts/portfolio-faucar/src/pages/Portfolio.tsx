import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { ProjectModal, type Project } from '@/components/ProjectModal';

const CATEGORIES = ['Tous', 'Web', 'Mobile', 'Design', 'E-commerce'];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Premium',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    description: 'Une plateforme de vente en ligne complète pour une marque de vêtements haut de gamme.\n\nFonctionnalités :\n- Gestion de panier et tunnel d\'achat\n- Paiement sécurisé avec Stripe\n- Dashboard administrateur sur mesure\n- Filtrage dynamique des produits',
    tech: ['Next.js', 'TailwindCSS', 'Stripe', 'Prisma', 'PostgreSQL'],
    link: '#',
    github: '#'
  },
  {
    id: '2',
    title: 'Dashboard Analytics',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Outil de visualisation de données pour le suivi des performances d\'une entreprise SaaS. Intégration de graphiques en temps réel et exports PDF.',
    tech: ['React', 'Recharts', 'Express', 'MongoDB'],
    link: '#',
  },
  {
    id: '3',
    title: 'App Mobile Fitness',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800',
    description: 'Application d\'accompagnement sportif avec programmes personnalisés, suivi d\'évolution et lecteur vidéo intégré pour les exercices.',
    tech: ['React Native', 'Expo', 'Firebase', 'Redux'],
    link: '#',
    github: '#'
  },
  {
    id: '4',
    title: 'Site Vitrine Restaurant',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    description: 'Présentation élégante d\'un restaurant étoilé. Système de réservation de tables en ligne et gestion de menu dynamique.',
    tech: ['Vue.js', 'Framer Motion', 'Sanity CMS'],
    link: '#',
  },
  {
    id: '5',
    title: 'Refonte Identité Visuelle',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
    description: 'Création du design system, de la charte graphique et des maquettes UI/UX pour une agence immobilière moderne.',
    tech: ['Figma', 'Illustrator', 'Prototypage'],
    link: '#',
  },
  {
    id: '6',
    title: 'Marketplace B2B',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'Place de marché mettant en relation des fournisseurs industriels et des distributeurs. Gestion complexe des stocks et des tarifs dégressifs.',
    tech: ['Next.js', 'NestJS', 'GraphQL', 'AWS'],
    link: '#',
    github: '#'
  },
  {
    id: '7',
    title: 'Gestionnaire de Tâches',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
    description: 'Application de productivité type Kanban avec drag-and-drop, collaboration en temps réel et notifications push.',
    tech: ['React', 'Socket.io', 'Tailwind', 'Zustand'],
    link: '#',
  },
  {
    id: '8',
    title: 'App Réservation VTC',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
    description: 'Application mobile de commande de chauffeurs privés. Géolocalisation en temps réel et estimation des prix.',
    tech: ['React Native', 'Google Maps API', 'Node.js'],
    link: '#',
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = activeCategory === 'Tous' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Mon <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez une sélection de mes derniers projets. Des solutions techniques robustes enveloppées dans des designs épurés.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'bg-card text-muted-foreground hover:bg-muted border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Rechercher un projet, une tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors shadow-lg"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md text-foreground border border-border">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
            <Filter size={40} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-display font-medium text-foreground mb-2">Aucun projet trouvé</h3>
            <p className="text-muted-foreground">Essayez de modifier vos filtres ou votre recherche.</p>
            <button 
              onClick={() => { setActiveCategory('Tous'); setSearchQuery(''); }}
              className="mt-6 text-primary hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
