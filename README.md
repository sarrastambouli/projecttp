#  Système de Gestion des Suggestions - Campus Ideas

Application Angular pour gérer les suggestions d'amélioration dans un campus universitaire.

##  Description

Ce projet est un système de gestion des suggestions permettant aux utilisateurs de :
- Consulter la liste des suggestions
- Liker les suggestions
- Ajouter des suggestions aux favoris
- Filtrer les suggestions par titre ou catégorie
- Visualiser le statut des suggestions (Acceptée, Refusée, En attente)

##  Technologies utilisées

- **Angular 18+** (Standalone Components)
- **TypeScript**
- **HTML5 / CSS3**
- **FormsModule** pour le two-way binding

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Angular CLI

### Étapes d'installation

1. Cloner le repository :
```bash
git clone https://github.com/sarrastambouli/projecttp.git
cd projecttp
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application :
```bash
npm start
```

4. Ouvrir dans le navigateur :
```
http://localhost:4200
```

## 🎯 Fonctionnalités

### ✅ Implémentées

- [x] Affichage de la liste des suggestions
- [x] Système de likes avec compteur
- [x] Ajout aux favoris
- [x] Filtrage par titre et catégorie
- [x] Affichage des statuts (Acceptée, Refusée, En attente)
- [x] Interface responsive
- [x] Header et Footer personnalisés



## 📂 Structure du projet
```
projecttp/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── list-suggestion/
│   │   ├── models/
│   │   │   └── suggestion.ts
│   │   ├── app.component.ts
│   │   └── app.component.html
│   └── ...
├── package.json
└── README.md
```

## 🎨 Captures d'écran

## (projecttp\screenshots\cap1.png)
## (projecttp\screenshots\cap2.png)

## 👨‍💻 Auteur

**sarrastambouli**
- GitHub: [@sarrastambouli](https://github.com/sarrastambouli)

## 📄 Licence

Ce projet a été réalisé dans le cadre d'un workshop universitaire (2025-2026).

## 🙏 Remerciements

Projet réalisé dans le cadre du Workshop n°2 - Manipulation des Composants Angular.