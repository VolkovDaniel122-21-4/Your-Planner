<?php
  include 'login.php';
      
  try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  } 
  catch (PDOException $e) {
    echo $e->getMessage();
  }

$actual = $_GET['actual'];
$id = $_GET['number'];
 

switch ($actual){
  case 'true':
    $actual = 1;
    break;
  case 'false':
    $actual = 0;
    break;
}

$sql = "update PLAN_LIST
        set
          ACTUAL = " . $actual."
        where  
         ID_PLAN = ".$id;

$stmt = $fire_conn->prepare($sql);
$stmt->execute();

header("Location: planing.php");
?>