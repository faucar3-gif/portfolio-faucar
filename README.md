# Web-Site-Builder (Portfolio Faucar AMETEPE)

Ce projet est un monorepo pnpm contenant le site portfolio professionnel de Faucar AMETEPE, son serveur d'API Express, et un bac à sable (mockup-sandbox) pour tester des composants isolés.

---

## 🚀 Guide de Démarrage Rapide

### 1. Prérequis
Assurez-vous d'avoir installé sur votre machine :
*   **Node.js** (Version 20+ recommandée)
*   **pnpm** (Le gestionnaire de paquets requis pour ce projet monorepo)
    *   *Si vous ne l'avez pas :* `npm install -g pnpm`

### 2. Installation des Dépendances
Placez-vous à la racine du projet et lancez l'installation globale :
```bash
pnpm install
```
Cette commande va installer automatiquement toutes les dépendances nécessaires pour la racine ainsi que pour tous les packages et applications du workspace (`lib/` et `artifacts/`).

---

## 💻 Lancement des Interfaces Graphiques

Vous pouvez lancer chaque interface indépendamment à l'aide de la commande `pnpm --filter` appropriée.

### A. Le Portfolio Principal (`portfolio-faucar`)
C'est le site web vitrine principal présentant le parcours, les réalisations et les formulaires de contact de Faucar AMETEPE.
*   **Commande** :
    ```bash
    pnpm --filter @workspace/portfolio-faucar run dev
    ```
*   **Variables d'environnement requises** (si lancée manuellement en dehors des configurations automatiques) :
    *   `PORT` : Port d'écoute du serveur de développement (ex: `3000`)
    *   `BASE_PATH` : Chemin de base pour l'application (ex: `/`)

### B. Le Bac à Sable (`mockup-sandbox`)
C'est l'application de développement permettant de charger et d'isoler des composants TSX créés sous `src/components/mockups`.
*   **Commande** :
    ```bash
    pnpm --filter @workspace/mockup-sandbox run dev
    ```
*   **Accès aux previews** :
    *   Accédez à un composant de test via l'URL : `http://localhost:<PORT>/preview/NomDuComposant`
*   **Variables d'environnement requises** :
    *   `PORT` : Port d'écoute du serveur (ex: `3001`)
    *   `BASE_PATH` : `/`

---

## ⚙️ Commandes Utiles de l'Écosystème

### Lancement du Serveur API (`api-server`)
Si vous avez besoin de lancer le backend d'API :
```bash
pnpm --filter @workspace/api-server run dev
```
*   *Note* : Requerra une variable d'environnement `DATABASE_URL` (chaîne de connexion PostgreSQL) et un `PORT` (ex: `5000`).

### Compilation et Vérification des Types (TypeScript)
*   **Typecheck global** (vérifie tous les packages et applications) :
    ```bash
    pnpm run typecheck
    ```
*   **Build de production global** (compilation de toutes les briques) :
    ```bash
    pnpm run build
    ```
*   **Regénérer le client API et Zod** (à partir de la spécification OpenAPI) :
    ```bash
    pnpm --filter @workspace/api-spec run codegen
    ```
