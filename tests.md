# Plan de tests

## Tests unitaires (6 minimum)

1. **Nom** : test_construction_url_recherche_type_film\
**Description** : Vérifie que l’URL construite avec un mot-clé de recherche et un type "movie" contient bien le paramètre &type=movie.

2. **Nom** : test_filtrage_resultats_par_annee\
**Description** : Donne un tableau d’objets avec différentes années et vérifie que le filtre par année "2020" ne conserve que les bons.

3. **Nom** : test_estFavori_si_json_invalide\
**Description** : Simule une réponse texte non JSON depuis le backend et vérifie que la fonction estFavori() retourne bien false.

4. **Nom** : test_afficherCatalogue_aucun_resultat\
**Description** : Fournit une liste vide à filtre et vérifie que le DOM contient le message "Aucun résultat trouvé".

5. **Nom** : test_pagination_calcule_nombre_de_pages_correctement\
**Description** : Donne 25 résultats à filtre avec filmsParPage = 10 et vérifie que Math.ceil retourne 3 pages.

6. **Nom** : test_affiche_defaut_si_image_non_disponible\
**Description** : Simule une carte sans image et vérifie que l’image affichée est bien defaut.png.

## Tests d'intégration (4 minimum)

1. **Nom** : test_fetchCatalogue_recoit_resultats_depuis_OMDB\
**Description** : Simule une recherche (ex: "Batman") et vérifie que des résultats sont récupérés et affichés dans le DOM.

2. **Nom** : test_popup_affiche_donnees_completes_depuis_api\
**Description** : Vérifie que le bouton "Voir plus" récupère bien les données détaillées d’un film via l’API et les affiche dans la popup.

3. **Nom** : test_ajout_favori_stocke_dans_bdd\
**Description** : Un utilisateur connecté ajoute un film aux favoris, vérifie que le film est bien présent dans la base de données.

4. **Nom** : test_suppression_utilisateur_supprime_utilisateur_dans_bdd\
**Description** : Après suppression d’un compte utilisateur, vérifie que l'utilisateur n'est plus présent dans la BDD.

## Tests fonctionnels (4 minimum)

1. **Nom** : test_connexion_utilisateur_affiche_menu_deconnexion\
**Description** : L’utilisateur entre ses identifiants, clique sur "Se connecter", puis voit apparaître le bouton "Se déconnecter".

2. **Nom** : test_deconnexion_redirige_accueil\
**Description** : L’utilisateur clique sur "Se déconnecter", est redirigé vers l’accueil, et voit le formulaire de connexion.

3. **Nom** : test_favori_non_connecte_affiche_erreur\
**Description** : Un utilisateur non connecté clique sur "Ajouter aux favoris" → un message d'erreur s’affiche.

4. **Nom** : test_consultation_favoris_affiche_liste_correcte\
**Description** : Un utilisateur connecté clique sur "Mes favoris". La page affiche tous les films/séries ajoutés aux favoris. Si aucun favori n’est présent, un message "Vous n’avez aucun favori" s’affiche.