import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ExternalLink, Loader } from 'lucide-react';
import imgPortfolio from '@assets/img-portfolio_1785936519612.png';
import imgDochub from '@assets/img-dochub_1785937544335.png';
import imgHousse from '@assets/img-housse_1785937544336.png';
import imgImmobilier from '@assets/img-immobillier_1785937544337.png';
import imgJoifood from '@assets/img-joidfood_1785937544337.png';
import imgSinelle from "@assets/img-Sinelle's_Meals_1785937544337.png";
import imgGamazid from '@assets/img-ets-gamazid_1785938104487.png';
import { useLang } from '@/contexts/LanguageContext';

const PORTFOLIO_EXTERNAL_URL = 'https://stellular-elf-ac537e.netlify.app/';
const WHATSAPP_URL = 'https://wa.me/2290161013119';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: { fr: string; en: string; es: string };
  tech: string[];
}

const CATEGORIES = {
  fr: ['Tous', 'Web', 'Mobile', 'Design', 'E-commerce'],
  en: ['All', 'Web', 'Mobile', 'Design', 'E-commerce'],
  es: ['Todos', 'Web', 'Móvil', 'Diseño', 'E-commerce'],
};

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'DocHub',
    category: 'Web',
    image: imgDochub,
    link: 'https://workplace-helper--faucacom.replit.app/',
    description: {
      fr: "Plateforme tout-en-un de création de documents professionnels. Regroupe 11 modules — CV avec IA, lettres, fiches de paie, cartes de visite — avec signature numérique centralisée et export PDF.",
      en: "All-in-one professional document creation platform. Includes 11 modules — AI-powered CV, letters, pay slips, business cards — with centralized digital signature and PDF export.",
      es: "Plataforma todo en uno para la creación de documentos profesionales. Incluye 11 módulos — CV con IA, cartas, nóminas, tarjetas de visita — con firma digital centralizada y exportación PDF.",
    },
    tech: ['React', 'Node.js', 'IA Gemini', 'PDF Export'],
  },
  {
    id: '2',
    title: 'House Company',
    category: 'Web',
    image: imgHousse,
    link: 'https://housecopany.netlify.app/',
    description: {
      fr: "Site vitrine pour une agence immobilière spécialisée dans les biens haut de gamme. Présentation élégante des propriétés avec galerie photos, formulaire de contact et intégration des annonces.",
      en: "Showcase website for a real estate agency specializing in high-end properties. Elegant property presentation with photo gallery, contact form and listing integration.",
      es: "Sitio web para una agencia inmobiliaria especializada en propiedades de alta gama. Presentación elegante de propiedades con galería de fotos, formulario de contacto e integración de anuncios.",
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
  },
  {
    id: '3',
    title: 'Gamazid Immobilier',
    category: 'Web',
    image: imgImmobilier,
    link: 'https://work-flow--faucar342.replit.app/',
    description: {
      fr: "Plateforme de recherche immobilière avec moteur de recherche par ville et type de bien. Interface moderne permettant de trouver des appartements et villas de prestige.",
      en: "Real estate search platform with search engine by city and property type. Modern interface to find prestigious apartments and villas.",
      es: "Plataforma de búsqueda inmobiliaria con motor de búsqueda por ciudad y tipo de propiedad. Interfaz moderna para encontrar apartamentos y villas de prestigio.",
    },
    tech: ['React', 'TailwindCSS', 'Replit'],
  },
  {
    id: '4',
    title: 'La Joie Food',
    category: 'E-commerce',
    image: imgJoifood,
    link: 'https://lajoifood.lovable.app/',
    description: {
      fr: "Catalogue de commande en ligne pour une boutique alimentaire. Filtrage par catégorie (yaourts, crèmes glacées, sandwichs...), panier interactif et commande directe via WhatsApp.",
      en: "Online ordering catalog for a food shop. Category filtering (yogurts, ice creams, sandwiches...), interactive cart and direct ordering via WhatsApp.",
      es: "Catálogo de pedidos en línea para una tienda de alimentos. Filtrado por categoría (yogures, helados, sándwiches...), carrito interactivo y pedido directo por WhatsApp.",
    },
    tech: ['React', 'Lovable', 'WhatsApp API'],
  },
  {
    id: '5',
    title: "Sinelle's Meals",
    category: 'E-commerce',
    image: imgSinelle,
    link: 'https://sinelles-meals.lovable.app',
    description: {
      fr: "Application de commande pour un restaurant de livraison à Cotonou. Menu varié avec galerie de plats, commande rapide, livraison 30 min et note clients 4.9/5.",
      en: "Ordering app for a delivery restaurant in Cotonou. Varied menu with food gallery, fast ordering, 30-min delivery and 4.9/5 customer rating.",
      es: "App de pedidos para un restaurante de entrega en Cotonou. Menú variado con galería de platos, pedido rápido, entrega en 30 min y valoración 4.9/5.",
    },
    tech: ['React', 'Lovable', 'Supabase'],
  },
];

const IN_PROGRESS = [
  {
    id: 'ip1',
    title: 'ETS GAMAZID',
    image: imgGamazid,
    progress: 45,
    description: {
      fr: "Site e-commerce dynamique pour l'entreprise ETS GAMAZID. Catalogue de produits, gestion de panier, paiement intégré et panneau d'administration sur mesure.",
      en: "Dynamic e-commerce website for ETS GAMAZID company. Product catalog, cart management, integrated payment and custom admin panel.",
      es: "Sitio web de comercio electrónico dinámico para la empresa ETS GAMAZID. Catálogo de productos, gestión de carrito, pago integrado y panel de administración personalizado.",
    },
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
];

export default function Portfolio() {
  const { t, lang } = useLang();
  const pt = t.portfolio;
  const [activeCategory, setActiveCategory] = useState(0); // index
  const [searchQuery, setSearchQuery] = useState('');
  const cats = CATEGORIES[lang];
  const allLabel = cats[0];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = activeCategory === 0 || project.category === CATEGORIES.en[activeCategory];
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {pt.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary">{pt.title.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-lg text-muted-foreground">{pt.subtitle}</p>
      </div>

      {/* External Portfolio Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 group"
      >
        <a
          href={PORTFOLIO_EXTERNAL_URL}
          target="_blank"
          rel="noreferrer"
          className="block relative rounded-3xl overflow-hidden border border-primary/30 hover:border-primary/70 transition-all duration-300 shadow-2xl shadow-primary/10 hover:shadow-primary/20"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center gap-0 bg-card">
            <div className="w-full md:w-72 h-64 md:h-56 flex-shrink-0 overflow-hidden">
              <img src={imgPortfolio} alt="Portfolio de Faucar AMETEPE" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Portfolio en ligne
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{pt.portfolioCard}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{pt.portfolioCardDesc}</p>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                {pt.portfolioBtn}
                <ExternalLink size={16} />
              </span>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {cats.map((category, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === i
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
            placeholder={pt.search}
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
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors shadow-lg flex flex-col"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md text-foreground border border-border">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                    {project.description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">+{project.tech.length - 3}</span>
                    )}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    onClick={e => e.stopPropagation()}
                  >
                    {pt.openProject} <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
          <Filter size={40} className="mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-display font-medium text-foreground mb-2">{pt.noResult}</h3>
          <p className="text-muted-foreground">{pt.noResultDesc}</p>
          <button
            onClick={() => { setActiveCategory(0); setSearchQuery(''); }}
            className="mt-6 text-primary hover:underline"
          >
            {pt.reset}
          </button>
        </div>
      )}

      {/* In-Progress Section */}
      <div className="mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-sm font-medium">
            <Loader size={14} className="animate-spin" />
            {pt.inProgress}
          </div>
          <h2 className="text-2xl font-display font-bold">{pt.inProgressTitle}</h2>
        </div>

        <div className="grid gap-8">
          {IN_PROGRESS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Progress tint */}
              <div className="absolute left-0 top-0 bottom-0 bg-primary/5 z-0 transition-all" style={{ width: `${project.progress}%` }} />

              <div className="w-full md:w-64 h-52 md:h-auto flex-shrink-0 overflow-hidden relative z-10">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50" />
              </div>

              <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-display font-bold">{project.title}</h3>
                    <span className="px-2 py-0.5 rounded text-xs bg-secondary/20 text-secondary border border-secondary/30 font-medium">
                      {pt.inProgress}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2 py-1 border border-border rounded bg-background">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-48 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>{pt.progress}</span>
                    <span className="text-primary">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    style={{ backgroundColor: '#25D366', color: '#fff' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Suivre l'avancement
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
