<?php
// Démarrer la session
session_start();

// Inclure le fichier de connexion à la base
include 'database.php';

// Indiquer qu'on retourne une réponse JSON
header('Content-Type: application/json');

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['estFavori' => false]);
    exit;
}

// Récupérer l'ID de l'utilisateur depuis la session
$userId = $_SESSION['user_id'];

// Récupérer l'imdb_id depuis l'URL (GET)
$imdbId = $_GET['imdb_id'] ?? '';

// Si l'imdb_id est vide, on arrête ici
if (!$imdbId) {
    echo json_encode(['estFavori' => false]);
    exit;
}

// Rechercher l'œuvre dans la base (via imdb_id)
$stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
$stmt->execute([$imdbId]);
$oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

// Si l'œuvre n’existe pas en base, on retourne false
if (!$oeuvre) {
    echo json_encode(['estFavori' => false]);
    exit;
}

// Rechercher dans la table de favoris si l’œuvre est liée à l’utilisateur
$stmt = $db->prepare("SELECT 1 FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
$stmt->execute([$userId, $oeuvre['id']]);
$estFavori = (bool) $stmt->fetchColumn();

// Retourner le résultat en JSON
echo json_encode(['estFavori' => $estFavori]);
