# Task Sprint 3 UE CDP (Groupe 1 - Equipe 5)

| ID | US liée | Dépendances | Temps estimé | Etat | Affectation |
|----|----|----|----|----|----|
| 0.0 | x | x | 1 | DONE |  Alfred |
| 1.0 | x | x | 1 | TODO |  |
| 1.1 | x | x | 1 | TODO |  |
| 2.0 | x | x | 1 | TODO |  |
| 3.1 | US8 | x | 1 | TODO |  Alfred |
| 3.2 | US8 | x | 0.5 | TODO | Alfred |
| 4.1 | US5 | x | 0.5  | DONE |  Oumayma|
| 4.2 |  US5 | x | 0.5  | DONE | Oumayma |
| 5.1 | US5 | 4.1 | 0.5  | DONE |  Oumayma |
| 5.2 | US5 | x | 0.5 | DONE | Oumayma |
| 6.1 | US16 | x | 0.5 | DONE |  Eudes |
| 6.2 | US16 | x | 0.5 | DONE |  Eudes |
| 7.1 | US17 | 6.1, 6.2 | 1.5 | DONE |  Eudes |
| 8.1 | US18 | x | 1.5 | TODO |  |
| 8.2 | US18 | x  | 1.5 | TODO |  |
| 9.1 | US19 | x  | 0.5 | DONE | Oumayma & Alfred |
| 9.2 | US19 | x | 0.5 | DONE | Oumayma   |
| 10.1 | US20 | 3.1, 3.2 | 0.5 | TODO |  |
| 10.2 | US20 | 10.1 | 1 | TODO |  |


---

## Liste des Tâches : Résumé

* **Tâche 0** : Mise en place de l'automatisation du lancement des tests.
* **Tâche 1** : Test Unitaire
* **Tâche 2** : Test UI (Selenium) [FRONT-END]
* **Tâche 3** : Terminer un sprint.
* **Tâche 4** : Lister tout les développeurs d'un projet.
* **Tâche 5** : Supprimer un developpeur d'un projet.
* **Tâche 6** : Associer des dépendances entre les tâches.
* **Tâche 7** : Visualiser les différentes dépendances entre les tâches.
* **Tâche 8** : Associer une release (sous la forme d’un lien) à un sprint.
* **Tâche 9** : Ajouter des notes aux issues.
* **Tâche 10** : Visualiser la vélocité (BurnDownChart) d'un projet.


## Liste des Tâches : Description et DoD

**Tâche 0** : Mise en place de l'automatisation du lancement des tests.
>**Définition of done** :
>
>  Le projet devra utiliser un outil permettant d'automatiser le lancement des tests avant chaque commit dans le but de suivre le principe d'intégration continu. Les suivis / rapports de tests devront être conserver dans le but d'identifier plus facilement la provenance des bugs. Pour cela, on va  ajouter Travis à notre dépôt Git.

**Tâche 1** : Test Unitaire
>**Définition of done** :
>
> La création des tests unitaire sur le front-end et le back-end de notre applciation.

>**Tâche 1.1** : [FRONT-END]
> La définition des tests unitaires sera fait sur chaque componsant dans le fichier `nom_composant.spec.ts` avec Jasmine.
>**Tâche 1.2** : [BACK-END]
> La description des testes unitaires seront fait dans les dossiers __ tests __  de chaque modéles (`project`, ...) avec Jasmine.
>

**Tâche 2** : Test UI (Selenium) [FRONT-END]
>**Définition of done** :
>
> Il faudrat mettre en place un ensemble de scénarios de tests de l'interface graphique. Pour ce faire, nous utiliserons l'add-on Firefox Selenium-IDE.

**Tâche 3** : Terminer un sprint.
>**Définition of done** :
>
>Le développeur peut terminer un sprint en cliquant sur le bouton  "Terminer Sprint" présent sur le cadre du sprint choisi dans la page 'details projet'. Une fois le sprint  terminé, toutes les issues non faites pendant ce sprint seront mises sur le sprint suivant.
>

>**Tâche 3.1** : [FRONT-END]
> Les développeurs pourront terminer un sprint en cliquant sur le bouton "Terminer Sprint" présent sur la page qui liste les sprints du projets. En cliquant sur ce bouton, une popup apparraitra permettant d'obtenir la confirmation de l'utilisateur.
>
>**Tâche 3.2** : [BACK-END]
> La méthode sera fait dans le fichier `detail-project.component.ts` dans le composant detail-project et en ajouter aussi le service HTTP dans le fichier `sprint.service.ts` si il est pas defini.



**Tâche 4** : Lister tout les développeurs d'un projet.
>**Définition of done** :
>
>Le product owner pourra voir la liste de tout les développeurs qu'il a ajouté sur son projet afin qu'il puisse modifier leurs informations ou les supprimer du projet.
>

>**Tâche 4.1** : [FRONT-END]
> La page devra présenter les différents developpeurs que le product owner a ajouter sur son projet. Un tableau présentera donc tous les développeurs en y indiquant (header du tableau) les informations : le nom et l'e-mail de développeur,Bouton de suppression et Bouton d'édition. Il sera enfin disposé en haut de page  un bouton permettant l'ajout d'un nouveau utilisateur. Pour cela il faut creer le composant list-user,ajouter la methode getusers dans le fichier list-user.service.ts.
>
>**Tâche 4.2** : [BACK-END]
>Ajouter une méthode `getUsers` dans le fichier `user.controllers.js` dans resources/user qui permet de récuperer les utilisateurs avec la methode `GET` de HTTP ainsi que l'ajout du router dans `user.router.js`.
>

**Tâche 5** : Supprimer un développeur d'un projet.
>**Définition of done** :
>
>Le product owner pourra supprimer un développeur des projets qu'il a crée afin de pouvoir gérer les visiteurs ayant accès à ses projets.
>

>**Tâche 5.1** : [FRONT-END]
> Le product owner pourra supprimer un développeur du projet qu'il a crée en cliquant sur le bouton de suppression présent sur la page qui liste les développeurs d'un projet. En cliquant sur ce bouton, une popup apparraitra permettant d'obtenir la confirmation de l'utilisateur.
>
>**Tâche 5.2** : [BACK-END]
>Ajouter dans le controlleur (`user.controllers.js`) la méthode qui permet de supprimer l'utilisateur dans la base de données après avoir defini la route dans le fichier `user.router.js` avec la méthode http delete du router.
>



**Tâche 6** : Associer des dépendances entre les tâches.
>**Définition of done** :
>
> Les développeurs pourront ajouter les dépendances entre les tâches pour faciliter la planification et savoir les tâches les plus prioritaires.
>

>**Tâche 6.1** : [FRONT-END]
> Il faudrat pour ce faire ajouter un champ "tâches dépendantes" dans le formulaire d'ajout / d'édition de tâches (ainsi que dans le modèle task). Ce champ devra lister les identifiants des tâches déjà saisient dans le sprint.
>
>**Tâche 6.2** : [BACK-END]
> Il faudrat modifier le modèle task pour permettre le stockage des dépendances entre les tâches. Cette propriété sera de type `Number[]`.

**Tâche 7** : Visualiser les différentes dépendances entre les tâches.
>**Définition of done** :
>
> Les développeurs auront la possibilité de visualiser les différentes dépendances entres les tâches afin d'être aider dans la planification lors du choix de la tâche à réaliser.
>

>**Tâche 7.1** : [FRONT-END]
> Sur la page de Kanban, un affichage des tâches sur un axe horizontal sera présenter (les tâches étant ordonner sur cet axe par leurs dépendances). Cette affichage permettra d'indiquer l'ordre des tâches à réaliser. Pour ce faire, chaque tâche sur cette axe sera placer après l'ensemble des tâches dont cette première dépend.

**Tâche 8** : Associer une release (sous la forme d’un lien) à un sprint.
>**Définition of done** :
> Il faut associer un lien de release à chaque sprint, pour cela on va ajouter dans la modification d'un sprint un champs correspondant à l'url de la release.
>

>**Tâche 8.1** : [FRONT-END]
> Il faudrat ajouter une propriété `release` qui permettra de saisir une url sur le modèle sprint, et permettre sa manipulation depuis la page d'édition de sprint.
>
>**Tâche 8.2** : [BACK-END]
> Il faudrat modifier le modèle sprint en ajoutant un champ de type `string` (permettant de stocker l'url).



**Tâche 9** : Ajouter des notes aux issues.
>**Définition of done** :
>
> Le product owner peut ajouter une ou plusieurs notes à une issue afin de faire évoluer les besoins du projet.
>

>**Tâche 9.1** : [FRONT-END]
> Il faudrat ajouter une propriété de type `string` (note) au modèle `Issue` et ajouter un champ au formulaire d'édition d'une issue accessible uniquement au product owner.
>
>**Tâche 9.2** : [BACK-END]
> Il faudrat ajouter une propriété de type `string` (note) au modèle `Issue`.

**Tâche 10** : Visualiser la vélocité (BurnDownChart) et l’avancement du projet.
>**Définition of done** :
>
>Les utilisateurs pourront visualiser la vélocité du projet à chaque terminaison de sprint grâce à la mise en place d'une visualisation de type BurnDownChart.
>

>**Tâche 10.1** : [FRONT-END]
> Dans un premier temps, il faudrat mettre en place une méthode qui calcule la difficulté totale du projet, ainsi qu'une méthode qui calcule à chaque fin de sprint, la difficulté des issues effectués.
>**Tâche 10.2** : [FRONT-END]
Une fois ces deux valeurs récupérés, il faudrat générer une visualisation graphique de ces valeurs.

