# Plan de tests

## Tests unitaires (6 minimum)

1. **Nom** : test_construction_url_recherche_type_film\
**Description** : Vérifie que l’URL construite avec un mot-clé de recherche et un type "movie" contient bien le paramètre &type=movie.

2. **Nom** : test_filtrage_resultats_par_annee\
**Description** : Donne un tableau d’objets avec différentes années et vérifie que le filtre par année "2020" ne conserve que les bons.