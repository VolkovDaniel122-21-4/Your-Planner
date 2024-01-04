//Редактирование
//Редактирование пункта в списке
function FormEditRow(ID_ROW) {
  //Создание формы поверх содержимого страницы
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.id = "overlay";
  overlay.setAttribute("onclick", "CloseEditForm();");
 
  const form = document.createElement('form');
  form.style.background='white';
  form.classList.add('form');
  form.method = 'post';
  form.id = 'FormEdit';
  form.style.position = 'absolute';
  form.style.top = '300px';
  
  //Вставка спрятаной ссылки на товар
  var HiddenLink = document.createElement('input');
  HiddenLink.setAttribute('type', 'hidden');
  HiddenLink.setAttribute('name', 'link');
  HiddenLink.setAttribute('value', ID_ROW+'LINK');
  
  //Вставка спрятаного идентификатора
  var HiddenIdProduct = document.createElement('input');
  HiddenIdProduct.setAttribute('type', 'hidden');
  HiddenIdProduct.setAttribute('name', 'id_product');
  HiddenIdProduct.setAttribute('value', ID_ROW);
  
  //Получение параметров из URL
  var parameters = new URLSearchParams(window.location.search);
  var sort = parameters.get("sort") || 1;
  var direction = parameters.get("direction") || 1;
  var number = parameters.get("number");

  //Спрятанное поле параметра сортировки
  var HiddenSorting = document.createElement('input');
  HiddenSorting.setAttribute('type', 'hidden');
  HiddenSorting.setAttribute('name', 'sorting');
  HiddenSorting.setAttribute('value', sort);
  
  //Спрятанное поле параметра направления сортировки
  var HiddenDirection = document.createElement('input');
  HiddenDirection.setAttribute('type', 'hidden');
  HiddenDirection.setAttribute('name', 'direction');
  HiddenDirection.setAttribute('value', direction);
  
  //Спрятанное поле номера плана
  var HiddenPlan = document.createElement('input');
  HiddenPlan.setAttribute('type', 'hidden');
  HiddenPlan.setAttribute('name', 'id_plan');
  HiddenPlan.setAttribute('value', number);
  
  //Текст ссылки
  let LabelText; // = document.getElementById(ID_ROW+'LINK').innerHTML;
  if (document.getElementById(ID_ROW + 'LINK') == null){
    LabelText = document.getElementById(ID_ROW + 'NB').innerHTML;
  } else {
    LabelText = document.getElementById(ID_ROW + 'LINK').innerHTML;
  }
  
  //Название продукта
  var LabelForEditProduct = document.createElement('input');
  LabelForEditProduct.style.fontSize='35px';
  LabelForEditProduct.value = LabelText.trim();
  LabelForEditProduct.name = 'name_product';
  LabelForEditProduct.id = 'name_product';
  LabelForEditProduct.setAttribute('autocomplete','off');
  LabelForEditProduct.setAttribute('placeholder', 'Назва продукту');
  LabelForEditProduct.setAttribute('oninput', 'clearInvalidClass(this)');
  
  //Получение цены продукта
  var price_input = document.createElement('input');
  var price_value = document.getElementById(ID_ROW + 'PB').innerHTML;
  
  //Полученине количество продукта
  var amount_input = document.createElement('input');
  var amount_value = document.getElementById(ID_ROW + 'AB').innerHTML;
  
  //Поле с ценой
  price_input.setAttribute('type', 'text');
  price_input.setAttribute('value', price_value);
  price_input.setAttribute('name', 'price');
  price_input.style.fontSize = '25px';
  price_input.setAttribute('autocomplete','off');
  price_input.setAttribute('placeholder', 'Вартість у грн');
  
  //Поле с количеством
  amount_input.setAttribute('type', 'text');
  amount_input.setAttribute('value', amount_value);
  amount_input.setAttribute('name', 'amount');
  amount_input.style.fontSize='25px';
  amount_input.setAttribute('autocomplete','off');
  amount_input.setAttribute('placeholder', 'Кількість кг/шт');
  
  //ПОлучение ссылки
  let link_value; //= document.getElementById(ID_ROW+'LINK').getAttribute('href');
  var link_input = document.createElement('input');
  
  if (document.getElementById(ID_ROW+'LINK') == null){
    link_value = "";  
  } else {
    link_value = document.getElementById(ID_ROW+'LINK').href;
  }
  
  //Поле с ссылкой
  link_input.setAttribute('type', 'text');
  link_input.setAttribute('name', 'link');
  link_input.setAttribute('value', link_value);
  link_input.setAttribute('autocomplete','off');
  link_input.setAttribute('placeholder', 'Посилання на товар');
  link_input.style.fontSize='25px';
  
  //Получение чекбокса
  var IsChecked = document.getElementById(ID_ROW + 'check').getAttribute('value');
  var Checkbox = document.createElement('input');
  
  //Чексбокс и его настройки
  Checkbox.type = 'checkbox';
  Checkbox.id = 'actual_product';
  Checkbox.name = 'checkbox';
  Checkbox.setAttribute('name', 'check');
  Checkbox.style.width = '25px';
  Checkbox.style.height = '25px';
  
  //Подпись к чекбоксу
  var LabelForCheckbox = document.createElement('label');
  LabelForCheckbox.htmlFor = 'actual_product';
  LabelForCheckbox.style.fontSize = '25px';
  
  //Проверка состояния чекбокса
  if(IsChecked == 'checked'){
    Checkbox.checked = true;
    LabelForCheckbox.textContent = 'Товар актуальний';
  }else{
    Checkbox.checked = false;
    LabelForCheckbox.textContent = 'Товар не актуальний';
  }
  
  //Кнопка отправки
  var button_submit = document.createElement('button');
  button_submit.setAttribute('onclick', 'submit_edit(event);');
  button_submit.style.fontSize='25px';
  button_submit.innerHTML = 'Застосувати';
  
  //Кнопка отмены
  var button_cancel = document.createElement('button');
  button_cancel.innerHTML = 'Скасувати';
  button_cancel.style.fontSize='25px';
  button_cancel.setAttribute('onclick', 'CloseEditForm();');
  button_cancel.setAttribute('type', 'button');
  button_cancel.id = 'cancel';
  
  //Вставка в форму
  form.appendChild(HiddenIdProduct);
  form.appendChild(HiddenSorting);
  form.appendChild(HiddenDirection);
  form.appendChild(HiddenPlan);
  form.appendChild(HiddenLink);
  
  form.appendChild(LabelForEditProduct);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(price_input);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(amount_input);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(link_input);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(Checkbox);
  form.appendChild(LabelForCheckbox);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(button_submit);
  form.appendChild(button_cancel);
  
  overlay.appendChild(form);
  document.body.appendChild(overlay);
  
  function onKeyPress(e) {
    if (e.key === "Escape") {
      document.body.removeChild(overlay);     
      document.removeEventListener("keydown", onKeyPress);
    }
  }
  document.addEventListener("keydown", onKeyPress);
}
//Отправка данных формы на сервер из FormEditRow
function submit_edit(event){
  let inputNameProduct = document.getElementById('name_product');
  if(inputNameProduct.value == ''){
    inputNameProduct.classList.add('invalid');
    event.preventDefault();
    setTimeout(function() {
      inputNameProduct.classList.remove('invalid');
    }, 500);
  } else {
    inputNameProduct.classList.remove('invalid');
    
    let EditFormData = new FormData(document.getElementById('FormEdit'));
    
    EditedRow = new XMLHttpRequest();
    EditedRow.open('POST', 'edit.php', true);
    EditedRow.onreadystatechange = UpdateTableWithEditList;
    
    let Overlay = document.getElementById('overlay');
    document.body.removeChild(Overlay);
    EditedRow.send(EditFormData); 
  }
}
//Обновление таблицы фоново
function UpdateTableWithEditList() {
  if(EditedRow.readyState == 4){
    if(EditedRow.status == 200){
      
      let Response = JSON.parse(EditedRow.responseText);
      let EditRowData = Response.EditDataRow;
      
      let TableBody = document.getElementById('TableBody');
      let InsertNewRow = TableBody.insertRow();
      TableBody.innerHTML = '';
      
      for (let i = 0; i < EditRowData.length; i++) {
        let InsertNewRow = TableBody.insertRow();
        InsertNewRow.id = EditRowData[i]['ID_PRODUCT'] + 'Num';

        const numberCell = InsertNewRow.insertCell();
        numberCell.innerHTML = i + 1;
        numberCell.classList.add('column1');

        if(EditRowData[i]['LINK'] == ""){
          const nameCell = InsertNewRow.insertCell();
          nameCell.innerHTML = EditRowData[i]['NAME_PRODUCT'];
          nameCell.id = EditRowData[i]['ID_PRODUCT'] + 'NB';
          nameCell.classList.add('column2');
        } else {
          const nameCell = InsertNewRow.insertCell();
          nameCell.id = EditRowData[i]['ID_PRODUCT'] + 'NB';
          
          const NameIsHref = document.createElement('a');
          NameIsHref.innerHTML = EditRowData[i]['NAME_PRODUCT'];
          NameIsHref.href = EditRowData[i]['LINK'];
          NameIsHref.id = EditRowData[i]['ID_PRODUCT'] + 'LINK';
          NameIsHref.classList.add('column2');
          
          nameCell.appendChild(NameIsHref);
        }

        const priceCell = InsertNewRow.insertCell();
        priceCell.innerHTML = EditRowData[i]['PRICE'];
        priceCell.id = EditRowData[i]['ID_PRODUCT'] + 'PB';
        priceCell.classList.add('column3');

        const amountCell = InsertNewRow.insertCell();
        amountCell.innerHTML = EditRowData[i]['AMOUNT_PRODUCT'];
        amountCell.id = EditRowData[i]['ID_PRODUCT'] + 'AB';
        amountCell.classList.add('column4');

        const costCell = InsertNewRow.insertCell();
        costCell.innerHTML = EditRowData[i]['COST'];
        costCell.id = EditRowData[i]['ID_PRODUCT'] + 'CB';
        costCell.classList.add('column5');
        
        const DataCreateCell = InsertNewRow.insertCell();
        const FormatDataCreate = FormatDate(EditRowData[i]['DATACREATE']);
        DataCreateCell.innerHTML = FormatDataCreate;
        DataCreateCell.id = EditRowData[i]['ID_PRODUCT'] + 'DC';
        DataCreateCell.classList.add('column6');
        
        const DataLastEditCell = InsertNewRow.insertCell();
        const FormatDateLastEdit = FormatDate(EditRowData[i]['DATALASTEDIT']);
        DataLastEditCell.innerHTML = FormatDateLastEdit;
        DataLastEditCell.id = EditRowData[i]['ID_PRODUCT'] + 'DLE';
        DataLastEditCell.classList.add('column7');
        

        const buttonsCell = InsertNewRow.insertCell();
        buttonsCell.classList.add('column8');
        buttonsCell.id = EditRowData[i]['ID_PRODUCT'] + 'check';
        
        if(EditRowData[i]['ISBOUGHT'] == 1){
          buttonsCell.setAttribute('value', 'checked')
        } else {
          buttonsCell.setAttribute('value', '');
        }
        
        const EditButton = document.createElement('button');
        EditButton.textContent = 'Редагувати';
        EditButton.id = EditRowData[i]['ID_PRODUCT'] + 'edit';
        EditButton.setAttribute('onclick', 'FormEditRow(' + EditRowData[i]['ID_PRODUCT'] + ')')

        const DeleteButton = document.createElement('button');
        DeleteButton.textContent = 'Видалити';
        DeleteButton.id = EditRowData[i]['ID_PRODUCT'] + 'delete';
        DeleteButton.setAttribute('onclick', 'DeleteRow(' + EditRowData[i]['ID_PRODUCT'] + ', "' + EditRowData[i]['NAME_PRODUCT'] + '")');
        buttonsCell.appendChild(EditButton);
        buttonsCell.appendChild(DeleteButton);
        
        if (EditRowData[i]['ISBOUGHT'] == 0) {
          InsertNewRow.classList.add('IsBought');
        }
      }
      let CookieTable = getlocalStorageCookie("theme");
      if (CookieTable == "dark"){
        SetDarkTheme('theme', 'dark', '1');
      }
      
      if (CookieTable == "light"){
        SetLightThemeTheme('theme', 'light', '1');
      }
    }
  }
}

//Добавление
//Форма добавления рядка в список
function FormAddRow(){
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.id = 'overlay';
  overlay.setAttribute("onclick", "CloseAddForm();");
  
  const form = document.createElement('form');
  form.classList.add('form');
  form.method= 'post';
  form.id = 'FormAdd';
  form.style.background = 'white';
  
  //Получение параметров из URL
  const parameters = new URLSearchParams(window.location.search);
  const sort = parameters.get("sort") || 1;
  const direction = parameters.get("direction") || 1;
  const number = parameters.get("number");
       
  var HiddenSorting = document.createElement('input');
  HiddenSorting.setAttribute('type', 'hidden');
  HiddenSorting.setAttribute('name', 'sorting');
  HiddenSorting.setAttribute('value', sort);
    
  var HiddenDirection = document.createElement('input');
  HiddenDirection.setAttribute('type', 'hidden');
  HiddenDirection.setAttribute('name', 'direction');
  HiddenDirection.setAttribute('value', direction);
  
  var HiddenPlan = document.createElement('input');
  HiddenPlan.setAttribute('type', 'hidden');
  HiddenPlan.setAttribute('name', 'id_plan');
  HiddenPlan.setAttribute('value', number);
        
  //Создание полей для ввода
  var InputNameProduct = document.createElement('input');
  InputNameProduct.setAttribute('type', 'text');
  InputNameProduct.id = 'name_product';
  InputNameProduct.setAttribute('placeholder', 'Назва продукту');
  InputNameProduct.setAttribute('name', 'name_product');
  InputNameProduct.setAttribute('autocomplete','off');
  InputNameProduct.setAttribute('required', 'required');
  InputNameProduct.style.fontSize = '20px';
  InputNameProduct.setAttribute('oninput', 'clearInvalidClass(this)');

  var InputPriceProduct = document.createElement('input');
  InputPriceProduct.setAttribute('type', 'number');
  InputPriceProduct.id = 'price';
  InputPriceProduct.setAttribute('placeholder', 'Вартість за КГ/ШТ');
  InputPriceProduct.setAttribute('name', 'price');
  InputPriceProduct.setAttribute('autocomplete','off');
  InputPriceProduct.style.fontSize = '20px';
  InputPriceProduct.setAttribute('title', 'Вартість за КГ/ШТ')
  InputPriceProduct.value = 0;

  InputPriceProduct.addEventListener('focus', function () {
    if (InputPriceProduct.value === '0') {
      InputPriceProduct.value = '';
    }
  });

  InputPriceProduct.addEventListener('blur', function () {
    if (InputPriceProduct.value === '') {
      InputPriceProduct.value = '0';
    }
  });

  var InputAmountProduct = document.createElement('input');
  InputAmountProduct.setAttribute('type', 'number');
  InputAmountProduct.id = 'amount';
  InputAmountProduct.setAttribute('placeholder', 'Кількість КГ/ШТ');
  InputAmountProduct.setAttribute('name', 'amount');
  InputAmountProduct.setAttribute('autocomplete','off');
  InputAmountProduct.setAttribute('title', 'Кількість КГ/ШТ');
  InputAmountProduct.style.fontSize = '20px';
  InputAmountProduct.value = 1;

  InputAmountProduct.addEventListener('focus', function () {
    if (InputAmountProduct.value === '1') {
      InputAmountProduct.value = '';
    }
  });

  InputAmountProduct.addEventListener('blur', function () {
    if (InputAmountProduct.value === '') {
      InputAmountProduct.value = '1';
    }
  });
  
  var InputLink = document.createElement('input');
  InputLink.setAttribute('type', 'text');
  InputLink.setAttribute('placeholder', 'Посилання на товар');
  InputLink.setAttribute('name', 'link');
  InputLink.setAttribute('autocomplete','off');
  InputLink.style.fontSize = '20px';
  
  var button_submit = document.createElement('button');
  button_submit.innerHTML = 'Додати';
  button_submit.setAttribute('onclick', 'SubmitAdd(event);')
  button_submit.setAttribute('type', 'submit');
  button_submit.style.fontSize = '20px';
  
  var button_cancel = document.createElement('button');
  button_cancel.style.fontSize = '20px';
  button_cancel.innerHTML = 'Скасувати';
  button_cancel.setAttribute('onclick', 'CloseAddForm();');
  button_cancel.id = 'cancel';
  
  var button_reset = document.createElement('button');
  button_reset.style.fontSize = '20px';
  button_reset.setAttribute('type', 'reset');
  button_reset.innerHTML = 'Очистити';
  
  form.appendChild(InputNameProduct);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(InputPriceProduct);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(InputAmountProduct);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(InputLink);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  
  form.appendChild(button_submit);
  form.appendChild(button_reset);
  form.appendChild(button_cancel);
  
  form.appendChild(HiddenSorting);
  form.appendChild(HiddenDirection);
  form.appendChild(HiddenPlan);
  overlay.appendChild(form);
  document.body.appendChild(overlay);
  
  function onKeyPress(e) {
    if (e.key === "Escape") {
      document.body.removeChild(overlay);     
      document.removeEventListener("keydown", onKeyPress);
    }
  }
  document.addEventListener("Escape", onKeyPress);
}
//Проверка формы и отправка на сервер из FormAddRow
function SubmitAdd(event) {
  let inputNameProduct = document.getElementById('name_product');
  if(inputNameProduct.value == ''){
    inputNameProduct.classList.add('invalid');
    event.preventDefault();
    setTimeout(function() {
      inputNameProduct.classList.remove('invalid');
    }, 500);
  } else {
    inputNameProduct.classList.remove('invalid');
    let FormAddRow = new FormData(document.getElementById('FormAdd'));
    
    NewRow = new XMLHttpRequest();
    NewRow.open('POST', 'add.php', true);
    NewRow.onreadystatechange = UpdateTableWithAdd;
    NewRow.send(FormAddRow);
    
    let Overlay = document.getElementById('overlay');
    document.body.removeChild(Overlay);
  }
}
// Фоновое обновление добавленного ряда
function UpdateTableWithAdd() {
  if (NewRow.readyState == 4) {
    if (NewRow.status == 200) {
      let Response = JSON.parse(NewRow.responseText);
      let NewRowData = Response.newRowData;
    
      let TableBody = document.getElementById('TableBody');
      
      let InsertNewRow = TableBody.insertRow();
      TableBody.innerHTML = '';
      
      for (let i = 0; i < NewRowData.length; i++) {
        let InsertNewRow = TableBody.insertRow();
        InsertNewRow.id = NewRowData[i]['ID_PRODUCT'] + 'Num';

        const numberCell = InsertNewRow.insertCell();
        numberCell.innerHTML = i + 1;
        numberCell.classList.add('column1');

        if(NewRowData[i]['LINK'] == ""){
          const nameCell = InsertNewRow.insertCell();
          nameCell.innerHTML = NewRowData[i]['NAME_PRODUCT'];
          nameCell.id = NewRowData[i]['ID_PRODUCT'] + 'NB';
          nameCell.classList.add('column2');
        } else {
          const nameCell = InsertNewRow.insertCell();
          nameCell.id = NewRowData[i]['ID_PRODUCT']+'NB';
          const NameIsHref = document.createElement('a');
          
          NameIsHref.innerHTML = NewRowData[i]['NAME_PRODUCT'];
          NameIsHref.href = NewRowData[i]['LINK'];
          NameIsHref.id = NewRowData[i]['ID_PRODUCT'] + 'LINK';
          NameIsHref.classList.add('column2');
          
          nameCell.appendChild(NameIsHref);
        }

        const priceCell = InsertNewRow.insertCell();
        priceCell.innerHTML = NewRowData[i]['PRICE'];
        priceCell.id = NewRowData[i]['ID_PRODUCT'] + 'PB';
        priceCell.classList.add('column3');

        const amountCell = InsertNewRow.insertCell();
        amountCell.innerHTML = NewRowData[i]['AMOUNT_PRODUCT'];
        amountCell.id = NewRowData[i]['ID_PRODUCT'] + 'AB';
        amountCell.classList.add('column4');

        const costCell = InsertNewRow.insertCell();
        costCell.innerHTML = NewRowData[i]['COST'];
        costCell.id = NewRowData[i]['ID_PRODUCT'] + 'CB';
        costCell.classList.add('column5');
        
        const DataCreateCell = InsertNewRow.insertCell();
        const FormatDataCreate = FormatDate(NewRowData[i]['DATACREATE']);
        DataCreateCell.innerHTML = FormatDataCreate;
        DataCreateCell.id = NewRowData[i]['ID_PRODUCT'] + 'DC';
        DataCreateCell.classList.add('column6');
        
        const DataLastEditCell = InsertNewRow.insertCell();
        const FormatDateLastEdit = FormatDate(NewRowData[i]['DATALASTEDIT']);
        DataLastEditCell.innerHTML = FormatDateLastEdit;
        DataLastEditCell.id = NewRowData[i]['ID_PRODUCT'] + 'DLE';
        DataLastEditCell.classList.add('column7');

        const buttonsCell = InsertNewRow.insertCell();
        buttonsCell.classList.add('column8');
        buttonsCell.id = NewRowData[i]['ID_PRODUCT'] + 'check';
        
        if(NewRowData[i]['ISBOUGHT'] == 1){
          buttonsCell.setAttribute('value', 'checked')
        } else {
          buttonsCell.setAttribute('value', '');
        }
        
        const EditButton = document.createElement('button');
        EditButton.textContent = 'Редагувати';
        EditButton.id = NewRowData[i]['ID_PRODUCT'] + 'edit';
        EditButton.setAttribute('onclick', 'FormEditRow(' + NewRowData[i]['ID_PRODUCT'] + ')')

        const DeleteButton = document.createElement('button');
        DeleteButton.textContent = 'Видалити';
        DeleteButton.id = NewRowData[i]['ID_PRODUCT'] + 'delete';
        DeleteButton.setAttribute('onclick', 'DeleteRow(' + NewRowData[i]['ID_PRODUCT'] + ', "' + NewRowData[i]['NAME_PRODUCT'] + '")');
        buttonsCell.appendChild(EditButton);

        buttonsCell.appendChild(DeleteButton);
        
        if (NewRowData[i]['ISBOUGHT'] == 0) {
          InsertNewRow.classList.add('IsBought');
        }
      }
      document.getElementById('CostSum').innerHTML = Response.Sum;
      let CookieTable = getlocalStorageCookie("theme");
      if (CookieTable == "dark"){
        SetDarkTheme('theme', 'dark', '1');
      }
      
      if (CookieTable == "light"){
        SetLightThemeTheme('theme', 'light', '1');
      }
    }
  }
}


//Удаление рядка
//Удаление рядка при подтверждении
function DeleteRow(ID_ROW){
  var Name; //= document.getElementById(ID_ROW+'LINK').innerHTML;
  
  if (document.getElementById(ID_ROW + 'LINK') == null){
    Name = document.getElementById(ID_ROW + 'NB').innerHTML;
  }else{
    Name = document.getElementById(ID_ROW + 'LINK').innerHTML;
  }
  
  var ConfirmDelete = confirm('Вы действительно хотите удалить из списка "' + Name.trim() + '"' + '?');
  
  if (ConfirmDelete == true){
      
    const form = document.createElement('form');
    form.classList.add('form');
    form.method= 'post';
    form.id = 'FormDelete';
    form.style.background = 'white';
      
    const params = new URLSearchParams(window.location.search);
    const sort = params.get("sort") || 1;
    const direction = params.get("direction") || 1;
    const number = params.get("number");  
      
    var HiddenIdProduct = document.createElement('input');
    HiddenIdProduct.setAttribute('type', 'hidden');
    HiddenIdProduct.setAttribute('name', 'id_product');
    HiddenIdProduct.setAttribute('value', ID_ROW);
          
    var HiddenSorting = document.createElement('input');
    HiddenSorting.setAttribute('type', 'hidden');
    HiddenSorting.setAttribute('name', 'sorting');
    HiddenSorting.setAttribute('value', sort);
       
    var HiddenDirection = document.createElement('input');
    HiddenDirection.setAttribute('type', 'hidden');
    HiddenDirection.setAttribute('name', 'direction');
    HiddenDirection.setAttribute('value', direction);
  
    var HiddenPlan = document.createElement('input');
    HiddenPlan.setAttribute('type', 'hidden');
    HiddenPlan.setAttribute('name', 'id_plan');
    HiddenPlan.setAttribute('value', number);
    
    form.appendChild(HiddenIdProduct);
    form.appendChild(HiddenSorting);
    form.appendChild(HiddenDirection);
    form.appendChild(HiddenPlan);
    document.body.appendChild(form); 
    
    SubmitForm(event); 
  }
}
//Отправка данных на удаление на сервер из DeleteRow
function SubmitForm(event) {
  event.preventDefault();
  
  let DeleteForm = new FormData(document.getElementById('FormDelete'));
  Delete = new XMLHttpRequest();
  Delete.open('POST', 'delete.php', true);
  Delete.onreadystatechange = UpdateTableAfterDelete;
  Delete.send(DeleteForm);
  
  let FormDelete = document.getElementById('FormDelete');
  document.body.removeChild(FormDelete);
}
//Фоновое обновление после удаленного рядка
function UpdateTableAfterDelete(){
  if(Delete.readyState == 4){
    if(Delete.status == 200){
      let Response = JSON.parse(Delete.responseText);
      let DeletingRow = document.getElementById(Response.SerialNumber + 'Num');
      DeletingRow.parentNode.removeChild(DeletingRow);
      
      document.getElementById('CostSum').innerHTML = Response.Sum;
      
      let RowData = Response.RowData;
      let TableBody = document.getElementById('TableBody');
      TableBody.innerHTML = '';
      
      for (let i = 0; i < RowData.length; i++) {
        let InsertNewRow = TableBody.insertRow();
        InsertNewRow.id = RowData[i]['ID_PRODUCT'] + 'Num';

        const numberCell = InsertNewRow.insertCell();
        numberCell.innerHTML = i + 1;
        numberCell.classList.add('column1');

        if(RowData[i]['LINK'] == ""){
          const nameCell = InsertNewRow.insertCell();
          nameCell.innerHTML = RowData[i]['NAME_PRODUCT'];
          nameCell.id = RowData[i]['ID_PRODUCT'] + 'NB';
          nameCell.classList.add('column2');
        } else {
          const nameCell = InsertNewRow.insertCell();
          const NameIsHref = document.createElement('a');
          
          NameIsHref.innerHTML = RowData[i]['NAME_PRODUCT'];
          NameIsHref.href = RowData[i]['LINK'];
          NameIsHref.id = RowData[i]['ID_PRODUCT'] + 'NB';
          NameIsHref.classList.add('column2');
          
          nameCell.appendChild(NameIsHref);
        }

        const priceCell = InsertNewRow.insertCell();
        priceCell.innerHTML = RowData[i]['PRICE'];
        priceCell.id = RowData[i]['ID_PRODUCT'] + 'PB';
        priceCell.classList.add('column3');

        const amountCell = InsertNewRow.insertCell();
        amountCell.innerHTML = RowData[i]['AMOUNT_PRODUCT'];
        amountCell.id = RowData[i]['ID_PRODUCT'] + 'AB';
        amountCell.classList.add('column4');

        const costCell = InsertNewRow.insertCell();
        costCell.innerHTML = RowData[i]['COST'];
        costCell.id = RowData[i]['ID_PRODUCT'] + 'CB';
        costCell.classList.add('column5');
        
        const DataCreateCell = InsertNewRow.insertCell();
        const FormatDataCreate = FormatDate(RowData[i]['DATACREATE']);
        DataCreateCell.innerHTML = FormatDataCreate;
        DataCreateCell.id = RowData[i]['ID_PRODUCT'] + 'DC';
        DataCreateCell.classList.add('column6');
        
        const DataLastEditCell = InsertNewRow.insertCell();
        const FormatDateLastEdit = FormatDate(RowData[i]['DATALASTEDIT']);
        DataLastEditCell.innerHTML = FormatDateLastEdit;
        DataLastEditCell.id = RowData[i]['ID_PRODUCT'] + 'DLE';
        DataLastEditCell.classList.add('column7');
        
        const buttonsCell = InsertNewRow.insertCell();
        buttonsCell.classList.add('column8');
        buttonsCell.id = RowData[i]['ID_PRODUCT'] + 'check';
        
        if(RowData[i]['ISBOUGHT'] == 1){
          buttonsCell.setAttribute('value', 'checked')
        } else {
          buttonsCell.setAttribute('value', '');
        }
        
        const EditButton = document.createElement('button');
        EditButton.textContent = 'Редагувати';
        EditButton.id = RowData[i]['ID_PRODUCT'] + 'edit';
        EditButton.setAttribute('onclick', 'FormEditRow(' + RowData[i]['ID_PRODUCT'] + ')')

        const DeleteButton = document.createElement('button');
        DeleteButton.textContent = 'Видалити';
        DeleteButton.id = RowData[i]['ID_PRODUCT'] + 'delete';
        DeleteButton.setAttribute('onclick', 'DeleteRow(' + RowData[i]['ID_PRODUCT'] + ', "' + RowData[i]['NAME_PRODUCT'] + '")');
        buttonsCell.appendChild(EditButton);

        buttonsCell.appendChild(DeleteButton);
        
        if (RowData[i]['ISBOUGHT'] == 0) {
          InsertNewRow.classList.add('IsBought');
        }
      }
      
      let CookieTable = getlocalStorageCookie("theme");
      if (CookieTable == "dark"){
        SetDarkTheme('theme', 'dark', '1');
      }
      
      if (CookieTable == "light"){
        SetLightThemeTheme('theme', 'light', '1');
      }
    }
  }
}


//Добавление плана
//Отправка данных на добавление плана из addrowplan при помощи AJAX
function submit_plan(){
  document.getElementById('FormAddPlan').addEventListener('submit', function (e) {
    
    // Предотвращаем стандартное поведение формы (перезагрузка страницы)
    e.preventDefault(); 

    // Получаем данные из формы
    var formData = new FormData(e.target);

    // Создаем объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Настраиваем запрос
    xhr.open('POST', 'add_plan.php', true);

    // Устанавливаем обработчик события изменения состояния запроса
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // Проверяем статус ответа
        if (xhr.status === 200) {
          
          // Обновляем таблицу с планами
          UpdateTableWithAddedPlan();
        } else {
          // Обработка ошибки
          alert('Произошла ошибка при отправке формы.');
        }
      }
    };

    // Отправляем запрос с данными формы
    xhr.send(formData);
  });
}
//Обновление страницы фоново с добавленым планом
function UpdateTableWithAddedPlan() {
  // Создаем новый объект XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Настраиваем запрос для обновления страницы с планами
  xhr.open('GET', 'planing.php', true);

  // Устанавливаем обработчик события изменения состояния запроса
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Обновляем содержимое страницы с новыми данными
      document.body.innerHTML = xhr.responseText;
    }
  };

  // Отправляем запрос для получения обновленной страницы с планами
  xhr.send();
  
  let CookieTable = getlocalStorageCookie("plan");
  if (CookieTable == "dark"){
    SetDarkThemePlan('plan', 'dark', '1');
  }
      
  if (CookieTable == "light"){
    SetLightThemeTheme('plan', 'light', '1');
  }
}
//Форма добавления плана
function addrowplan(){
  
  //Блок поверх содержимого страницы
  const Overlay = document.createElement('div');
  Overlay.classList.add('overlay');
  Overlay.id = 'Overlay';
  
  //Построение формы и полей с кнопками
  const Form = document.createElement('form');
  Form.classList.add('form');
  Form.method = 'POST';
  Form.id = 'FormAddPlan';
  
  const NamePlan = document.createElement('input');
  NamePlan.setAttribute('type', 'text');
  NamePlan.setAttribute('required', 'required');
  NamePlan.setAttribute('name', 'NamePlan');
  NamePlan.setAttribute('autocomplete','off');
  NamePlan.setAttribute('placeholder', 'Назва плану');
  
  const ButtonSubmit = document.createElement('button');
  ButtonSubmit.setAttribute('onclick', 'submit_plan();');
  ButtonSubmit.setAttribute('type', 'submit');
  ButtonSubmit.innerHTML = 'Додати';
  
  const ButtonReset = document.createElement('button');
  ButtonReset.setAttribute('type', 'reset');
  ButtonReset.innerHTML = 'Очистити';
  
  const ButtonCancel = document.createElement('button');
  ButtonCancel.setAttribute('onclick', 'CloseAddPlan();');
  ButtonCancel.innerHTML = 'Скасувати';
  
  //Иерархичная вставка елементов
  Form.appendChild(NamePlan);
  
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    Form.appendChild(br_element);
  }
  Form.appendChild(ButtonSubmit);
  Form.appendChild(ButtonReset);
  Form.appendChild(ButtonCancel);
  Overlay.appendChild(Form);
  document.body.appendChild(Overlay);
  
  //Закрытие формы если было нажато на ESC
  function onKeyPress(e) {
    if (e.key === "Escape") {
      document.body.removeChild(Overlay);     
      document.removeEventListener("keydown", onKeyPress);
    }
  }
  document.addEventListener("keydown", onKeyPress);
}

//Закрытие редактируемой формы
function CloseEditForm(){
  if (event.target.tagName !== 'FORM' && 
      event.target.tagName !== 'INPUT' && 
      event.target.tagName !== 'BUTTON' &&
      event.target.tagName !== 'LABEL' ||
      event.target.id == 'cancel'){
    let overlay = document.getElementById("overlay");
    overlay.parentNode.removeChild(overlay);
  }
}
//Закрытие формы добавления рядка в список
function CloseAddForm(){
  if (event.target.tagName !== 'FORM' && 
      event.target.tagName !== 'INPUT' && 
      event.target.tagName !== 'BUTTON' ||
      event.target.id == 'cancel') {
    let overlay = document.getElementById("overlay");
    overlay.parentNode.removeChild(overlay);
  }
}
//Закрытие формы редактирования названия плана
function CloseEditPlanForm(){
    if (event.target.tagName !== 'FORM' && 
        event.target.tagName !== 'INPUT' && 
        event.target.tagName !== 'BUTTON' ||
        event.target.id == 'cancel') {
    let overlay = document.getElementById("overlay");
    overlay.parentNode.removeChild(overlay);
  }
}


//Редактирование плана (название)
//Отправка данных на сервер исправленного названия плана
function submit_editplan(event){
  event.preventDefault();
  var formData = new FormData(document.getElementById('FormEditPlan'));
  
  NewNamePlan = new XMLHttpRequest();
  NewNamePlan.open('POST', 'editplan.php', true);
  NewNamePlan.onreadystatechange = UpdateNamePlan;
  
  NewNamePlan.send(formData);
  var overlay = document.getElementById("overlay");
  document.body.removeChild(overlay);
  
}
function UpdateNamePlan(){
  if(NewNamePlan.readyState == 4){
    if(NewNamePlan.status == 200){
      document.getElementById('name_plan').innerHTML = NewNamePlan.responseText;
    }
  }
}
//Форма исправления названия плана
function EditPlan(){
  const params = new URLSearchParams(window.location.search);
  const sort = params.get("sort") || 1;
  const direction = params.get("direction") || 0;
  const number = params.get("number");
  
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.id = "overlay";
  overlay.setAttribute("onclick", "CloseEditPlanForm();");
  
  const form = document.createElement('form');
  form.style.background='white';
  form.classList.add('form');
  form.method = 'post';
  form.id = 'FormEditPlan';
  form.style.position = 'absolute';
  form.style.top = '300px';
  
  var HiddenSorting = document.createElement('input');
  HiddenSorting.setAttribute('type', 'hidden');
  HiddenSorting.setAttribute('name', 'sorting');
  HiddenSorting.setAttribute('value', sort);
     
  var HiddenDirection = document.createElement('input');
  HiddenDirection.setAttribute('type', 'hidden');
  HiddenDirection.setAttribute('name', 'direction');
  HiddenDirection.setAttribute('value', direction);

  var HiddenPlan = document.createElement('input');
  HiddenPlan.setAttribute('type', 'hidden');
  HiddenPlan.setAttribute('name', 'id_plan');
  HiddenPlan.setAttribute('value', number);
  
  let NamePlan = document.getElementById('name_plan').innerHTML;
  let input_nameplan = document.createElement('input');
  
  input_nameplan.value = NamePlan;
  input_nameplan.style.fontSize = '25px';
  input_nameplan.setAttribute('name', 'name_plan');
  input_nameplan.setAttribute('autocomplete','off');
  
  let SubmitButton = document.createElement('button');
  SubmitButton.innerHTML = 'Застосувати';
  SubmitButton.style.fontSize='25px';
  SubmitButton.setAttribute('onclick', 'submit_editplan(event);');
  
  let CancelButton = document.createElement('button');
  CancelButton.innerHTML = 'Скасувати';
  CancelButton.style.fontSize = '25px';
  CancelButton.setAttribute('onclick', 'CloseEditPlanForm();');
  CancelButton.id = 'cancel';
  
  form.appendChild(input_nameplan);
  for (var i = 0; i < 1; i++) {
    var br_element = document.createElement('br');
    form.appendChild(br_element);
  }
  form.appendChild(HiddenSorting);
  form.appendChild(HiddenDirection);
  form.appendChild(HiddenPlan);
  form.appendChild(SubmitButton);
  form.appendChild(CancelButton);
  overlay.appendChild(form);
  
  document.body.appendChild(overlay);
  
  function onKeyPress(e) {
    if (e.key === "Escape") {
      document.body.removeChild(overlay);     
      document.removeEventListener("keydown", onKeyPress);
    }
  }
  document.addEventListener("keydown", onKeyPress);
  
}

//Удаление всего плана и его содержимого при подтверждении
function DeleteAllPlan(ID_ROW){
  let name_plan = document.getElementById('name_plan').innerHTML;
  
  let confirmdelete = confirm('Ви дійсно хочете видалити план ' + '"' + name_plan + '"' + ' і його вміст?');
  
  if(confirmdelete == true){
    const form = document.createElement('form');
    form.classList.add('form');
    form.method= 'post';
    form.id = 'FormDeleteAllPlan';
    
    const params = new URLSearchParams(window.location.search);
    const sort = params.get("sort") || 1;
    const direction = params.get("direction") || 1;
    const number = params.get("number");
    
    var HiddenIdProduct = document.createElement('input');
    HiddenIdProduct.setAttribute('type', 'hidden');
    HiddenIdProduct.setAttribute('name', 'id_product');
    HiddenIdProduct.setAttribute('value', ID_ROW);
          
    var HiddenSorting = document.createElement('input');
    HiddenSorting.setAttribute('type', 'hidden');
    HiddenSorting.setAttribute('name', 'sorting');
    HiddenSorting.setAttribute('value', sort);
       
    var HiddenDirection = document.createElement('input');
    HiddenDirection.setAttribute('type', 'hidden');
    HiddenDirection.setAttribute('name', 'direction');
    HiddenDirection.setAttribute('value', direction);
  
    var HiddenPlan = document.createElement('input');
    HiddenPlan.setAttribute('type', 'hidden');
    HiddenPlan.setAttribute('name', 'number');
    HiddenPlan.setAttribute('value', number);
    
    form.appendChild(HiddenIdProduct);
    form.appendChild(HiddenSorting);
    form.appendChild(HiddenDirection);
    form.appendChild(HiddenPlan);
    document.body.appendChild(form);
    
    Submit_DeleteAllPlan();   
  }
}
//Отправка формы на удаление ВСЕГО плана
function Submit_DeleteAllPlan(){
  document.getElementById('FormDeleteAllPlan').action = 'DeleteAllPlan.php';
  document.getElementById('FormDeleteAllPlan').submit();
}

//Закрытие формы добавления плана
function CloseAddPlan(){
  let DeleteOverlay = document.getElementById('Overlay');
  DeleteOverlay.parentNode.removeChild(DeleteOverlay);
}

function FormatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function SetDarkTheme(name, value, minutes){
  //const expirationDate = new Date();
  //expirationDate.setTime(expirationDate.getTime() + (minutes * 60));
  //const expires = "expires=" + expirationDate.toUTCString();
  //document.cookie = name + "=" + value + ";" + expires;
  localStorage.setItem(name, value);
  
  let MainBody = document.body;
  MainBody.classList.add('darkbody');
  
  let NamePlan = document.getElementById('name_plan');
  NamePlan.classList.add('darkhead');
  
  let NavElement = document.getElementById('navelement');
  NavElement.classList.add('darknavlink');
  
  let THElement = document.querySelectorAll('thead th');
  for (let i = 0; i < THElement.length; i++){
    THElement[i].classList.add('darkth');
  }
  
  let TBodyRows = document.querySelectorAll('tbody tr');
  for (let i = 0; i < TBodyRows.length; i++){
    if (!TBodyRows[i].classList.contains('IsBought')){
      TBodyRows[i].classList.add('darktr');
    } else{
      TBodyRows[i].classList.add('darktrIsBought');
    }
  }
  
  let tbodyCell = document.querySelectorAll('tbody tr');
  let cellsInRow = [];

  for (let i = 0; i < tbodyCell.length; i++){
    cellsInRow[i] = tbodyCell[i];
    cellsInRow[i].classList.add('darklink');
  }
  
  let TFootRow = document.querySelectorAll('tfoot tr');
  for (let i = 0; i < TFootRow.length; i++){
    TFootRow[i].classList.add('darktfoot');
  }
  
  let ButtonElement = document.querySelectorAll('button');
  for (let i = 0; i < ButtonElement.length; i++){
    ButtonElement[i].classList.add('darkbutton');
  }
}

function SetLightTheme(name, value, minutes){
  //const expirationDate = new Date();
  //expirationDate.setTime(expirationDate.getTime() + (minutes * 60));
  //const expires = "expires=" + expirationDate.toUTCString();
  //document.cookie = name + "=" + value + ";" + expires;
  localStorage.setItem(name, value);
  
  let MainBody = document.body;
  MainBody.classList.remove('darkbody');
  MainBody.removeAttribute('class');
  
  let NamePlan = document.getElementById('name_plan');
  NamePlan.classList.remove('darkhead');
  NamePlan.removeAttribute('class');
  
  let NavElement = document.getElementById('navelement');
  NavElement.classList.remove('darknavlink');
  NavElement.removeAttribute('class');
  
  let THElement = document.querySelectorAll('thead th');
  for (let i = 0; i < THElement.length; i++){
    THElement[i].classList.remove('darkth');
    THElement[i].removeAttribute('class');
  }
  
  let TBodyRows = document.querySelectorAll('tbody tr');
  for (let i = 0; i < TBodyRows.length; i++){
    if (!TBodyRows[i].classList.contains('IsBought')){
      TBodyRows[i].classList.remove('darktr');
      TBodyRows[i].removeAttribute('class');
    } else{
      TBodyRows[i].classList.remove('darktrIsBought');
      TBodyRows[i].classList.remove('darklink');
    }
  }
  
  let TFootRow = document.querySelectorAll('tfoot tr');
  for (let i = 0; i < TFootRow.length; i++){
    TFootRow[i].classList.remove('darktfoot');
    TFootRow[i].removeAttribute('class');
  }
  
  let ButtonElement = document.querySelectorAll('button');
  for (let i = 0; i < ButtonElement.length; i++){
    ButtonElement[i].classList.remove('darkbutton');
    ButtonElement[i].removeAttribute('class');
  }
}

function CheckCookie(){
  let cookie = getlocalStorageCookie("theme");
  let name = "theme";
  let mybody = document.body;
  if (cookie == "dark"){
    //document.cookie = name + "=" + cookie + "; max-age=60; path=/";
    localStorage.setItem(name, cookie);
    SetDarkTheme('theme', 'dark', 1);  
  } else {
    //document.cookie = name + "=" + cookie + "; max-age=60; path=/";
    localStorage.setItem(name, cookie);
    SetLightTheme('theme', 'light', 1);    
  }
}

function getlocalStorageCookie(name) {
  const storedValue = localStorage.getItem(name);
  if (storedValue) {
    return storedValue;
  }

  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split("; ");
  for (const cookie of cookiesArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}


// Установка тем на planing.php
function SetLightThemePlan(name, value, minutes){
  //const expirationDate = new Date();
  //expirationDate.setTime(expirationDate.getTime() + (minutes * 60));
  //const expires = "expires=" + expirationDate.toUTCString();
  //document.cookie = name + "=" + value + ";" + expires;
  localStorage.setItem(name, value);
  let MainBody = document.body;
  MainBody.classList.remove('darkbodyplan');
  
  let aElements = document.querySelectorAll('nav');
  for (let i = 0; i < aElements.length; i++){
    aElements[i].classList.remove('darknavlink');
  }
  
  let tbodyRows = document.querySelectorAll('tbody tr');
  for (i = 0; i < tbodyRows.length; i++){
    tbodyRows[i].classList.remove('darktr');
  }
  
  let thElement = document.querySelectorAll('thead th');
  for (let i = 0; i < thElement.length; i++){
    thElement[i].classList.remove('darkth');
  }
  
  let hElement = document.querySelector('h1');
  hElement.classList.remove('darkheadplan');
  
  let tbodyCell = document.querySelectorAll('tbody tr');
  let cellsInRow = [];

  for (let i = 0; i < tbodyCell.length; i++){
    cellsInRow[i] = tbodyCell[i];
    cellsInRow[i].classList.remove('darklink');
  }  
  
  let div = document.querySelector('div');
  div.classList.remove('darklink');
  let bElement = document.getElementsByTagName('b');
  let addClassElement = bElement[0];
  addClassElement.classList.remove('textcolor');
  
  let button = document.querySelector('button');
  button.classList.remove('darkbuttonplan');     
}

function SetDarkThemePlan(name, value, minutes){
  //const expirationDate = new Date();
  //expirationDate.setTime(expirationDate.getTime() + (minutes * 60));
  //const expires = "expires=" + expirationDate.toUTCString();
  //document.cookie = name + "=" + value + ";" + expires;
  localStorage.setItem(name, value);

  let MainBody = document.body;
  MainBody.classList.add('darkbodyplan');

  let hElement = document.querySelector('h1');
  hElement.classList.add('darkheadplan');
  
  let aElements = document.querySelectorAll('nav');
  for (let i = 0; i < aElements.length; i++){
    aElements[i].classList.add('darknavlink');
  }
  
  let thElement = document.querySelectorAll('thead th');
  for (let i = 0; i < thElement.length; i++){
    thElement[i].classList.add('darkth');
  }
  
  let tbodyCell = document.querySelectorAll('tbody tr');
  let cellsInRow = [];

  for (let i = 0; i < tbodyCell.length; i++){
    cellsInRow[i] = tbodyCell[i];
    cellsInRow[i].classList.add('darklink');
  }
  
  let tbodyRows = document.querySelectorAll('tbody tr');
  for (i = 0; i < tbodyRows.length; i++){
    tbodyRows[i].classList.add('darktr');
  }
  
  let div = document.querySelector('div');
  div.classList.add('darklink');
  let bElement = document.getElementsByTagName('b');
  let addClassElement = bElement[0];
  addClassElement.classList.add('textcolor');
  
  let button = document.querySelector('button');
  button.classList.add('darkbuttonplan'); 
}

function CheckCookiePlan(){
let cookie = getlocalStorageCookiePlan("plan");
  let name = "plan";
  let mybody = document.body;
  if (cookie == "dark"){
    //document.cookie = name + "=" + cookie + "; max-age=60; path=/";
    localStorage.setItem(name, cookie);
    SetDarkThemePlan('plan', 'dark', 1);  
  } else {
    //document.cookie = name + "=" + cookie + "; max-age=60; path=/";
    localStorage.setItem(name, cookie);
    SetLightThemePlan('plan', 'light', 1);    
  }  
}

function getlocalStorageCookiePlan(name){
  const storedValue = localStorage.getItem(name);
  if (storedValue) {
    return storedValue;
  }

  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split("; ");
  for (const cookie of cookiesArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;  
}

function clearInvalidClass(inputElement) {
  inputElement.classList.remove('invalid');
}
