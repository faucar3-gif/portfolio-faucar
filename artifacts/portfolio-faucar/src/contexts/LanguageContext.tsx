import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'es';

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
const TESTIMONIALS_DATA = {
  fr: [
    { name: 'Sophie Laurent', role: 'CEO, InnovateTech', rating: 5, content: "Faucar a transformé notre vision complexe en une application intuitive et ultra-rapide. Son expertise technique et ses conseils ont été inestimables pour le succès de notre lancement." },
    { name: 'Marc Dubois', role: 'Directeur Marketing, RetailCorp', rating: 5, content: "Un développeur exceptionnel qui comprend non seulement le code, mais aussi les enjeux business. Notre taux de conversion a augmenté de 40% après la refonte de notre plateforme." },
    { name: 'Julie Leroy', role: "Gérante, Restaurant L'Épicure", rating: 5, content: "Notre nouveau site web est magnifique. Nos clients n'arrêtent pas de nous faire des compliments sur le design et le système de réservation." },
  ],
  en: [
    { name: 'Sophie Laurent', role: 'CEO, InnovateTech', rating: 5, content: "Faucar transformed our complex vision into an intuitive, ultra-fast application. His technical expertise and advice were invaluable for our successful launch." },
    { name: 'Marc Dubois', role: 'Marketing Director, RetailCorp', rating: 5, content: "An exceptional developer who understands not only code, but also business challenges. Our conversion rate increased by 40% after he redesigned our platform." },
    { name: 'Julie Leroy', role: "Manager, Restaurant L'Épicure", rating: 5, content: "Our new website is beautiful. Our customers won't stop complimenting us on the design and reservation system." },
  ],
  es: [
    { name: 'Sophie Laurent', role: 'CEO, InnovateTech', rating: 5, content: "Faucar transformó nuestra visión compleja en una aplicación intuitiva y ultrarrápida. Su experiencia técnica y sus consejos fueron invaluables para el éxito de nuestro lanzamiento." },
    { name: 'Marc Dubois', role: 'Director de Marketing, RetailCorp', rating: 5, content: "Un desarrollador excepcional que entiende no solo el código, sino también los desafíos empresariales. Nuestra tasa de conversión aumentó un 40% tras la renovación de nuestra plataforma." },
    { name: 'Julie Leroy', role: "Gerente, Restaurant L'Épicure", rating: 5, content: "Nuestro nuevo sitio web es hermoso. Nuestros clientes no paran de hacernos cumplidos sobre el diseño y el sistema de reservas." },
  ],
};

// ─── FAQ DATA ──────────────────────────────────────────────────────────────────
const FAQ_DATA = {
  fr: [
    { q: "Combien coûte la création d'un site web ?", a: "Le coût varie selon la complexité, les fonctionnalités et le design. Contactez-moi sur WhatsApp pour un devis précis basé sur vos besoins réels." },
    { q: "Quels sont vos délais de réalisation ?", a: "Un site vitrine : 2 à 4 semaines. Une application web sur-mesure ou un e-commerce : 1 à 3 mois. Un planning détaillé est fourni à la validation du devis." },
    { q: "Faites-vous de la maintenance après livraison ?", a: "Oui. Je propose des forfaits mensuels ou annuels pour les mises à jour, sauvegardes et optimisation continue de votre produit." },
    { q: "Quelles technologies utilisez-vous ?", a: "React (Next.js/Vite) pour le front-end, Node.js ou Python pour le back-end, TailwindCSS pour le style. J'adapte le stack aux besoins de votre projet." },
    { q: "Pouvez-vous reprendre un projet existant ?", a: "Oui, après audit technique préalable pour évaluer la qualité du code existant et la faisabilité de la reprise." },
    { q: "Le site sera-t-il bien référencé sur Google ?", a: "Tous mes sites respectent les bonnes pratiques SEO techniques : performance, balisage sémantique et responsive design sont systématiquement soignés." },
  ],
  en: [
    { q: "How much does it cost to create a website?", a: "The cost varies depending on complexity, features and design. Contact me on WhatsApp for a precise quote based on your real needs." },
    { q: "What are your turnaround times?", a: "Showcase site: 2 to 4 weeks. Custom web app or e-commerce: 1 to 3 months. A detailed schedule is provided upon quote validation." },
    { q: "Do you provide maintenance after delivery?", a: "Yes. I offer monthly or annual packages for security updates, backups and continuous optimization of your product." },
    { q: "What technologies do you use?", a: "React (Next.js/Vite) for the front-end, Node.js or Python for the back-end, TailwindCSS for styling. I adapt the stack to your project's needs." },
    { q: "Can you take over an existing project?", a: "Yes, after a prior technical audit to assess the quality of existing code and feasibility of the takeover." },
    { q: "Will the site rank well on Google?", a: "All my sites follow technical SEO best practices: performance, semantic markup and responsive design are systematically addressed." },
  ],
  es: [
    { q: "¿Cuánto cuesta crear un sitio web?", a: "El costo varía según la complejidad, las funcionalidades y el diseño. Contácteme por WhatsApp para un presupuesto preciso según sus necesidades." },
    { q: "¿Cuáles son sus plazos de entrega?", a: "Sitio vitrina: 2 a 4 semanas. Aplicación web personalizada o e-commerce: 1 a 3 meses. Se proporciona un calendario detallado al validar el presupuesto." },
    { q: "¿Proporciona mantenimiento después de la entrega?", a: "Sí. Ofrezco paquetes mensuales o anuales para actualizaciones, copias de seguridad y optimización continua de su producto." },
    { q: "¿Qué tecnologías utiliza?", a: "React (Next.js/Vite) para el front-end, Node.js o Python para el back-end, TailwindCSS para el estilo. Adapto el stack a las necesidades de su proyecto." },
    { q: "¿Puede retomar un proyecto existente?", a: "Sí, previa auditoría técnica para evaluar la calidad del código existente y la viabilidad de la retoma." },
    { q: "¿El sitio estará bien posicionado en Google?", a: "Todos mis sitios siguen las buenas prácticas SEO técnicas: rendimiento, marcado semántico y diseño responsivo son sistemáticamente cuidados." },
  ],
};

// ─── PROCESS STEPS ─────────────────────────────────────────────────────────────
const PROCESS_DATA = {
  fr: [
    { title: 'Découverte & Stratégie', desc: "Tout commence par l'écoute. Nous analysons vos besoins, vos objectifs et votre marché pour définir une stratégie technique pertinente.", details: ['Audit des besoins', 'Étude de faisabilité', 'Cahier des charges'] },
    { title: 'Conception UI/UX', desc: "Je conçois des wireframes puis des maquettes haute fidélité pour visualiser l'expérience utilisateur avant d'écrire la moindre ligne de code.", details: ['Wireframing', 'Maquettes interactives', 'Design System'] },
    { title: 'Développement', desc: "L'étape où la magie opère. J'écris un code propre, moderne et performant, en vous tenant informé régulièrement.", details: ['Architecture technique', 'Développement Front/Back', 'Intégration API'] },
    { title: 'Tests & Qualité', desc: "Aucun projet ne sort sans être rigoureusement testé sur différents appareils et navigateurs pour garantir une robustesse optimale.", details: ['Tests unitaires', 'Recettage multi-devices', 'Optimisation des performances'] },
    { title: 'Livraison & Déploiement', desc: "Mise en ligne de la solution sur un environnement de production sécurisé. Je m'occupe de toute l'infrastructure.", details: ['Configuration serveur', 'Mise en production', 'Formation utilisateur'] },
    { title: 'Suivi & Évolution', desc: "Mon travail ne s'arrête pas à la livraison. Je reste disponible pour la maintenance, les mises à jour et les futures évolutions.", details: ['Monitoring', 'Maintenance préventive', 'Nouvelles features'] },
  ],
  en: [
    { title: 'Discovery & Strategy', desc: "Everything starts with listening. We analyze your needs, goals and market to define a relevant technical strategy.", details: ['Needs audit', 'Feasibility study', 'Project brief'] },
    { title: 'UI/UX Design', desc: "I design wireframes then high-fidelity mockups so you can visualize the user experience before a single line of code is written.", details: ['Wireframing', 'Interactive mockups', 'Design System'] },
    { title: 'Development', desc: "Where the magic happens. I write clean, modern and high-performance code, keeping you regularly informed of progress.", details: ['Technical architecture', 'Front/Back development', 'API integration'] },
    { title: 'Testing & Quality', desc: "No project ships without being rigorously tested on different devices and browsers to guarantee optimal robustness.", details: ['Unit tests', 'Multi-device testing', 'Performance optimization'] },
    { title: 'Delivery & Deployment', desc: "The solution goes live on a secure production environment. I handle all the infrastructure.", details: ['Server configuration', 'Production launch', 'User training'] },
    { title: 'Follow-up & Evolution', desc: "My work doesn't stop at delivery. I remain available for maintenance, updates and future evolutions.", details: ['Monitoring', 'Preventive maintenance', 'New features'] },
  ],
  es: [
    { title: 'Descubrimiento & Estrategia', desc: "Todo comienza con escuchar. Analizamos sus necesidades, objetivos y mercado para definir una estrategia técnica relevante.", details: ['Auditoría de necesidades', 'Estudio de viabilidad', 'Pliego de condiciones'] },
    { title: 'Diseño UI/UX', desc: "Diseño wireframes luego maquetas de alta fidelidad para que pueda visualizar la experiencia de usuario antes de escribir código.", details: ['Wireframing', 'Maquetas interactivas', 'Sistema de diseño'] },
    { title: 'Desarrollo', desc: "Donde ocurre la magia. Escribo código limpio, moderno y de alto rendimiento, manteniéndole informado regularmente.", details: ['Arquitectura técnica', 'Desarrollo Front/Back', 'Integración API'] },
    { title: 'Pruebas & Calidad', desc: "Ningún proyecto sale sin ser rigurosamente probado en diferentes dispositivos y navegadores para garantizar robustez óptima.", details: ['Pruebas unitarias', 'Testing multi-dispositivo', 'Optimización de rendimiento'] },
    { title: 'Entrega & Despliegue', desc: "La solución se pone en línea en un entorno de producción seguro. Me encargo de toda la infraestructura.", details: ['Configuración del servidor', 'Puesta en producción', 'Formación del usuario'] },
    { title: 'Seguimiento & Evolución', desc: "Mi trabajo no termina en la entrega. Permanezco disponible para mantenimiento, actualizaciones y futuras evoluciones.", details: ['Monitoreo', 'Mantenimiento preventivo', 'Nuevas funcionalidades'] },
  ],
};

// ─── SERVICES ──────────────────────────────────────────────────────────────────
const SERVICES_DATA = {
  fr: [
    { title: 'Développement Web', desc: 'Création de sites vitrines, applications web et plateformes e-commerce rapides, sécurisées et évolutives.', color: 'from-blue-500 to-cyan-400' },
    { title: 'Design UI/UX', desc: "Conception d'interfaces utilisateur esthétiques centrées sur l'expérience et la conversion.", color: 'from-purple-500 to-pink-400' },
    { title: 'Consulting IT', desc: 'Accompagnement stratégique pour le choix de vos technologies et l\'architecture de vos projets digitaux.', color: 'from-amber-400 to-orange-500' },
    { title: 'Maintenance & Support', desc: 'Mises à jour, correctifs de sécurité et optimisation continue de vos infrastructures existantes.', color: 'from-emerald-400 to-green-500' },
    { title: 'SEO & Performance', desc: 'Optimisation du temps de chargement et du référencement naturel pour une meilleure visibilité.', color: 'from-cyan-400 to-teal-400' },
    { title: 'Formation', desc: 'Transfert de compétences sur les technologies web modernes (React, Node.js, bonnes pratiques).', color: 'from-indigo-500 to-blue-500' },
    { title: 'Applications Mobiles', desc: 'Développement d\'applications mobiles cross-platform avec React Native pour iOS et Android.', color: 'from-rose-500 to-pink-500' },
    { title: 'Intégration API & Web Services', desc: 'Connexion de vos outils via des API REST, webhooks et services tiers (paiement, CRM, maps...).', color: 'from-violet-500 to-purple-500' },
    { title: 'Gestion de Contenu (CMS)', desc: 'Mise en place de CMS sur-mesure (WordPress, Sanity, Strapi) pour que vous gérez votre contenu facilement.', color: 'from-yellow-400 to-amber-500' },
    { title: 'Création de Logos', desc: 'Conception d\'identités visuelles uniques et mémorables — logos professionnels adaptés à votre marque et votre secteur.', color: 'from-pink-500 to-rose-400' },
    { title: 'Affiches Publicitaires', desc: 'Design d\'affiches et visuels marketing percutants pour vos campagnes print et digitales.', color: 'from-orange-400 to-red-500' },
    { title: 'Flyers & Supports Print', desc: 'Création de flyers, dépliants et supports de communication print prêts à l\'impression, aux couleurs de votre marque.', color: 'from-teal-400 to-cyan-500' },
  ],
  en: [
    { title: 'Web Development', desc: 'Creation of showcase sites, web applications and fast, secure, scalable e-commerce platforms.', color: 'from-blue-500 to-cyan-400' },
    { title: 'UI/UX Design', desc: 'Design of aesthetic user interfaces centered on experience and conversion.', color: 'from-purple-500 to-pink-400' },
    { title: 'IT Consulting', desc: 'Strategic guidance on technology choices and architecture for your digital projects.', color: 'from-amber-400 to-orange-500' },
    { title: 'Maintenance & Support', desc: 'Updates, security patches and continuous optimization of your existing infrastructure.', color: 'from-emerald-400 to-green-500' },
    { title: 'SEO & Performance', desc: 'Load time and organic search optimization for better visibility.', color: 'from-cyan-400 to-teal-400' },
    { title: 'Training', desc: 'Skills transfer on modern web technologies (React, Node.js, best practices).', color: 'from-indigo-500 to-blue-500' },
    { title: 'Mobile Applications', desc: 'Cross-platform mobile application development with React Native for iOS and Android.', color: 'from-rose-500 to-pink-500' },
    { title: 'API & Web Services Integration', desc: 'Connecting your tools via REST APIs, webhooks and third-party services (payments, CRM, maps...).', color: 'from-violet-500 to-purple-500' },
    { title: 'Content Management (CMS)', desc: 'Setting up custom CMS (WordPress, Sanity, Strapi) so you can manage your content easily.', color: 'from-yellow-400 to-amber-500' },
    { title: 'Logo Creation', desc: 'Design of unique, memorable visual identities — professional logos adapted to your brand and sector.', color: 'from-pink-500 to-rose-400' },
    { title: 'Advertising Posters', desc: 'Design of impactful advertising posters and marketing visuals for your print and digital campaigns.', color: 'from-orange-400 to-red-500' },
    { title: 'Flyers & Print Materials', desc: 'Creation of flyers, brochures and print communication materials ready to print, in your brand colors.', color: 'from-teal-400 to-cyan-500' },
  ],
  es: [
    { title: 'Desarrollo Web', desc: 'Creación de sitios vitrina, aplicaciones web y plataformas de comercio electrónico rápidas, seguras y escalables.', color: 'from-blue-500 to-cyan-400' },
    { title: 'Diseño UI/UX', desc: 'Diseño de interfaces de usuario estéticas centradas en la experiencia y la conversión.', color: 'from-purple-500 to-pink-400' },
    { title: 'Consultoría IT', desc: 'Orientación estratégica en la elección de tecnologías y arquitectura para sus proyectos digitales.', color: 'from-amber-400 to-orange-500' },
    { title: 'Mantenimiento & Soporte', desc: 'Actualizaciones, parches de seguridad y optimización continua de su infraestructura existente.', color: 'from-emerald-400 to-green-500' },
    { title: 'SEO & Rendimiento', desc: 'Optimización del tiempo de carga y el posicionamiento natural para mayor visibilidad.', color: 'from-cyan-400 to-teal-400' },
    { title: 'Formación', desc: 'Transferencia de competencias en tecnologías web modernas (React, Node.js, buenas prácticas).', color: 'from-indigo-500 to-blue-500' },
    { title: 'Aplicaciones Móviles', desc: 'Desarrollo de aplicaciones móviles multiplataforma con React Native para iOS y Android.', color: 'from-rose-500 to-pink-500' },
    { title: 'Integración API & Web Services', desc: 'Conexión de sus herramientas mediante APIs REST, webhooks y servicios de terceros (pagos, CRM, mapas...).', color: 'from-violet-500 to-purple-500' },
    { title: 'Gestión de Contenido (CMS)', desc: 'Implementación de CMS personalizados (WordPress, Sanity, Strapi) para gestionar su contenido fácilmente.', color: 'from-yellow-400 to-amber-500' },
    { title: 'Creación de Logos', desc: 'Diseño de identidades visuales únicas y memorables — logos profesionales adaptados a su marca y sector.', color: 'from-pink-500 to-rose-400' },
    { title: 'Carteles Publicitarios', desc: 'Diseño de carteles publicitarios y visuales de marketing impactantes para sus campañas impresas y digitales.', color: 'from-orange-400 to-red-500' },
    { title: 'Flyers & Materiales Impresos', desc: 'Creación de flyers, folletos y soportes de comunicación impresos listos para imprimir, en los colores de su marca.', color: 'from-teal-400 to-cyan-500' },
  ],
};

// ─── MAIN TRANSLATIONS ─────────────────────────────────────────────────────────
const translations = {
  fr: {
    nav: {
      home: 'Accueil', about: 'À Propos', services: 'Services', portfolio: 'Réalisations',
      process: 'Processus', contact: 'Contact',
    },
    home: {
      badge: 'Disponible pour de nouvelles missions',
      greeting: 'Bonjour, je suis',
      roles: ['Développeur Web', 'Consultant IT', 'Créateur de Solutions'],
      tagline: "Je conçois des expériences digitales sur mesure — alliant design minimaliste et performances techniques pour donner vie à vos projets.",
      cta1: "Discuter d'un projet",
      cta2: 'Voir mon travail',
      stats: { projects: 'Projets livrés', clients: 'Clients satisfaits', years: "Années d'expérience", satisfaction: 'Satisfaction' },
      expertise: {
        title: 'Expertise technique &',
        titleHighlight: 'Vision créative',
        desc: "Mon approche se situe à l'intersection du code pur et du design émotionnel. Je ne crée pas de simples sites web, je construis des écosystèmes digitaux qui convertissent.",
        link: 'En savoir plus sur mon parcours',
        items: [
          { title: 'Développement Front-End', desc: 'Interfaces réactives, accessibles et animées avec précision.' },
          { title: 'Architecture Back-End', desc: 'API robustes, bases de données optimisées et sécurité sans faille.' },
          { title: 'UI/UX Design', desc: 'Parcours utilisateurs intuitifs et esthétiques mémorables.' },
        ],
      },
      testimonialsTitle: 'Ce qu\'ils',
      testimonialsHighlight: 'disent',
      testimonialsSubtitle: 'La satisfaction de mes clients est ma meilleure carte de visite.',
      faqTitle: 'Questions',
      faqHighlight: 'Fréquentes',
      faqSubtitle: 'Retrouvez les réponses aux interrogations les plus courantes.',
      faqCta: 'Une autre question ?',
      faqCtaLink: 'Contactez-moi sur WhatsApp',
    },
    about: {
      title: 'À Propos',
      bio: "Développeur web béninois passionné, j'allie expertise technique (React, Node.js, Python) et sensibilité design pour créer des solutions numériques performantes, esthétiques et sur-mesure pour entreprises et particuliers.",
      skillsTitle: 'Compétences Techniques',
      experienceTitle: 'Parcours',
      educationTitle: 'Formation',
      education: {
        licence: { period: 'En cours — Juin 2027', title: 'Licence en Informatique', school: 'LES COURS SONOU — Développement Web & Logiciel', badge: 'Diplôme prévu — Juin 2027' },
        bac: { period: 'Obtenu en 2024', title: 'Baccalauréat (BAC)', school: 'Série scientifique — Bénin', badge: 'Diplôme obtenu — 2024' },
      },
    },
    services: {
      title: 'Mes',
      titleHighlight: 'Services',
      subtitle: "Une gamme complète de prestations pour vous accompagner dans votre transformation digitale, de l'idée à la production.",
      ctaTitle: 'Un besoin spécifique ?',
      ctaDesc: "Chaque projet est unique. Contactez-moi pour discuter de la solution la plus adaptée à vos enjeux.",
      cta1: 'Demander un devis',
      cta2: 'Contacter sur WhatsApp',
    },
    portfolio: {
      title: 'Mes Réalisations',
      subtitle: 'Découvrez une sélection de mes projets réels.',
      portfolioBtn: 'Ouvrir le Portfolio',
      portfolioCard: 'Voir mon Portfolio complet',
      portfolioCardDesc: "Accédez à mon portfolio interactif pour découvrir l'ensemble de mes projets et réalisations.",
      inProgress: 'En cours',
      inProgressTitle: 'En cours de réalisation',
      filterAll: 'Tous',
      search: 'Rechercher un projet, une tech...',
      noResult: 'Aucun projet trouvé',
      noResultDesc: 'Essayez de modifier vos filtres ou votre recherche.',
      reset: 'Réinitialiser les filtres',
      openProject: 'Voir le projet',
      progress: 'Avancement',
    },
    process: {
      title: 'Mon',
      titleHighlight: 'Processus',
      subtitle: "Une méthodologie agile et transparente, pensée pour transformer votre vision en réalité tout en maîtrisant les délais et les coûts.",
    },
    contact: {
      title: 'Discutons de votre',
      titleHighlight: 'Projet',
      subtitle: "Une idée ? Une question ? Je suis à votre écoute.",
      coordTitle: 'Mes Coordonnées',
      email: 'Email', phone: 'Téléphone', location: 'Localisation',
      locationText: 'Cotonou, Bénin\nDisponible en remote mondial',
      whatsapp: 'Discuter sur WhatsApp',
      formName: 'Nom complet', formEmail: 'Adresse email', formPhone: 'Téléphone / WhatsApp', formSubject: 'Sujet', formMessage: 'Message',
      formNamePH: 'Jean Dupont', formPhonePH: '+229 01 00 00 00 00', formSubjectPH: 'Refonte de site web...', formMsgPH: 'Décrivez votre projet en quelques mots...',
      send: 'Envoyer le message', sending: 'Envoi en cours...',
      note: "Remplissez ce formulaire pour m'envoyer un email directement.",
    },
    footer: {
      tagline: "Développeur Web & Consultant IT spécialisé dans la création de solutions numériques performantes, esthétiques et sur-mesure.",
      quickLinks: 'Liens Rapides', contactSection: 'Contact',
      legal: 'Mentions légales', privacy: 'Politique de confidentialité', rights: 'Tous droits réservés.',
    },
    testimonials: TESTIMONIALS_DATA.fr,
    faq: FAQ_DATA.fr,
    processSteps: PROCESS_DATA.fr,
    servicesData: SERVICES_DATA.fr,
  },

  en: {
    nav: {
      home: 'Home', about: 'About', services: 'Services', portfolio: 'Portfolio',
      process: 'Process', contact: 'Contact',
    },
    home: {
      badge: 'Available for new missions',
      greeting: 'Hello, I am',
      roles: ['Web Developer', 'IT Consultant', 'Solutions Creator'],
      tagline: "I design tailored digital experiences — combining minimalist design and technical performance to bring your projects to life.",
      cta1: 'Discuss a project',
      cta2: 'See my work',
      stats: { projects: 'Projects delivered', clients: 'Satisfied clients', years: 'Years of experience', satisfaction: 'Satisfaction' },
      expertise: {
        title: 'Technical expertise &',
        titleHighlight: 'Creative vision',
        desc: "My approach sits at the intersection of pure code and emotional design. I don't create simple websites — I build digital ecosystems that convert.",
        link: 'Learn more about my journey',
        items: [
          { title: 'Front-End Development', desc: 'Reactive, accessible and precisely animated interfaces.' },
          { title: 'Back-End Architecture', desc: 'Robust APIs, optimized databases and airtight security.' },
          { title: 'UI/UX Design', desc: 'Intuitive user journeys and memorable aesthetics.' },
        ],
      },
      testimonialsTitle: 'What they',
      testimonialsHighlight: 'say',
      testimonialsSubtitle: 'Client satisfaction is my best business card.',
      faqTitle: 'Frequently Asked',
      faqHighlight: 'Questions',
      faqSubtitle: 'Find answers to the most common questions.',
      faqCta: 'Another question?',
      faqCtaLink: 'Contact me on WhatsApp',
    },
    about: {
      title: 'About',
      bio: "Passionate Beninese web developer, I combine technical expertise (React, Node.js, Python) with design sensibility to create high-performance, aesthetic and tailor-made digital solutions for businesses and individuals.",
      skillsTitle: 'Technical Skills',
      experienceTitle: 'Journey',
      educationTitle: 'Education',
      education: {
        licence: { period: 'Ongoing — June 2027', title: 'Bachelor in Computer Science', school: 'LES COURS SONOU — Web & Software Development', badge: 'Degree expected — June 2027' },
        bac: { period: 'Obtained in 2024', title: 'High School Diploma (BAC)', school: 'Science series — Benin', badge: 'Degree obtained — 2024' },
      },
    },
    services: {
      title: 'My',
      titleHighlight: 'Services',
      subtitle: 'A comprehensive range of services to support your digital transformation, from idea to production.',
      ctaTitle: 'A specific need?',
      ctaDesc: 'Every project is unique. Contact me to discuss the most suitable solution for your needs.',
      cta1: 'Request a quote',
      cta2: 'Contact on WhatsApp',
    },
    portfolio: {
      title: 'My Work',
      subtitle: 'Discover a selection of my real projects.',
      portfolioBtn: 'Open Portfolio',
      portfolioCard: 'View my full Portfolio',
      portfolioCardDesc: 'Access my interactive portfolio to discover all my projects and achievements.',
      inProgress: 'In progress',
      inProgressTitle: 'Currently in development',
      filterAll: 'All',
      search: 'Search a project, a tech...',
      noResult: 'No project found',
      noResultDesc: 'Try modifying your filters or search.',
      reset: 'Reset filters',
      openProject: 'View project',
      progress: 'Progress',
    },
    process: {
      title: 'My',
      titleHighlight: 'Process',
      subtitle: "An agile and transparent methodology designed to turn your vision into reality while controlling deadlines and costs.",
    },
    contact: {
      title: "Let's talk about your",
      titleHighlight: 'Project',
      subtitle: 'An idea? A question? I am at your disposal.',
      coordTitle: 'My Contacts',
      email: 'Email', phone: 'Phone', location: 'Location',
      locationText: 'Cotonou, Benin\nAvailable worldwide remotely',
      whatsapp: 'Chat on WhatsApp',
      formName: 'Full name', formEmail: 'Email address', formPhone: 'Phone / WhatsApp', formSubject: 'Subject', formMessage: 'Message',
      formNamePH: 'John Doe', formPhonePH: '+229 01 00 00 00 00', formSubjectPH: 'Website redesign...', formMsgPH: 'Describe your project in a few words...',
      send: 'Send message', sending: 'Sending...',
      note: 'Fill out this form to send me an email directly.',
    },
    footer: {
      tagline: 'Web Developer & IT Consultant specializing in high-performance, aesthetic and tailor-made digital solutions.',
      quickLinks: 'Quick Links', contactSection: 'Contact',
      legal: 'Legal notice', privacy: 'Privacy policy', rights: 'All rights reserved.',
    },
    testimonials: TESTIMONIALS_DATA.en,
    faq: FAQ_DATA.en,
    processSteps: PROCESS_DATA.en,
    servicesData: SERVICES_DATA.en,
  },

  es: {
    nav: {
      home: 'Inicio', about: 'Sobre mí', services: 'Servicios', portfolio: 'Proyectos',
      process: 'Proceso', contact: 'Contacto',
    },
    home: {
      badge: 'Disponible para nuevas misiones',
      greeting: 'Hola, soy',
      roles: ['Desarrollador Web', 'Consultor IT', 'Creador de Soluciones'],
      tagline: "Diseño experiencias digitales a medida — combinando diseño minimalista y rendimiento técnico para dar vida a sus proyectos.",
      cta1: 'Hablar de un proyecto',
      cta2: 'Ver mi trabajo',
      stats: { projects: 'Proyectos entregados', clients: 'Clientes satisfechos', years: 'Años de experiencia', satisfaction: 'Satisfacción' },
      expertise: {
        title: 'Experiencia técnica &',
        titleHighlight: 'Visión creativa',
        desc: "Mi enfoque está en la intersección del código puro y el diseño emocional. No creo simples sitios web, construyo ecosistemas digitales que convierten.",
        link: 'Más sobre mi trayectoria',
        items: [
          { title: 'Desarrollo Front-End', desc: 'Interfaces reactivas, accesibles y animadas con precisión.' },
          { title: 'Arquitectura Back-End', desc: 'APIs robustas, bases de datos optimizadas y seguridad sólida.' },
          { title: 'Diseño UI/UX', desc: 'Recorridos de usuario intuitivos y estéticas memorables.' },
        ],
      },
      testimonialsTitle: 'Lo que',
      testimonialsHighlight: 'dicen',
      testimonialsSubtitle: 'La satisfacción de mis clientes es mi mejor tarjeta de visita.',
      faqTitle: 'Preguntas',
      faqHighlight: 'Frecuentes',
      faqSubtitle: 'Encuentre respuestas a las preguntas más comunes.',
      faqCta: '¿Otra pregunta?',
      faqCtaLink: 'Contácteme por WhatsApp',
    },
    about: {
      title: 'Sobre mí',
      bio: "Desarrollador web beninés apasionado, combino experiencia técnica (React, Node.js, Python) y sensibilidad por el diseño para crear soluciones digitales de alto rendimiento, estéticas y a medida para empresas y particulares.",
      skillsTitle: 'Competencias Técnicas',
      experienceTitle: 'Trayectoria',
      educationTitle: 'Formación',
      education: {
        licence: { period: 'En curso — Junio 2027', title: 'Licenciatura en Informática', school: 'LES COURS SONOU — Desarrollo Web y Software', badge: 'Diploma previsto — Junio 2027' },
        bac: { period: 'Obtenido en 2024', title: 'Bachillerato (BAC)', school: 'Serie científica — Benín', badge: 'Diploma obtenido — 2024' },
      },
    },
    services: {
      title: 'Mis',
      titleHighlight: 'Servicios',
      subtitle: 'Una gama completa de prestaciones para acompañarle en su transformación digital, de la idea a la producción.',
      ctaTitle: '¿Una necesidad específica?',
      ctaDesc: 'Cada proyecto es único. Contácteme para hablar de la solución más adecuada a sus necesidades.',
      cta1: 'Solicitar un presupuesto',
      cta2: 'Contactar por WhatsApp',
    },
    portfolio: {
      title: 'Mis Realizaciones',
      subtitle: 'Descubra una selección de mis proyectos reales.',
      portfolioBtn: 'Abrir Portfolio',
      portfolioCard: 'Ver mi Portfolio completo',
      portfolioCardDesc: 'Acceda a mi portfolio interactivo para descubrir todos mis proyectos y realizaciones.',
      inProgress: 'En progreso',
      inProgressTitle: 'Actualmente en desarrollo',
      filterAll: 'Todos',
      search: 'Buscar un proyecto, una tecnología...',
      noResult: 'Ningún proyecto encontrado',
      noResultDesc: 'Intente modificar sus filtros o búsqueda.',
      reset: 'Restablecer filtros',
      openProject: 'Ver el proyecto',
      progress: 'Progreso',
    },
    process: {
      title: 'Mi',
      titleHighlight: 'Proceso',
      subtitle: "Una metodología ágil y transparente, pensada para transformar su visión en realidad controlando los plazos y costos.",
    },
    contact: {
      title: 'Hablemos de su',
      titleHighlight: 'Proyecto',
      subtitle: '¿Una idea? ¿Una pregunta? Estoy a su disposición.',
      coordTitle: 'Mis Contactos',
      email: 'Correo electrónico', phone: 'Teléfono', location: 'Ubicación',
      locationText: 'Cotonou, Benín\nDisponible en remoto mundial',
      whatsapp: 'Chatear en WhatsApp',
      formName: 'Nombre completo', formEmail: 'Correo electrónico', formPhone: 'Teléfono / WhatsApp', formSubject: 'Asunto', formMessage: 'Mensaje',
      formNamePH: 'Juan García', formPhonePH: '+229 01 00 00 00 00', formSubjectPH: 'Rediseño de sitio web...', formMsgPH: 'Describa su proyecto en pocas palabras...',
      send: 'Enviar mensaje', sending: 'Enviando...',
      note: 'Complete este formulario para enviarme un correo electrónico directamente.',
    },
    footer: {
      tagline: 'Desarrollador Web y Consultor IT especializado en soluciones digitales de alto rendimiento, estéticas y a medida.',
      quickLinks: 'Enlaces Rápidos', contactSection: 'Contacto',
      legal: 'Aviso legal', privacy: 'Política de privacidad', rights: 'Todos los derechos reservados.',
    },
    testimonials: TESTIMONIALS_DATA.es,
    faq: FAQ_DATA.es,
    processSteps: PROCESS_DATA.es,
    servicesData: SERVICES_DATA.es,
  },
};

export type Translations = typeof translations.fr;

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: translations.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('portfolio-lang') as Language) || 'fr';
  });

  const setLang = (l: Language) => {
    localStorage.setItem('portfolio-lang', l);
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
