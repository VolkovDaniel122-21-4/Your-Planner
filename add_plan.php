<?php
  //Переменные для подключения к БД
  include 'login.php';

  try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  } catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
  }

  $name_plan = $_POST['NamePlan'];
  $default_actual = 1;

  $delete_val = array("<", ">");
  $insert_val = array("&lt;", "&gt;");

  $name_plan = str_replace($delete_val, $insert_val, $name_plan);

  $sql = "INSERT INTO PLAN_LIST (
            name_plan,
            actual,
            DATACREATE,
            DATALASTEDIT
          )
          VALUES (
            '$name_plan',
            '$default_actual',
            current_date,
            current_date
          );";

  $stmt = $fire_conn->prepare($sql);
  $stmt->execute();
?>