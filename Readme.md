# Backlog UE CDP (Groupe 1 - Equipe 5)
## Build travis:

[![Build Travis Status](https://travis-ci.com/derflallys/CDP-Dev.svg?token=gsystqqqLGzAApB6oXpS&branch=master)](https://travis-ci.com/derflallys/CDP-Dev)
## Description des rôles

* Un **visiteur** c'est celui qui a  crée un compte et qui est connecté sur l'application. Il possède un nom, un pseudo, un e-mail et un mot de passe.
* Un **product owner** est un visiteur qui a crée un projet . Il possède tous les droits sur ce projet .
* Un **développeur** est un visiteur auquel le product owner  a affecté un projet.

## Description des termes

* Un **backlog** est un ensemble de user stories.
* Une **user story** ou **issue** est définit par : un identifiant unique, une description, une difficulté et une priorité.
* Une **tâche** est définit par un identifiant, une user story attachée, une description, une durée et un état (à faire, en cours, terminée, testée). Une tâche peut être assigné à un ou plusieurs développeur(s).
* Un **sprint** est un ensemble de tâches définit par : un numéro, un titre, une date de début et une date de fin.
* Un **cahier de charge** définit comme une desciprion du projet.
* Un **Projet** avec un titre (comme identifiant unique), une durée, une description, une url du dépot de code et un cahier des charges.

* **La difficulté** est noté de manière croissante suivant une suite de Fibonacci (1,2,3,5 ...) : 1 étant facile et 5 étant difficile.


## User stories

| ID  	|   Description	                                                                                                                                                        |   Difficulté	|   Priorité	|  Planification |  Etat 	|
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------|----------------|----------|
|   US1	|  En tant que visiteur je souhaite pouvoir créer un compte en renseignant un pseudo, un nom, un e-mail et un mot de passe  afin d'accéder aux fonctionnalités de l'application. 	|      2       |   MOYENNE	   	|   	    Sprint 2     |	DONE	|
|   US2	|  En tant que visiteur je souhaite pouvoir me connecter en accédant avec mon email et mon mot de passe  afin de voir mes projets actifs et leurs avancements.                	|   	2       |   MOYENNE	  	|    Sprint 2            |	DONE	|
|   US3	|  En tant que visiteur, je souhaite pouvoir me déconnecter de l'application afin de quitter l'application.                                                        	|   	1       |   BASSE	   	|   	Sprint 2         |	DONE	|
|   US4	|  En tant que visiteur je souhaite pouvoir créer un projet afin de devenir un product owner pour pouvoir gérer ce projet. 	             |       2    	|   HAUTE	   	|   	Sprint 1         |	DONE	|	
|   US5	|  En tant que product owner je souhaite pouvoir ajouter ou supprimer des développeurs, sur les projets que j'ai créer afin de pouvoir gérer les visiteurs ayant accès à mes projets. 	                       |       2     	|   HAUTE	   	| Sprint 3   |	TODO	|
|   US6	|  En tant que développeur je souhaite pouvoir ajouter, modifier ou supprimer des user stories de mon Backlog. 	                                                                                    |       3    	|   HAUTE	   	|       Sprint 1         |	DONE	|
|   US7  |  En tant que développeur je peux créer, modifier, supprimer un sprint en renseignant un nom, une date de début et une date de fin, afin de pouvoir y renseigner un ensemble d'issues.                                                            	|   	3       |   HAUTE	   	|   	 Sprint 1        |	DONE	|
|   US8	|  En tant que développeur je souhaite pouvoir terminer un sprint afin de pouvoir mettre les tâches non terminées dans le sprint suivant. 	                                                |   	3       |   HAUTE	   	|   	 Sprint 2        |	TODO	|	
|   US9	|  En tant que développeur je souhaite pouvoir ajouter, supprimer une issue d'un sprint afin d'affecter leurs tâches associées.                   |       2      |   HAUTE	   	  |   	  Sprint 1         |	DONE	|	
|   US10	|  En tant que développeur je souhaite pouvoir créer une ou plusieurs tâche(s) en renseignant une issue associée.   						                   |       2      |   HAUTE	   	  |   	Sprint 2           |	DONE	|	
| US11 | En tant que product owner, je souhaite pouvoir ajouter ou modifier la priorité des issues du projet afin d'aider les développeurs à mieux planifier leur tâches.  | 2| HAUTE | Sprint 1  | DONE |
|   US12	|  En tant que développeur je souhaite pouvoir choisir une ou plusieurs tâches  afin de les réaliser .                                                  |   	2       |   HAUTE	   	|   	   Sprint 2      |	DONE	|	
|   US13	|  En tant que développeur je souhaite pouvoir assigner une tâche comme en cours, à tester, à documenter  ou faite.                                                                                         	|        2   	|   HAUTE	   	|   	 Sprint 2        |	DONE	|
|   US14	|  En tant que développeur je souhaite pouvoir accéder à la liste des projets dont je fais parti afin de consulter le backlog ou les tâches qui me sont assignées.  								    |     2      	|   HAUTE	   	|   	Sprint 1         |	DONE	|
|   US15	|  En tant que développeur ou product owner je souhaite pouvoir consulter le backlog et les sprints des projets auxquels je suis affecté.  								    |     2      	|   HAUTE	   	|   	Sprint 1         |	DONE	|
| US16 | 	   En tant que développeur, je souhaite pouvoir associer des dépendances entre les tâches.                                                       | 2 | MOYENNE |  Sprint 3  | TODO |
| US17 | 	En tant que développeur, je souhaite pouvoir visualiser les différentes dépendances entre les tâches afin d'être aider dans la planification. | 5 | MOYENNE |  Sprint 3  | TODO |
| US18 | En tant que développeur, je peux associer une release (sous la forme d'un lien) à un sprint.                                           | 1 | MOYENNE |  Sprint 3  | TODO |
| US19 | En tant que product owner, je souhaite pouvoir ajouter des notes aux issues afin de faire évoluer les besoins du projet. | 1 | MOYENNE | Sprint 3   | TODO |
| US20 | En tant que product owner, je souhaite pouvoir visualiser la vélocité (BurnDownChart) et l'avancement du projet. | 2 | MOYENNE |  Sprint 3  | TODO |

## Difficulté Totale: 43
