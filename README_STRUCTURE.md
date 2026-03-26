# LR Homestaging - Structure du Projet

## 📁 Arborescence Recommandée

```
LR-Homestaging/
├── app/
│ ├── agences/                 # Page dédiée aux agences immobilières
│ │ └── page.tsx
│ ├── api/                     # Routes API
│ │ ├── generate/             # Home staging IA
│ │ │ └── route.ts
│ │ ├── generate-free/         # Version gratuite
│ │ │ └── route.ts
│ │ ├── projection/           # Projection de meubles
│ │ │ └── route.ts
│ │ └── stripe/              # Paiements Stripe
│ │   ├── checkout/           # Création session
│ │   │ └── route.ts
│ │   └── webhook/           # Webhook Stripe
│ │     └── route.ts
│ ├── components/             # Composants React
│ │ ├── BeforeAfterSlider.tsx  # Slider avant/après
│ │ ├── CreditsBalance.tsx     # Solde crédits
│ │ ├── Hero.tsx              # Hero principal
│ │ ├── HomeStagingGenerator.tsx # Générateur home staging
│ │ ├── ProjectionGenerator.tsx # Générateur projection
│ │ └── StripeCheckoutButton.tsx # Boutons paiement
│ ├── studio/                 # Page studio professionnel
│ │ └── page.tsx
│ ├── globals.css             # Styles globaux
│ ├── layout.tsx              # Layout racine
│ └── page.tsx               # Homepage
│
├── lib/                      # Utilitaires
│ ├── supabase.ts            # Client Supabase
│ ├── supabase-admin.ts      # Client admin Supabase
│ ├── stripe.ts              # Client Stripe
│ └── utils.ts               # Fonctions utilitaires
│
├── public/                   # Fichiers statiques
│ ├── images/                # Images principales
│ │ ├── projection-signature.jpg
│ │ ├── hero-salon.jpg
│ │ ├── chambre-premium.jpg
│ │ ├── cuisine-premium.jpg
│ │ ├── sdb-premium.jpg
│ │ └── logo-noir.png
│ │
│ └── demo/                  # Images démo
│   ├── chambre-avant.jpg
│   ├── chambre-apres.jpg
│   ├── cuisine-avant.jpg
│   ├── cuisine-apres.jpg
│   ├── sdb-avant.jpg
│   └── sdb-apres.jpg
│
└── ...fichiers config
```

## 📝 Conventions de Nommage

### Images
- **Pas d'espaces** dans les noms de fichiers
- **Minuscules** et **tirets** uniquement
- **Extensions cohérentes** (.jpg ou .png)

**❌ Mauvais :**
```
logo noir.png
chambre avant.jpg
```

**✅ Bon :**
```
logo-noir.png
chambre-avant.jpg
```

### Composants
- **PascalCase** pour les noms de fichiers
- **Descriptif** et **concis**

**Exemples :**
```
BeforeAfterSlider.tsx
ProjectionGenerator.tsx
StripeCheckoutButton.tsx
```

## 🎯 Organisation des Images

### `/public/images/`
À utiliser pour :
- Hero et visuels principaux
- Images premium
- Logo et branding
- Images statiques fortes

### `/public/demo/`
À utiliser pour :
- Sliders avant/après
- Exemples fonctionnels
- Démos produit
- Cas d'usage

## 🔄 Correspondances Code/Assets

### Hero
```tsx
<Image
  src="/images/projection-signature.jpg"
  alt="Projection meubles dans un bien immobilier"
  fill
  className="object-cover"
/>
```

### Slider
```tsx
<BeforeAfterSlider
  beforeSrc="/demo/chambre-avant.jpg"
  afterSrc="/demo/chambre-apres.jpg"
/>
```

### Logo
```tsx
<Image
  src="/images/logo-noir.png"
  alt="LR Homestaging"
  width={150}
  height={42}
/>
```

## 🚀 Bonnes Pratiques

1. **Structure claire** : Séparer logiquement les fichiers
2. **Nommage cohérent** : Suivre les conventions établies
3. **Documentation** : Maintenir ce README à jour
4. **Optimisation** : Compresser les images avant upload
5. **Backup** : Garder une copie des assets originaux

## 📊 Maintenance

### Ajouter une nouvelle image :
1. Choisir le bon dossier (`images/` ou `demo/`)
2. Nommer selon les conventions
3. Optimiser la taille
4. Mettre à jour les imports dans le code

### Créer un nouveau composant :
1. Placer dans `app/components/`
2. Suivre le nommage PascalCase
3. Exporter par défaut
4. Documenter les props

---

Cette structure assure :
- ✅ Projet plus clean et maintenable
- ✅ Moins d'erreurs de chemins
- ✅ Intégration professionnelle
- ✅ Collaboration simplifiée
