<?php
include 'login.php';

try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}

      $sort = $_POST['sorting'];
      $direction = $_POST['direction'];
      $ID_PRODUCT = $_POST['id_product'];
      $id_plan = $_POST['id_plan'];
      $sql = "delete from shopping
                where ID_PRODUCT = :ID";
      $result = $fire_conn->prepare($sql);
      $result->execute(['ID'=>$ID_PRODUCT]);

//Запрос на подсчитывание затрат
$sql_sum = "select sum(COST) from shopping 
            where id_plan = :id_plan
            and ISBOUGHT = 1;";

//Подготовка запроса на выполнение, передача параметров и выполнение запроса
$result_sum = $fire_conn->prepare($sql_sum);
$result_sum ->bindParam(':id_plan', $id_plan);
$result_sum->execute();

$Sum = $result_sum->fetchColumn();

if ($sort == null){
  $sort = 1;
}

if ($direction == null){
  $direction = 1;
}

if ($sort == 1 && $direction == 1){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        NAME_PRODUCT ASC";
}

if ($sort == 1 && $direction == 0){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        NAME_PRODUCT DESC";
}

if ($sort == 2 && $direction == 1){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        PRICE ASC";  
}

if ($sort == 2 && $direction == 0){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        PRICE DESC";
}

if ($sort == 3 && $direction == 1){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        AMOUNT_PRODUCT ASC";  
}

if ($sort == 3 && $direction == 0){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        AMOUNT_PRODUCT DESC";  
}

if ($sort == 4 && $direction == 1){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        COST ASC";  
}

if ($sort == 4 && $direction == 0){
  $RowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        COST DESC";  
}

$RowDataStmt = $fire_conn->prepare($RowDataQuery);
$RowDataStmt->bindParam(':id_plan', $id_plan, PDO::PARAM_INT);
$RowDataStmt->execute();
$RowData = $RowDataStmt->fetchAll(PDO::FETCH_ASSOC);
        
$response = array(
                  'SerialNumber'=>$ID_PRODUCT,
                  'Sum' => $Sum,
                  'RowData' => $RowData);
echo json_encode($response);
?>