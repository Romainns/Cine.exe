<?php
require_once __DIR__ . '/config.php';

try {
    $db = new PDO('sqlite:' . $_ENV['DB_PATH']);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    exit;
}
