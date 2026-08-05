import { Facebook, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border py-12 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4 inline-flex">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-sm">
                MF
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Faucar AMETEPE
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Développeur Web et Consultant IT spécialisé dans la création de solutions numériques performantes, esthétiques et sur-mesure.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border">
                <Github size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border">
                <Facebook size={18} />
              </a>
              <a href="mailto:contact@monsieurfaucar.com" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">À Propos</Link></li>
              <li><Link href="/mes-services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/realisations" className="text-muted-foreground hover:text-primary transition-colors">Réalisations</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Cotonou, Bénin</li>
              <li>+229 01 61 01 31 19</li>
              <li>contact@monsieurfaucar.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Faucar AMETEPE. Tous droits réservés.
          </p>
          <div className="text-sm text-muted-foreground flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>

      {/* Back to top button */}
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
