MORO228 ANALYST — Installation
================================

Le projet contient :
- index.html : interface du site. Il affiche les matchs reçus du service API.
- worker.js : passerelle sécurisée Cloudflare Worker vers API-Football.
- README.txt : ces instructions.

IMPORTANT
---------
Ne colle jamais la clé API-Football dans index.html, dans le code public de GitHub, ni dans une capture d'écran. La clé doit être enregistrée comme secret dans Cloudflare.

ÉTAPE 1 — Remplacer index.html sur GitHub
-----------------------------------------
1. Ouvre le dépôt GitHub moro228-analyst.
2. Ouvre index.html puis le crayon (Edit).
3. Remplace tout le contenu par le contenu du fichier index.html de ce projet.
4. Clique "Commit changes..." puis confirme le commit.
5. Attends 1 à 3 minutes et recharge le site GitHub Pages.

ÉTAPE 2 — Créer la passerelle sécurisée Cloudflare
--------------------------------------------------
1. Crée/ouvre un compte Cloudflare : https://dash.cloudflare.com/
2. Va dans Workers & Pages, puis Create, puis Worker (le libellé peut varier).
3. Donne-lui un nom, par exemple moro228-api.
4. Ouvre son éditeur de code et remplace tout le code par worker.js de ce projet.
5. Enregistre et déploie le Worker.
6. Dans les paramètres du Worker, cherche Variables and Secrets (ou Settings > Variables).
7. Ajoute un secret nommé exactement API_FOOTBALL_KEY et colle ta clé API-Football comme valeur.
8. Ajoute une variable texte nommée ALLOWED_ORIGIN avec cette valeur :
   https://rmakou20-coder.github.io
9. Enregistre/redéploie le Worker.
10. Note l'adresse HTTPS du Worker, par exemple https://moro228-api.<ton-compte>.workers.dev
   (utilise l'adresse réelle donnée par Cloudflare, pas cet exemple).

ÉTAPE 3 — Relier le site au Worker
----------------------------------
1. Ouvre ton site MORO228 ANALYST.
2. Dans "Paramètres de connexion", colle l'adresse HTTPS réelle du Worker.
3. Clique "Enregistrer l'adresse".
4. Choisis une date et une compétition, puis clique "Afficher les matchs".

DÉPANNAGE
---------
- "Aucun match" : choisis une autre date ou "Toutes les compétitions"; vérifie la couverture de ton abonnement.
- Erreur CORS : vérifie ALLOWED_ORIGIN. L'origine attendue est https://rmakou20-coder.github.io (sans chemin final).
- Erreur clé : vérifie que le secret API_FOOTBALL_KEY est correct dans Cloudflare.
- Limite atteinte : vérifie ton quota API-Football.
- L'adresse du Worker ne doit pas contenir /fixtures lorsque tu la colles dans les paramètres; colle seulement l'adresse de base.

À SAVOIR
--------
Cette version affiche les rencontres, horaires, scores et statuts disponibles via API-Football. Elle ne fabrique pas de matchs fictifs. Les probabilités de pari, pronostics automatiques et garanties de gains ne sont pas inclus et ne peuvent pas être déduits de manière fiable uniquement à partir du calendrier des matchs.
