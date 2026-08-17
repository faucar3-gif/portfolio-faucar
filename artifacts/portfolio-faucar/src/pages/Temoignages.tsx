import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sophie Laurent',
    role: 'CEO, InnovateTech',
    content: 'Monsieur Faucar a transformé notre vision complexe en une application intuitive et ultra-rapide. Son expertise technique et ses conseils ont été inestimables pour le succès de notre lancement.',
    rating: 5,
    avatar: 'SL'
  },
  {
    name: 'Marc Dubois',
    role: 'Directeur Marketing, RetailCorp',
    content: 'Un développeur exceptionnel qui comprend non seulement le code, mais aussi les enjeux business. Notre taux de conversion a augmenté de 40% après la refonte de notre plateforme.',
    rating: 5,
    avatar: 'MD'
  },
  {
    name: 'Amélie Rousseau',
    role: 'Fondatrice, Startup locale',
    content: 'Professionnel, réactif et créatif. Il a su respecter des délais très serrés sans jamais compromettre la qualité finale. Je le recommande vivement.',
    rating: 4,
    avatar: 'AR'
  },
  {
    name: 'Thomas Bernard',
    role: 'CTO, DataSystems',
    content: 'Son architecture backend est propre et facilement maintenable. C\'est rare de trouver un freelance avec un tel niveau d\'exigence sur la qualité du code.',
    rating: 5,
    avatar: 'TB'
  },
  {
    name: 'Julie Leroy',
    role: 'Gérante, Restaurant L\'Épicure',
    content: 'Notre nouveau site web est magnifique. Nos clients n\'arrêtent pas de nous faire des compliments sur le système de réservation.',
    rating: 5,
    avatar: 'JL'
  }
];

export default function Temoignages() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Ce qu'ils  <span className="text-primary">disent</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          La satisfaction de mes clients est ma meilleure carte de visite. Découvrez leurs retours d'expérience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-card border border-border p-8 rounded-3xl relative hover:-translate-y-2 transition-transform duration-300"
          >
            <Quote className="absolute top-8 right-8 text-primary/10 w-16 h-16" />
            
            <div className="flex items-center gap-1 mb-6 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index} 
                  size={16} 
                  fill={index < testimonial.rating ? "currentColor" : "none"} 
                  className={index >= testimonial.rating ? "text-muted" : ""}
                />
              ))}
            </div>
            
            <p className="text-foreground/90 italic mb-8 relative z-10 leading-relaxed min-h-[120px]">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-4 mt-auto border-t border-border pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-lg shadow-inner">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="font-display font-bold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
