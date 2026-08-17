# 📊 Diagrammes du Projet Faucar

## Architecture générale

```mermaid
graph TB
    subgraph "Frontend Layer"
        PA["🖥️ portfolio-faucar<br/>(React + TypeScript)"]
        MS["🧪 mockup-sandbox<br/>(UI Components Dev"]
    end
    
    subgraph "Backend Layer"
        API["🔧 api-server<br/>(Express + Node.js)"]
        DB[("💾 PostgreSQL")]
    end
    
    subgraph "Shared Libraries"
        SPEC["📋 api-spec<br/>(OpenAPI YAML)"]
        CLIENT["📦 api-client-react<br/>(React Query Hooks)"]
        ZOD["🎯 api-zod<br/>(Zod Schemas)"]
        DBL["💾 db<br/>(Drizzle ORM)"]
    end
    
    subgraph "Code Generation"
        ORVAL["⚙️ Orval<br/>(Code Generator)"]
    end
    
    PA -->|HTTP| API
    MS -->|HTTP| API
    API --> DB
    API --> DBL
    PA --> CLIENT
    PA --> ZOD
    SPEC -->|codegen| ORVAL
    ORVAL -->|generates| CLIENT
    ORVAL -->|generates| ZOD
    DBL --> DB
    
    style PA fill:#61dafb,color:#000
    style API fill:#90c53f,color:#000
    style SPEC fill:#ff6b6b,color:#fff
    style CLIENT fill:#9b59b6,color:#fff
    style ZOD fill:#3498db,color:#fff
    style DBL fill:#e74c3c,color:#fff
```

## Flux de données Frontend → Backend

```mermaid
graph LR
    subgraph Frontend
        COMP["React Component<br/>useHealthCheck()"]
        RQ["React Query<br/>(TanStack)"]
    end
    
    subgraph Network
        HTTP["HTTP GET /api/healthz"]
    end
    
    subgraph Backend
        ROUTE["Express Route<br/>GET /healthz"]
        HANDLER["Health Handler"]
        LOG["Pino Logger"]
    end
    
    subgraph Response
        JSON["{status: 'ok'}"]
    end
    
    COMP -->|useHealthCheck| RQ
    RQ -->|HTTP Request| HTTP
    HTTP -->|Matches| ROUTE
    ROUTE -->|Handler| HANDLER
    HANDLER -->|Log| LOG
    HANDLER -->|Return| JSON
    JSON -->|HTTP Response| RQ
    RQ -->|Update Cache| COMP
    
    style COMP fill:#61dafb
    style RQ fill:#61dafb
    style HTTP fill:#f39c12
    style ROUTE fill:#90c53f
    style HANDLER fill:#90c53f
    style LOG fill:#95a5a6
    style JSON fill:#f39c12
```

## Structure TypeScript dans le Monorepo

```mermaid
graph TD
    ROOT["pnpm-workspace.yaml<br/>(Racine Monorepo)"]
    
    subgraph PACKAGES["Workspace Packages"]
        direction LR
        ARTIFACT["📁 artifacts/"]
        LIB["📁 lib/"]
        SCRIPT["📁 scripts/"]
    end
    
    subgraph ARTIFACT_APPS["Artifacts (Applications)"]
        direction LR
        PF["portfolio-faucar<br/>React App"]
        AS["api-server<br/>Express App"]
        MS["mockup-sandbox<br/>Dev App"]
    end
    
    subgraph LIBS_PKG["Lib (Shared Packages)"]
        direction LR
        SPEC["api-spec<br/>@workspace/api-spec"]
        CLIENT["api-client-react<br/>@workspace/api-client-react"]
        ZOD["api-zod<br/>@workspace/api-zod"]
        DB["db<br/>@workspace/db"]
    end
    
    ROOT --> PACKAGES
    PACKAGES --> ARTIFACT_APPS
    PACKAGES --> LIBS_PKG
    PACKAGES --> SCRIPT
    
    PF --> CLIENT
    PF --> ZOD
    AS --> DB
    AS --> ZOD
    CLIENT --> SPEC
    ZOD --> SPEC
    DB --> SPEC
    
    style ROOT fill:#2c3e50,color:#fff
    style ARTIFACT fill:#34495e,color:#fff
    style LIB fill:#34495e,color:#fff
    style SCRIPT fill:#34495e,color:#fff
    style PF fill:#61dafb
    style AS fill:#90c53f
    style MS fill:#3498db
    style SPEC fill:#e74c3c,color:#fff
    style CLIENT fill:#9b59b6,color:#fff
    style ZOD fill:#3498db,color:#fff
    style DB fill:#e74c3c,color:#fff
```

## Lifecycle du développement API

```mermaid
graph LR
    A["1. Modifier<br/>openapi.yaml"] -->|pnpm codegen| B["2. Orval génère"]
    B --> C["api-client-react<br/>(Hooks React Query)"]
    B --> D["api-zod<br/>(Schemas Zod)"]
    C -->|Import dans| E["Frontend App<br/>use*() hooks"]
    D -->|Import dans| F["Backend App<br/>Validation"]
    E -->|HTTP Request| G["Express Routes"]
    G -->|Validate| F
    G --> H["PostgreSQL<br/>Drizzle ORM"]
    H --> I["Return Response"]
    I --> E
    
    style A fill:#ff6b6b,color:#fff
    style B fill:#f39c12,color:#000
    style C fill:#61dafb,color:#000
    style D fill:#3498db,color:#fff
    style E fill:#61dafb,color:#000
    style F fill:#90c53f,color:#000
    style G fill:#90c53f,color:#000
    style H fill:#e74c3c,color:#fff
    style I fill:#9b59b6,color:#fff
```

## Routes Frontend actuelles

```
application/
├── /                      → Home
├── /a-propos              → APropos
├── /mes-services          → MesServices
├── /realisations          → Portfolio
├── /mon-processus         → MonProcessus
├── /contact               → Contact
├── /faq (route inexistante)
├── /temoignages (route inexistante)
└── /projets-en-cours (route inexistante)
```

**Fichiers pages existants mais non routés :**
- `Faq.tsx` ❌ Pas de route
- `Temoignages.tsx` ❌ Pas de route
- `ProjetsEnCours.tsx` ❌ Pas de route

## Hiérarchie des Providers React

```mermaid
graph TD
    A["App<br/>(root)"]
    B["QueryClientProvider<br/>(TanStack React Query)"]
    C["ThemeProvider<br/>(dark/light)"]
    D["LanguageProvider<br/>(i18n)"]
    E["TooltipProvider<br/>(Radix UI)"]
    F["WouterRouter<br/>(Routing)"]
    G["Layout<br/>(Shell)"]
    H["Router<br/>(Route matching)"]
    I["Page Component<br/>(Home/Contact/etc)"]
    J["Toaster<br/>(Toast notifications)"]
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    B --> J
    
    style A fill:#2c3e50,color:#fff
    style B fill:#61dafb,color:#000
    style C fill:#3498db,color:#fff
    style D fill:#9b59b6,color:#fff
    style E fill:#2ecc71,color:#fff
    style F fill:#f39c12,color:#000
    style G fill:#90c53f,color:#000
    style H fill:#e74c3c,color:#fff
    style I fill:#3498db,color:#fff
    style J fill:#95a5a6,color:#fff
```

## Pipeline de Build TypeScript

```mermaid
graph LR
    A["Source Code<br/>src/"]
    B["TypeScript<br/>Compiler"]
    C["Type Checking<br/>pnpm typecheck"]
    D["Esbuild<br/>Bundler"]
    E["Build Output<br/>dist/"]
    F["Runtime<br/>Node.js"]
    
    A -->|Files| B
    B -->|Validate| C
    C -->|Pass| D
    D -->|Minify| E
    E -->|Execute| F
    
    style A fill:#2c3e50,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#f39c12,color:#000
    style D fill:#90c53f,color:#000
    style E fill:#2c3e50,color:#fff
    style F fill:#95a5a6,color:#fff
```

## Dependency Graph - What imports what

```mermaid
graph TB
    PF["portfolio-faucar<br/>(Frontend)"]
    AS["api-server<br/>(Backend)"]
    MS["mockup-sandbox<br/>(Dev)"]
    
    CLIENT["api-client-react"]
    ZOD["api-zod"]
    DB["db"]
    SPEC["api-spec"]
    
    PF -->|Imports| CLIENT
    PF -->|Imports| ZOD
    AS -->|Imports| ZOD
    AS -->|Imports| DB
    
    CLIENT -->|Generated from| SPEC
    ZOD -->|Generated from| SPEC
    DB -->|Uses| ZOD
    
    MS -->|Uses same| CLIENT
    MS -->|Uses same| ZOD
    
    style PF fill:#61dafb,stroke:#000,stroke-width:3px
    style AS fill:#90c53f,stroke:#000,stroke-width:3px
    style MS fill:#3498db,stroke:#000,stroke-width:3px
    style CLIENT fill:#9b59b6,color:#fff,stroke:#000,stroke-width:2px
    style ZOD fill:#3498db,color:#fff,stroke:#000,stroke-width:2px
    style DB fill:#e74c3c,color:#fff,stroke:#000,stroke-width:2px
    style SPEC fill:#f39c12,color:#000,stroke:#000,stroke-width:3px
```

## Commandes principales et leur effet

```mermaid
graph TD
    START["$ pnpm <cmd>"]
    
    I1["install"] -->|Installe| ROOT1["Toutes les dépendances<br/>(root + lib + artifacts)"]
    B1["run build"] -->|1. Typecheck| ROOT2["lib + artifacts"]
    B1 -->|2. Build| OUT1["dist/ folders"]
    T1["run typecheck"] -->|Valide| TS1["Types TypeScript"]
    
    CG1["--filter @workspace/api-spec run codegen"] -->|Lit| SPEC1["openapi.yaml"]
    CG1 -->|Génère| GEN1["api-client-react/generated/"]
    CG1 -->|Génère| GEN2["api-zod/generated/"]
    
    DEV1["--filter @workspace/portfolio-faucar run dev"] -->|Lance| DEV_PF["Vite dev server<br/>localhost:5173"]
    DEV2["--filter @workspace/api-server run dev"] -->|Build| DEV_AS1["esbuild"]
    DEV2 -->|Lance| DEV_AS2["Node.js server<br/>localhost:PORT"]
    
    style START fill:#2c3e50,color:#fff
    style I1 fill:#27ae60,color:#fff
    style B1 fill:#e74c3c,color:#fff
    style T1 fill:#f39c12,color:#000
    style CG1 fill:#9b59b6,color:#fff
    style DEV1 fill:#3498db,color:#fff
    style DEV2 fill:#90c53f,color:#000
```

---

*Visualisations du projet Faucar - 2026-08-15*
