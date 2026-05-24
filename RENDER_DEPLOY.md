# Deploiement Render

Ce projet se deploie sur Render avec deux services distincts :

- un `Static Site` pour le front React dans `client`
- un `Web Service` pour l'API Express dans `server`

## Point important avant de commencer

Le back actuel utilise `MySQL` via `mysql2` et `sequelize`.

Render propose nativement du `Postgres`, mais pas un service MySQL gratuit equivalent pret a brancher dans ce projet. Si vous souhaitez rester sur Render pour l'hebergement :

- soit vous gardez une base MySQL chez un autre fournisseur
- soit vous migrez plus tard le projet vers Postgres

## 1. Front sur Render Static Site

Dans Render :

- `New` > `Static Site`
- connectez le depot Git

Parametres recommandes :

- `Name` : `trouve-ton-artisan`
- `Branch` : `main`
- `Root Directory` : `client`
- `Build Command` : `npm install && npm run build`
- `Publish Directory` : `build`

Variables d'environnement :

- `REACT_APP_API_URL=https://VOTRE-API.onrender.com/api`
- `REACT_APP_SITE_URL=https://VOTRE-FRONT.onrender.com`

## Rewrite indispensable pour React Router

Dans l'onglet `Redirects/Rewrites` du site statique, ajoutez :

- `Source` : `/*`
- `Destination` : `/index.html`
- `Action` : `Rewrite`

Sans cette regle, les routes comme `/recherche`, `/services` ou `/artisans/1` casseront au rechargement direct.

## 2. API sur Render Web Service

Dans Render :

- `New` > `Web Service`
- connectez le meme depot Git

Parametres recommandes :

- `Name` : `trouve-ton-artisan-api`
- `Branch` : `main`
- `Root Directory` : `server`
- `Runtime` : `Node`
- `Build Command` : `npm install`
- `Start Command` : `npm start`
- `Health Check Path` : `/`

Variables d'environnement minimales :

- `NODE_ENV=production`
- `PORT=10000`
- `TRUST_PROXY=true`
- `ENABLE_SWAGGER=false`
- `RATE_LIMIT_MAX=200`
- `ALLOWED_ORIGINS=https://VOTRE-FRONT.onrender.com`
- `DB_NAME=...`
- `DB_USER=...`
- `DB_PASSWORD=...`
- `DB_HOST=...`
- `DB_PORT=3306`

## 3. Ordre conseille

1. Deployer d'abord l'API
2. Recuperer l'URL publique Render du back
3. La renseigner dans `REACT_APP_API_URL` du front
4. Deployer le front
5. Recuperer l'URL publique du front
6. La renseigner dans `ALLOWED_ORIGINS` du back
7. Redeployer le back

## 4. Variables finales a verifier

Cote front :

- `REACT_APP_API_URL`
- `REACT_APP_SITE_URL`

Cote back :

- `ALLOWED_ORIGINS`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `ENABLE_SWAGGER=false`

## 5. Limites du plan gratuit Render

Le `Web Service` gratuit :

- s'endort apres `15 minutes` sans trafic
- redemarre au prochain appel
- peut mettre environ `1 minute` a repartir

Cela peut ralentir le premier chargement des artisans apres une periode d'inactivite.

## 6. Apres mise en ligne

Une fois les deux URLs connues :

- mettez a jour `robots.txt` avec l'URL reelle du sitemap
- remplacez les valeurs de demo dans Render par les vraies URLs
- ajoutez ensuite votre domaine personnalise si besoin
