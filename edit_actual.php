<?php
  include 'login.php';
      
  try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  } 
  catch (PDOException $e) {
    echo $e->getMessage();
  }

$sort = $_GET['sorting'];
$direction = $_GET['direction'];
$id_plan = $_GET['id_plan'];

$id = $_GET['id_product'];
$actual = $_GET['check'];

switch ($actual){
  case 'true':
    $actual = 1;
    break;
  case 'false':
    $actual = 0;
    break;
}

$sql = "update SHOPPING
        set
          ISBOUGHT = " . $actual."
        where  
         ID_PRODUCT = ".$id;

$stmt = $fire_conn->prepare($sql);
$stmt->execute();

header("Location: shopping.php?sort=".$sort."&direction=".$direction."&number=".$id_plan);
?>