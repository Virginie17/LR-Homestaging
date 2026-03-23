# 📋 GUIDE COMPLET - Création Bucket Supabase Storage

## 🎯 OBJECTIF
Créer le bucket `simulations` pour stocker les images des simulations de home staging

---

## ÉTAPE 1 - CRÉATION DU BUCKET

### 1.1 Connexion à Supabase
1. Allez sur https://supabase.com
2. Connectez-vous à votre compte
3. Sélectionnez votre projet `lr-homestaging`

### 1.2 Accès au Storage
1. Dans le menu de gauche → cliquez sur **"Storage"**
2. En haut à droite → cliquez sur **"+ New bucket"**

### 1.3 Configuration du bucket
```
Nom du bucket : simulations
Public bucket : ✅ (cocher cette case)
Région : eu-west-1 (ou la plus proche)
```

### 1.4 Validation
- ✅ Nom unique et valide
- ✅ Accès public activé
- ✅ Région correcte

---

## ÉTAPE 2 - CONFIGURATION CORS

### 2.1 Accès aux paramètres
1. Dans Storage → cliquez sur votre bucket `simulations`
2. Allez dans **"Settings"**
3. Cherchez **"CORS policy"**

### 2.2 Configuration CORS
Copiez-collez cette configuration :
```json
[
  {
    "origin": ["http://localhost:3000", "https://votredomaine.com"],
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "headers": ["*"],
    "maxAge": 3600
  }
]
```

### 2.3 Sauvegarde
- Cliquez sur **"Save"**
- Validez que la configuration est bien appliquée

---

## ÉTAPE 3 - VÉRIFICATION

### 3.1 Test de visibilité
1. Retournez dans **Storage**
2. Votre bucket `simulations` doit apparaître avec :
   - ✅ Icône **Public**
   - ✅ Statut **Active**

### 3.2 Test d'upload
1. Lancez votre serveur local : `npm run dev`
2. Allez sur votre site
3. Testez l'upload dans la section "Simulation offerte"
4. Vérifiez dans Storage que l'image apparaît

---

## ÉTAPE 4 - DÉPANNAGE

### 4.1 Problèmes courants
**❌ Erreur CORS** : Les images ne s'uploadent pas
- **Solution** : Vérifiez la configuration CORS
- **Vérification** : Console navigateur → onglet Network

**❌ Bucket privé** : Images non accessibles
- **Solution** : Cocher "Public bucket"
- **Vérification** : L'icône doit être visible

**❌ Permission denied** : Upload bloqué
- **Solution** : Vérifiez les politiques RLS
- **Vérification** : Logs Supabase

---

## ÉTAPE 5 - INTÉGRATION FINALE

### 5.1 Une fois le bucket prêt
1. ✅ Les uploads fonctionnent
2. ✅ Les URLs publiques sont générées
3. ✅ Le système de simulation est opérationnel

### 5.2 URLs générées automatiquement
Les images uploadées auront des URLs comme :
```
https://votre-projet.supabase.co/storage/v1/simulations/nom-fichier
```

---

## 🚀 VÉRIFICATION FINALE

### Checklist complète :
- [ ] Bucket `simulations` créé
- [ ] Accès public activé
- [ ] CORS configuré
- [ ] Upload testé avec succès
- [ ] Image visible dans le Storage
- [ ] Formulaire de simulation fonctionnel

---

## 🆘 SUPPORT

Si vous rencontrez un problème :
1. **Screenshot de l'erreur**
2. **Message d'erreur exact**
3. **URL de votre projet Supabase**

---

## 🎯 RÉSULTAT ATTENDU

Une fois terminé, votre système permettra :
- ✅ Upload automatique des images
- ✅ Stockage organisé et sécurisé
- ✅ URLs publiques générées
- ✅ Formulaire de simulation 100% fonctionnel

Votre site LR HomeStaging sera alors une **machine de prospection automatisée** ! 🏆
