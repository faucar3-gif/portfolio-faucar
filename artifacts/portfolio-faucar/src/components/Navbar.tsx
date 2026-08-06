import { Link, useLocation } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, Language } from '@/contexts/LanguageContext';

const LANG_OPTIONS: { value: Language; label: string; flag: string }[] = [
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, lang, setLang } = useLang();
  const progress = useScrollProgress();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { path: '/', label: t.nav.home },
    { path: '/a-propos', label: t.nav.about },
    { path: '/mes-services', label: t.nav.services },
    { path: '/realisations', label: t.nav.portfolio },
    { path: '/mon-processus', label: t.nav.process },
    { path: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = LANG_OPTIONS.find(o => o.value === lang)!;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300',
          scrolled ? 'glass-panel border-b-0 py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-lg shadow-lg group-hover:shadow-primary/50 transition-shadow">
              MF
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
              Faucar AMETEPE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative py-1 whitespace-nowrap',
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
          </nav>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-card border border-border hover:bg-muted transition-colors"
              >
                <span>{currentLang.flag}</span>
                <span className="uppercase text-xs font-bold tracking-wider">{lang}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    {LANG_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setLang(opt.value); setLangOpen(false); }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left',
                          lang === opt.value ? 'text-primary font-semibold bg-primary/5' : 'text-foreground/80'
                        )}
                      >
                        <span className="text-base">{opt.flag}</span>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile lang switcher (compact) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-bold bg-card border border-border"
              >
                <span>{currentLang.flag}</span>
                <span className="uppercase">{lang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    {LANG_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setLang(opt.value); setLangOpen(false); }}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-muted transition-colors',
                          lang === opt.value ? 'text-primary font-semibold' : 'text-foreground/80'
                        )}
                      >
                        <span>{opt.flag}</span>{opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
            <nav className="flex flex-col items-center gap-5 w-full px-6 overflow-y-auto">
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
