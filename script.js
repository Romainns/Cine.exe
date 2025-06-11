const API_KEY = "170d8fb9";

document.addEventListener("DOMContentLoaded", () => {
    const catalogueContenu = document.querySelector(".catalogue-contenu");
    const rechercheInput = document.querySelector(".recherche input");
    const pagination = document.querySelector(".pagination");
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

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(recherche)}&page=${page}`)
            .then(response => response.json())
            .then(dataAPI => {
                if (dataAPI.Response === "True") {
                    totalResultats = parseInt(dataAPI.totalResults, 10);
                    filtre = dataAPI.Search.map(item => ({
                        title: item.Title,
                        type: item.Type.charAt(0).toUpperCase() + item.Type.slice(1),
                        year: item.Year,
                        image: item.Poster !== "N/A" ? item.Poster : "img/defaut.png",
                        lien: `https://www.imdb.com/title/${item.imdbID}/`,
                        description: "Description indisponible via l'API." // Ajout par défaut si pas dispo
                    }));
                } else {
                    filtre = [];
                    totalResultats = 0;
                }

                pageCourante = page;
                afficherCatalogue();
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

    function afficherCatalogue() {
        catalogueContenu.innerHTML = "";

        if (filtre.length === 0) {
            catalogueContenu.innerHTML = "<p>Aucun résultat trouvé.</p>";
            afficherPagination(0);
            return;
        }

        filtre.forEach((item, index) => {
            const carte = document.createElement("div");
            carte.classList.add("carte");

            carte.innerHTML = `
                <img src="${item.image}" alt="Affiche de ${item.title}" class="affiche" onerror="this.onerror=null; this.src='img/defaut.png';">
                <div class="infos">
                    <h3>${item.title} <br>(${item.year})</h3>
                    <p><strong>Type :</strong> ${item.type}</p>
                    <button class="voir-plus" data-index="${index}">Voir plus</button>
                </div>
            `;

            catalogueContenu.appendChild(carte);
        });

        document.querySelectorAll(".voir-plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                ouvrirPopup(filtre[index]);
            });
        });

        afficherPagination(totalResultats);
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
                <h3>${item.title} (${item.year})</h3>
                <p><strong>Type :</strong> ${item.type}</p>
                <p class="popup-desc">${item.description}</p>
                <button class="popup-lien"><a href="${item.lien}" target="_blank">Voir la bande annonce</a></button>
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
