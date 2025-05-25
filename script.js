// Data

const data = [
    { title: "Inception", type: "Film", description: "Inception est un film de science-fiction réalisé par Christopher Nolan, où un voleur spécialisé dans l'extraction de secrets via les rêves est chargé d’implanter une idée dans l’esprit d’un héritier industriel.", year:2010, image: "img/affiche/inception.jpg", lien: "https://www.youtube.com/watch?v=HcoZbHBDHQA" },
    { title: "Breaking Bad", type: "Série", description: "Breaking Bad est une série dramatique américaine créée par Vince Gilligan, qui suit la transformation d'un professeur de chimie en un baron de la drogue après avoir été diagnostiqué d'un cancer.", year:2008, image: "img/affiche/breaking bad.jpg", lien: "https://www.youtube.com/watch?v=CoWsuFdqeYE"},
    { title: "The Witcher", type: "Série", description: "The Witcher est une série fantastique basée sur les livres d'Andrzej Sapkowski, qui suit Geralt de Riv, un chasseur de monstres dans un monde rempli de magie et de créatures mythiques.", year:2019, image: "img/affiche/witcher.jpg", lien: "https://www.youtube.com/watch?v=bGFpSNKtLlc" },
    { title: "Interstellar", type: "Film", description: "Interstellar est un film de science-fiction réalisé par Christopher Nolan, qui suit un groupe d'astronautes voyageant à travers un trou de ver pour trouver une nouvelle planète habitable.", year:2014, image: "img/affiche/interstellar.jpg", lien:"https://www.youtube.com/watch?v=HsPP6xSzQoE" },
    { title: "Stranger Things", type: "Série", description: "Stranger Things est une série de science-fiction et d'horreur créée par les frères Duffer, qui se déroule dans les années 1980 et suit un groupe d'enfants découvrant des phénomènes surnaturels dans leur ville.", year:2016, image: "img/affiche/stranger things.webp", lien: "https://www.youtube.com/watch?v=l7nzodXfVsg" },
    { title: "The Matrix", type: "Film", description: "The Matrix est un film de science-fiction réalisé par les Wachowski, qui suit Neo, un hacker qui découvre que la réalité qu'il connaît est une simulation créée par des machines.", year:1999, image: "img/affiche/matrix.jpeg", lien: "https://www.youtube.com/watch?v=8xx91zoASLY" },
    { title: "Game of Thrones", type: "Série", description: "Game of Thrones est une série dramatique basée sur les romans de George R.R. Martin, qui suit les luttes de pouvoir entre différentes familles nobles dans un monde médiéval fantastique.", year:2011, image: "img/affiche/game of thrones.webp", lien: "https://www.youtube.com/watch?v=aAF12LNAeNI" },
    { title: "Avatar", type: "Film", description: "Avatar est un film de science-fiction réalisé par James Cameron, qui se déroule sur la planète Pandora et suit un ancien marine qui prend part à un conflit entre les humains et les Na'vi, les habitants indigènes.", year:2009, image: "img/affiche/avatar.jpeg", lien: "https://www.youtube.com/watch?v=60ArLSCgjSU" },
    { title: "The Crown", type: "Série", description: "The Crown est une série dramatique qui retrace la vie de la reine Elizabeth II et les événements marquants de son règne depuis son mariage en 1947 jusqu'à nos jours.", year:2016, image: "img/affiche/the crown.webp", lien: "https://www.youtube.com/watch?v=wjdCxLXfRPM" },
    { title: "The Dark Knight", type: "Film", description: "The Dark Knight est un film de super-héros réalisé par Christopher Nolan, qui suit Batman dans sa lutte contre le Joker, un criminel anarchiste qui menace Gotham City.", year:2008, image: "img/affiche/dark knight.jpg", lien: "https://www.youtube.com/watch?v=UMgb3hQCb08" },
    { title: "Sherlock", type: "Série", description: "Sherlock est une série policière moderne créée par Steven Moffat et Mark Gatiss, qui réinvente les aventures du détective Sherlock Holmes dans le Londres contemporain.", year:2010, image: "img/affiche/sherlock.jpg", lien: "https://www.youtube.com/watch?v=C6oY8zgdbsc" },
    { title: "Pulp Fiction", type: "Film", description: "Pulp Fiction est un film culte réalisé par Quentin Tarantino, connu pour sa narration non linéaire et ses dialogues mémorables, qui entrelace plusieurs histoires criminelles à Los Angeles.", year:1994, image: "img/affiche/pulp fiction.jpg", lien: "https://www.youtube.com/watch?v=h9041zYF5ZA" },
    { title: "The Mandalorian", type: "Série", description: "The Mandalorian est une série de science-fiction se déroulant dans l'univers de Star Wars, qui suit un chasseur de primes solitaire dans ses aventures à travers la galaxie.", year:2019, image: "img/affiche/mandalorian.jpg", lien: "https://www.youtube.com/watch?v=3QJypub6Yag" },
    { title: "The Godfather", type: "Film", description: "The Godfather est un film classique réalisé par Francis Ford Coppola, qui suit la famille mafieuse Corleone et son patriarche, Don Vito Corleone, dans le monde du crime organisé.", year:1972, image: "img/affiche/godfather.jpg", lien: "https://www.youtube.com/watch?v=bmtuIhesQWA" },
    { title: "Black Mirror", type: "Série", description: "Black Mirror est une anthologie de science-fiction créée par Charlie Brooker, qui explore les conséquences imprévues des technologies modernes sur la société et les individus.", year:2011, image: "img/affiche/black mirror.webp", lien: "https://www.youtube.com/watch?v=d6-HaZ0zK6U" },
    { title: "Fight Club", type: "Film", description: "Fight Club est un film culte réalisé par David Fincher, basé sur le roman de Chuck Palahniuk, qui suit un homme désillusionné qui fonde un club de combat clandestin pour échapper à sa vie monotone.", year:1999, image: "img/affiche/fight club.jpg", lien: "https://www.youtube.com/watch?v=c_Sf-XY3t-I" },
    { title: "The Office (US)", type: "Série", description: "The Office est une série comique américaine qui suit la vie quotidienne des employés d'une entreprise de vente de papier, Dunder Mifflin, à travers le regard d'un caméraman.", year:2005, image: "img/affiche/the office.webp", lien: "https://www.youtube.com/watch?v=-C2z-nshFts" },
    { title: "La Casa de Papel", type: "Série", description: "La Casa de Papel est une série espagnole qui suit un groupe de criminels qui planifient et exécutent le plus grand braquage de l'histoire, en prenant en otage des employés de la Monnaie royale d'Espagne.", year:2017, image: "img/affiche/la casa de papel.jpg", lien: "https://www.youtube.com/watch?v=0ULjL4cbSro" }
];

// Initalisation du DOM

document.addEventListener("DOMContentLoaded", () => {
    const catalogueContenu = document.querySelector(".catalogue-contenu");
    const rechercheInput = document.querySelector(".recherche input");
    const erreurRecherche = document.querySelector(".erreur-recherche");
    let filmsParPage = 6;
    let pageCourante = 1;
    let filtre = data;

    //Fonction pour afficher le catalogue

    function afficherCatalogue() {
        catalogueContenu.innerHTML = ""; //Remise à 0

        //Vérification de présence de résultats pour la recherche
        if (filtre.length === 0) {
            catalogueContenu.innerHTML = "<p>Aucun résultat trouvé.</p>";
            afficherPagination();
            return;
        }

        //Déclaration des variables pour la pagination
        const debut = (pageCourante - 1) * filmsParPage;
        const fin = debut + filmsParPage;
        const pages = filtre.slice(debut, fin);

        //Création des divs pour chaque élément du catalogue
        pages.forEach((item, index) => {
            const carte = document.createElement("div");
            carte.classList.add("carte");

            const descriptionCourte = item.description.length > 50 ? item.description.substring(0, 50) + "..." : item.description; //Limitation de la description à 50 caractères

            carte.innerHTML = `
                <img src="${item.image}" alt="Affiche de ${item.title}" class="affiche">
                <div class="infos">
                    <h3>${item.title} <br>(${item.year})</h3>
                    <p><strong>Type :</strong> ${item.type}</p>
                    <p>${descriptionCourte}</p>
                    <button class="voir-plus" data-index="${debut + index}">Voir plus</button>
                </div>
            `;
            catalogueContenu.appendChild(carte);
        });

        //Ouverture du Popup après clic sur bouton "Voir plus"
        document.querySelectorAll(".voir-plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                ouvrirPopup(filtre[index]);
            });
        });

        afficherPagination();
    }

    // Fonction pour afficher la pagination

    function afficherPagination() {
        const pagination = document.querySelector(".pagination");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(filtre.length / filmsParPage);

        //Bouton précédent
        const btnPrecedent = document.createElement("button");
        btnPrecedent.textContent = "Précédent";
        btnPrecedent.disabled = pageCourante === 1;
        btnPrecedent.addEventListener("click", () => {
            if (pageCourante > 1) {
                pageCourante--;
                afficherCatalogue();
            }
        });
        pagination.appendChild(btnPrecedent);

        //Affichage page actuelle
        const infoPage = document.createElement("span");
        infoPage.textContent = ` Page ${pageCourante} sur ${totalPages} `;
        pagination.appendChild(infoPage);

        //Bouton suivant
        const btnSuivant = document.createElement("button");
        btnSuivant.textContent = "Suivant";
        btnSuivant.disabled = pageCourante === totalPages;
        btnSuivant.addEventListener("click", () => {
            if (pageCourante < totalPages) {
                pageCourante++;
                afficherCatalogue();
            }
        });
        pagination.appendChild(btnSuivant);
    }

    // Gestion de la recherche
    
    rechercheInput.addEventListener("input", () => {
        const recherche = rechercheInput.value.toLowerCase().trim();

        if (recherche === "") {
            filtre = data;
        } else {
            filtre = data.filter(item =>
                item.title.toLowerCase().includes(recherche)
                || item.type.toLowerCase().includes(recherche)
            );
        }

        pageCourante = 1;

        afficherCatalogue();
    });


    // Fonction pour le Popup

    function ouvrirPopup(item) {
        const popup = document.querySelector(".popup");
        const popupContenu = document.querySelector(".popup-content");

        popupContenu.innerHTML = `
            <span class="fermer">&times;</span>
            <div class="popup-affiche">
                <img src="${item.image}" alt="Affiche de ${item.title}" class="popup-img">
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
    }

    //Recherche par série
    document.getElementById("lien-series").addEventListener("click", (e) => {
    e.preventDefault();
    rechercheInput.value = "série";
    rechercheInput.dispatchEvent(new Event("input"));
    });

    //Recherche par film
    document.getElementById("lien-films").addEventListener("click", (e) => {
    e.preventDefault();
    rechercheInput.value = "film";
    rechercheInput.dispatchEvent(new Event("input"));
    });

    afficherCatalogue();
});
