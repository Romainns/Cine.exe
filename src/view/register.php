<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciné.exe - Inscription</title>
    <!-- Liens -->
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
                <li><a class="moncompte" href="router.php?page=login">Se connecter</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <!-- Titre Mon Compte -->
        <div class="titre-moncompte">
            <h1>Mon Compte</h1>
            <h4>Créer votre compte Ciné.exe</h4>
        </div>
        <!-- Contenu Mon Compte -->
        <div class="moncompte-container">
            <div class="moncompte-header">
                <h2>Formulaire d'inscription</h2>
            </div>
            <!-- Formulaire -->
            <div class="moncompte-content">
                <form action="router.php?page=register" method="post" class="moncompte-form">
                    <label for="identifiant">Identifiant :</label>
                    <input type="text" id="identifiant" name="identifiant" placeholder="[Identifiant]" required>
                    <label for="email">Email :</label>
                    <input type="email" id="email" name="email" placeholder="[Email]" required>
                    <label for="motDePasse">Mot de passe :</label>
                    <input type="password" id="motDePasse" name="motDePasse" placeholder="[Mot de passe]" required>
                    <button type="submit">Créer mon compte</button>
                </form> 
            </div>
            <!-- Php - gestion de l'inscription -->
            <div class="moncompte-message">
                <?php
                include './src/config/database.php';

                if ($_SERVER["REQUEST_METHOD"] === "POST") {
                    $identifiant = $_POST['identifiant'];
                    $email = $_POST['email'];
                    $motDePasse = $_POST['motDePasse'];

                    if (!empty($identifiant) && !empty($email) && !empty($motDePasse)) {
                        $hashedPassword = password_hash($motDePasse, PASSWORD_DEFAULT);
                        try {
                            $stmt = $db->prepare("INSERT INTO Utilisateur (identifiant, email, motDePasse) VALUES (?, ?, ?)");
                            $success = $stmt->execute([$identifiant, $email, $hashedPassword]);
                            echo $success ? "Utilisateur inscrit avec succès." : "Erreur lors de l'inscription.";
                        } catch (PDOException $e) {
                            echo "Erreur PDO : " . $e->getMessage();
                        }
                    } else {
                        echo "Tous les champs sont requis.";
                    }
                }
                ?>
            </div>
            <div class="lienversconnexion">
                <p>Déjà inscrit ? <a href="router.php?page=login">Se connecter</a></p>
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
