<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciné.exe - Connexion</title>
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
            </ul>
            <ul class="nav-liens droite">
                <li><a class="moncompte" href="router.php?page=register">S'inscrire</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <div class="titre-moncompte">
            <h1>Mon Compte</h1>
            <h4>Se connecter à votre compte Ciné.exe</h4>
        </div>
        <div class="moncompte-container">
            <div class="moncompte-header">
                <h2>Formulaire de connexion</h2>
            </div>
            <div class="moncompte-content">
                <form action="router.php?page=login" method="post" class="moncompte-form">
                    <label for="identifiant">Identifiant :</label>
                    <input type="text" id="identifiant" name="identifiant" placeholder="[Identifiant]" required>
                    <label for="motDePasse">Mot de passe :</label>
                    <input type="password" id="motDePasse" name="motDePasse" placeholder="[Mot de passe]" required>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
            <div class="moncompte-message">
                <?php
                if (session_status() === PHP_SESSION_NONE) {
                session_start();
                }
                include './src/config/database.php';

                if ($_SERVER["REQUEST_METHOD"] === "POST") {
                    $username = $_POST['identifiant'] ?? '';
                    $password = $_POST['motDePasse'] ?? '';

                    if (!empty($username) && !empty($password)) {
                        $stmt = $db->prepare("SELECT id, identifiant, motDePasse FROM Utilisateur WHERE identifiant = :identifiant");
                        $stmt->execute(['identifiant' => $username]);
                        $user = $stmt->fetch(PDO::FETCH_ASSOC);

                        if ($user && password_verify($password, $user['motDePasse'])) {
                            $_SESSION['user_id'] = $user['id'];
                            $_SESSION['username'] = $user['identifiant'];
                            header("Location: router.php?page=home");
                            exit();
                        } else {
                            echo "Erreur identifiant / mot de passe";
                        }
                    } else {
                        echo "Tous les champs sont requis";
                    }
                }
                ?>
            </div>
            <div class="lienversinscription">
                <p>Pas encore de compte ? <a href="router.php?page=register">Inscrivez-vous ici</a></p>
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
</body> 
</html>