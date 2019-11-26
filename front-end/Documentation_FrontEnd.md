<p align="center">
    <a href="https://angular.io" target="_blank">
        <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="200">
    </a>
</p>

[Angular](https://angular.io) est un framework Javascript qui facilite la création d'applications avec le Web.
Nous avons choisi d'utiliser ce framework pour l'architecture qu'il propose et par conséquent, la facilité de maintient.
De plus ce framework permet d'offrir des interfaces dynamiques et responsives.

# Installation
Le lancement de l'application nécessite l'installation des dépendances avec la commande :  

    $ npm install
      
Il vous suffit ensuite de lancer l'application avec la/les commande(s) :
   
    $ npm start

ou 

    $ ng serve

Votre application est maintenant lancée sur : [http://localhost:4200](http://localhost:4200) !


# Arborescence
Un projet Angular est composé de plusieurs dossiers :
- `e2e/` : Dossier contenant le code pour executer des tests avec [Protractor](http://www.protractortest.org/)
- `nodes_modules/` : Dossier où sont installées les dépendances du projet
- `src/` : Code source du projet. C'est ici que nous avons implémenté notre code
- `.editorconfig` : Fichier permattant de définir le style de codage pour les éditeurs
- `angular.json` : Configuration pour angular en ligne de commande
- `package.json` : Fichier listant les dépendances du projet ainsi que d'autres métadonnées
- `tsconfig.json` : Configuration pour [TypeScript](https://www.typescriptlang.org/)
- `tslint.json` : Configuration pour [TSLint](https://palantir.github.io/tslint/)



Le dossier `src` est le dossier où l'oin implémente notre code. En voici une présentation plus détaillées :
- `src/app/components` : Contient l'ensemble des composants de l'application. Un composant est défini par 4 fichiers :
  * `NOM_DU_COMPOSANT.compoment.css` : Style inhérent au composant
  * `NOM_DU_COMPOSANT.compoment.html` : Squelette HTML du composant
  * `NOM_DU_COMPOSANT.compoment.ts` : Comportement du composant
  * `NOM_DU_COMPOSANT.compoment.spec.ts` : Fichier de tests du comportement du composant
- `src/app/models` : Contient l'ensemble des modèles de l'application. Un modèle peut s'apparenter à une classe.
- `src/app/services` : Contient l'ensemble des services de l'application. Les services vont effectuer les actions de l'application (requête au back-end...)
- `src/assets` : Contient toutes les images et autres ressources à intégrer sur les pages web 
- `src/environments` : Contient la configuration de l'environnement
- `src/index.html` : La page HTML principale qui est servie lorsque quelqu'un visite l'application. Les modules Javascript et CSS sont ajoutés automatiquement au lancement du serveur.
- `src/main.ts` : Le point d'entrée principal de l'application.


Les autres fichiers du dossier dont des fichiers de configurations auxquels on n'apportera pas de modifications.
Toute notre implémentation est présente dans le dossier `src/app`, le reste est généré par le framework.

# Dependances
Voici la liste des dépendances pour le projet (inscrite dans le fichier `package.json`). 
La partie "devDependencies" correspond aux dépendances nécéssaires en développement mais non utilisé en production.


```
{
  "name": "front-end",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~8.2.11",
    "@angular/cdk": "~8.2.3",
    "@angular/common": "~8.2.11",
    "@angular/compiler": "~8.2.11",
    "@angular/core": "~8.2.11",
    "@angular/forms": "~8.2.11",
    "@angular/http": "^7.2.15",
    "@angular/platform-browser": "~8.2.11",
    "@angular/platform-browser-dynamic": "~8.2.11",
    "@angular/router": "~8.2.11",
    "@auth0/angular-jwt": "^3.0.1",
    "@types/jwt-decode": "^2.2.1",
    "bootstrap": "^4.3.1",
    "hammerjs": "^2.0.8",
    "jwt-decode": "^2.2.0",
    "rxjs": "~6.4.0",
    "tslib": "^1.10.0",
    "zone.js": "~0.9.1"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^0.803.15",
    "@angular/cli": "~8.3.13",
    "@angular/compiler-cli": "~8.2.11",
    "@angular/language-service": "~8.2.11",
    "@angular/material": "^8.2.3",
    "@types/jasmine": "~3.3.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/node": "~8.9.4",
    "codelyzer": "^5.0.0",
    "jasmine-core": "~3.4.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~4.1.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~2.0.1",
    "karma-jasmine-html-reporter": "^1.4.0",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.15.0",
    "typescript": "~3.5.3"
  }
}

```
