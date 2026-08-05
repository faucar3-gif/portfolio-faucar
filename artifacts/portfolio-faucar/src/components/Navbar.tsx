import { Link, useLocation } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Menu, X, Sun, Moon, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { path: '/', label: 'Accueil' },
  { path: '/a-propos', label: 'À Propos' },
  { path: '/mes-services', label: 'Services' },
  { path: '/realisations', label: 'Réalisations' },
  { path: '/projets-en-cours', label: 'En cours' },
  { path: '/mon-processus', label: 'Processus' },
  { path: '/temoignages', label: 'Témoignages' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const progress = useScrollProgress();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300',
          scrolled ? 'glass-panel border-b-0 py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-xl shadow-lg group-hover:shadow-primary/50 transition-shadow">
              MF
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
              Faucar AMETEPE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative py-1',
                  location === link.path ? 'text-primary' : 'text-foreground/80'
                )}
              >
                {link.label}
                {location === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground/80 hover:text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-muted w-full">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-10"
          >
            <nav className="flex flex-col items-center gap-6 w-full px-6 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    'text-2xl font-display font-medium transition-colors w-full text-center py-2',
                    location === link.path ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
