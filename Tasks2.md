# Task Sprint 2 UE CDP (Groupe 1 - Equipe 5)

| ID | US liée | Dépendances | Temps estimé | Etat | Affectation |
|----|----|----|----|----|----|
| 0.1 | US1, US2, US3, US4, US5, US7  | x | 0.5 | DONE | Oumayma |
| 0.2 | x | x | 0.5 | DONE | Alfred |
| 1.1 | US1 | 0.1 | 0.5 | DONE | Oumayma |
| 1.2 | US1 | 0.1 | 0.5 | DONE | Alfred  |
| 2.1 | US2 | 0.1 | 0.5 | DONE | Oumayma |
| 2.2 | US2 | 0.1 | 0.5 | DONE | Alfred |
| 3 | US3 | 0.1 | 0.5 | DONE |  Alfred|
| 4.0 | US13 | 0.1 | 0.5 | DONE |  Alfred |
| 5 | US10 | 0.1 | 0.5 | DONE | Eudes |
| 6 | US8 | 0.1 | 0.5 | TODO |  |
| 7 | US12 | 0.1 | 0.5 | DONE | Eudes |
| 8.1 | x | 0.1 | 0.5 | TODO |   |
| 8.2 | x | 0.1 | 0.5 | DONE | Alfred  |
| 9 | x | 0.1 | 0.5 | TODO |  |
| 10 | x | 0.1 | 0.5 | DONE | Eudes |
| 11 | x | 0.1 | 0.5 | DONE | Oumayma |
| 12 | x | 0.1 | 0.5 | DONE | Oumayma  |


---

## Liste des Tâches : Résumé

* **Tâche 0.1** : Définir le schéma/modéle de la base de * données [BACK-END].  
* **Tâche 0.2** : Creer le fichier `docker-compose.yaml`.  
* **Tâche 1** : Inscription dans l'application.
* **Tâche 2** : Connexion à l'application.
* **Tâche 3** : Déconnexion de l'application.
* **Tâche 4** : Changer l'etat d'une tâche.
* **Tâche 5** : Ajouter une tâche.  
* **Tâche 6** : Terminer un sprint.  
* **Tâche 7** : Choisir une tâche pour la réaliser.  
* **Tâche 8** : Test Unitaire.
* **Tâche 9** : Test UI (Selenium) [FRONT-END]  
* **Tâche 10** : Documentation API (OpenAPI) [BACK-END]  
* **Tâche 11** :Documentation SAP [FRONT-END]

## Liste des Tâches : Description et DoD

**Tâche 0.1** : Définir le schéma/modéle de la base de données [BACK-END].  
>**Définition of done** : 
>La création des schémas User et Task dans la base de données mongodb avec leurs différents informations pour qu'on puisse stocker ces informations à la base de données.

> * `User` contenant les propriétés `(_id, username, e-mail, password)`
> * `Task` contenant les propriétés `( _id, issues, dod,  state, startDate, endDate, ToTest, ToDoc)`

**Tâche 0.2** Creer le fichier `docker-compose.yaml`.  
>**Définition of done** : 
>
>  Contenant un container pour application MEAN Stack

**Tâche 1** : Inscription dans l'application.
>**Définition of done** : 
>
> Les utilisateurs pourront s'enregistrer sur l'application aux travers d'une page `Signup`. Il leur sera présenter un formulaire d'inscription contenant les champs e-mail, mot de passe, nom d'utilisateur. Si ces informations sont invalides (nom d'utilisateur, e-mail déjà utilisé), un message d'erreur leur sera présenter. Sinon ils seront redirigé sur leur page personnel. 
> 

> Tâche 1.1 : [FRONT-END]
> Pour cela il faudrat créer le composant `Signup` qui appellera la méthode `tryRegister` dans le fichier `authentification.service.ts`.
>
> Tâche 1.2 : [BACK-END]
> Ajouter dans le controlleur (`user.controllers.js`) la méthode qui permet d'ajouter ce modèle dans la base de données après avoir défini la route dans le fichier `user.router.js` avec la methode post de http du router.

**Tâche 2** : Connexion à l'application.
>**Définition of done** : 
>
>Les utilisateurs pourront se connecter à l'application aux travers d'une page `Signin`. Il leur sera présenter un formulaire de connexion contenant les champs e-mail et mot de passe. Ils pourront après avoir saisit ces deux informations appuyer sur le bouton de connexion. Si leurs identifiant sont inccorect, un message d'erreur apparaitra, sinon il seront redirigé vers la page qui liste leurs projets.

> Tâche 2.1 : [FRONT-END]
> Pour cela il faudrat créer le composant `Signin` qui appellera la méthode `connect` dans le fichier `authentification.service.ts`.
> Après connexion, le client devra stocker le token pour pouvoir le renvoyer dans les requêtes qui suivront.
>
> Tâche 2.2 : [BACK-END] :
> Dans le fichier `authentication.js` (répertoire `util`), la méthode `checkAuthentication` vérifiera les informations envoyés par le client et si celles-ci sont valide, renverra au client un token (JWT).

**Tâche 3** : Déconnexion de l'application
>**Définition of done** : 
>
>Les utilisateurs connectés pourront se déconnecter de l'application en cliquant sur le bouton "Logout" présent en haut à droite du menu de navigation. Une fois déconnecter, ils seront rediriger vers la page de connexion.
>

> Tâche 3.1 : [FRONT-END]
> Ajouter un bouton de déconnexion.
>
> Tâche 3.2 : [BACK-END] :
> Après réception de l'information de déconnexion du client, la méthode `disconnect` présente dans le fichier `authentication.js` (répertoire `util`) détruira le token associé à l'utilisateur.

**Tâche 4** Changer l'etat d'une tâche
>**Définition of done** : 
>
> Les développeurs pourront modifier l'état d'une tâche avec une liste deroulante qui contient les valeurs (Doing, Todo, Done) et des buttons de choix pour dire s'ils sont tester ou documenter en cliquant sur le bouton de modification présent sur la page `detail-project`.
> 

> Tâche 4.0** : [FRONT-END]
>  En cliquant sur le bouton de modification, le même formulaire que celui de l'ajout d'un sprint apparraitra, cette fonction de modification permet de modifier les informations d'un sprint en pré-remplissant le formulaire avec les informations existantes.
>

**Tâche 5** : Ajouter une tâche.  
>**Définition of done** : 
>
> Le développeur pourra ajouter une tâche en cliquant sur le bouton "Ajout tâche" présent sur la page listant les tâches du sprint. A l'appui de ce bouton, un formulaire apparaitra lui présentant les champs suivants :  user story associé, une description, une durée, un etat. Il sera automatiquement associé à la tâche un id unique.
>

>**Tâche 5.1** : [FRONT-END]
> En cliquant sur le bouton "ajouter tâche", un formulaire apparaitra qui présentera au développeur les champs suivants : user story associé, une description, une durée, un etat. Pour cela il faut créer un composant angular `add-tâche` qui comprend un fichier TypeScript contenant le controleur ainsi qu'un fichier html ou sera defini le formulaire et un fichier css.
> >
>**Tâche 5.2** : [BACK-END]
> Ajouter dans le controlleur (`tache.controllers.js`) dans `tache` la methode qui permet d'ajouter ce modele dans la base de données après avoir defini le route dans le fichier `tache.router.js` avec la methode post de http du router.

**Tâche 6** : Terminer un sprint.  
>**Définition of done** : 
>
> Le développeur peut terminer un sprint en cliquant sur le bouton  "Terminer Sprint" présent sur le cadre du sprint choisi dans la page 'details projet'. Une fois le sprint est terrminé toutes les issues non faites pendant ce sprint seront mises sur le sprint suivant.
>

>**Tâche 6.1** : [FRONT-END]
> Les developpeurs pourront terminer un sprint en cliquant sur le bouton "Terminer" présent sur la page qui liste les sprints du projets. En cliquant sur ce bouton, une popup apparraitra permettant d'obtenir la confirmation de l'utilisateur.
>
>**Tâche 6.2** : [BACK-END]
>La methode  sera fait dans le fichier `detail-project.component.ts` dans le composant detail-project et en ajouter aussi le service HTTP dans le fichier `sprint.service.ts` si il est pas defini.

**Tâche 7** : Choisir une tâche pour la réaliser.  
>**Définition of done** : 
>
> Après avoir travaillé sur un tâche, le développeur pourra modifié son état. Il pourra au travers d'une liste déroulante sélectionner entre les états : TODO, DOING, DONE. De plus il pourra cocher l'une des cases : A documenter, A tester.
> 

>**Tâche 7.1** : [FRONT-END]
> Pour cela, il faudrat créer le composant `edit-task` qui va utiliser le formulaire du composant `add-task`. Il faudrat également ajouter la méthode put dans le service `task.service.ts` et la route pour accéder à la page de modification dans `app-routing.module.ts`.
>
>**Tâche 7.2** : [BACK-END]
>Ajouter dans le controlleur (`task/task.controllers.js`) la méthode qui permet, à partir d'un id, de modifier une tâche dans la base de données. Il faudrat définir la route dans le fichier `project.router.js` avec la methode put de http.

**Tâche 8** : Test Unitaire  
>**Définition of done** : 
>
>  Création des tests unitaire sur le Front-end et le Back-end de notre application.

>**Tâche 8.1** : [FRONT-END]
>La définition des testes unitaires est fait sur de chaque componsant se fait sur le fichier `nom_composant.spec.ts` avec Jasmine.
>**Tâche 8.2** : [BACK-END]
>La description des testes unitaires se font sur les dossiers __ tests __  de chaque modéles ( `project` ...) avec Jasmine.

**Tâche 9** : Test UI (Selenium)   
>**Définition of done** : 
>
> 

>**Tâche 9.1** : [FRONT-END]
>

**Tâche 10** : Documentation API (OpenAPI) [BACK-END]  
>**Définition of done** : 
> La création d'un fichier swagger.yaml qui contient la documentation de l'API

>npm i -g swagger
Et créer un fichier (l'arborescence et le nommage sont rigouresements importants)
Créer un dossier à la racine de votre projet nommez le api
Créer un dossier dans api et nommez le swagger
Créer un fichier dans swagger et nommez le swagger.yaml
Renseigner les differents routes de l'api pour chaque entité
Utiliser [https://swagger.io/tools/swagger-editor](https://) pour voir le rendu de la doc.

**Tâche 11** :Documentation SAP [FRONT-END]
>**Définition of done** : 
>
>Ecrire la description de l'arborescente de dossiers Angular sur le front-end et les différents dependances,ainsi qu'une description sur le lancement de l'application qui consiste l'installation de dépendances.

**Tâche 12** : Scénarios Gherkin [FRONT-END]
>**Définition of done** : 
>
>Ecrire les scénarios Gherkin de quelques fonctionnalité comme : Ajouter projet, modifier projet et supprimer projet. Idem pour les issues et les sprints.
>
