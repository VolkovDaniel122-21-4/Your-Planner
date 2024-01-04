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
  $id_plan = $_POST['id_plan'];
  $IsBought = 1;

  $link = $_POST['link'];

  $name_product = $_POST['name_product'];
  $price = $_POST['price'];
  $amount = $_POST['amount'];
  $cost = $price * $amount;

  $delete_val = array("<", ">");
  $insert_val = array("&lt;", "&gt;");

  $name_product = str_replace($delete_val, $insert_val, $name_product);
  $price = str_replace($delete_val, $insert_val, $price);
  $amount = str_replace($delete_val, $insert_val, $amount);
  $trimmed_name_product = trim($name_product);
  $trimmed_name_product = str_replace("'", '', $trimmed_name_product);

  $query = "INSERT INTO SHOPPING(
              NAME_PRODUCT,
              PRICE,
              AMOUNT_PRODUCT,
              COST,
              ID_PLAN,
              ISBOUGHT,
              LINK,
              DATACREATE,
              DATALASTEDIT
            ) VALUES (
              '$trimmed_name_product', 
              '$price', 
              '$amount', 
              '$cost',
              '$id_plan',
              '$IsBought',
              '$link',
              current_date,
              current_date
            )";

  $stmt = $fire_conn->prepare($query);
  $stmt->execute();

  $qureryplanlist = "UPDATE PLAN_LIST
                      SET
                      DATALASTEDIT = current_date
                      Where ID_PLAN = " . $id_plan;
  $PlanListSTMT = $fire_conn->prepare($qureryplanlist);
  $PlanListSTMT->execute();

  if ($sort == null){
    $sort = 1;
  }

  if ($direction == null){
    $direction = 1;
  }

  if ($sort == 1 && $direction == 1){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        NAME_PRODUCT ASC";
  }

  if ($sort == 1 && $direction == 0){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        NAME_PRODUCT DESC";
  }

  if ($sort == 2 && $direction == 1){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        PRICE ASC";  
  }

  if ($sort == 2 && $direction == 0){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        PRICE DESC";
  }

  if ($sort == 3 && $direction == 1){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        AMOUNT_PRODUCT ASC";  
  }

  if ($sort == 3 && $direction == 0){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        AMOUNT_PRODUCT DESC";  
  }

  if ($sort == 4 && $direction == 1){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        COST ASC";  
  }

  if ($sort == 4 && $direction == 0){
    $newRowDataQuery = "SELECT 
                          * 
                        FROM SHOPPING 
                        WHERE ID_PLAN = :id_plan
                        ORDER BY 
                        ISBOUGHT DESC,
                        COST DESC";  
  }

  if ($sort == 5 && $direction == 1){
    $newRowDataQuery = "SELECT 
                      * 
                    FROM SHOPPING 
                    WHERE ID_PLAN = :id_plan
                    ORDER BY 
                    ISBOUGHT DESC,
                    DATACREATE ASC";  
  }

  if ($sort == 5 && $direction == 0){
    $newRowDataQuery = "SELECT 
                      * 
                    FROM SHOPPING 
                    WHERE ID_PLAN = :id_plan
                    ORDER BY 
                    ISBOUGHT DESC,
                    DATACREATE DESC";  
  }

  if ($sort == 6 && $direction == 1){
    $newRowDataQuery = "SELECT 
                      * 
                    FROM SHOPPING 
                    WHERE ID_PLAN = :id_plan
                    ORDER BY 
                    ISBOUGHT DESC,
                    DATALASTEDIT ASC";  
  }

  if ($sort == 6 && $direction == 0){
    $newRowDataQuery = "SELECT 
                      * 
                    FROM SHOPPING 
                    WHERE ID_PLAN = :id_plan
                    ORDER BY 
                    ISBOUGHT DESC,
                    DATALASTEDIT DESC";  
  }

  // Получите список добавленных элементов
  $newRowDataStmt = $fire_conn->prepare($newRowDataQuery);
  $newRowDataStmt->bindParam(':id_plan', $id_plan, PDO::PARAM_INT);
  $newRowDataStmt->execute();
  $newRowData = $newRowDataStmt->fetchAll(PDO::FETCH_ASSOC);
  
  //Запрос на подсчитывание затрат
  $sql_sum = "select sum(COST) from shopping 
              where id_plan = :id_plan
              and ISBOUGHT = 1;";

  //Подготовка запроса на выполнение, передача параметров и выполнение запроса
  $result_sum = $fire_conn->prepare($sql_sum);
  $result_sum ->bindParam(':id_plan', $id_plan);
  $result_sum->execute();

  $Sum = $result_sum->fetchColumn();

  $response = array( 
                    'number' => $id_plan,
                    'sort' => $sort,
                    'direction' => $direction,
                    'newRowData' => $newRowData,
                    'Sum' => $Sum);
  echo json_encode($response);
?>