# Scénarios Gherkin

### Feature :” Ajouter un projet “
> 
> 
> * #### Scénario:
>     Création d’un projet dans un formulaire et que ça s’enregistrer les informations dans la base de données.
>     
> * #### Given: 
>     Je suis connecté en tant que visiteur.
> 
> * #### AND:
>     Je suis sur la page d'acceuil.
> 
> * #### When: 
>     Je clique sur le bouton ajouter un projet sur la page qui liste les différents projet.
> * #### AND: 
>     Le formulaire d’ajout du projet s’affiche.
> * #### AND:
>     Je remplis les informations du projet à savoir :  un titre (comme identifiant unique), une durée, une description, une url du dépot de code et un cahier des charges
> * #### AND: 
>     Je clique sur le bouton ajouter.
> * #### Then: 
>     Je reçois une notification “Projet Enregistré” avec une redirection vers la liste des projets.
> * #### AND:
>     Dans la liste des projets , je vois les différents informations du projet ajouté.
> 
> 
### Feature :” Modification d'un projet “

> 
> * #### Scénario:
>    Modification d'un projet dans un formulaire et ça s'enregistre les informations modifié dans la base de données.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner.
> 
> * #### AND:
>     Je suis sur la page qui listes les projets.
> 
> * #### When: 
>     Je clique sur l'icone de modification du projet choisi.
> * #### AND: 
>     Le formulaire de modification du projet s’affiche.
> * #### AND:
>     Je modifie les informations souhaité
> * #### AND: 
>     Je clique sur le bouton modifier.
> * #### Then: 
>     Je reçois une notification “Projet Modifié”..
> * #### AND:
>     Dans la page qui liste les projets, je vois le projet modifé avec les nouvelles informations.
> 
> 

### Feature :” Suppression d'un projet “
> 
> * #### Scénario:
>   Suppression d'un projet dans la page qui liste les projets.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner.
> 
> * #### AND:
>     Je suis sur la page qui listes les projets.
> 
> * #### When: 
>     Je clique sur l'icone de suppression du projet choisi.
> * #### AND: 
>    Le pop de suppression s'affiche pour confirmer la suppresion.
> * #### AND: 
>     Je clique sur le bouton confirmer.
> * #### Then: 
>     Je reçois une notification “Projet Supprimé”.
> * #### AND:
>     Dans la page qui liste les projets, je vois plus le projet supprimé.
    

### Feature :” Ajouter une issue “

> 
> * #### Scénario:
>     Création d’une issue dans un formulaire et que ça s’enregistrer les informations dans la base de données.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner ou developpeur.
> 
> * #### AND:
>     Je suis sur la page qui liste le backlog(les différents issues) du projet.
> 
> * #### When: 
>     Je clique sur le bouton ajouter une issue.
> * #### AND: 
>     Le formulaire d’ajout de l'issue s’affiche.
> * #### AND:
>     Je remplis les informations de l'issue à savoir : Un identifiant unique, une description, une difficulté et une priorité.
> * #### AND: 
>     Je clique sur le bouton ajouter issue.
> * #### Then: 
>     Je reçois une notification “Issue Enregistré”..
> * #### AND:
>     Dans la page qui liste des issues , je vois l'issue que  je  viens d'ajouter.
> 


### Feature :” Modification d'une issue “

> 
> * #### Scénario:
>    Modification d'une issue dans un formulaire et ça s'enregistre les informations modifié dans la base de données.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner ou developpeur.
> 
> * #### AND:
>     Je suis sur la page qui listes les issues.
> 
> * #### When: 
>     Je clique sur l'icone de modification de l'issue choisi.
> * #### AND: 
>     Le formulaire de modification de l'issue s’affiche.
> * #### AND:
>     Je modifie les informations souhaité
> * #### AND: 
>     Je clique sur le bouton modifier.
> * #### Then: 
>     Je reçois une notification “Issue Modifié”..
> * #### AND:
>     Dans la page qui liste les issue, je vois l'issue modifé avec les nouvelles informations.
> 
### Feature :” Suppression d'une issue “

> * #### Scénario:
>   Suppression d'une issue dans la page qui liste les issues.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner.
> 
> * #### AND:
>     Je suis sur la page qui listes les issues.
> 
> * #### When: 
>     Je clique sur l'icone de suppression de l'issue choisi.
> * #### AND: 
>    Le pop de suppression s'affiche pour confirmer la suppresion.
> * #### AND: 
>     Je clique sur le bouton supprimer.
> * #### Then: 
>     Je reçois une notification “Issue Supprimé”.
> * #### AND:
>     Dans la page qui liste les issues, je vois plus l'issue supprimé.
>     

### Feature :” Ajouter un sprint “

> 
> * #### Scénario:
>     Création d’un sprint dans un formulaire et que ça s’enregistrer les informations dans la base de données.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner ou developpeur.
> 
> * #### AND:
>     Je suis sur la page qui liste les sprints du projet choisi.
> 
> * #### When: 
>     Je clique sur le bouton ajouter un sprint.
> * #### AND: 
>     Le formulaire d’ajout du sprint s’affiche.
> * #### AND:
>     Je remplis les informations du sprint à savoir :  un numéro, un titre, une date de début et une date de fin.
> * #### AND: 
>     Je clique sur le bouton ajouter.
> * #### Then: 
>     Je reçois une notification “Sprint Enregistré”.
> * #### AND:
>     En haut de la page listant les sprints je vois le sprint ajouté.
> 
> 
### Feature :” Modification d'un sprint “
> 
> 
> * #### Scénario:
>    Modification d'un sprint dans un formulaire et ça s'enregistre les informations modifié dans la base de données.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner ou developpeur.
> 
> * #### AND:
>     Je suis sur la page qui listes les sprint.
> 
> * #### When: 
>     Je clique sur l'icone de suppression du sprint choisi.
> * #### AND: 
>     Le formulaire de modification du sprint s’affiche.
> * #### AND:
>     Je modifie les informations souhaité
> * #### AND: 
>     Je clique sur le bouton modifier.
> * #### Then: 
>     Je reçois une notification “Sprint Modifié”.
> * #### AND:
>     Dans la page qui liste les sprints, je vois le sprint modifé avec les nouvelles informations.
> 
### Feature :” Suppression d'un sprint “
> 
> * #### Scénario:
>   Suppression d'un sprint dans la page qui liste les sprints.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner.
> 
> * #### AND:
>     Je suis sur la page qui listes les sprints.
> 
> * #### When: 
>     Je clique sur l'icone de suppression du sprint choisi.
> * #### AND: 
>    Le pop de suppression s'affiche pour confirmer la suppresion.
> * #### AND: 
>     Je clique sur le bouton confirmer.
> * #### Then: 
>     Je reçois une notification “Issue Supprimé”.
> * #### AND:
>     Dans la page qui liste les issues, je vois plus l'issue supprimé.
>     



### Feature :” Ajouter une issue à un sprint “

> 
> * #### Scénario:
>     L'ajout d’une issue dans un sprint.
>     
> * #### Given: 
>     Je suis connecté en tant que ProductOwner.
> 
> * #### AND:
>     Je suis sur la page qui liste le Backlog et les sprints.
> * #### AND:
>     Je choisi le sprint auquel je veux ajouter l'issue.
> 
> * #### When: 
>     Je glisse l'issue vers le sprint choisi.
> 
> * #### Then: 
>     Je vois que l'issue est ajouté sur le sprint.
> 
> 
