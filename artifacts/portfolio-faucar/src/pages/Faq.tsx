import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const FAQS = {
  fr: [
    { id: '1', question: "Combien coûte la création d'un site web ?", answer: "Le coût varie en fonction de la complexité du projet, des fonctionnalités requises et du design. Un site vitrine simple ne coûtera pas le même prix qu'une plateforme e-commerce complexe. Contactez-moi sur WhatsApp pour un devis précis basé sur vos besoins réels." },
    { id: '2', question: "Quels sont vos délais de réalisation ?", answer: "Pour un site vitrine classique, comptez entre 2 à 4 semaines. Pour une application web sur-mesure ou un e-commerce, le délai s'étend généralement de 1 à 3 mois. Un planning détaillé vous est toujours fourni lors de la validation du devis." },
    { id: '3', question: "Faites-vous de la maintenance après la livraison ?", answer: "Absolument. Je propose des forfaits de maintenance mensuels ou annuels pour assurer les mises à jour de sécurité, les sauvegardes et l'optimisation continue de votre produit digital." },
    { id: '4', question: "Quelles technologies utilisez-vous ?", answer: "Mon stack de prédilection inclut React (Next.js/Vite) pour le front-end, Node.js ou Python pour le back-end, avec TailwindCSS pour le style. J'adapte toutefois les technologies aux spécificités de votre projet." },
    { id: '5', question: "Pouvez-vous reprendre un projet existant ?", answer: "Oui, je réalise régulièrement des audits et des refontes de code existant. Cependant, une analyse technique préalable est nécessaire pour évaluer la qualité du code actuel et la faisabilité de la reprise." },
    { id: '6', question: "Le site sera-t-il bien référencé sur Google ?", answer: "Tous les sites que je développe respectent strictement les bonnes pratiques SEO techniques (performances, balisage sémantique, responsive design). Pour un accompagnement SEO éditorial ou stratégique, je peux vous orienter vers des partenaires spécialisés." },
  ],
  en: [
    { id: '1', question: "How much does it cost to create a website?", answer: "The cost varies depending on the complexity of the project, required features and design. A simple showcase site won't cost the same as a complex e-commerce platform. Contact me on WhatsApp for a precise quote based on your real needs." },
    { id: '2', question: "What are your turnaround times?", answer: "For a classic showcase site, count 2 to 4 weeks. For a custom web application or e-commerce, the timeline generally extends from 1 to 3 months. A detailed schedule is always provided upon quote validation." },
    { id: '3', question: "Do you provide maintenance after delivery?", answer: "Absolutely. I offer monthly or annual maintenance packages to ensure security updates, backups and continuous optimization of your digital product." },
    { id: '4', question: "What technologies do you use?", answer: "My preferred stack includes React (Next.js/Vite) for the front-end, Node.js or Python for the back-end, with TailwindCSS for styling. However, I adapt technologies to your project's specific needs." },
    { id: '5', question: "Can you take over an existing project?", answer: "Yes, I regularly carry out audits and refactoring of existing code. However, a prior technical analysis is necessary to assess the quality of the current code and the feasibility of the takeover." },
    { id: '6', question: "Will the site be well ranked on Google?", answer: "All sites I develop strictly follow technical SEO best practices (performance, semantic markup, responsive design). For editorial or strategic SEO support, I can direct you to specialized partners." },
  ],
  es: [
    { id: '1', question: "¿Cuánto cuesta crear un sitio web?", answer: "El costo varía según la complejidad del proyecto, las funcionalidades requeridas y el diseño. Un sitio vitrina simple no costará lo mismo que una plataforma de comercio electrónico compleja. Contácteme por WhatsApp para un presupuesto preciso." },
    { id: '2', question: "¿Cuáles son sus plazos de entrega?", answer: "Para un sitio vitrina clásico, cuente entre 2 y 4 semanas. Para una aplicación web personalizada o e-commerce, el plazo generalmente se extiende de 1 a 3 meses. Se proporciona un calendario detallado al validar el presupuesto." },
    { id: '3', question: "¿Proporciona mantenimiento después de la entrega?", answer: "Absolutamente. Ofrezco paquetes de mantenimiento mensuales o anuales para garantizar actualizaciones de seguridad, copias de seguridad y optimización continua de su producto digital." },
    { id: '4', question: "¿Qué tecnologías utiliza?", answer: "Mi stack preferido incluye React (Next.js/Vite) para el front-end, Node.js o Python para el back-end, con TailwindCSS para el estilo. Sin embargo, adapto las tecnologías a las especificidades de su proyecto." },
    { id: '5', question: "¿Puede retomar un proyecto existente?", answer: "Sí, realizo regularmente auditorías y refactorizaciones de código existente. Sin embargo, es necesario un análisis técnico previo para evaluar la calidad del código actual y la viabilidad de la retoma." },
    { id: '6', question: "¿El sitio estará bien posicionado en Google?", answer: "Todos los sitios que desarrollo siguen estrictamente las buenas prácticas SEO técnicas (rendimiento, marcado semántico, diseño responsivo). Para acompañamiento SEO editorial o estratégico, puedo orientarle hacia socios especializados." },
  ],
};

const WHATSAPP_URL = 'https://wa.me/2290161013119';

export default function Faq() {
  const { t, lang } = useLang();
  const ft = t.faq;
  const faqs = FAQS[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('1');

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, faqs]);

  return (
    <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {ft.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary">{ft.title.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10">{ft.subtitle}</p>

        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder={ft.searchPlaceholder}
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
            {ft.noResult}
          </div>
        )}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">{ft.ctaText}</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: '#25D366', color: '#fff' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          {ft.ctaLink}
        </a>
      </div>
    </div>
  );
}
