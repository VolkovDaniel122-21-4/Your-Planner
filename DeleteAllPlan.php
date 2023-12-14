<?php
  include 'login.php';
try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    echo $e->getMessage();
}

$id = $_POST['number'];

$sql_deleteplan = "DELETE FROM PLAN_LIST
                   WHERE ID_PLAN = :id_DP";

$sql_deletelistplan = "DELETE FROM SHOPPING
                      WHERE ID_PLAN = :id_DLP";

$result_deleteplan = $fire_conn->prepare($sql_deleteplan);
$result_deleteplan ->bindParam(':id_DP', $id);
$result_deleteplan->execute();

$result_deletelistplan = $fire_conn->prepare($sql_deletelistplan);
$result_deletelistplan ->bindParam(':id_DLP', $id);
$result_deletelistplan->execute();

header("Location: planing.php");
?>