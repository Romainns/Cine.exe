<?php
try {
$db = new PDO('sqlite:./database/database');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
echo "Erreur de connexion : " . $e->getMessage();
exit;
}
