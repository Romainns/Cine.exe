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
    { title: "Black Mirror", type: "Série", description: "Black Mirror est une film de science-fiction créée par Charlie Brooker, qui explore les conséquences imprévues des technologies modernes sur la société et les individus.", year:2011, image: "img/affiche/black mirror.webp", lien: "https://www.youtube.com/watch?v=d6-HaZ0zK6U" },
    { title: "Fight Club", type: "Film", description: "Fight Club est un film culte réalisé par David Fincher, basé sur le roman de Chuck Palahniuk, qui suit un homme désillusionné qui fonde un club de combat clandestin pour échapper à sa vie monotone.", year:1999, image: "img/affiche/fight club.jpg", lien: "https://www.youtube.com/watch?v=c_Sf-XY3t-I" },
    { title: "The Office (US)", type: "Série", description: "The Office est une série comique américaine qui suit la vie quotidienne des employés d'une entreprise de vente de papier, Dunder Mifflin, à travers le regard d'un caméraman.", year:2005, image: "img/affiche/the office.webp", lien: "https://www.youtube.com/watch?v=-C2z-nshFts" },
    { title: "La Casa de Papel", type: "Série", description: "La Casa de Papel est une série espagnole qui suit un groupe de criminels qui planifient et exécutent le plus grand braquage de l'histoire, en prenant en otage des employés de la Monnaie royale d'Espagne.", year:2017, image: "img/affiche/la casa de papel.jpg", lien: "https://www.youtube.com/watch?v=0ULjL4cbSro" },
    { title: "The Simpsons", type: "Série", description: "The Simpsons est une série d'animation satirique qui suit la vie de la famille Simpson dans la ville fictive de Springfield, abordant des thèmes sociaux et culturels avec humour.", year:1989, image: "img/affiche/simpsons.jpg", lien: "https://www.youtube.com/watch?v=AGXzd5kwE2c" },
    { title: "The Big Bang Theory", type: "Série", description: "The Big Bang Theory est une sitcom qui suit un groupe de scientifiques et leurs interactions sociales, mettant en avant l'humour geek et les références à la culture pop.", year:2007, image: "img/affiche/big bang theory.jpg", lien: "https://www.youtube.com/watch?v=5cL8UzayXhI" },
    { title: "The Handmaid's Tale", type: "Série", description: "The Handmaid's Tale est une série dystopique basée sur le roman de Margaret Atwood, qui se déroule dans une société totalitaire où les femmes sont réduites à des rôles de reproduction.", year:2017, image: "img/affiche/handmaid's tale.jpg", lien: "https://www.youtube.com/watch?v=JPVrg4kkuPw" },
    { title: "Daredevil", type: "Série", description: "Daredevil est une série de super-héros basée sur le personnage Marvel, qui suit Matt Murdock, un avocat aveugle le jour et justicier la nuit, combattant le crime dans Hell's Kitchen.", year:2015, image: "img/affiche/daredevil.jpg", lien:"https://www.youtube.com/watch?v=DF4h9waAccc" },
    { title: "Westworld", type: "Série", description: "Westworld est une série de science-fiction créée par Jonathan Nolan et Lisa Joy, qui se déroule dans un parc d'attractions futuriste peuplé d'androïdes, où les visiteurs peuvent vivre des aventures sans limites.", year:2016, image: "img/affiche/westworld.webp", lien: "https://www.youtube.com/watch?v=Ayp8MELBVtw " },
    { title: "Harry Potter", type: "Film", description: "Harry Potter est une série de films basée sur les romans de J.K. Rowling, qui suit un jeune sorcier, Harry Potter, dans sa lutte contre le sorcier maléfique Voldemort.", year:2001, image: "img/affiche/harry potter.jpg", lien: "https://www.youtube.com/watch?v=P1BGgqhVGAI" },
    { title: "Star Wars", type: "Film", description: "Star Wars est une saga de science-fiction créée par George Lucas, qui suit la lutte entre les Jedi et les Sith dans une galaxie lointaine, très lointaine.", year:1977, image: "img/affiche/star wars.jpg", lien: "https://www.youtube.com/watch?v=t1qtvKYwTV0" },
    { title: "Le Roi Lion", type: "Film", description: "Le Roi Lion est un film d'animation de Disney qui suit l'histoire de Simba, un jeune lion qui doit retrouver son chemin et revendiquer son trône après la mort de son père, Mufasa.", year:1994, image: "img/affiche/roi lion.jpg", lien: "https://www.youtube.com/watch?v=-KfIYw-D4Iw&pp=ygUZYmFuZGUgYW5ub25jZSBsZSByb2kgbGlvbg%3D%3D" },
    { title: "Friends", type: "Série", description: "Friends est une sitcom emblématique qui suit la vie de six amis vivant à New York, abordant les thèmes de l'amitié, de l'amour et des relations humaines avec humour.", year:1994, image: "img/affiche/friends.jpg", lien: "https://www.youtube.com/watch?v=HEGMNlNX_RU&pp=ygUVYmFuZGUgYW5ub25jZSBmcmllbmRz" },
    { title: "Rush", type: "Film", description: "Rush est un film dramatique basé sur la rivalité entre les pilotes de Formule 1 James Hunt et Niki Lauda dans les années 1970, mettant en avant leur passion pour la course et les dangers du sport.", year:2013, image: "img/affiche/rush.jpg", lien: "https://www.youtube.com/watch?v=N4C5qOwHiB8&pp=ygUSYmFuZGUgYW5ub25jZSBydXNo0gcJCY0JAYcqIYzv" },
    { title: "The Queen's Gambit", type: "Série", description: "The Queen's Gambit est une mini-série dramatique qui suit Beth Harmon, une jeune prodige des échecs, dans sa quête pour devenir la meilleure joueuse du monde tout en luttant contre ses démons intérieurs.", year:2020, image: "img/affiche/queen's gambit.jpg", lien: "https://www.youtube.com/watch?v=4SB9SBnWeqc&pp=ygUaYmFuZGUgYW5ub25jZSBxdWVlbiBnYW1iaXQ%3D" },
    { title: "Narcos", type: "Série", description: "Narcos est une série dramatique qui retrace la vie du baron de la drogue colombien Pablo Escobar et la lutte des autorités pour le capturer, mettant en lumière le trafic de drogue en Amérique latine.", year:2015, image: "img/affiche/narcos.jpg", lien: "https://www.youtube.com/watch?v=LNqJnZl4imQ&pp=ygUUYmFuZGUgYW5ub25jZSBuYXJjb3M%3D" }

];

// Initalisation du DOM

document.addEventListener("DOMContentLoaded", () => {
    const catalogueContenu = document.querySelector(".catalogue-contenu");
    const rechercheInput = document.querySelector(".recherche input");
    let filmsParPage = 10;
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

        // Bouton précédent (affiché seulement si on est pas à la première page)
        if (pageCourante > 1) {
            const btnPrecedent = document.createElement("button");
            btnPrecedent.textContent = "Précédent";
            btnPrecedent.addEventListener("click", () => {
                if (pageCourante > 1) {
                    pageCourante--;
                    afficherCatalogue();
                }
            });
            pagination.appendChild(btnPrecedent);
        }

        // Affichage page actuelle
        const infoPage = document.createElement("span");
        infoPage.textContent = ` Page ${pageCourante} sur ${totalPages} `;
        pagination.appendChild(infoPage);

        // Bouton suivant (affiché seulement si on est pas à la dernière page)
        if (pageCourante < totalPages) {
            const btnSuivant = document.createElement("button");
            btnSuivant.textContent = "Suivant";
            btnSuivant.addEventListener("click", () => {
                if (pageCourante < totalPages) {
                    pageCourante++;
                    afficherCatalogue();
                }
            });
            pagination.appendChild(btnSuivant);
        }
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

        const ancienEtatClick = popup.getAttribute("data-listener");
        if (ancienEtatClick) {
            document.removeEventListener("click", window[ancienEtatClick]);
        }

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

        // Fermer en cliquant sur le bouton fermer
        popup.querySelector(".fermer").addEventListener("click", () => {
            popup.style.display = "none";
        });

        // Fermer en cliquant à l'extérieur du popup
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
