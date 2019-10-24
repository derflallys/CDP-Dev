# Task Sprint 1 UE CDP (Groupe 1 - Equipe 5)

## Liste des Tâches et description


| ID | US liée | Dépendances | Temps estimé | Etat | Affectation |
|----|----|----|----|----|----|
| 0.1 |* | x | x | x | x |
| 0.2 |* | x | x | x | x |
| 0.3 |* | x | x | x | x |
| 0.4 |* | x | x | x | x |
| 3.1 |x | x | x | x | x |
| 3.2 |x | x | x | x | x |
| 2 |* | x | x | x | x |
| 4.1 |US4 | x | x | x | x |
| 4.2 |US4 | x | x | x | x |
| 6 |* | x | x | x | x |
| 8.1 |US4 | x | x | x | x |
| 8.2 |US4 | x | x | x | x |
| 5.0 |US4 | x | x | x | x |
| 5.1 |US4 | x | x | x | x |
| 7.0 | x | x | x | x | x |
| 7.1 |x | x | x | x | x |
| 8.0 | x | x | x | x | x |
| 8.1 | x | x | x | x | x |
| 9.0 | x | x | x | x | x |
| 9.1 |x | x | x | x | x |
| 10.0 |x | x | x | x | x |
| 10.1 |x | x | x | x | x |
| 11.0 |x | x | x | x | x |
| 11.1 |x | x | x | x | x |
| 12.0 |x | x | x | x | x |
| 12.1 |x | x | x | x | x |
| 13.0 |x | x | x | x | x |
| 13.1 |x | x | x | x | x |
| 15.0 |x | x | x | x | x |
| 15.1 |x | x | x | x | x |
| 16 |x | x | x | x | x |

---
**Tâche 0.1** :   Definir le schéma/modéle de la base de données [BACK-END]: 
> * `Project` définit par `(identifiant, titre, durée, url du depot, un fichier (cahier de charge))`.
> * `Issues` définit par `(identifiant, description, etat, priorité, planification)` 
> * `Sprint` définit par `(identifiant, titre, date de debut, date de fin)` 
> * Un projet peut avoir un plusieurs issues et plusieurs sprints 

> * Un sprint peut avoir zero ou  plusieurs issues 
> Les schémas doivent etre créer dans les fichiers  `nomdumodele.model.js` ou sera defini le schéma grâce à mongoose et ensuite générer le modéle.


**Tâche 0.2** : Création du squelette de l'application [FRONT-END].
> Générer le squelette du projet avec angular cli et definir les dependances dans `package.json`.


**Tâche 0.3** : Définir la page d'index, ainsi que le template de base de l'application avec les menus de navigation, les couleurs de bases utilisées pour l'application, etc.
> 

**Tâche 0.4** : Création du squelette de l'application [BACK-END].
> Creer le squelette l'application NodeJS et definir les dependances dans `package.json`.




**Tâche 3.1** : Définir la page qui liste les projets [FRONT-END].
>  Cette page devra présenter les différents projets sur lesquelles le visiteur est acteur. Un tableau présentera donc les différents projets en y indiquant (header du tableau) les informations : Nom du projet, Rôle du visiteur dans ce projet, Bouton d'accès à la page du projet (et, si le visiteur est également le créateur du projet, Bouton de suppression du projet et Bouton d'édition du projet). Il sera enfin disposé en haut de page un bouton permettant la création de projet. Pour cela il faut creer le composant `list-project`,ajouter la methode `getProjects` dans le fichier `list-project.service.ts` et le tableau html dans `list-project.compoenent.html` . 

**Tâche 3.2** : Avoir la liste des projets [BACK-END]. 
> Ajouter une méthode `getProjects` dans le fichier `project.controllers.js` dans `resources/project` qui permet de récuperer les projects avec la methode GET de HTTP ainsi que l'ajout du router dans`project.router.js`.

**Tache 2** : Ajouter les modeles du projet [FRONT-END].
> Créer un dossier nommé `modeles` à savoir Project, Issues, Sprint  où il faut creer les fichiers `nommodele.ts` et les definir sur chaque fichier la classe de l'entité avec sont constructeur.

**Tache 6** : Ajouter les services du projet [FRONT-END].
> Créer un dossier nommé `services` à savoir Project, Issues, Sprint où il faut creer les fichiers `nommodele.service.ts` où seront defini les méthodes HTTP.




**Tâche 4.1** Creer un projet :[FRONT-END]
> Créer l'interface de l'ajout de projet qui contient un bouton "Ajout Projet" en cliquant sur ce bouton, un formulaire apparaitra qui présentera au product owner les champs suivants : un titre (champ de texte réduit, obligatoire), une durée (champ d'entier), une description (champ de texte étendu, obligatoire), une url (champ d'url), un cahier des charges (sélecteur de fichier  ou Editeur de Texte ). Pour cela il faut creer un composant angular add-project qui comprend un fichier TypeScript contenant le controleur ainsi qu'un fichier html ou sera defini le formulaire et un fichier css.Ajouter la methode HTTP dans le fichier service du projet .

**Tâche 4.2** Creer un projet  : [BACK-END]
> Ajouter dans  le controlleur (`project/project.controllers.js`)  la methode qui permet d'ajouter ce modele dans la base de données apres avoir defini le route dans le fichier `project.router.js`  avec la methode post de http.Ainsi le premier sprint du projet est crée et  rattaché à  ce dernier. 

**Tâche 8.1** Modifier un projet  : [FRONT-END]
>Creer un composant angular `update-project` qui va utiliser le formulaire du composant `add-project` , ajouter aussi la methode put dans le service `project.service.ts` et le route pour acceder à la page de modification  dans `app-routing.module.ts` . 

**Tâche 8.2** Modifier un projet  : [BACK-END]
>Ajouter dans  le controlleur (`project/project.controllers.js`)  la methode qui permet de modifier un projet avec id comme parametre dans la base de données apres avoir defini le route dans le fichier `project.router.js`  avec la methode put/:id de http.

**Tâche 5.0** : Supprimer un projet [FRONT-END].
> Le product owner étant le créateur d'un projet pourra supprimer ce projet en cliquant sur le bouton de suppression présent sur la page qui liste les projets. En cliquant sur ce bouton, une popup apparraitra permettant d'obtenir la confirmation de l'utilisateur . La methode de suppression  sera fait dans le fichier `list-project.component.ts` de la liste de projet en ajouter aussi le service HTTP dans le fichier `project.service.ts` 

**Tâche 5.1** : Supprimer un projet [BACK-END].
>  Ajouter la methode HTTP dans le fichier `project.controller.js` et le route dans le fichier `project.model.js`, ainsi la suppression d'un project implique aussi la suppression des issues ainsi que de ces sprints (ces issues et tâches).


**Tâche 7** : Lister les informations d'un projet (issues, sprints, etc.).
> En se rendant sur la page du projet, l'utilisateur aura accès aux différentes informations du projet sous la forme de différentes sections. Les différentes listes seront affichés sous la forme de tableau. Selon son rôle l'affichage sera adapté :
> * Tous les utilisateurs pourront consulter la liste des issues ainsi que la liste des sprints. Pour les issues, les informations affichées seront : id, description, difficulté et priorité. Pour les sprints, les informations affichées seront : numéro, titre, date de début et date de fin. 
> * Les Product Owners auront en plus accès à la zone de note en lecture/écriture qui leur est dédié. 
> * Les Chefs de projet auront accès à cette même zone en lecture seule. Les chefs de projet auront aussi accès à la liste des utilisateurs associées au projet (les informations suivantes seront présentées : Nom, Rôle).


>**Tâche 7.0** : [FRONT-END]
> Créer un composant `detail-project` ou sera defini defini un tableau HTML du backlog contenant ces issues et afficher les tableaux des sprints du projet. Ajouter un bouton ajouter un issue au niveau du tableau de backlog, ainsi que les buttons modifier et supprimer  d'un issue. Sur les tableaux d'un sprint ajouter button ajouter un sprint qui affiche un popup  qui liste les issues du backlog  pour pouvoir en choisir ou implementer  un drag & drop  entre le tableau du backlog et celui du sprint au quel on veut ajouter le backlog. Il faudrait alors dans les services de issues et de sprint definir les methodes CRUD de HTTP  et ajouter le route pour ce composant.

>**Tâche 7.1** : [BACK-END]
> Pour cette tâche il faut s'assurer que tous les controlleurs de issues , projects et sprint on les methodes CRUD bien fait si c'est pas le cas les completer .


**Tâche 8** : Ajouter une issue .
> Le développeur pourra ajouter une issue  en cliquant sur le bouton "Ajout issue" présent sur la page listant le backlog. A l'appui de ce bouton, un formulaire apparaitra lui présentant les champs suivants : une description, une difficulté et une priorité. Il sera automatiquement associé au issue un id unique.
>
>**Tâche 8.0** :  [FRONT-END]
> En cliquant sur le bouton "ajouter issue" qui se trouve sur le backlog, un formulaire apparaitra qui présent au développeur les champs suivants : une description, une difficulté et une priorité.Pour cela il  faut creer un composant angular add-issue qui comprend un fichier TypeScript contenant le controleur ainsi qu'un fichier html ou sera defini le formulaire et un fichier css.
> 
>**Tâche 8.1** :  [BACK-END]
>  Ajouter dans le controlleur (`issue.controllers.js`) dans `issue` la methode qui permet d'ajouter ce modele dans la base de données apres avoir defini le route dans le fichier `issue.router.js` avec la methode post de http du router.


**Tâche 9** : Supprimer un issue .
> Les developpeurs pourront supprimer l'issue du backlog ou sur un sprint en cliquant sur le bouton de suppression présent sur la page qui liste les issues . En cliquant sur ce bouton, une popup apparraitra permettant d'obtenir la confirmation de l'utilisateur .
> 
>**Tâche 9.0** : [FRONT-END]
>La methode de suppression  sera fait dans le fichier `detail-project.component.ts` dans le composant detail-project et en ajouter aussi le service HTTP dans le fichier `issue.service.ts` si il est pas defini

>**Tâche 9.1** :  [BACK-END]
>  Ajouter dans le controlleur (`issue.controllers.js`) dans `issue` la methode qui permet d'ajouter ce modele dans la base de données apres avoir defini le route dans le fichier `issue.router.js` avec la methode delete de http du router.



**Tâche 10** : Modifier un issue .
> Les developpeurs ( ou prodcut owner )  pourront modifier un issue en cliquant sur le bouton de modification présent sur la page du `detail-project` soit sur le tableau du backlog ou des sprint . En cliquant sur ce bouton, le même formulaire que celui de l'ajout d'une issue apparraitra, cette fonction de modification permet de modifier les informations d'une issue en pré-remplissant le formulaire avec les informations existantes.
>
>**Tâche 10.0** : [FRONT-END].
> Creer un composant angular `update-issue` qui va utiliser le formulaire du composant `add-issue` , ajouter aussi la methode put dans le service `issue.service.ts` et le route pour acceder à la page de modification  dans `app-routing.module.ts` .
>**Tâche 10.1** : [BACK-END].
>  Ajouter dans le controlleur (`issue.controllers.js`) dans `issue` la méthode qui permet d'ajouter ce modele dans la base de données apres avoir défini la route dans le fichier `issue.router.js` avec la methode put de http du router.


**Tâche 11** : Créer un sprint
>  En cliquant sur le bouton "Ajout sprint" un formulaire est proposé, où il est demandé de renseigner  le nom du sprint à ajouter, sa date début, sa date de fin puis ajouter toutes les issues qui vont être traiter dans ce sprint.
>
>**Tâche 11.0** : [FRONT-END]
>En cliquant sur le bouton "ajouter sprint" qui se trouve en haut de la page `detail-project`, un formulaire apparaitra qui présent au développeur les champs suivants :  titre, date de debut, date de fin dans un popup .
>**Tâche 11.1** : [BACK-END]
>Ajouter dans  le controlleur (`issue/issue.controllers.js`)  la methode qui permet d'ajouter un issue dans la base de données apres avoir defini le route dans le fichier `issue.router.js`  avec la methode post de http.

**Tâche 12** : Modifier un sprint
>Les developpeurs pourront modifier un sprint en cliquant sur le bouton de modification présent sur la page du `detail-project` . En cliquant sur ce bouton, le même formulaire que celui de l'ajout d'un sprint apparraitra, cette fonction de modification permet de modifier les informations d'un sprint  en pré-remplissant le formulaire avec les informations existantes.
>**Tâche 12.0** : [FRONT-END]
>Creer un composant angular `update-sprint` qui va utiliser le formulaire du composant `add-sprint` , ajouter aussi la methode put dans le service `sprint.service.ts` et le route pour acceder à la page de modification  dans `app-routing.module.ts` .
>**Tâche 12.1** : [BACK-END]
>Ajouter dans le controlleur (`sprint.controllers.js`) dans `sprint` la méthode qui permet d'ajouter ce modele dans la base de données apres avoir défini la route dans le fichier `sprint.router.js` avec la methode put de http du router sachant que le titre d'un sprint est unique par projet .


**Tâche 13.0** Changer l'etat d'une tâche : [FRONT-END]
>Les developpeurs pourront modifier l'etat d'une tâche avec une liste deroulante qui  contien les valeurs (En cours , Todo, Terminé)et des buttons de choix pour dire si ils sont tester ou documenter en cliquant sur le bouton de modification présent sur la page du `detail-project` . En cliquant sur ce bouton, le même formulaire que celui de l'ajout d'un sprint apparraitra, cette fonction de modification permet de modifier les informations d'un sprint  en pré-remplissant le formulaire avec les informations existantes.

**Tâche 13.1** Changer l'etat d'une tâche : [BACK-END]
>



**Tâche 15.0** Supprimer un sprint : [FRONT-END]
> La methode de suppression  sera fait dans le fichier `detail-project.component.ts` dans le composant detail-project et en ajouter aussi le service HTTP dans le fichier `sprint.service.ts` si il est pas defini

**Tâche 15.1** Supprimer un sprint : [BACK-END]
> Ajouter dans le controlleur (`sprint.controllers.js`) dans `sprint` la methode qui permet de supprimer un  sprint dans la base de données apres avoir defini le route dans le fichier `sprint.router.js` avec la methode delete de http du router.La suppresssion  d'un sprint supprime aussi les issues qui  leur sont liés .

**Tâche 16**  Creer le fichier `docker-compose.yaml`
> Contenant un container pour application MEAN Stack

