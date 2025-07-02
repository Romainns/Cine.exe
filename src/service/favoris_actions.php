<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Définir le header JSON
header('Content-Type: application/json');

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vous devez être connecté']);
    exit;
} 

// Inclure la connexion à la base de données
require_once __DIR__ . '/../config/database.php';

$userId = $_SESSION['user_id'];

// Vérification et nettoyage des données POST
$imdbId  = $_POST['id'] ?? null;
$titre   = $_POST['titre'] ?? null;
$annee   = $_POST['annee'] ?? null;
$type    = $_POST['type'] ?? null;
$affiche = $_POST['affiche'] ?? null;

// Vérifier que les données obligatoires sont bien présentes
if (!$imdbId || !$titre || !$annee || !$affiche) {
    echo json_encode(['success' => false, 'message' => 'Données incomplètes']);
    exit;
}

try {
    // Vérifier si l'œuvre existe déjà
    $stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
    $stmt->execute([$imdbId]);
    $oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$oeuvre) {
        // Insérer l'œuvre si elle n'existe pas
        $stmt = $db->prepare("INSERT INTO Oeuvre (imdb_id, titre, annee, afficheURL, type) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$imdbId, $titre, $annee, $affiche, $type]);
        $oeuvreId = $db->lastInsertId();
    } else {
        $oeuvreId = $oeuvre['id'];
    }

    // Vérifier si cette œuvre est déjà un favori
    $stmt = $db->prepare("SELECT COUNT(*) FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $stmt->execute([$userId, $oeuvreId]);
    $estFavori = $stmt->fetchColumn() > 0;

    if ($estFavori) {
        // Supprimer des favoris
        $stmt = $db->prepare("DELETE FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
        $stmt->execute([$userId, $oeuvreId]);
        echo json_encode(['success' => true, 'action' => 'supprimé', 'message' => 'Retiré des favoris']);
    } else {
        // Ajouter aux favoris
        $stmt = $db->prepare("INSERT INTO Favori (dateAjout, utilisateur_id, oeuvre_id) VALUES (?, ?, ?)");
        $stmt->execute([date('Y-m-d'), $userId, $oeuvreId]);
        echo json_encode(['success' => true, 'action' => 'ajouté', 'message' => 'Ajouté aux favoris']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur serveur : ' . $e->getMessage()]);
    exit;
}
