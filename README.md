
# Trouve ton artisan

Application web permettant de rechercher des artisans par categorie, de consulter leurs fiches detaillees et d'explorer les resultats par recherche ou par secteur d'activite.

Le projet est compose de deux applications :

- `client` : front React
- `server` : API Express + Sequelize + MySQL

## Prerequis

Avant de lancer le projet en local, assurez-vous d'avoir :

- `Node.js` 18 ou plus recent
- `npm`
- une base `MySQL` accessible en local ou a distance

## Structure du projet

```text
trouve-ton-artisan/
├── client/   # application React
└── server/   # API Express, import de donnees et acces MySQL
```

## Installation

Depuis la racine du projet, installez les dependances du front puis du back :

```powershell
cd client
npm install
cd ..
cd server
npm install
cd ..
```

## Configuration

### Serveur

Copiez [server/.env.example] vers `server/.env`, puis adaptez les valeurs.

Variables principales :

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `PORT`

Variables utiles selon l'environnement :

- `DB_SSL`
- `DB_SSL_REJECT_UNAUTHORIZED`
- `DB_SSL_CA_PATH`
- `DB_SSL_CA_BASE64`
- `DB_SKIP_CREATE`
- `ALLOWED_ORIGINS`
- `ENABLE_SWAGGER`
- `RATE_LIMIT_MAX`
- `TRUST_PROXY`

### Client

Copiez [client/.env.example]vers `client/.env`, puis adaptez les valeurs.

Variables principales :

- `REACT_APP_API_URL`
- `REACT_APP_SITE_URL`

Exemple en local :

```env
REACT_APP_API_URL=http://127.0.0.1:5000/api
REACT_APP_SITE_URL=http://localhost:3000
```

## Import des donnees

Le jeu de donnees initial est stocke dans [server/data/data.xlsx].

Pour peupler la base :

```powershell
cd server
node importData.js
```

Ce script :

- cree la base si necessaire, sauf si `DB_SKIP_CREATE=true`
- synchronise les tables Sequelize
- importe ou met a jour les categories et artisans

## Lancement en local

### 1. Demarrer l'API

```powershell
cd server
npm run dev
```

L'API est ensuite disponible par defaut sur :

- `http://127.0.0.1:5000/`
- `http://127.0.0.1:5000/api/artisans`
- `http://127.0.0.1:5000/api/categories`

Si Swagger est active, la documentation est accessible sur :

- `http://127.0.0.1:5000/api/docs`

### 2. Demarrer le front

Dans un second terminal :

```powershell
cd client
npm start
```

Le site est ensuite disponible sur :

- `http://localhost:3000`

## Build de production

Pour generer le build du front :

```powershell
cd client
npm run build
```

Le resultat est genere dans :

- [client/build]

Pour lancer l'API en mode simple sans `nodemon` :

```powershell
cd server
npm start
```

## Scripts utiles

### Client

- `npm start` : lance le front en developpement
- `npm run build` : genere le build de production
- `npm test` : lance les tests React

### Serveur

- `npm run dev` : lance l'API avec `nodemon`
- `npm start` : lance l'API avec Node
- `node importData.js` : importe les donnees dans MySQL

