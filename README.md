<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web et lancer les tests, vous devez avoir des outils suivants:
- Le projet cloné/installé localement.
- Docker pour pouvoir accéder au Backend.
- Pour lancer le Backend, il suffit d'ouvrir une console de commande dans le dossier "Eco-Bliss-Bath" et exécuter la commande "docker-compose up".
- NodeJs installé sur le pc
- NPM installé pour pouvoir lancer les commandes.

# Pour démarrer le frontend de l'applicatif
- Il suffit d'ouvrir une console de commande dans le dossier Frontend (ou d'y accéder depuis le dossier racide Eco-Bliss-Bath via cd ./frontend )
- Puis, d'utiliser la commande "ng serve".
- Cela ouvrira le port http://localhost:4200/ pour explorer le site.
- Ensuite, dans une seconde console de commande, toujours dans le dossier frontend, vous allez devoir lancer la commande "npx cypress open".
- Cela ouvrira Cypress pour permettre le lancement des divers tests se trouvant dans le projet.
- Les tests s'effectuent depuis le navigateur de votre choix.


# Tests Effectués
- Tous les tests se trouvent dans le dossier ./frontend/cypress/e2e/Eco-Bliss
- Tous les tests ont été effectués au moins une fois sur Chrome et Firefox.
- Les tests sont répartis en 3 catégories différentes :
  - Les Smoke tests, servant à couvrir les fonctionnalités principales du site.
  - Les tests API, servant à vérifier le bon fonctionnement des requêtes faites et envoyées au backend.
    - Ces tests sont eux mêmes découpés entre les tests GET et les tests POST.
  - Les tests fonctionnels qui servent à assurer de la fonctionnalité de l'application par rapport aux exigences demandées.