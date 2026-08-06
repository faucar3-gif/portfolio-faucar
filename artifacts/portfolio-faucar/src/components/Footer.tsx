import { Facebook, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/2290161013119';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61591472633000';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { t } = useLang();
  const ft = t.footer;

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-card border-t border-border py-12 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4 inline-flex">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-sm">
                MF
              </div>
              <span className="font-display font-bold text-lg tracking-tight">Faucar AMETEPE</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">{ft.tagline}</p>
            <div className="flex items-center gap-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors border border-border"
                style={{ color: '#25D366' }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="mailto:faucar3@gmail.com"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">{ft.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/mes-services" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.services}</Link></li>
              <li><Link href="/realisations" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.portfolio}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">{ft.contactSection}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Cotonou, Bénin</li>
              <li>+229 01 61 01 31 19</li>
              <li>
                <a href="mailto:faucar3@gmail.com" className="hover:text-primary transition-colors">
                  faucar3@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Faucar AMETEPE. {ft.rights}
          </p>
          <div className="text-sm text-muted-foreground flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">{ft.legal}</Link>
            <Link href="#" className="hover:text-primary transition-colors">{ft.privacy}</Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-110 transition-all z-40 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
