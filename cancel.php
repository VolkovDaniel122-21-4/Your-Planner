<?php
  include 'login.php';
  try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "Ну от, ти все зламав :С";
  } catch (PDOException $e) {
      echo $e->getMessage();
  }

  $sort = $_POST['sorting'];
  $direction = $_POST['direction'];
  $id_plan = $_POST['id_plan'];

  header("Location: shopping.php?sort=".$sort."&direction=".$direction."&number=".$id_plan);  
?>