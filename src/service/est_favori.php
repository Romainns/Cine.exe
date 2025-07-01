<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Déclarer une réponse JSON
header('Content-Type: application/json');

// Vérifie que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['estFavori' => false]);
    exit;
}

// Inclure la connexion à la base
require_once __DIR__ . '/../config/database.php';

// Récupérer l'imdb_id depuis l'URL
$imdbId = $_GET['imdb_id'] ?? null;

if (!$imdbId) {
    echo json_encode(['estFavori' => false]);
    exit;
}

try {
    $userId = $_SESSION['user_id'];

    // Chercher l'œuvre par son imdb_id
    $stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
    $stmt->execute([$imdbId]);
    $oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$oeuvre) {
        echo json_encode(['estFavori' => false]);
        exit;
    }

    // Vérifie si cette œuvre est déjà dans les favoris de l'utilisateur
    $stmt = $db->prepare("SELECT 1 FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $stmt->execute([$userId, $oeuvre['id']]);
    $estFavori = (bool) $stmt->fetchColumn();

    echo json_encode(['estFavori' => $estFavori]);
} catch (Exception $e) {
    echo json_encode(['estFavori' => false, 'error' => 'Erreur serveur']);
    exit;
}
