import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, Send, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("L'adresse email est invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    // Simulated EmailJS integration
    console.log("Form data:", data);
    
    // Demonstrate configuration needed
    toast({
      title: "Configuration EmailJS requise",
      description: "Le formulaire est prêt, mais vous devez configurer vos clés EmailJS pour l'envoi réel.",
      duration: 5000,
    });
    
    // Simulated success after delay
    setTimeout(() => {
      toast({
        title: "Message envoyé ! (Simulation)",
        description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
      });
      form.reset();
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Discutons de votre <span className="text-primary">Projet</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Une idée ? Une question ? Ou simplement l'envie d'échanger sur les technologies web ? Je suis à votre écoute.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-card border border-border shadow-lg"
          >
            <h3 className="text-2xl font-display font-bold mb-8">Mes Coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:contact@monsieurfaucar.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@monsieurfaucar.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Téléphone</h4>
                  <a href="tel:+2290161013119" className="text-muted-foreground hover:text-secondary transition-colors">
                    +229 01 61 01 31 19
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Localisation</h4>
                  <p className="text-muted-foreground">
                    Cotonou, Bénin<br />
                    Disponible en remote mondial
                  </p>
                </div>
              </div>
            </div>
            
            <hr className="my-8 border-border" />
            
            <a 
              href="https://wa.me/2290161013119" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-4 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Discuter sur WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-lg relative overflow-hidden"
          >
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground flex gap-3">
              <Info className="shrink-0 text-primary" size={20} />
              <p>
                Remplissez ce formulaire pour m'envoyer un email directement. 
                <br className="hidden md:block" />(Note dev: Intégration EmailJS à configurer avec vos clés).
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse email</FormLabel>
                        <FormControl>
                          <Input placeholder="jean@exemple.com" type="email" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                        <FormControl>
                        <Input placeholder="Refonte de site web..." className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre projet en quelques mots..." 
                          className="min-h-[150px] bg-background resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-6 rounded-full text-base gap-2 glow-effect"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer le message
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
