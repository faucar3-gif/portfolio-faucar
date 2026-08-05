import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    id: '1',
    question: 'Combien coûte la création d\'un site web ?',
    answer: 'Le coût varie en fonction de la complexité du projet, des fonctionnalités requises et du design. Un site vitrine simple ne coûtera pas le même prix qu\'une plateforme e-commerce complexe. Contactez-moi pour un devis précis basé sur vos besoins réels.'
  },
  {
    id: '2',
    question: 'Quels sont vos délais de réalisation ?',
    answer: 'Pour un site vitrine classique, comptez entre 2 à 4 semaines. Pour une application web sur-mesure ou un e-commerce, le délai s\'étend généralement de 1 à 3 mois. Un planning détaillé vous est toujours fourni lors de la validation du devis.'
  },
  {
    id: '3',
    question: 'Faites-vous de la maintenance après la livraison ?',
    answer: 'Absolument. Je propose des forfaits de maintenance mensuels ou annuels pour assurer les mises à jour de sécurité, les sauvegardes et l\'optimisation continue de votre produit digital.'
  },
  {
    id: '4',
    question: 'Quelles technologies utilisez-vous ?',
    answer: 'Mon stack de prédilection inclut React (Next.js/Vite) pour le front-end, Node.js ou Python pour le back-end, avec TailwindCSS pour le style. J\'adapte toutefois les technologies aux spécificités de votre projet.'
  },
  {
    id: '5',
    question: 'Pouvez-vous reprendre un projet existant ?',
    answer: 'Oui, je réalise régulièrement des audits et des refontes de code existant. Cependant, une analyse technique préalable est nécessaire pour évaluer la qualité du code actuel et la faisabilité de la reprise.'
  },
  {
    id: '6',
    question: 'Le site sera-t-il bien référencé sur Google ?',
    answer: 'Tous les sites que je développe respectent strictement les bonnes pratiques SEO techniques (performances, balisage sémantique, responsive design). Pour un accompagnement SEO éditorial ou stratégique, je peux vous orienter vers des partenaires spécialisés.'
  }
];

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('1');

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Questions <span className="text-primary">Fréquentes</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          Vous avez des questions sur ma façon de travailler ? Voici les réponses aux interrogations les plus courantes.
        </p>

        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full bg-card border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-lg transition-all"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => (
            <motion.div 
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-border bg-card rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-muted/50 transition-colors"
              >
                <span className="font-display font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-primary transition-transform duration-300 flex-shrink-0 ${openId === faq.id ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Aucune question ne correspond à votre recherche.
          </div>
        )}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Vous ne trouvez pas la réponse à votre question ?
        </p>
        <a href="/contact" className="inline-block mt-4 text-primary font-medium hover:underline">
          Contactez-moi directement
        </a>
      </div>
    </div>
  );
}
