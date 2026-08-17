import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, Send, Info, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import emailjs from '@emailjs/browser';

const WHATSAPP_URL = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '2290161013119'}`;

const PREDEFINED_SUBJECTS = [
  { id: 'web-dev', label: 'Développement Web', icon: '🌐' },
  { id: 'design', label: 'Design & UI/UX', icon: '🎨' },
  { id: 'consultation', label: 'Consultation', icon: '💡' },
  { id: 'maintenance', label: 'Maintenance & Support', icon: '🔧' },
  { id: 'other', label: 'Autre (à préciser)', icon: '✏️' },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLang();
  const ct = t.contact;
  const [selectedSubjectType, setSelectedSubjectType] = useState<string>('web-dev');
  const [showSubjects, setShowSubjects] = useState<boolean>(true);

  const contactSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    whatsapp: z.string().optional().refine(
      (val) => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val),
      'Numéro WhatsApp invalide'
    ),
    subjectType: z.string(),
    subjectCustom: z.string().optional(),
    subject: z.string(),
    message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  }).superRefine((data, ctx) => {
    if (data.subjectType === 'other' && (!data.subjectCustom || data.subjectCustom.trim().length < 3)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['subjectCustom'],
        message: 'Veuillez préciser le sujet (au moins 3 caractères)',
      });
    }
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { 
      name: '', 
      email: '', 
      whatsapp: '',
      subjectType: 'web-dev',
      subjectCustom: '',
      subject: 'Développement Web',
      message: '' 
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const finalSubject = data.subjectType === 'other' ? data.subjectCustom : data.subject;
    
    try {
      // Préparer le message pour WhatsApp (format simplifié sans caractères spéciaux)
      const whatsappMessage = `Nouveau message du portfolio\n\nNom: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.whatsapp || 'Non renseigne'}\nSujet: ${finalSubject}\n\nMessage:\n${data.message}`;

      // Ouvrir WhatsApp avec le message pré-rempli
      const whatsappUrl = `https://wa.me/2290161013119?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Envoyer aussi par email comme backup
      try {
        const templateParams = {
          to_name: 'Faucar AMETEPE',
          from_name: data.name,
          from_email: data.email,
          whatsapp: data.whatsapp || 'Non renseigné',
          subject: finalSubject,
          message: data.message,
        };

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_285axoo',
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_jck7668',
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'VPhXc8psc2H3gyDuc'
        );
      } catch (emailError) {
        console.error('EmailJS backup failed:', emailError);
      }

      toast({ 
        title: 'WhatsApp ouvert !', 
        description: 'Veuillez confirmer l\'envoi du message dans WhatsApp.' 
      });
      form.reset();
      setSelectedSubjectType('web-dev');
    } catch (error) {
      console.error('Error:', error);
      toast({ 
        title: 'Erreur lors de l\'envoi', 
        description: 'Une erreur est survenue. Veuillez me contacter directement par WhatsApp.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {ct.title} <span className="text-primary">{ct.titleHighlight}</span>
        </h1>
        <p className="text-lg text-muted-foreground">{ct.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-card border border-border shadow-lg"
          >
            <h3 className="text-2xl font-display font-bold mb-8">{ct.coordTitle}</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{ct.email}</h4>
                  <a href="mailto:faucar3@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    faucar3@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{ct.phone}</h4>
                  <a href="tel:+2290161013119" className="text-muted-foreground hover:text-secondary transition-colors">
                    +229 01 61 01 31 19
                  </a>
                  <span className="text-muted-foreground"> / </span>
                  <a href="tel:+2290155468880" className="text-muted-foreground hover:text-secondary transition-colors">
                    01 55 46 88 80 
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp</h4>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-green-500 transition-colors">
                    +229 01 61 01 31 19
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{ct.location}</h4>
                  <p className="text-muted-foreground whitespace-pre-line">{ct.locationText}</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-border" />

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <WhatsAppIcon />
              {ct.whatsapp}
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground flex gap-3">
              <Info className="shrink-0 text-primary" size={20} />
              <p>{ct.note}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ct.formName}</FormLabel>
                        <FormControl><Input placeholder={ct.formNamePH} className="bg-background" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ct.formEmail}</FormLabel>
                        <FormControl><Input placeholder="jean@exemple.com" type="email" className="bg-background" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp (optionnel)</FormLabel>
                      <FormControl><Input placeholder="+229 01 00 00 00" type="tel" className="bg-background" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Selection Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-6 rounded-xl font-semibold text-base border-2 hover:bg-muted transition-all"
                  onClick={() => setShowSubjects(!showSubjects)}
                >
                  {showSubjects ? '▼ Masquer les sujets' : '▶ Choisir un sujet'}
                </Button>

                {/* Subject Selection - Only show when button is clicked */}
                {showSubjects && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="subjectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup 
                              value={field.value} 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedSubjectType(value);
                                // Auto-update subject field based on selection
                                const selectedSubject = PREDEFINED_SUBJECTS.find(s => s.id === value);
                                if (selectedSubject && value !== 'other') {
                                  form.setValue('subject', selectedSubject.label);
                                }
                              }}
                              className="space-y-3"
                            >
                              {PREDEFINED_SUBJECTS.map((subj) => (
                                <div key={subj.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                                  <RadioGroupItem value={subj.id} id={subj.id} />
                                  <label 
                                    htmlFor={subj.id} 
                                    className="flex-1 cursor-pointer flex items-center gap-2 font-medium text-sm"
                                  >
                                    <span className="text-lg">{subj.icon}</span>
                                    {subj.label}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Custom Subject Input - Only show when "other" is selected */}
                    {selectedSubjectType === 'other' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <FormField
                          control={form.control}
                          name="subjectCustom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Précisez votre sujet</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Décrivez brièvement votre demande..." 
                                  className="bg-background" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Hidden subject field for form submission */}
                <input 
                  type="hidden" 
                  {...form.register('subject')} 
                  value={selectedSubjectType === 'other' ? form.getValues('subjectCustom') || '' : form.getValues('subject')} 
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ct.formMessage}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={ct.formMsgPH} className="min-h-[150px] bg-background resize-y" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    type="submit"
                    className="flex-1 px-8 py-6 rounded-full text-base gap-2 glow-effect"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? ct.sending : (
                      <><span>{ct.send}</span><Send size={18} /></>
                    )}
                  </Button>
                 
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
