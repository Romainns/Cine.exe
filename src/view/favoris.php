<!-- Session -->
<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

 // Vérifie que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    header('Location: ../../router.php?page=login');
    exit;
}

// Connexion à la BDD
include './src/config/database.php';

$userId = $_SESSION['user_id'];

// Requête pour récupérer les favoris de l'utilisateur
$sql = "SELECT O.titre, O.annee, O.type, O.afficheURL
        FROM Favori F
        JOIN Oeuvre O ON F.oeuvre_id = O.id
        WHERE F.utilisateur_id = :utilisateur_id";
$stmt = $db->prepare($sql);
$stmt->execute(['utilisateur_id' => $userId]);
$favoris = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciné.exe - Mes Favoris</title>
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
            <a href="../../router.php?page=home"><img src="/img/logo_couleur_sans_fond.png" alt="Logo Ciné.exe" class="nav-logo"></a>
            <!-- Liens Navbar -->
            <ul class="nav-liens gauche">
                <li><a href="../../router.php?page=home">Accueil</a></li>
            </ul>
            <ul class="nav-liens droite">
                <?php if (isset($_SESSION['username'])): ?>
                    <li>
                        <span class="pseudo-connecte">Bonjour, <a href="../../router.php?page=favoris"><?= htmlspecialchars($_SESSION['username']) ?></a></span>
                    </li>
                    <li>
                        <form method="post" action="../../router.php?page=logout" style="display:inline;">
                            <button type="submit" class="btn-deconnexion">Se déconnecter</button>
                        </form>
                    </li>
                <?php else: ?>
                    <li><a class="moncompte" href="../../router.php?page=login">Se connecter</a></li>
                <?php endif; ?>
            </ul>
        </nav>
    </header>
    <main>
        <!-- Titre Mes Favoris -->
        <div class="titre-favoris">
            <h1>Mes Favoris</h1>
            <h4>Tous vos films et séries préférés au même endroit</h4>
        </div>
        <div class="favoris-container">
            <?php if (empty($favoris)): ?>
                <p>Vous n'avez encore ajouté aucun favori.</p>
            <?php else: ?>
                <div class="catalogue-contenu">
                    <?php foreach ($favoris as $fav): ?>
                        <div class="carte">
                            <img src="<?= htmlspecialchars($fav['afficheURL']) ?>" alt="Affiche de <?= htmlspecialchars($fav['titre']) ?>" class="affiche">
                            <div class="infos">
                                <h3><?= htmlspecialchars($fav['titre']) ?> <br>(<?= htmlspecialchars($fav['annee']) ?>)</h3>
                                <p><strong>Type :</strong> <?= htmlspecialchars($fav['type']) ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
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
</body>
</html> 
