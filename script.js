const data = [
    { title: "Inception", type: "Film", description: "Inception est un film de science-fiction réalisé par Christopher Nolan, où un voleur spécialisé dans l'extraction de secrets via les rêves est chargé d’implanter une idée dans l’esprit d’un héritier industriel.", year:2010, image: "img/affiche/inception.jpg" },
    { title: "Breaking Bad", type: "Série", description: "Breaking Bad est une série dramatique américaine créée par Vince Gilligan, qui suit la transformation d'un professeur de chimie en un baron de la drogue après avoir été diagnostiqué d'un cancer.", year:2008, image: "img/affiche/breaking bad.jpg" },
    { title: "The Witcher", type: "Série", description: "The Witcher est une série fantastique basée sur les livres d'Andrzej Sapkowski, qui suit Geralt de Riv, un chasseur de monstres dans un monde rempli de magie et de créatures mythiques.", year:2019, image: "img/affiche/witcher.jpg" },
    { title: "Interstellar", type: "Film", description: "Interstellar est un film de science-fiction réalisé par Christopher Nolan, qui suit un groupe d'astronautes voyageant à travers un trou de ver pour trouver une nouvelle planète habitable.", year:2014, image: "img/affiche/interstellar.jpg" }]

document.addEventListener("DOMContentLoaded", () => {
    const catalogueContenu = document.querySelector(".catalogue-contenu");

    function afficherCatalogue() {
        // Vider le contenu précédent
        catalogueContenu.innerHTML = "";

        data.forEach((item) => {
            // Créer la carte de film/série
            const carte = document.createElement("div");
            carte.classList.add("carte");

            carte.innerHTML = `
                <img src="${item.image}" alt="Affiche de ${item.title}" class="affiche">
                <div class="infos">
                    <h3>${item.title} (${item.year})</h3>
                    <p><strong>Type :</strong> ${item.type}</p>
                    <p>${item.description}</p>
                </div>
            `;

            catalogueContenu.appendChild(carte);
        });
    }

    afficherCatalogue();
});
