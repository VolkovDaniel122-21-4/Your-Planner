<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset = "UTF-8">
    <title>Planing</title>
    <script src="additionally.js"></script>
    <link rel="icon" href="shopping_100.ico">
  </head>
  <body onload='CheckCookiePlan();'>
    <h1 style='position: absolute; left: 2%;'>Список планів</h1>
    <br><br><br>
    <nav style='text-align: left'>
      <a href="#" onclick="SetDarkThemePlan('plan', 'dark', 1);">Темна тема</a>
      <a href="#" onclick="SetLightThemePlan('plan', 'light', 1);">Світла тема</a>
    </nav>
    <?php
      //Переменные для подключения к БД
      include 'login.php';
       
      try {
        $fire_conn = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
      } 
      catch (PDOException $e) {
        echo $e->getMessage();
      }  
      
      $page = isset($_GET['page']) ? intval($_GET['page']) : 1;		//Считываем страницу 
      
      $number_elements = 50;						//Кол-во елементов списка на 1 странице
      
      $first_element = ($page-1) * $number_elements + 1;		//Номера первого и последнего елемента списка
      $last_element = $page * $number_elements;
      
      $sql = "SELECT *
              FROM PLAN_LIST
              ORDER BY ACTUAL DESC, NAME_PLAN ASC
              rows $first_element to $last_element";
      
      $result = $fire_conn->prepare($sql);
      $result->execute();
      
      //Посчет количества списков    
      $sql_count = "select COUNT(ID_PLAN) from PLAN_LIST";
      $stmt = $fire_conn->query($sql_count);
      $count = $stmt->fetchColumn();
      
      //Расчет количество страниц
      $count_pages = ceil($count/$number_elements);
    
      function Pagination ($limit, $count, $page, $result, $fire_conn){
        //Расчет количества страниц
        $count_pages = ceil($count/$limit);
        
        //Кол-во страниц вокруг текущей страницы    
        $range = 1;
        $Iteration = 0;
        //Прижок по стрелочке
        $jump = 2;
        
        echo "<table id='TablePlan'>\r\n"; 
        echo "  <thead>\r\n";
        echo "    <tr>\r\n";
        echo "      <th class = 'column1'>№</th>\r\n";
        echo "      <th class = 'column2'>Назва плану</th>\r\n";
        echo "      <th class = 'column3'>Кількість пунктів</th>\r\n";
        echo "      <th class = 'column4'>Загальна сума</th>\r\n";
        echo "      <th class = 'column5'>Дата створення</th>\r\n";
        echo "      <th class = 'column6'>Востаннє редаговано</th>\r\n";
        echo "    <tr>\r\n";
        echo "  </thead>\r\n";
        
        echo "  <tbody>\r\n";
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          $Iteration++;
          echo "    <tr>\r\n";
          echo "      <td>".$Iteration."</td>";  
          echo "      <td><a href='shopping.php?number={$row['ID_PLAN']}'>";
                        if ($row['NAME_PLAN'] == "" or $row['NAME_PLAN'] == null) {
                          echo "NO NAME";
                        } else {
                          echo $row['NAME_PLAN'];
                        }
                      "   </a>
                      </td>\r\n";

          $CountAndSum = "Select
                            COUNT(ID_PRODUCT) as PC,
                            SUM(COST) as SC
                            From SHOPPING
                            WHERE ID_PLAN = :PlanId and ISBOUGHT = 1";
          $CountAndSumSTMT = $fire_conn->prepare($CountAndSum);
          $CountAndSumSTMT->bindParam(':PlanId', $row['ID_PLAN']);
          $CountAndSumSTMT->execute();
          
          $CountAndSumRESULT = $CountAndSumSTMT->fetch(PDO::FETCH_ASSOC);
          
          $ProductCount = isset($CountAndSumRESULT['PC']) ? $CountAndSumRESULT['PC'] : 'N/A';
          $SumCost = isset($CountAndSumRESULT['SC']) ? $CountAndSumRESULT['SC'] : '0';
          
          $DateCreateAndEdit = "Select 
                                  DATACREATE as DC,
                                  DATALASTEDIT as DLE
                                from PLAN_LIST
                                WHERE ID_PLAN = :PlanId";
          $DateCreateAndEditSTMT = $fire_conn->prepare($DateCreateAndEdit);
          $DateCreateAndEditSTMT->bindParam(':PlanId', $row['ID_PLAN']);
          $DateCreateAndEditSTMT->execute();
          $DateCreateAndEditRESULT = $DateCreateAndEditSTMT->fetch(PDO::FETCH_ASSOC);
          
          $DataCreate = isset($DateCreateAndEditRESULT['DC']) ? date('d.m.Y', strtotime($DateCreateAndEditRESULT['DC'])) : '01.11.2023';
          $DataLastEdit = isset($DateCreateAndEditRESULT['DLE']) ? date('d.m.Y', strtotime($DateCreateAndEditRESULT['DLE'])) : '01.11.2023';
          
          
          echo "      <td>$ProductCount</td>\r\n";
          echo "      <td>$SumCost</td>\r\n";
          echo "      <td>$DataCreate</td>\r\n";
          echo "      <td>$DataLastEdit</td>\r\n";
          echo "    </tr>\r\n";
        }


        echo "  </tbody>\n";
        echo "</table>";
        echo "<div>";
        if ($count > $limit){
          if ($count_pages <= 7){
            for ($i =1; $i <= $count_pages; $i++) {
              if ($i == $page) {
                echo "<b>$i</b> ";
              } else {
                echo "<a href='?page=$i' >$i</a> ";
              }
            }
          } else {
            if ($page > 1) {      
              if ($page == 3) {
                echo "<a href='?page=1'>1</a> ";
                echo "<a href='?page=".($page)."'></a> ";
              } elseif($page == 2) {
                  echo "<a href='?page=".($page)."'></a> "; 
              }else{
                echo "<a href='?page=1'>1</a> ";
                echo "<a href='?page=".($page - 2)."'><<</a> ";
              }
            } 
            for ($i = max(1, $page - $range); $i <= min($page + $range, $count_pages); $i++) {
              if ($i == $page) {
                echo "<b>$i</b> ";
              } else {
                  echo "<a href='?page=$i'>$i</a> ";
              }
            }
      
            if ($page < $count_pages) {
              if($page == $count_pages - 1){
                echo "<a href='?page=".($page)."'></a> ";
              }elseif($page == $count_pages - 2){
                echo "<a href='?page=".($page)."'></a>";
                echo "<a href='?page=".$page."'>$count_pages</a>";
              }else{
                echo "<a href='?page=".($page + $jump)."'>>></a> ";
                echo "<a href='?page=$count_pages'>$count_pages</a>"; 
              }
            }
          }   
          echo "</div>";
        }
      }
      Pagination($number_elements, $count, $page, $result, $fire_conn); 
      echo "<button class='b1' style='position: absolute; left: 2%;' onclick='addrowplan();'>Додати</button><br><br>\n";

      touch('style.css');
      touch('additionally.js');
    ?> 
  </body>
</html>  
