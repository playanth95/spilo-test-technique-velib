# velibstats v1.0.0


Avant de pouvoir compiler ce projet, vous devez installer et configurer les dépendances suivantes sur votre ordinateur :

1. [Node.js][] : nous utilisons Node pour exécuter un serveur Web de développement et créer le projet.
   En fonction de votre système, vous pouvez installer Node à partir de la source ou en tant qu'ensemble pré-emballé.

Après avoir installé Node, vous devriez pouvoir exécuter la commande suivante pour installer les outils de développement.
Vous n'aurez besoin d'exécuter cette commande que lorsque les dépendances changent dans [package.json](package.json).
```
npm install
```

Nous utilisons des scripts npm et [Angular CLI][] avec [Webpack][] pour le build coté front.

Exécutez les commandes suivantes dans deux terminaux distincts pour créer une expérience de développement agréable où votre navigateur
s'actualise automatiquement lorsque les fichiers changent sur votre disque dur..

### Prérequis pour lancer le projet

```
Framework & Librairie utilisés:

 - Java version: 17
 - Npm Version: 8.19.4 
 - Node version: = v16.20.0
 - Angular: 14.2.0
 - Spring boot: 2.7.3
 - Jhipster: 7.9.3
```

```
Avoir graldle d'instalé sur son poste

 - Java version: Minimum la version 11
 - Npm Version: 8.19.4 ou supérieure.
 - Node version: >= 16.x.x & <= 17.x.x
```
### Commandes à éxécuter pour lancer le projet

```
* npm install ou yarn install

* ./gradlew -x webapp => Lance le serveur sur le port 8080

* npm start => Lance le serveur Angular sur le port 9000
```

Se rendre sur son navigateur et aller à l'adresse suivante


```
http://localhost:9000/
```
# IHM
```
L'image ci dessous représente, la liste des stations de vélibs situées à proximité de Splio.
Par défaut elles sont triées par distance la plus éloignée à la plus proche.
Cette liste est rafraichie toutes les minutes.
```
![](./src/main/resources/readme/bikeAvailable.png)


```
L'image ci dessous représente, le top 3 des stations de vélibs qui sont à préviligier en journée de 5h à 16h
```
![](./src/main/resources/readme/top3stationsvelib.png)


```
L'image ci dessous représente, la moyenne des vélos disponibles  par heure pour chaque station présent dans le dataset
```
![](./src/main/resources/readme/averageBikeAvailable.png)


```
L'image ci dessous représente, la moyenne des emplacements libres par heure pour chaque station présent dans le dataset
```
![](./src/main/resources/readme/FreeDockAvailable.png)
