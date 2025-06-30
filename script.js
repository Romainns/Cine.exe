const API_KEY = "e65f92e8"; /* Clé API */

document.addEventListener("DOMContentLoaded", () => {
    /* Recherche des éléments de l'html */    
    const catalogueContenu = document.querySelector(".catalogue-contenu");
    const rechercheInput = document.querySelector(".recherche input");
    const pagination = document.querySelector(".pagination");
    const typeSelect = document.getElementById("type");
    const anneeInput = document.getElementById("annee");

    catalogueContenu.innerHTML = "<p>Veuillez entrer des mots-clés.</p>"; /* Message par défaut */

    let filmsParPage = 10; /* A changer selon le nombre de films par page à afficher */
    /* Initialisation */
    let pageCourante = 1;
    let recherche = "";
    let filtre = [];

    async function estFavori(imdbId) {
        try {
            // Envoie une requête GET vers le script PHP, avec l'identifiant du film ou de la série
            const response = await fetch('est_favori.php?imdb_id=' + encodeURIComponent(imdbId));
            // Attend la réponse complète du serveur, et la lit comme texte
            const text = await response.text();
            try {   
            // Tente de convertir le texte en objet JSON et retourne la valeur de "estFavori"
                return JSON.parse(text).estFavori;
            } catch (e) {
            // Si la réponse n'est pas un JSON valide, on affiche l'erreur dans la console
                console.error("Réponse non JSON:", text);
                return false; // Par défaut on considère que ce n’est pas un favori
            }
        } catch (err) {
            // Si une erreur réseau ou serveur empêche la requête de fonctionner
            console.error("Erreur fetch:", err);
            return false;
        }
    }

    function fetchCatalogue(page = 1) {
        /* Si rien dans la barre de recherche */
        if (recherche.trim() === "") { /* trim() pour enlever les espaces */
            catalogueContenu.innerHTML = "<p>Veuillez entrer des mots-clés.</p>";
            afficherPagination(0);
            return;
        }

        catalogueContenu.innerHTML = "<p>Chargement en cours...</p>"; 

        /* Création de l'URL pour l'API */        
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${(recherche)}&page=1`;
        const type = typeSelect.value;
        const annee = anneeInput.value;

        /* Rajoute le type si rentré */
        if (type !== "" && type !== "all") {
            url += `&type=${type}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(async dataAPI => {
                if (dataAPI.Response === "True") {
                    let allResults = dataAPI.Search; /* Récupère les résultats de la première page */
                    const totalAPIResults = parseInt(dataAPI.totalResults); /* Convertit le total des résultats en entier */
                    const totalPages = Math.ceil(totalAPIResults / 10); /* Calcule le nombre total de pages */

                    /* Refait des requêtes pour les pages suivantes si il y en a */
                    const fetches = [];
                    for (let i = 2; i <= totalPages; i++) {
                        let nextUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${(recherche)}&page=${i}`;
                        if (type !== "" && type !== "all") {
                            nextUrl += `&type=${type}`;
                        }
                        fetches.push(fetch(nextUrl).then(res => res.json()));
                    }

                    /* Attends que toutes les requêtes soient finies */
                    const results = await Promise.all(fetches);
                    /* Ajoute les résultats des pages suivantes */
                    results.forEach(res => {
                        if (res.Response === "True") {
                            allResults = allResults.concat(res.Search);
                        }
                    });

                    /* Filtre les résultats selon l'année si renseignée */
                    if (annee !== "") {
                        allResults = allResults.filter(item => item.Year === annee);
                    }

                    /* Récupération des données */
                    filtre = allResults.map(item => ({
                        imdbID: item.imdbID,
                        title: item.Title,
                        type: item.Type === "series" ? "Série" : item   .Type === "game" ? "Jeux vidéo" : "Film",
                        year: item.Year,
                        image: item.Poster !== "N/A" ? item.Poster : "img/defaut.png",
                        lien: `https://www.imdb.com/title/${item.imdbID}/`,
                    }));

                    /* MAJ du nb de résultats et page courante */
                    totalResultats = filtre.length;
                    pageCourante = page;
                    afficherCatalogue();

                } else {
                    filtre = [];
                    totalResultats = 0;
                    afficherCatalogue();
                }
            })
    }

    /* Vérifie si des choses sont rentrées dans la recherche */
    rechercheInput.addEventListener("input", () => {
        recherche = rechercheInput.value.trim();
        pageCourante = 1;
        fetchCatalogue(pageCourante);
    });

    /* Vérifie si le type a changé */    
    typeSelect.addEventListener("change", () => {
        pageCourante = 1;
        fetchCatalogue(pageCourante);
    });

    /* Vérifie si l'année a changé */
    anneeInput.addEventListener("input", () => {
        pageCourante = 1;
        fetchCatalogue(pageCourante);
    });

    /* Fonction pour afficher le catalogue */
    function afficherCatalogue() {
        catalogueContenu.innerHTML = "";

        /* Si aucun résultat */
        if (filtre.length === 0) {
            catalogueContenu.innerHTML = "<p>Aucun résultat trouvé.</p>";
            afficherPagination(0);
            return;
        }

        /* Résultats par page */
        const debut = (pageCourante - 1) * filmsParPage;
        const fin = debut + filmsParPage;
        const pageItems = filtre.slice(debut, fin); /* slice pour obtenir les items de la page actuelle */

        /* Création des cartes */
        pageItems.forEach((item, index) => {
            const carte = document.createElement("div");
            carte.classList.add("carte");
            carte.innerHTML = `
                <img src="${item.image}" alt="Affiche de ${item.title}" class="affiche" onerror="this.onerror=null; this.src='img/defaut.png';">
                <div class="infos">
                    <h3>${item.title} <br>(${item.year})</h3>
                    <p><strong>Type :</strong> ${item.type}</p>
                    <button class="voir-plus" data-index="${debut + index}">Voir plus</button>
                </div>
            `;

            catalogueContenu.appendChild(carte);
        });

        /* Si le bouton "Voir plus" est cliqué */
        document.querySelectorAll(".voir-plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const imdbID = filtre[index].lien.replace("https://www.imdb.com/title/", "").replace("/", "");

                /* Récupération des détails de l'item pour la popup */
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`)
                    .then(response => response.json())
                    .then(details => {
                            const itemDetail = {
                                imdbID: details.imdbID,
                                title: details.Title,
                                type: details.Type.charAt(0).toUpperCase() + details.Type.slice(1),
                                year: details.Year,
                                time: details.Runtime || "Durée non spécifiée",
                                actors: details.Actors || "Acteurs non spécifiés",
                                genre: details.Genre || "Genre non spécifié",
                                image: details.Poster !== "N/A" ? details.Poster : "img/defaut.png",
                                lien: `https://www.imdb.com/title/${details.imdbID}/`,
                                description: details.Plot !== "N/A" ? details.Plot : "Description indisponible.",
                            };
                            ouvrirPopup(itemDetail);
                    });
            });
        });

        afficherPagination(filtre.length);

    };

    /* Fonction pour afficher la pagination */
    function afficherPagination(total) {
        pagination.innerHTML = "";

        const totalPages = Math.ceil(total / filmsParPage); /* Calcule le nombre total de pages */
        if (totalPages <= 1) return;

        /* Bouton précédent */
        if (pageCourante > 1) {
            const btnPrecedent = document.createElement("button");
            btnPrecedent.textContent = "« Précédent";
            btnPrecedent.addEventListener("click", () => {
                pageCourante--;
                afficherCatalogue();
            });
            pagination.appendChild(btnPrecedent);
        }

        /* Affichage des numéros de page */
        const maxPagesToShow = 7;
        let start = Math.max(1, pageCourante - Math.floor(maxPagesToShow / 2));
        let end = Math.min(totalPages, start + maxPagesToShow - 1);

        if (end - start < maxPagesToShow - 1) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }

        for (let i = start; i <= end; i++) {
            const btnPage = document.createElement("button");
            btnPage.textContent = i;
            if (i === pageCourante) {
                btnPage.disabled = true;
                btnPage.classList.add("active");
            } else {
                btnPage.addEventListener("click", () => {
                    pageCourante = i;
                    afficherCatalogue();
                });
            }
            pagination.appendChild(btnPage);
        }

        /* Bouton suivant */
        if (pageCourante < totalPages) {
            const btnSuivant = document.createElement("button");
            btnSuivant.textContent = "Suivant »";
            btnSuivant.addEventListener("click", () => {
                pageCourante++;
                afficherCatalogue();
            });
            pagination.appendChild(btnSuivant);
        }
    }

    /* Fonction pour ouvrir la popup */
    async function ouvrirPopup(item) {
        const popup = document.querySelector(".popup");
        const popupContenu = document.querySelector(".popup-content");
        const isFav = await estFavori(item.imdbID);

        const ancienEtatClick = popup.getAttribute("data-listener");
        if (ancienEtatClick) {
            document.removeEventListener("click", window[ancienEtatClick]);
        }

        let boutonFavori = "";
        if (typeof userIsLoggedIn !== "undefined" && userIsLoggedIn) {
            const imdbId = item.imdbID;
            const texteBouton = isFav ? "Retirer des favoris" : "Ajouter aux favoris";
            const classeBouton = isFav ? "btn-retirer-favoris" : "btn-favori";

            boutonFavori = `<button class="popup-lien ${classeBouton}" data-imdbid="${imdbId}" data-title="${item.title}" data-type="${item.type}" data-year="${item.year}" data-poster="${item.image}">${texteBouton}</button>`;
        } else {
            boutonFavori = `<button class="popup-lien" onclick="alert('Veuillez vous connecter à votre compte pour ajouter ce film aux favoris.');">Ajouter aux favoris</button>`;
        }

        /* Création du contenu de la popup */
        popupContenu.innerHTML = `
            <span class="fermer">&times;</span>
            <div class="popup-affiche">
                <img src="${item.image}" alt="Affiche de ${item.title}" class="popup-img" onerror="this.onerror=null; this.src='img/defaut.png';">
            </div>
            <div class="popup-infos">
                <h3>${item.title}</h3>
                <p><strong>Type :</strong> ${item.type}</p>
                <p><strong>Année :</strong> ${item.year}</p>
                <p><strong>Durée :</strong> ${item.time}</p>
                <p><strong>Genre :</strong> ${item.genre}</p>
                <p><strong>Acteurs :</strong> ${item.actors}</p>
                <p class="popup-desc">${item.description}</p>
                <div class="popup-actions"> 
                    <button class="popup-lien"><a href="${item.lien}" target="_blank">Voir la page IMDb</a></button>
                    ${boutonFavori}
                </div>
            </div>
        `;
        
        /* Style de la popup */
        popup.style.display = "flex";

        /* Gestion de la fermeture de la popup avec le bouton fermer */
        popup.querySelector(".fermer").addEventListener("click", () => {
            popup.style.display = "none";
        });

        /* Gestion de la fermeture de la popup en cliquant à l'extérieur */
        const nouvelEtatClick = (e) => {
            if (!popupContenu.contains(e.target)) {
                popup.style.display = "none";
                document.removeEventListener("click", nouvelEtatClick);
            }
        };

        /* Stockage écouteur global */
        const Etat = "nouvelEtatClick_" + Date.now();
        window[Etat] = nouvelEtatClick;
        popup.setAttribute("data-listener", Etat);

        setTimeout(() => {
            document.addEventListener("click", nouvelEtatClick);
        }, 0);

        /* Gestion des favoris */
        const btnFavori = popup.querySelector(".btn-favori, .btn-retirer-favoris");
        if (btnFavori) {
            btnFavori.addEventListener("click", async () => {
                const formData = new FormData();
                formData.append('id', btnFavori.dataset.imdbid);
                formData.append('titre', btnFavori.dataset.title);
                formData.append('annee', btnFavori.dataset.year);
                formData.append('type', btnFavori.dataset.type);
                formData.append('affiche', btnFavori.dataset.poster);

                try {
                    const res = await fetch("favoris_actions.php", {
                        method: "POST",
                        body: formData
                    });
                    const result = await res.json();

                    if (result.success) {
                        if (result.action === "ajouté") {
                            btnFavori.textContent = "Retirer des favoris";
                            btnFavori.classList.remove("btn-favori");
                            btnFavori.classList.add("btn-retirer-favoris");
                        } else if (result.action === "supprimé") {
                            btnFavori.textContent = "Ajouter aux favoris";
                            btnFavori.classList.remove("btn-retirer-favoris");
                            btnFavori.classList.add("btn-favori");
                        }
                    } else {
                        alert("Erreur : " + result.message);
                    }
                } catch (error) {
                    console.error("Erreur lors de l'envoi :", error);
                    alert("Une erreur est survenue.");
                }
            });
        }
    }


    /* Gestion du clic de la navbar pour le filtre série */
    const lienSeries = document.getElementById("lien-series");
    if (lienSeries) {
        lienSeries.addEventListener("click", (e) => {
            e.preventDefault(); /* Empêche le comportement par défaut du lien */
            typeSelect.value = "series";
            pageCourante = 1;
            fetchCatalogue(pageCourante);
        });
    }

    /* Gestion du clic de la navbar pour le filtre film */
    const lienFilms = document.getElementById("lien-films");
    if (lienFilms) {
        lienFilms.addEventListener("click", (e) => {
            e.preventDefault();
            typeSelect.value = "movie";
            pageCourante = 1;
            fetchCatalogue(pageCourante);
        });
    }

    /* Gestion du clic de la navbar pour le filtre jeux */
    const lienJeux = document.getElementById("lien-jeux");
    if (lienJeux) {
        lienJeux.addEventListener("click", (e) => {
            e.preventDefault();
            typeSelect.value = "game";
            pageCourante = 1;
            fetchCatalogue(pageCourante);
        });
    };
});

