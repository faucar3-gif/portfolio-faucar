import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Terminal, MonitorSmartphone, Star, Quote, ChevronDown } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import photoFaucar from '@assets/fauacr_1785936519611.jpeg';
import testimonialSophie from '@assets/testimonial-sophie.jpg';
import testimonialMarc from '@assets/testimonial-marc.jpg';
import testimonialJulie from '@assets/testimonial-julie.jpg';
import { useLang } from '@/contexts/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/2290161013119';

const TESTIMONIAL_PHOTOS = [testimonialSophie, testimonialMarc, testimonialJulie];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const EXPERTISE_ICONS = [Terminal, Code, MonitorSmartphone];

export default function Home() {
  const { t } = useLang();
  const ht = t.home;

  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(0);

  const roles = ht.roles;

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && typedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.substring(0, typedText.length - 1)
        : currentRole.substring(0, typedText.length + 1);
      timeout = setTimeout(() => setTypedText(nextText), isDeleting ? 50 : 100);
    }
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex, roles]);

  // Reset typewriter when language changes
  useEffect(() => {
    setTypedText('');
    setRoleIndex(0);
    setIsDeleting(false);
  }, [roles]);

  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const projectsCount  = useCountUp(25,  2000, statsInView);
  const clientsCount   = useCountUp(20,  2000, statsInView);
  const yearsCount     = useCountUp(3,   1500, statsInView);
  const satisfactionCount = useCountUp(80, 2000, statsInView);

  const stats = [
    { label: ht.stats.projects,     value: projectsCount,     suffix: '+' },
    { label: ht.stats.clients,      value: clientsCount,      suffix: '+' },
    { label: ht.stats.years,        value: yearsCount,        suffix: '+' },
    { label: ht.stats.satisfaction, value: satisfactionCount, suffix: '%' },
  ];

  return (
    <div className="flex-1">
      {/* ── HERO ── */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto z-10 flex flex-col items-center"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/30 ring-4 ring-primary/10">
              <img src={photoFaucar} alt="Faucar AMETEPE" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </div>
          </motion.div>

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {ht.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            {ht.greeting} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Faucar AMETEPE
            </span>
          </h1>

          <div className="h-12 md:h-16 mb-8 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl text-muted-foreground font-display">
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {ht.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-effect flex items-center justify-center gap-2"
            >
              {ht.cta1}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/realisations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-card border border-border text-card-foreground font-medium hover:bg-muted transition-all flex items-center justify-center gap-2"
            >
              {ht.cta2}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-20 border-y border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border">
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {ht.expertise.title} <br />
                <span className="text-primary">{ht.expertise.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {ht.expertise.desc}
              </p>
              <Link href="/a-propos" className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                {ht.expertise.link} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6">
              {ht.expertise.items.map((item, i) => {
                const Icon = EXPERTISE_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl glass-panel group hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {ht.testimonialsTitle}{' '}
              <span className="text-primary">{ht.testimonialsHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{ht.testimonialsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card border border-border p-8 rounded-3xl relative hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <Quote className="absolute top-8 right-8 text-primary/10 w-14 h-14" />

                <div className="flex items-center gap-1 mb-6 text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < testimonial.rating ? 'currentColor' : 'none'}
                      className={index >= testimonial.rating ? 'text-muted' : ''}
                    />
                  ))}
                </div>

                <p className="text-foreground/90 italic mb-8 relative z-10 leading-relaxed flex-1">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-border pt-6">
                  <img
                    src={TESTIMONIAL_PHOTOS[i]}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {ht.faqTitle}{' '}
              <span className="text-primary">{ht.faqHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{ht.faqSubtitle}</p>
          </div>

          <div className="space-y-3">
            {t.faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border bg-card rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqId(openFaqId === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-muted/50 transition-colors"
                >
                  <span className="font-display font-semibold text-base md:text-lg pr-8">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-primary transition-transform duration-300 flex-shrink-0 ${openFaqId === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqId === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">{ht.faqCta}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <WhatsAppIcon />
              {ht.faqCtaLink}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
