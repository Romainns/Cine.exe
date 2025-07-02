<!-- Session -->
<?php 
if (session_status() === PHP_SESSION_NONE) {
    session_start();
} ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciné.exe - Catalogue de films et séries</title>

    <!-- Liens CSS -->
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="icon" href="/img/icone_logo.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
<body>
    <!-- En-tête -->
    <header>
        <nav>
            <!-- Logo -->
            <a href="router.php?page=home"><img src="/img/logo_couleur_sans_fond.png" alt="Logo Ciné.exe" class="nav-logo"></a>

            <!-- Liens Navbar -->
            <ul class="nav-liens gauche">
                <li><a href="router.php?page=home">Accueil</a></li>
                <li><a href="#" id="lien-films">Films</a></li>
                <li><a href="#" id="lien-series">Séries</a></li>
            </ul>
            <ul class="nav-liens droite">
                <?php if (isset($_SESSION['username'])): ?>
                    <li>
                        <p class="pseudo-connecte">
                            Bonjour,&nbsp;<a href="router.php?page=favoris"><?= htmlspecialchars($_SESSION['username']) ?></a>
                        </p>
                    </li>
                    <li>
                        <form method="post" action="router.php?page=logout" style="display:inline;">
                            <button type="submit" class="btn-deconnexion">Se déconnecter</button>
                        </form>
                    </li>
                <?php else: ?>
                    <li><a class="moncompte" href="router.php?page=login">Se connecter</a></li>
                <?php endif; ?>
            </ul>
        </nav>

        <!-- Titre principal -->
        <div class="titre">
            <h1>Ciné.exe</h1>
            <h4>Le 7ème art en version numérique</h4>
        </div>
    </header>

    <!-- Transition avec du flou -->
    <div class="transition"></div>

    <!-- Contenu principal -->
    <main>
        <div class="catalogue">
            <div class="catalogue-header">
                <h2>Catalogue Films & Séries</h2>
                <div class="recherche">
                    <input type="text" placeholder="Rechercher un film ou une série...">
                </div>
                <div class="filtres">
                    <label for="type">Type :</label>
                    <select id="type">
                        <option value="">Tous</option>
                        <option value="movie">Films</option>
                        <option value="series">Séries</option>
                        <option value="game">Jeux-Vidéos</option>
                    </select>
                    <label for="annee">Année :</label>
                    <input type="number" id="annee" placeholder="Ex: 2020" min="1900" max="2099">
                </div>
            </div>

            <div class="catalogue-contenu">
            </div>
            <div class="pagination">
            </div>
        </div>
    </main>

    <!-- Pied de page -->
    <footer>
        <div class="footer-contenu">
            <p>&copy; 2025 Ciné.exe. Tous droits réservés.</p>
            <ul class="reseaux-sociaux">
                <li><a href="https://www.linkedin.com/in/romain-sintas-1028842b5/" target="_blank"><img src="/img/linkedin.png" alt="Linkedin"></a></li>
                <li><a href="https://www.instagram.com/rsintas40/" target="_blank"><img src="/img/insta.png" alt="Instagram"></a></li>
                <li><a href="https://github.com/Romainns" target="_blank"><img src="/img/github.png" alt="Github"></a></li>
            </ul>
        </div>
        <div class="footer-credits">
            <p>Développé par <i>Romain Sintas</i></p>
        </div>
    </footer>

    <!-- Popup -->
    <div class="popup">
        <div class="popup-content"></div>
    </div>

    <!-- Script JS -->
    <script>const userIsLoggedIn = <?= isset($_SESSION['user_id']) ? 'true' : 'false' ?>;</script>
    <script src="/js/script.js"></script>
</body>
</html>
