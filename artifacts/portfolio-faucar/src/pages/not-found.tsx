import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border p-10 rounded-3xl shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-destructive/10 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} />
          </div>
          
          <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-display font-semibold mb-4 text-muted-foreground">
            Page introuvable
          </h2>
          
          <p className="text-muted-foreground mb-10 leading-relaxed">
            La page que vous recherchez semble s'être égarée dans le cyberespace. 
            Vérifiez l'URL ou retournez à la sécurité de la page d'accueil.
          </p>
          
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20">
            <Home size={18} />
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
