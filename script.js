const API_KEY = "170d8fb9";

document.addEventListener("DOMContentLoaded", () => {
    const catalogueContenu = document.querySelector(".catalogue-contenu");
    const rechercheInput = document.querySelector(".recherche input");
    const pagination = document.querySelector(".pagination");
    const typeSelect = document.getElementById("type");
    const anneeInput = document.getElementById("annee");

    catalogueContenu.innerHTML = "<p>Veuillez entrer des mots-clés.</p>";

    let filmsParPage = 10;
    let pageCourante = 1;
    let recherche = "";
    let totalResultats = 0;
    let filtre = [];

    function fetchCatalogue(page = 1) {
        if (recherche.trim() === "") {
            catalogueContenu.innerHTML = "<p>Veuillez entrer des mots-clés.</p>";
            afficherPagination(0);
            return;
        }

        catalogueContenu.innerHTML = "<p>Chargement en cours...</p>";

        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(recherche)}&page=1`;
        const type = typeSelect.value.trim();
        const annee = anneeInput.value.trim();

        if (type !== "" && type !== "all") {
            url += `&type=${type}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(async dataAPI => {
                if (dataAPI.Response === "True") {
                    let allResults = dataAPI.Search;
                    const totalAPIResults = parseInt(dataAPI.totalResults);
                    const totalPages = Math.ceil(totalAPIResults / 10);

                    // Si plusieurs pages, on récupère les suivantes
                    const fetches = [];
                    for (let i = 2; i <= totalPages; i++) {
                        let nextUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(recherche)}&page=${i}`;
                        if (type !== "" && type !== "all") {
                            nextUrl += `&type=${type}`;
                        }
                        fetches.push(fetch(nextUrl).then(res => res.json()));
                    }

                    const results = await Promise.all(fetches);
                    results.forEach(res => {
                        if (res.Response === "True") {
                            allResults = allResults.concat(res.Search);
                        }
                    });

                    // Filtrage client par année
                    if (annee !== "") {
                        allResults = allResults.filter(item => item.Year === annee);
                    }

                    filtre = allResults.map(item => ({
                        title: item.Title,
                        type: item.Type.charAt(0).toUpperCase() + item.Type.slice(1),
                        year: item.Year,
                        image: item.Poster !== "N/A" ? item.Poster : "img/defaut.png",
                        lien: `https://www.imdb.com/title/${item.imdbID}/`,
                    }));

                    totalResultats = filtre.length;
                    pageCourante = page;
                    afficherCatalogue();

                } else {
                    filtre = [];
                    totalResultats = 0;
                    afficherCatalogue();
                }
            })
            .catch(error => {
                console.error("Erreur API OMDb:", error);
                filtre = [];
                totalResultats = 0;
                afficherCatalogue();
            });
    }

    rechercheInput.addEventListener("input", () => {
        recherche = rechercheInput.value.trim();
        pageCourante = 1;
        fetchCatalogue(pageCourante);
    });

    typeSelect.addEventListener("change", () => {
        pageCourante = 1;
        fetchCatalogue(pageCourante);
    });

    anneeInput.addEventListener("input", () => {
        pageCourante = 1;
        fetchCatalogue(pageCourante);
    });

    function afficherCatalogue() {
        catalogueContenu.innerHTML = "";

        if (filtre.length === 0) {
            catalogueContenu.innerHTML = "<p>Aucun résultat trouvé.</p>";
            afficherPagination(0);
            return;
        }

        const debut = (pageCourante - 1) * filmsParPage;
        const fin = debut + filmsParPage;
        const pageItems = filtre.slice(debut, fin);

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

        document.querySelectorAll(".voir-plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const imdbID = filtre[index].lien.replace("https://www.imdb.com/title/", "").replace("/", "");

                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`)
                    .then(response => response.json())
                    .then(details => {
                        if (details.Response === "True") {
                            const itemDetail = {
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
                        } else {
                            console.error("Erreur détails API OMDb:", details.Error);
                        }
                    })
                    .catch(err => {
                        console.error("Erreur réseau pour les détails:", err);
                    });
            });
        });

        afficherPagination(filtre.length);
    }

    function afficherPagination(total) {
        pagination.innerHTML = "";

        const totalPages = Math.ceil(total / filmsParPage);
        if (totalPages <= 1) return;

        if (pageCourante > 1) {
            const btnPrecedent = document.createElement("button");
            btnPrecedent.textContent = "Précédent";
            btnPrecedent.addEventListener("click", () => fetchCatalogue(pageCourante - 1));
            pagination.appendChild(btnPrecedent);
        }

        const infoPage = document.createElement("span");
        infoPage.textContent = ` Page ${pageCourante} sur ${totalPages} `;
        pagination.appendChild(infoPage);

        if (pageCourante < totalPages) {
            const btnSuivant = document.createElement("button");
            btnSuivant.textContent = "Suivant";
            btnSuivant.addEventListener("click", () => fetchCatalogue(pageCourante + 1));
            pagination.appendChild(btnSuivant);
        }
    }

    function ouvrirPopup(item) {
        const popup = document.querySelector(".popup");
        const popupContenu = document.querySelector(".popup-content");

        const ancienEtatClick = popup.getAttribute("data-listener");
        if (ancienEtatClick) {
            document.removeEventListener("click", window[ancienEtatClick]);
        }

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
                <button class="popup-lien"><a href="${item.lien}" target="_blank">Voir la page IMDb</a></button>
            </div>
        `;

        popup.style.display = "flex";

        popup.querySelector(".fermer").addEventListener("click", () => {
            popup.style.display = "none";
        });

        const nouvelEtatClick = (e) => {
            if (!popupContenu.contains(e.target)) {
                popup.style.display = "none";
                document.removeEventListener("click", nouvelEtatClick);
            }
        };

        const Etat = "nouvelEtatClick_" + Date.now();
        window[Etat] = nouvelEtatClick;
        popup.setAttribute("data-listener", Etat);

        setTimeout(() => {
            document.addEventListener("click", nouvelEtatClick);
        }, 0);
    }
});