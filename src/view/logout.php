<?php
session_start();
session_unset();
session_destroy();
header("Location: router.php?page=home");
exit();
