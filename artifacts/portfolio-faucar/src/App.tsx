import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/Layout';
import NotFound from '@/pages/not-found';

import Home from '@/pages/Home';
import APropos from '@/pages/APropos';
import MesServices from '@/pages/MesServices';
import Portfolio from '@/pages/Portfolio';
import ProjetsEnCours from '@/pages/ProjetsEnCours';
import MonProcessus from '@/pages/MonProcessus';
import Temoignages from '@/pages/Temoignages';
import Faq from '@/pages/Faq';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/a-propos" component={APropos} />
      <Route path="/mes-services" component={MesServices} />
      <Route path="/realisations" component={Portfolio} />
      <Route path="/projets-en-cours" component={ProjetsEnCours} />
      <Route path="/mon-processus" component={MonProcessus} />
      <Route path="/temoignages" component={Temoignages} />
      <Route path="/faq" component={Faq} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
