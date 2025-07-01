<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Chargement des dépendances
require_once './vendor/autoload.php'; // Si Composer est utilisé (sinon tu peux commenter)
require_once './src/config/config.php'; // Ton fichier de configuration

// Gestion des services
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'est_favori':
            require_once __DIR__ . '/../src/service/est_favori.php';
            exit;
        case 'favoris_actions':
            require_once __DIR__ . '/../src/service/favoris_actions.php';
            exit;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Action inconnue']);
            exit;
    }
}

// Récupère le paramètre 'page' dans l'URL, ou utilise 'home' par défaut
$page = $_GET['page'] ?? 'home';

// Routage vers les vues
switch ($page) {
    case 'login':
        include __DIR__ . '/../src/view/login.php';
        break;
    case 'register':
        include __DIR__ . '/../src/view/register.php';
        break;
    case 'favoris':
        include __DIR__ . '/../src/view/favoris.php';
        break;
    case 'logout':
        include __DIR__ . '/../src/view/logout.php';
        break;
    case 'home':
    
    default:
        include __DIR__ . '/../src/view/home.php';
        break;
}
