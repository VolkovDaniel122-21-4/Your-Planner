<?php
  include 'login.php';
  
  try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
  
  $sort = $_POST['sorting'];
  $direction = $_POST['direction'];
  $id_plan = $_POST['id_plan'];
  $name_plan = $_POST['name_plan'];
  
  $sql = "UPDATE PLAN_LIST
          SET
          NAME_PLAN = :name_plan,
          DATALASTEDIT = current_date
          WHERE ID_PLAN = :id_plan";
  
  $result = $fire_conn->prepare($sql);
  $result->bindParam(':name_plan', $name_plan);
  $result->bindParam(':id_plan', $id_plan);
  $result->execute();
  
  echo $name_plan;
?>