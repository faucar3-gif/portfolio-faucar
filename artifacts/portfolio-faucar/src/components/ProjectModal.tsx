import { X, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl z-10 flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background backdrop-blur-md rounded-full text-foreground/80 hover:text-foreground transition-colors z-20 border border-border"
            >
              <X size={20} />
            </button>

            <div className="w-full h-64 sm:h-80 md:h-[400px] relative overflow-hidden bg-muted">
              {/* Image Placeholder or real image */}
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-6 sm:p-10 -mt-16 sm:-mt-24 relative z-20">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {project.category}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-card-foreground">
                {project.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-3">À propos du projet</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-5 rounded-lg bg-background/50 border border-border">
                    <h3 className="font-display font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <ExternalLink size={18} />
                      Visiter le site
                    </a>
                    
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-3 px-4 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-2 font-medium border border-border"
                      >
                        <Github size={18} />
                        Code Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
