# velibstats


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

```
./gradlew -x webapp
npm start
```

Se rendre sur son navigateur et aller à l'adresse suivante


```
http://localhost:9000/
```
