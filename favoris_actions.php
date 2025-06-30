<?php
// Démarrer la session
session_start();

// Inclure la connexion à la base de données
require_once 'database.php';

// Indiquer que la réponse sera envoyée en JSON
header('Content-Type: application/json');

// Vérifier que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vous devez être connecté']);
    exit;
}

// Récupérer l'ID utilisateur depuis la session
$userId = $_SESSION['user_id'];

// Récupérer les données envoyées en POST
$imdbId = $_POST['id'];
$titre = $_POST['titre'];
$annee = $_POST['annee'];
$type = $_POST['type'];
$affiche = $_POST['affiche'];

// Vérifier que les données minimales sont présentes
if (!$imdbId || !$titre || !$annee || !$affiche) {
    echo json_encode(['success' => false, 'message' => 'Données incomplètes']);
    exit;
}

// Vérifier si l'œuvre existe déjà dans la base (recherche par imdb_id)
$stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
$stmt->execute([$imdbId]);
$oeuvre = $stmt->fetch();

if (!$oeuvre) {
    // Si l'œuvre n'existe pas, l'insérer dans la base
    $stmt = $db->prepare("INSERT INTO Oeuvre (imdb_id, titre, annee, afficheURL, type) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$imdbId, $titre, $annee, $affiche, $type]);

    // Récupérer l'ID de la nouvelle œuvre (clé primaire auto-incrémentée)
    $oeuvreId = $db->lastInsertId();
} else {
    // Récupérer l'ID de l'œuvre existante
    $oeuvreId = $oeuvre['id'];
}

// Vérifier si l'œuvre est déjà dans les favoris de l'utilisateur
$stmt = $db->prepare("SELECT COUNT(*) FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
$stmt->execute([$userId, $oeuvreId]);
$estFavori = $stmt->fetchColumn() > 0;

if ($estFavori) {
    // Si déjà favori, supprimer des favoris
    $stmt = $db->prepare("DELETE FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $stmt->execute([$userId, $oeuvreId]);

    echo json_encode(['success' => true, 'action' => 'supprimé', 'message' => 'Retiré des favoris']);
} else {
    // Sinon, ajouter aux favoris
    $stmt = $db->prepare("INSERT INTO Favori (dateAjout, utilisateur_id, oeuvre_id) VALUES (?, ?, ?)");
    $stmt->execute([date('Y-m-d'), $userId, $oeuvreId]);

    echo json_encode(['success' => true, 'action' => 'ajouté', 'message' => 'Ajouté aux favoris']);
}
