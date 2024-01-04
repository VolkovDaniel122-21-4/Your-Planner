<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html" charset = "UTF-8">
  <title> Shopping </title>
  <script src="additionally.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="icon" href="shopping_100.ico">
</head>

<body onload='CheckCookie();'>
<?php
  //Переменные для подключения к БД
  include 'login.php';
  
  //Попытка подключение к БД
  try {
    $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  } 
  catch (PDOException $e) {
    echo $e->getMessage();
  }
  
  $curr_date = date('d.m.Y');	//Отлов даты текущей
 
  $sort = $_GET['sort'] ?? 1;	//Отлов для сортировки 
    
  $sort_by = 'name_product';	//Стандартная сортировка

  $number = $_GET['number'] ?? 0;  
  $id_plan = $_POST['id_plan'] ?? $number;
  
  $plan = "План актуальный";

  //Сортировка за указанным столбцом  
  switch ($sort){
    case '1': 
      $sort_by = 'NAME_PRODUCT';
      break;
      
    case '2': 
      $sort_by = 'price';
      break;
    
    case '3': 
      $sort_by = 'amount_product';
      break;
    
    case '4': 
      $sort_by = 'cost';
      break;
    
    case '5':
      $sort_by = 'SDC';
      break;
    
    case '6':
      $sort_by = 'DATALASTEDIT';
      break;
  } 

  //Название столбцов таблицы  
  $name = "Назва продукту";
  $price = "Вартість у грн";
  $amount = "Кількість (кг/шт)";
  $cost = "Загальна вартість";
  $ISBought = "Актуальнiсть";
  $DateCreate = "Дата створення";
  $DateLastEdit = "Востаннє редаговано";  
  
  //Отлов значения направления сортировки, если null, то по умолчанию 0 
  $curr_direction = $_GET['direction'] ?? 1;
  
  //Изминение направления сортировки взависимости от значения переменной  
  $new_direction = $curr_direction == 1 ? 0 : 1;
  
  //Сортировка по умолчанию  
  $type_sort = 'asc';
  
  //Установка типа сортировки в зависимости указанного направления  
  switch ($new_direction){
    case '1':
      $type_sort = 'desc';
      break;
    case '0':
      $type_sort = 'asc';
      break;
  }

  //Визуализация отсортированных столбцов  
  if($sort == '1' and $new_direction == '1'){
    $name = $name . "&darr;";
  } elseif($sort == '1' and $new_direction == '0'){
    $name = $name . "&uarr;";
  }
  
  if($sort == '2' and $new_direction == '1'){
    $price = $price . "&darr;";
  } elseif($sort == '2' and $new_direction == '0'){
    $price = $price . "&uarr;";
  }
  
  if($sort == '3' and $new_direction == '1'){
    $amount = $amount . "&darr;";
  } elseif($sort == '3' and $new_direction == '0'){
    $amount = $amount . "&uarr;";
  }
  
  if($sort == '4' and $new_direction == '1'){
    $cost = $cost . "&darr;";
  } elseif($sort == '4' and $new_direction == '0'){
    $cost = $cost . "&uarr;";
  }
  
  if($sort == '5' and $new_direction == '1'){
    $DateCreate = $DateCreatecost . "&darr;";
  } elseif($sort == '5' and $new_direction == '0'){
    $DateCreate = $DateCreate . "&uarr;";
  }
  
  if($sort == '6' and $new_direction == '1'){
    $DateLastEdit = $DateLastEdit . "&darr;";
  } elseif($sort == '6' and $new_direction == '0'){
    $DateLastEdit = $DateLastEdit . "&uarr;";
  }
    
  $sql_select_nameplan = "select 
                            NAME_PLAN 
                          from PLAN_LIST
                          where ID_PLAN = " .$id_plan;
  
  $result_select_name = $fire_conn->prepare($sql_select_nameplan);
  $result_select_name->execute();
  $name_plan = $result_select_name->fetchColumn();
  echo "  <h3 id='name_plan'>" . $name_plan . "</h3>\r\n";

  echo "  <nav id='navelement'>\r\n";
  echo "  <a href='#' onclick=\"SetDarkTheme('theme', 'dark', 1);\">Темна тема</a>\r\n";
  echo "  <a href='#' onclick=\"SetLightTheme('theme', 'light', 1);\">Світла тема</a>\r\n";
  echo "  <a href='planing.php'>До планів</a>\r\n";
  echo "  <a href='#' onclick='DeleteAllPlan();'>Видалити план</a>\r\n";
  echo "  <a href='#' onclick='EditPlan();'>Редагувати план</a>";
  echo "  </nav>\r\n";
  
  //Запрос на вывод данных с типом сортировки и какой столбец сортировать
  $sql = "select SHOPPING.*, SHOPPING.DATACREATE as SDC from shopping
          join PLAN_LIST on
            PLAN_LIST.ID_PLAN = shopping.ID_PLAN
            where PLAN_LIST.ID_PLAN = ".$id_plan." 
            order by ISBOUGHT desc, ".$sort_by." ".$type_sort."";
  
  //Подготовка запроса на выполнение, передача параметров и выполнение запроса
  $result = $fire_conn->prepare($sql);
  $result->execute();    
  
  //Запрос на подсчитывание затрат
  $sql_sum = "select sum(COST) from shopping 
              where id_plan = :id_plan
              and ISBOUGHT = 1;";
  
  //Подготовка запроса на выполнение, передача параметров и выполнение запроса
  $result_sum = $fire_conn->prepare($sql_sum);
  $result_sum ->bindParam(':id_plan', $id_plan);
  $result_sum->execute();
  
  $Sum = $result_sum->fetchColumn();

  //Создание таблицы  
  echo "<table border='1' id='table_shop'>\r\n";
  echo "  <thead>\r\n";
  echo "    <tr>\r\n";
  echo "      <th class='column1'>№</th>\r\n";
  //echo "<th>$ISBought</th>";
  echo "      <th class='column2 ".($Theme == 'dark' ? 'darkth' : '')."'><a href='?sort=1&direction={$new_direction}&number={$id_plan}'>$name</a></th>\r\n";
  echo "      <th class='column3 ".($Theme == 'dark' ? 'darkth' : '')."'><a href='?sort=2&direction={$new_direction}&number={$id_plan}'>$price</a></th>\r\n";
  echo "      <th class='column4 ".($Theme == 'dark' ? 'darkth' : '')."'><a href='?sort=3&direction={$new_direction}&number={$id_plan}'>$amount</a></th>\r\n";
  echo "      <th class='column5 ".($Theme == 'dark' ? 'darkth' : '')."'><a href='?sort=4&direction={$new_direction}&number={$id_plan}'>$cost</a></th>\r\n";
  echo "      <th class='column6 ".($Theme == 'dark' ? 'darkth' : '')."'><a href='?sort=5&direction={$new_direction}&number={$id_plan}'>$DateCreate</a></th>\r\n";
  echo "      <th class='column7 ".($Theme == 'dark' ? 'darkth' : '')."'><a href='?sort=6&direction={$new_direction}&number={$id_plan}'>$DateLastEdit</a></th>\r\n";
  echo "      <th class='column8'>Дія</th>\r\n"; 
  echo "    </tr>\r\n";   
  echo "  </thead>\r\n";  
  
  //Переменная итерации
  $i = 0;  
  echo "  <tbody id='TableBody'>\r\n";  
  //Вывод всех данных из таблицы
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    ++$i;
    $checked = ($row['ISBOUGHT'] == '1') ? 'checked' : ''; 
    $style = ($row['ISBOUGHT'] == '0') ? 'text-decoration: line-through;' : ''; 
    
    if ($row['ISBOUGHT'] == 1){
      echo "    <tr id = '".$row['ID_PRODUCT']."Num'>\r\n";
      echo "      <td class='column1'>".$i."</td>\r\n";
      
      //echo         "<td><input type='checkbox' name='checkbox' value='" . $row['ID_PRODUCT'] . "' " . $checked . "></td>";
      
      echo "      <td class='column2' id='".$row['ID_PRODUCT']."NB'>\r\n";     
      
      if ($row['LINK'] == ""){
        echo $row['NAME_PRODUCT'];
      }else{
        echo "        <a target='blank' id='".$row['ID_PRODUCT']."LINK' href = '".$row['LINK']."'>".$row['NAME_PRODUCT']."</a>\r\n";
      }
      //echo "        <a target='blank' id='".$row['ID_PRODUCT']."LINK' href = '".$row['LINK']."'>".$row['NAME_PRODUCT']."</a>\r\n";
      echo "      </td>\r\n";
      
      echo "      <td class='column3' id='". $row['ID_PRODUCT'] ."PB'>". $row['PRICE'] ."</td>\r\n";  
      
      echo "      <td class='column4' id='".$row['ID_PRODUCT']."AB'>";  
      echo         $row['AMOUNT_PRODUCT'];
      echo       "</td>\r\n";
      
      echo "      <td class='column5' id='".$row['ID_PRODUCT']."CB'>".$row['COST']."</td>\r\n";
      echo "      <td class='column6' id='".$row['ID_PRODUCT']."DC'>".date('d.m.Y', strtotime($row['SDC']))."</td>";
      echo "      <td class='column7' id='".$row['ID_PRODUCT']."DLE'>".date('d.m.Y', strtotime($row['DATALASTEDIT']))."</td>";
      echo "      <td class='column8' id='".$row['ID_PRODUCT']."check' value='".$checked."'>\r\n";
      
      echo "      <button id='".$row['ID_PRODUCT']."edit' onclick='FormEditRow(`".$row['ID_PRODUCT']."`); return false;'>Редагувати</button>\r\n"; 
      echo "      <button id='".$row['ID_PRODUCT']."delete' name='delete' onclick='DeleteRow(`".$row['ID_PRODUCT']."`, `".$row['NAME_PRODUCT']."`); return false;'>Видалити</button>\r\n";
      echo "      </td>\r\n";  
      echo "    </tr>\r\n";
    }else{
      echo "    <tr id = '".$row['ID_PRODUCT']."Num' class='IsBought'>\r\n";
      echo "      <td class='column1'>".$i."</td>\r\n";
      
      //echo         "<td><input type='checkbox' name='checkbox' value='" . $row['ID_PRODUCT'] . "' " . $checked . "></td>";
      
      echo "      <td class='column2' id='".$row['ID_PRODUCT']."NB'>";     
      
      if ($row['LINK'] == ""){
        echo $row['NAME_PRODUCT'] ."</td>\r\n";
      }else{
        echo "      <a target='blank' id='".$row['ID_PRODUCT']."LINK' href = '".$row['LINK']."'>".$row['NAME_PRODUCT']."</a></td>\r\n";
      }
      //echo "        <a target='blank' id='".$row['ID_PRODUCT']."LINK' href = '".$row['LINK']."'>".$row['NAME_PRODUCT']."</a>\r\n";
      
      echo "      <td class='column3' id='".$row['ID_PRODUCT']."PB'>". $row['PRICE'] ."</td>\r\n";  
      
      echo "      <td class='column4' id='".$row['ID_PRODUCT']."AB'>". $row['AMOUNT_PRODUCT'] ."</td>\r\n";  
      
      echo "      <td class='column5' id='".$row['ID_PRODUCT']."CB'>".$row['COST']."</td>\r\n";
      echo "      <td class='column6' id='".$row['ID_PRODUCT']."DC'>".date('d.m.Y', strtotime($row['SDC']))."</td>";
      echo "      <td class='column7' id='".$row['ID_PRODUCT']."DLE'>".date('d.m.Y', strtotime($row['DATALASTEDIT']))."</td>";
      echo "      <td class='column8' id='".$row['ID_PRODUCT']."check' value='".$checked."'>\r\n";
      
      echo "      <button id='".$row['ID_PRODUCT']."edit' onclick='FormEditRow(`".$row['ID_PRODUCT']."`); return false;'>Редагувати</button>\r\n"; 
      echo "      <button id='".$row['ID_PRODUCT']."delete' name='delete' onclick='DeleteRow(`".$row['ID_PRODUCT']."`, `".$row['NAME_PRODUCT']."`); return false;'>Видалити</button>\r\n";
      echo "      </td>\r\n";  
      echo "    </tr>\r\n";
    }
  }
  
  //Рядок с суммой затрат и с кнопкой добавить
  echo "  </tbody>\r\n"; 
  echo "  <tfoot id='TableFooter'>\r\n";  
  echo "    <tr id='FooterRow'>\r\n";
  echo "      <td class='column2' colspan = 4> Разом:</td>\r\n";
  echo "      <td id='CostSum' class='column5'>$Sum</td>\r\n";
  echo "      <td colspan = 2></td>";
  echo "      <td class='column8'><button onclick='FormAddRow(); return false;' class='b1'>Додати</button></td>\r\n"; 
  echo "    </tr>\r\n";
  echo "  </tfoot>";
  echo "</table>\r\n";
  
  touch('style.css');
  touch('additionally.js');
?>    

</body>
</html>
