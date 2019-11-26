<p align="center">
    <a href="https://expressjs.com" target="_blank">
        <img src="https://expressjs.com/images/express-facebook-share.png" width="200">
    </a>
    <a href="https://www.mongodb.com" target="_blank">
        <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="200">
    </a>
</p>

> "[Express](https://expressjs.com) est une infrastructure d'applications Web Node.js minimaliste et flexible qui fournit un ensemble de fonctionnalités robuste pour les applications Web et mobiles."

-----

> [MongoDB](https://www.mongodb.com) est une base de données distribuée, universelle et basée sur des documents, qui a été conçue pour les développeurs d'applications modernes et pour l'ère du Cloud. Aucune autre base de données n'offre une telle productivité.

# Installation

Le lancement de l'application nécessite l'installation des dépendances avec la commande :

    $ npm install

Il vous suffit ensuite de lancer l'application avec la commande :

    $ npm run <env>

Ou `<env>` est l'environnement sur lequel lancé l'application (dev ou prod).

Votre application est maintenant lancée sur : [http://localhost:3000](http://localhost:3000) !

# Arborescence

Notre projet Express est composé de plusieurs dossiers et fichiers :

- `nodes_modules/` : Dossier où sont installées les dépendances du projet
- `src/` : Code source du projet. C'est ici que nous avons implémenté notre code.
- `src/config/` : Fichiers de configuration en fonction des différents environnements.
- `src/resources` : Définition des schémas, controller et routeur définissant la logique métier de notre application.
- `src/api/swagger/swagger.yaml` : Documentation OpenAPI
- `package.json` : Fichier listant les dépendances du projet ainsi que d'autres métadonnées
- `index.js` : Point d'entrée de notre application

# Dépendances

Voici la liste des dépendances pour le projet (inscrite dans le fichier `package.json`).
La partie "devDependencies" correspond aux dépendances nécéssaires en développement mais non utilisé en production.

```
"dependencies": {
    "bcrypt": "^3.0.2",
    "body-parser": "^1.18.3",
    "cors": "^2.8.5",
    "cuid": "^2.1.4",
    "dotenv": "^6.1.0",
    "express": "^4.16.4",
    "faker": "^4.1.0",
    "cross-env": "^6.0.3",
    "jsonwebtoken": "^8.4.0",
    "lodash": "^4.17.15",
    "mongoose": "^5.7.7",
    "mongoose-auto-increment": "^5.0.1",
    "mongoose-sequence": "^5.2.2",
    "mongoose-unique-validator": "^2.0.3",
    "morgan": "^1.9.1",
    "validator": "^10.9.0"
},
"devDependencies": {
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.0.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "babel-core": "7.0.0-bridge.0",
    "babel-eslint": "^8.2.1",
    "babel-jest": "^25.0.0",
    "eslint": "^4.15.0",
    "eslint-config-prettier": "^2.9.0",
    "eslint-config-standard": "^11.0.0",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-import": "^2.13.0",
    "eslint-plugin-jest": "^21.15.1",
    "eslint-plugin-node": "^7.0.1",
    "eslint-plugin-prettier": "^2.6.2",
    "eslint-plugin-promise": "^3.8.0",
    "eslint-plugin-standard": "^3.1.0",
    "jest": "^25.0.0",
    "mock-req-res": "^1.0.2",
    "nodemon": "^1.18.3",
    "prettier": "^1.15.2",
    "rimraf": "^2.6.2",
    "supertest": "^3.3.0"
}
```
