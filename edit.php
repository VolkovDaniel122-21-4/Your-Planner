<?php
include 'login.php';

try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

$sort = $_POST['sorting'];
$direction = $_POST['direction'];
$id_plan = $_POST['id_plan'];

$id = $_POST['id_product'];
$price = $_POST['price'];
$amount = $_POST['amount'];
$cost = $price * $amount;
$link = $_POST['link'];
$actual = $_POST['check'];
$name = $_POST['name_product'];
trim($name);


switch ($actual){
  case 'on':
    $actual = 1;
    break;
  case '':
    $actual = 0;
    break;
}

$sql = "UPDATE SHOPPING
        SET
        PRICE = :price,
        AMOUNT_PRODUCT = :amount,
        COST = :cost,
        LINK = :link,
        ISBOUGHT = :actual,
        NAME_PRODUCT = :name,
        DATALASTEDIT = current_date
        WHERE ID_PRODUCT = :id";

$result = $fire_conn->prepare($sql);
$result->bindParam(':price', $price);
$result->bindParam(':amount', $amount);
$result->bindParam(':cost', $cost);
$result->bindParam(':link', $link);
$result->bindParam(':actual', $actual);
$result->bindParam(':id', $id);
$result->bindParam(':name', $name);
$result->execute();

$sqlPlanList = "UPDATE PLAN_LIST
                SET DATALASTEDIT = current_date
                WHERE ID_PLAN = :id";

$resultPlanList = $fire_conn->prepare($sqlPlanList);
$resultPlanList->bindParam(':id', $id_plan);
$resultPlanList->execute();

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
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        NAME_PRODUCT ASC";
}

if ($sort == 1 && $direction == 0){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        NAME_PRODUCT DESC";
}

if ($sort == 2 && $direction == 1){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        PRICE ASC";  
}

if ($sort == 2 && $direction == 0){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        PRICE DESC";
}

if ($sort == 3 && $direction == 1){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        AMOUNT_PRODUCT ASC";  
}

if ($sort == 3 && $direction == 0){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        AMOUNT_PRODUCT DESC";  
}

if ($sort == 4 && $direction == 1){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        COST ASC";  
}

if ($sort == 4 && $direction == 0){
  $EditedRowDataQuery = "SELECT 
                        * 
                      FROM SHOPPING 
                      WHERE ID_PLAN = :id_plan
                      ORDER BY 
                        ISBOUGHT DESC,
                        COST DESC";  
}

// Получите список добавленных элементов
$EditRowDataStmt = $fire_conn->prepare($EditedRowDataQuery);
$EditRowDataStmt->bindParam(':id_plan', $id_plan, PDO::PARAM_INT);
$EditRowDataStmt->execute();
$EditRowData = $EditRowDataStmt->fetchAll(PDO::FETCH_ASSOC);

$response = array('sort' => $sort, 
                  'direction' => $direction, 
                  'EditDataRow' => $EditRowData,
                  'Sum' => $Sum);
echo json_encode($response);
?>