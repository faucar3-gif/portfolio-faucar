# 📋 Analyse Détaillée du Projet Faucar

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Packages et dépendances](#packages-et-dépendances)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [Packages partagés](#packages-partagés)
7. [Configuration](#configuration)
8. [Flux de données](#flux-de-données)
9. [Commandes et workflows](#commandes-et-workflows)
10. [Points à noter](#points-à-noter)

---

## Vue d'ensemble

**Faucar** est un **monorepo pnpm** moderne contenant :
- 🎨 **Site Portfolio** (React + TypeScript)
- 🔧 **Serveur API** (Express.js + PostgreSQL)
- 🧪 **Bac à sable UI** (Pour tester les composants isolés)
- 📚 **Packages partagés** (Client API, Schemas, ORM Database)

**Stack principal :** TypeScript ESM, React 18+, Express 5, Drizzle ORM, Tailwind CSS, Radix UI

---

## Architecture

```
faucar/
│
├── 📁 artifacts/                    # Applications de production
│   ├── portfolio-faucar/            # Site portfolio principal
│   │   ├── src/
│   │   │   ├── App.tsx              # Composant racine React
│   │   │   ├── main.tsx             # Point d'entrée Vite
│   │   │   ├── components/          # Composants React
│   │   │   ├── pages/               # Pages du site
│   │   │   ├── contexts/            # Contextes React (Thème, Langue)
│   │   │   ├── hooks/               # Custom hooks
│   │   │   └── lib/                 # Utilitaires
│   │   ├── vite.config.ts           # Config Vite
│   │   ├── tsconfig.json            # TypeScript config
│   │   └── components.json          # Config shadcn/ui
│   │
│   ├── api-server/                  # Serveur API Express
│   │   ├── src/
│   │   │   ├── index.ts             # Point d'entrée
│   │   │   ├── app.ts               # Configuration Express
│   │   │   ├── routes/              # Routes API
│   │   │   ├── middlewares/         # Middlewares custom
│   │   │   └── lib/
│   │   │       └── logger.ts        # Logger Pino
│   │   ├── build.mjs                # Build script esbuild
│   │   ├── dist/                    # Build output
│   │   └── tsconfig.json
│   │
│   └── mockup-sandbox/              # Environnement de développement UI
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── components/
│       │       └── mockups/         # Composants de test
│       ├── vite.config.ts
│       ├── mockupPreviewPlugin.ts   # Plugin custom Vite
│       └── tsconfig.json
│
├── 📁 lib/                          # Packages partagés (workspace:*)
│   ├── api-spec/                    # Spécification OpenAPI + Codegen
│   │   ├── openapi.yaml             # Schéma API (source de vérité)
│   │   ├── orval.config.ts          # Config Orval (génère client/zod)
│   │   └── package.json
│   │
│   ├── api-client-react/            # Client API typé (React Query)
│   │   ├── src/
│   │   │   ├── index.ts             # Export public
│   │   │   ├── custom-fetch.ts      # Fetch personnalisée
│   │   │   └── generated/           # Code généré par Orval
│   │   │       ├── api.ts           # Endpoints générés
│   │   │       └── api.schemas.ts   # Types générés
│   │   └── package.json
│   │
│   ├── api-zod/                     # Schémas Zod générés
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── generated/
│   │   │       ├── api.ts           # Schemas Zod
│   │   │       └── types/           # Types TypeScript
│   │   └── package.json
│   │
│   └── db/                          # Drizzle ORM + Database schema
│       ├── src/
│       │   ├── index.ts
│       │   └── schema/
│       │       └── index.ts         # Tables Drizzle (vide pour l'instant)
│       ├── drizzle.config.ts        # Config Drizzle
│       └── package.json
│
├── 📁 scripts/                      # Scripts utilitaires
│   ├── src/
│   │   └── hello.ts
│   └── package.json
│
├── 📄 pnpm-workspace.yaml           # Configuration workspace pnpm
├── 📄 pnpm-lock.yaml                # Lockfile pnpm
├── 📄 tsconfig.base.json            # Config TypeScript de base
├── 📄 tsconfig.json                 # Config TypeScript root
├── 📄 package.json                  # Root package.json
├── 📄 README.md                     # Guide démarrage
└── 📄 replit.md                     # Config Replit
```

---

## Packages et dépendances

### 🌐 Frontend (portfolio-faucar)

**Dépendances principales :**
- **React** 18+ avec TypeScript
- **Vite** - Bundler/dev server ultra-rapide
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Composants UI headless accessibles
  - accordion, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, carousel, chart, checkbox, collapsible, command, context-menu, dialog, dropdown-menu, etc.
- **TanStack React Query** - Gestion d'état de données serveur
- **React Hook Form** - Gestion de formulaires légers
- **wouter** - Router client-side léger
- **@replit/vite-plugin-*** - Plugins Replit pour Vite
  - cartographer (cartographie routes)
  - dev-banner (banneau développement)
  - runtime-error-modal (modal erreurs)
- **@tailwindcss/typography** - Plugin typographie Tailwind
- **clsx** - Utilitaire pour classes CSS dynamiques

**Scripts :**
```json
{
  "dev": "vite --config vite.config.ts --host 0.0.0.0",
  "build": "vite build --config vite.config.ts",
  "serve": "vite preview --config vite.config.ts --host 0.0.0.0",
  "typecheck": "tsc -p tsconfig.json --noEmit"
}
```

### 🔧 Backend (api-server)

**Dépendances principales :**
- **Express** 5.2.1 - Web framework HTTP
- **Pino** - Logger haute performance
- **Pino HTTP** - Middleware logging pour Express
- **CORS** - Middleware CORS
- **cookie-parser** - Parser cookies
- **Drizzle ORM** - ORM type-safe
- **@workspace/api-zod** - Schémas Zod (workspace dependency)
- **@workspace/db** - Database schema (workspace dependency)

**Dev Dependencies :**
- **esbuild** 0.27.3 - Bundler ultra-rapide
- **esbuild-plugin-pino** - Support Pino dans esbuild
- **pino-pretty** - Format lisible pour Pino
- **@types/express, @types/cors, @types/cookie-parser** - Types TypeScript

**Scripts :**
```json
{
  "dev": "export NODE_ENV=development && pnpm run build && pnpm run start",
  "build": "node ./build.mjs",
  "start": "node --enable-source-maps ./dist/index.mjs",
  "typecheck": "tsc -p tsconfig.json --noEmit"
}
```

**Point d'entrée principal :**
```typescript
// src/index.ts
import app from "./app";
import { logger } from "./lib/logger";

const port = Number(process.env["PORT"]);
if (!port || isNaN(port)) throw new Error("PORT required");

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
```

### 🧪 Mockup Sandbox (mockup-sandbox)

Environnement de développement isolé pour tester les composants.

**Similaire à portfolio-faucar mais :**
- Inclut `chokidar` pour watch de fichiers
- Inclut `mockupPreviewPlugin.ts` - Plugin Vite custom

---

## Frontend

### Architecture React

**Point d'entrée :** `artifacts/portfolio-faucar/src/App.tsx`

```typescript
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL}>
              <Layout>
                <Router />
              </Layout>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

**Hiérarchie de providers :**
1. **QueryClientProvider** - TanStack React Query pour cache serveur
2. **ThemeProvider** - Gestion thème (dark/light)
3. **LanguageProvider** - Internationalisation (i18n)
4. **TooltipProvider** - Radix UI tooltip context
5. **WouterRouter** - Routing client-side
6. **Layout** - Composant layout principal
7. **Toaster** - Toast notifications

### Routes principales

```
/                  → Home
/a-propos          → APropos
/mes-services      → MesServices
/realisations      → Portfolio
/mon-processus     → MonProcessus
/contact           → Contact
/*                 → NotFound (404)
```

### Contextes React

**ThemeContext :**
- Gère thème dark/light
- Persisté localement
- Défaut: "dark"

**LanguageContext :**
- Gère langue application
- Probablement fr/en

### Structure des pages

Chaque page se trouve dans `src/pages/`:
- `Home.tsx` - Page d'accueil
- `APropos.tsx` - À propos du créateur
- `MesServices.tsx` - Services offerts
- `Portfolio.tsx` - Réalisations/projets
- `MonProcessus.tsx` - Processus de travail
- `Contact.tsx` - Formulaire contact
- `not-found.tsx` - Page 404

### Composants UI

**shadcn/ui** (Radix UI wrappé) :
- Tous les composants standards UI dans `src/components/ui/`
- accordion, alert, avatar, badge, breadcrumb, button, calendar, card, carousel, checkbox, collapsible, command, dialog, dropdown-menu, etc.

**Composants custom :**
- `Footer.tsx`
- `Layout.tsx`
- `Navbar.tsx`
- `ProjectModal.tsx`

### Hooks custom

- `use-mobile.tsx` - Détecte viewport mobile
- `use-toast.ts` - Gestion toast notifications
- `useCountUp.ts` - Animation compteur (probablement stats)
- `useInView.ts` - Détection élément en viewport
- `useScrollProgress.ts` - Suivi progression scroll

---

## Backend

### Architecture Express

**Point d'entrée :** `artifacts/api-server/src/index.ts`

**Configuration :** `artifacts/api-server/src/app.ts`

```typescript
const app: Express = express();

// Logging middleware
app.use(pinoHttp({ logger, serializers: {...} }));

// CORS
app.use(cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);
```

### Routes actuelles

**Route santé :**
- `GET /api/healthz`
  - Réponse : `{ status: string }`
  - Implémentation : `src/routes/health.ts`

**Structuration :**
- `src/routes/index.ts` - Combinaison des routes
- `src/routes/health.ts` - Health check endpoint
- `src/middlewares/` - Middlewares custom (vide)

### Logger Pino

**Fichier :** `src/lib/logger.ts`

Pino configuré pour :
- Logs structurés JSON
- Niveaux : error, warn, info, debug, trace
- Intégration pinoHttp pour logs HTTP automatiques

### Build Process

**Fichier :** `build.mjs` (esbuild custom)

Process :
1. Build TypeScript via esbuild
2. Output: `dist/index.mjs` (ESM)
3. Source maps incluses

---

## Packages partagés

### 📚 lib/api-spec

**Rôle :** Source de vérité pour API specification

**Fichiers :**
- `openapi.yaml` - Schéma OpenAPI 3.1.0
- `orval.config.ts` - Configuration Orval (générateur code)

**Contenu OpenAPI actuel :**
```yaml
openapi: 3.1.0
info:
  title: Api
  version: 0.1.0
servers:
  - url: /api
paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      responses:
        "200":
          schema: { $ref: "#/components/schemas/HealthStatus" }
components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status: { type: string }
```

**Orval (Code Generator) :**
- Génère client API React Query
- Génère schémas Zod
- **Commande :** `pnpm --filter @workspace/api-spec run codegen`

### 📦 lib/api-client-react

**Rôle :** Client HTTP typé avec React Query

**Exports :** 
```typescript
export {
  // Depuis generated/api.ts
  // Hooks générés automatiquement
}
```

**Structure :**
- `src/index.ts` - Export public
- `src/custom-fetch.ts` - Fetch personnalisée
- `src/generated/api.ts` - Endpoints (généré Orval)
- `src/generated/api.schemas.ts` - Types (généré Orval)

**Utilisation :**
```typescript
import { useHealthCheck } from '@workspace/api-client-react';

function MyComponent() {
  const { data, isLoading } = useHealthCheck();
  // ...
}
```

### 🎯 lib/api-zod

**Rôle :** Schémas Zod pour validation

**Contenu :**
- `src/generated/api.ts` - Schémas Zod (généré Orval)
- `src/generated/types/` - Types TypeScript (généré Orval)

**Utilisation :**
```typescript
import { HealthStatusSchema } from '@workspace/api-zod';

const validated = HealthStatusSchema.parse(data);
```

### 💾 lib/db

**Rôle :** Drizzle ORM + Database schema

**Config Drizzle :**
- `drizzle.config.ts` - Configuration Drizzle Kit
- Cible : PostgreSQL

**Schema :**
- `src/schema/index.ts` - Définition tables (actuellement vide avec templates)
- Utilise `drizzle-zod` pour générer schémas depuis tables

**Exports :**
```typescript
export { } // Actuellement vide, prêt pour tables
export { } from "./schema" // Schema subpath export
```

**Commandes Drizzle :**
```bash
pnpm --filter @workspace/db run push        # Push migrations
pnpm --filter @workspace/db run push-force  # Force push
```

**Dépendances :**
- `drizzle-orm` - ORM
- `pg` - Driver PostgreSQL
- `drizzle-zod` - Schémas Zod desde tables
- `zod` - Validation runtime

---

## Configuration

### TypeScript Configuration

**tsconfig.base.json :**
```json
{
  "compilerOptions": {
    "incremental": true,
    "isolatedModules": true,
    "lib": ["es2022"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "es2022",
    "noEmitOnError": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": false,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "skipLibCheck": true,
    "alwaysStrict": true
  }
}
```

**Caractéristiques :**
- Mode strict activé
- Incremental build
- ESM (esnext)
- Target ES2022
- Pas de typecheck sur lib externes (skipLibCheck)

### Workspace pnpm

**pnpm-workspace.yaml :**
```yaml
minimumReleaseAge: 1440  # 1 jour - défense supply-chain
minimumReleaseAgeExclude: []
```

**Sécurité :** Force attendre 1 jour avant d'installer version npm nouvelle (prévient supply-chain attacks)

### Vite Configuration

**portfolio-faucar/vite.config.ts :**
- Plugins Replit (cartographer, dev-banner, runtime-error-modal)
- Tailwind CSS intégré
- React Fast Refresh

---

## Flux de données

```
┌─────────────────────────────────────────────────────┐
│             Frontend (React)                         │
│ portfolio-faucar/src                                │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ HTTP requests
                   ├─ @workspace/api-client-react
                   │  └─ useHealthCheck(), etc.
                   │     (Hooks React Query)
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│             Backend (Express)                        │
│ api-server/src                                      │
│ ├─ app.ts (Express setup)                           │
│ ├─ routes/health.ts (GET /api/healthz)             │
│ └─ lib/logger.ts (Pino logging)                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ Database queries
                   └─ @workspace/db (Drizzle ORM)
                      └─ PostgreSQL

┌─────────────────────────────────────────────────────┐
│         Validation & Type Safety (Zod)              │
│ @workspace/api-zod                                  │
│ └─ Schemas générés depuis OpenAPI                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│         API Specification (Source of Truth)         │
│ @workspace/api-spec                                 │
│ └─ openapi.yaml → Orval → Generates all above       │
└─────────────────────────────────────────────────────┘
```

**Workflow de génération de code :**

```
1. Développeur modifie openapi.yaml
         ↓
2. Execute: pnpm --filter @workspace/api-spec run codegen
         ↓
3. Orval génère:
   - @workspace/api-client-react (hooks React Query)
   - @workspace/api-zod (schemas Zod)
         ↓
4. Frontend importe et utilise les hooks générés
5. Backend utilise les schémas pour validation
```

---

## Commandes et workflows

### Installation
```bash
pnpm install  # Installe toutes les dépendances (root + artifacts + libs)
```

### Développement

**Frontend seul :**
```bash
pnpm --filter @workspace/portfolio-faucar run dev
# Accès: http://localhost:5173 (Vite default)
```

**Backend seul :**
```bash
pnpm --filter @workspace/api-server run dev
# Requiert: PORT env var, DATABASE_URL env var
# Compile TypeScript → esbuild → node dist/index.mjs
```

**Mockup Sandbox :**
```bash
pnpm --filter @workspace/mockup-sandbox run dev
# Accès: http://localhost:5173 (différent port possible)
```

**Tous ensemble :**
```bash
# Terminal 1: Frontend
pnpm --filter @workspace/portfolio-faucar run dev

# Terminal 2: Backend
export PORT=5000
export DATABASE_URL="postgresql://user:password@localhost/dbname"
pnpm --filter @workspace/api-server run dev

# Terminal 3 (optionnel): Mockup Sandbox
pnpm --filter @workspace/mockup-sandbox run dev
```

### Build & Typecheck

**Typecheck global :**
```bash
pnpm run typecheck
# Typecheck libs + artifacts
```

**Build global :**
```bash
pnpm run build
# Typecheck puis build tous les packages
```

**Typecheck spécifique :**
```bash
pnpm --filter @workspace/portfolio-faucar run typecheck
pnpm --filter @workspace/api-server run typecheck
```

### Code Generation

**Régénérer API client & Zod schemas :**
```bash
pnpm --filter @workspace/api-spec run codegen
# Reads: lib/api-spec/openapi.yaml
# Outputs:
#   - lib/api-client-react/src/generated/
#   - lib/api-zod/src/generated/
```

### Database

**Push schema à PostgreSQL :**
```bash
pnpm --filter @workspace/db run push
# Requiert: DATABASE_URL env var
```

**Force push (destructif) :**
```bash
pnpm --filter @workspace/db run push-force
```

### Root Scripts

```bash
pnpm run typecheck:libs   # Typecheck libraries uniquement
pnpm run typecheck        # Typecheck libs + artifacts + scripts
pnpm run build            # Build global
```

---

## Points à noter

### 🟢 Points forts
1. **Architecture bien structurée** - Monorepo propre avec séparation claire
2. **Type-safety maximal** - TypeScript strict + Zod validation + Drizzle ORM
3. **DRY (Don't Repeat Yourself)** - OpenAPI comme source de vérité, Orval génère code
4. **Sécurité** - minimumReleaseAge protection, CORS configuré
5. **Logging professionnel** - Pino structured logging
6. **Dev experience** - Vite ultra-rapide, hot reload, dev tools Replit
7. **Modern stack** - ESM, React 18, Express 5, Node 20+

### 🟡 Points en développement
1. **Schema Database** - Actuellement vide (pas de tables définis)
2. **Routes API** - Uniquement health check (pas d'endpoints métier)
3. **Database migrations** - Aucune migration présente
4. **Authentification** - Pas visible (à implémenter)
5. **Tests** - Aucune suite de test visible
6. **Validations frontend** - Patterns React Hook Form + Zod pas visible

### 🔴 À faire
1. Définir schema database (tables Drizzle)
2. Implémenter endpoints API métier
3. Connecter frontend aux endpoints
4. Ajouter formulaires contact avec validation Zod
5. Implémenter système d'authentification si nécessaire
6. Ajouter suite de tests (Jest/Vitest)
7. Documenter endpoints API
8. Setup CI/CD

### 📋 Variables d'environnement requises

**api-server :**
```bash
PORT=5000                                    # Port d'écoute
DATABASE_URL="postgresql://user:pass@host/db"  # Connexion PostgreSQL
NODE_ENV=development                        # development ou production
```

**portfolio-faucar :**
```bash
BASE_URL=/                                  # Chemin de base application
VITE_API_URL=http://localhost:5000         # URL API (si externalisée)
```

---

## Conclusion

C'est un projet **très bien structuré** avec une architecture moderne et type-safe. 

**Prochaines étapes logiques :**
1. Définir les tables database
2. Créer les endpoints API
3. Implémenter les pages frontend
4. Intégrer frontend ↔ backend
5. Ajouter tests et CI/CD

**Stack très productif :** OpenAPI → Orval → Generated types → Type-safe frontend/backend communication

---

*Analyse générée: 2026-08-15*
