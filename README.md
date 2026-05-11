# trouve-ton-artisan

Le backend dans `server/` utilise `Node.js + Express + Sequelize` avec une base `MySQL`.
`phpMyAdmin` ne se connecte pas au dossier du projet directement : il se connecte au serveur `MySQL` que le projet utilise.

## Connexion avec phpMyAdmin

1. Demarre `MySQL` dans `XAMPP`, `WAMP`, `Laragon` ou ton installation locale.
2. Ouvre `phpMyAdmin` puis connecte-toi avec les memes identifiants que dans `server/.env`.
3. Lance le backend avec :

```bash
cd server
npm run dev
```

Au demarrage, le serveur cree automatiquement la base `trouve_ton_artisan` si elle n'existe pas encore.
Elle sera ensuite visible dans `phpMyAdmin`.
Sur cette machine WAMP expose MySQL en general sur `127.0.0.1:3306`.
Si ton compte `root` a un mot de passe, renseigne-le dans `server/.env`.

## Variables utiles

- `DB_NAME` : nom de la base visible dans `phpMyAdmin`
- `DB_USER` : utilisateur `MySQL`
- `DB_PASSWORD` : mot de passe `MySQL`
- `DB_HOST` : hote `MySQL`, ici `127.0.0.1`
- `DB_PORT` : port `MySQL`, souvent `3306`

## Script SQL manuel

Si tu preferes creer la base a la main dans `phpMyAdmin`, tu peux importer `server/scripts.sql`.
