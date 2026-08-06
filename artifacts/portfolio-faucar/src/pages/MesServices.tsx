import { motion } from 'framer-motion';
import {
  Globe, Palette, Settings, Database, TrendingUp, Lightbulb,
  Smartphone, Link2, FileText, PenTool, Image, ScrollText
} from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/2290161013119';

// Icon list in order — matches servicesData index
const SERVICE_ICONS = [
  Globe, Palette, Lightbulb, Settings, TrendingUp, Database,
  Smartphone, Link2, FileText, PenTool, Image, ScrollText,
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function MesServices() {
  const { t } = useLang();
  const st = t.services;
  const services = t.servicesData;

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {st.title} <span className="text-primary">{st.titleHighlight}</span>
        </h1>
        <p className="text-lg text-muted-foreground">{st.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const Icon = SERVICE_ICONS[i] ?? Globe;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative h-full"
            >
              {/* Hover glow */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}
              />
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border shadow-lg transition-transform duration-500 group-hover:-translate-y-2 flex flex-col">
                <div
                  className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} shadow-inner`}
                >
                  <Icon size={28} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-24 text-center p-12 rounded-3xl bg-gradient-to-b from-card to-background border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
        <h2 className="text-3xl font-display font-bold mb-4 relative z-10">{st.ctaTitle}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10">{st.ctaDesc}</p>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform"
          >
            {st.cta1}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            <WhatsAppIcon />
            {st.cta2}
          </a>
        </div>
      </div>
    </div>
  );
}
