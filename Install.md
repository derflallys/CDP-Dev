# **Lancement de l'application web**

L'application web est divisé en 2 parties. Chacune des parties est bien détaillée dans son manuel d'installation respectif.

__Le front__ [le manuel complet](https://github.com/derflallys/CDP-Dev/blob/master/front-end/Documentation_FrontEnd.md) : 
Cette partie représente l'interface web. Basé sur le framework javascript Angular 7, 
il faut installer les dépendances du projet à l'aide de la commande à executer au niveau du code du front:  

    $ npm install 
      
Il suffit ensuite de lancer la commande executant l'application ensuite disponible à l'adresse : [http://localhost:4200](http://localhost:4200)

    $ npm start
    
__Le back__ [le manuel complet](https://github.com/derflallys/CDP-Dev/blob/master/back-end/Documentation_BackEnd.md) : 
Cette partie gère le traitement des données, ainsi que les interactions avec la base de données.
il faut installer les dépendances du projet à l'aide de la commande à executer au niveau du code du back:  
    $ npm install 

Il vous suffit ensuite de lancer l'application avec la commande :

    $ npm run 
    
Votre application est maintenant lancée sur : http://localhost:3000



# **Docker Guide**

**Lancer la commande `docker-compose build` pour builder le projet**

**Lancer l'application avec `docker-compose up`**

**Lancer l'image du front  avec le nom de l'image par defaut `cdp-dev_front-end` `docker run -p 80:80 cdp-dev_front-end`**
Accéder à l'application sur [localhost:80](http://localhost)
