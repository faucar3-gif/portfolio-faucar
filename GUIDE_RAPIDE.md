# 🎯 Guide de Compréhension Rapide - Faucar

## En 60 secondes

**Qu'est-ce que Faucar ?**
Un portfolio professionnel moderne avec :
- 🎨 Site React (portfolio-faucar)
- 🔧 API Express (api-server)
- 🧪 Bac à sable UI (mockup-sandbox)

**Tech Stack :**
- Frontend: React 18 + TypeScript + Tailwind CSS + Radix UI
- Backend: Express 5 + PostgreSQL + Drizzle ORM
- Partage: OpenAPI → Orval → Generated types

**Structure :** Monorepo pnpm avec `artifacts/` (apps) + `lib/` (shared packages)

---

## FAQ - Questions fréquentes

### Q: Comment démarrer rapidement ?

```bash
# 1. Installation
pnpm install

# 2. Terminal 1: Frontend
pnpm --filter @workspace/portfolio-faucar run dev

# 3. Terminal 2: Backend
export PORT=5000
export DATABASE_URL="postgresql://user:pass@localhost/db"
pnpm --filter @workspace/api-server run dev
```

Accès :
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/healthz

---

### Q: Où sont les fichiers importants ?

**Fichiers clés à connaître :**

| Fichier | Purpose | Modification fréquence |
|---------|---------|-------------------------|
| [lib/api-spec/openapi.yaml](lib/api-spec/openapi.yaml) | 📋 Spec API (source of truth) | ⭐⭐⭐ Haute |
| [artifacts/portfolio-faucar/src/App.tsx](artifacts/portfolio-faucar/src/App.tsx) | 🎨 React root component | ⭐⭐ Moyenne |
| [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts) | 🔧 Express configuration | ⭐ Basse |
| [artifacts/api-server/src/routes](artifacts/api-server/src/routes) | 🛣️ API routes | ⭐⭐⭐ Haute |
| [lib/db/src/schema/index.ts](lib/db/src/schema/index.ts) | 💾 Database schema | ⭐⭐⭐ Haute |
| [artifacts/portfolio-faucar/src/pages](artifacts/portfolio-faucar/src/pages) | 📄 Page components | ⭐⭐⭐ Haute |

---

### Q: Comment ajouter une nouvelle page ?

**Étapes :**

1. **Créer le fichier page**
```typescript
// artifacts/portfolio-faucar/src/pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

2. **Ajouter la route**
```typescript
// Dans artifacts/portfolio-faucar/src/App.tsx
import NewPage from '@/pages/NewPage';

<Route path="/new-page" component={NewPage} />
```

3. **Optionnel: Ajouter au menu**
- Modifier `Navbar.tsx` pour ajouter le lien

---

### Q: Comment ajouter un nouvel endpoint API ?

**Étapes :**

1. **Modifier openapi.yaml**
```yaml
# lib/api-spec/openapi.yaml
paths:
  /users:
    get:
      operationId: getUsers
      tags: [users]
      responses:
        "200":
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"

components:
  schemas:
    User:
      type: object
      properties:
        id: { type: number }
        name: { type: string }
      required: [id, name]
```

2. **Régénérer le code**
```bash
pnpm --filter @workspace/api-spec run codegen
```

3. **Implémenter le route backend**
```typescript
// artifacts/api-server/src/routes/users.ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // TODO: Query database
  res.json([{ id: 1, name: "John" }]);
});

export default router;
```

4. **Enregistrer la route**
```typescript
// artifacts/api-server/src/routes/index.ts
import usersRouter from "./users";
router.use("/users", usersRouter);
```

5. **Utiliser dans le frontend**
```typescript
// Automatiquement généré par Orval !
import { useGetUsers } from '@workspace/api-client-react';

function UserList() {
  const { data: users, isLoading } = useGetUsers();
  return <div>{/* afficher users */}</div>;
}
```

**Le cycle:** OpenAPI → Codegen → Types générés → Frontend/Backend utilise les types ✨

---

### Q: Comment ajouter une table database ?

**Étapes :**

1. **Définir la table Drizzle**
```typescript
// lib/db/src/schema/index.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
```

2. **Vérifier les types**
```bash
pnpm run typecheck
```

3. **Pousser au database**
```bash
pnpm --filter @workspace/db run push
```

4. **Utiliser dans l'API**
```typescript
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";

router.get("/users", async (req, res) => {
  const users = await db.select().from(usersTable);
  res.json(users);
});
```

---

### Q: Qu'est-ce que le mockup-sandbox ?

C'est un **environnement de développement isolé** pour :
- Tester des composants UI sans la logique métier
- Développer rapidement les composants
- Avoir un storybook-like pour les composants

Lancer: `pnpm --filter @workspace/mockup-sandbox run dev`

Structure: `artifacts/mockup-sandbox/src/components/mockups/` pour ajouter des composants de test.

---

### Q: Comment gérer l'authentification ?

**Actuellement:** Pas implémentée (architecture prête à l'accueillir)

**Approches possibles :**

**Option 1: JWT tokens**
```bash
npm install jsonwebtoken
```

```typescript
// Backend
import jwt from 'jsonwebtoken';

router.post("/login", (req, res) => {
  // Valider credentials
  const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
  res.json({ token });
});

// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected data", userId: req.user.userId });
});
```

```typescript
// Frontend
// 1. Ajouter à openapi.yaml:
// components:
//   securitySchemes:
//     bearerAuth:
//       type: http
//       scheme: bearer

// 2. Utiliser dans api-client-react
import { useLogin } from '@workspace/api-client-react';

function LoginForm() {
  const { mutate: login } = useLogin();
  
  return (
    <button onClick={() => {
      login({ username: "user", password: "pass" }, {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
        }
      })
    }>
      Login
    </button>
  );
}
```

**Option 2: Sessions**
```bash
npm install express-session connect-pg-simple
```

---

### Q: Comment implémenter i18n (multilingue) ?

**Actuellement:** LanguageContext prêt, mais traductions pas implémentées

```typescript
// artifacts/portfolio-faucar/src/contexts/LanguageContext.tsx
import React, { createContext, useState } from 'react';

const translations = {
  fr: {
    home: "Accueil",
    about: "À propos",
    services: "Services",
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
  },
};

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("fr");
  
  const t = (key) => translations[language][key] || key;
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Utilisation dans composants
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';

function Navbar() {
  const { t, language, setLanguage } = useContext(LanguageContext);
  
  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/a-propos">{t('about')}</a>
      <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
        {language === 'fr' ? 'EN' : 'FR'}
      </button>
    </nav>
  );
}
```

---

### Q: Comment tester ?

**Actuellement:** Pas de suite de tests (à mettre en place)

**Setup Jest/Vitest :**

```bash
# Option 1: Vitest (plus rapide, ESM friendly)
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom

# Option 2: Jest (standard, plus mature)
pnpm add -D jest @types/jest ts-jest @testing-library/react
```

**Exemple test :**
```typescript
// artifacts/portfolio-faucar/src/components/Navbar.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('Accueil')).toBeInTheDocument();
  });
});
```

---

## 🗺️ Mental Map du projet

```
"Je veux ajouter..."
│
├─ "...une page" → Créer artifacts/portfolio-faucar/src/pages/*.tsx
│
├─ "...un endpoint API" → 
│  ├─ Modifier lib/api-spec/openapi.yaml
│  ├─ Pnpm codegen
│  ├─ Implémenter artifacts/api-server/src/routes/
│  └─ Utiliser le hook généré au frontend
│
├─ "...une table database" →
│  ├─ Définir dans lib/db/src/schema/
│  ├─ Pnpm db run push
│  └─ Utiliser dans l'API avec Drizzle
│
├─ "...une validation" →
│  └─ Ajouter dans Zod (générée depuis OpenAPI ou définie manuellement)
│
├─ "...un formulaire" →
│  ├─ React Hook Form (déjà configuré)
│  ├─ Validation Zod
│  └─ Appeler l'API avec le hook React Query générés
│
└─ "...du styling" →
   └─ Tailwind CSS + Radix UI (déjà configurés)
```

---

## ⚠️ Pièges courants

### 1. Oublier de régénérer après modification openapi.yaml
```bash
# ❌ Mauvais: Modifier openapi.yaml et oublier
# ✅ Bon: Toujours faire après
pnpm --filter @workspace/api-spec run codegen
```

### 2. Mélanger database schema avec API spec
```bash
# ❌ Mauvais: Définir tables dans openapi.yaml
# ✅ Bon:
#   - Tables → lib/db/src/schema/
#   - Endpoints → lib/api-spec/openapi.yaml
```

### 3. Types générés pas à jour après modification
```bash
# ✅ Toujours faire après modification openapi.yaml
pnpm run typecheck  # Valide
```

### 4. Oublier env vars avant de lancer
```bash
# ❌ Lancer api-server sans variables
pnpm --filter @workspace/api-server run dev

# ✅ Lancer avec variables
export PORT=5000
export DATABASE_URL="postgresql://user:password@localhost/dbname"
pnpm --filter @workspace/api-server run dev
```

### 5. Modifier files directement générés
```typescript
// ❌ Mauvais: Éditer api-client-react/src/generated/api.ts directement
// ✅ Bon: Modifier openapi.yaml, puis pnpm codegen
```

---

## 📚 Ressources utiles

**Documentation officielle :**
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Vite Guide](https://vitejs.dev)
- [OpenAPI Specification](https://spec.openapis.org/)
- [Orval Code Generator](https://orval.dev)

**Patterns utilisés :**
- Monorepo pnpm (multi-packages)
- OpenAPI-first development
- Type-safe API contracts (Orval + Zod)
- React Hooks + Context API
- TailwindCSS utility-first

---

## 🚀 Prochaines étapes recommandées

1. **Comprendre OpenAPI** → Lire lib/api-spec/openapi.yaml
2. **Ajouter première page** → Créer pages/NewFeature.tsx
3. **Ajouter premier endpoint** → Modifier openapi.yaml + créer route
4. **Connecter frontend-backend** → Utiliser hook généré dans page
5. **Ajouter database** → Définir table + implémenter query
6. **Ajouter tests** → Setup Vitest + écrire premiers tests
7. **Ajouter CI/CD** → GitHub Actions / autre

---

*Guide rapide Faucar - Mise à jour 2026-08-15*
