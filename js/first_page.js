
var new_login;
var login_number;
var progress_data = [];

console.log('---привет js----');  

//Обработка нажатия кнопки Вход
$('#bt_login').bind('click',login_enter); 
//submit почему-то не загружал вторую страницу
//поэтому сделала так
$('#login_input').keyup(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
		console.log('нажали Enter'); 
		login_enter();
    }
});

function login_enter(){
	console.log('нажали Вход');  
    //var rus_lr = ('А-Б-В-Г-Д-Е-Ё-Ж-З-И-Й-К-Л-М-Н-О-П-Р-С-Т-У-Ф-Х-Ц-Ч-Ш-Щ-Ъ-Ы-Ь-Э-Ю-Я').split('-');
	//var lat_lr = ('A-B-V-G-D-E-JO-ZH-Z-I-J-K-L-M-N-O-P-R-S-T-U-F-H-C-CH-SH-SHH-TZ-Y-MZ-JE-JU-JA-Q-W-X-Y-Z').split('-');
	//считываем login
	new_login =  $('#login_input').val();
	//new_login = new_login.toUpperCase();
	var i=0;
	var latin_login = "";	
	var code_login = "";
	//цикл по буквам введенного имени
	while (i < new_login.length) {
		console.log("-char- ", new_login.charAt(i));
		//var index_rus = rus_lr.indexOf(new_login.charAt(i));
		var code_char = new_login.charCodeAt(i);
		code_login+=code_char + "_";
		//console.log("-index- ", index_rus);
		//если такой буквы в кирилице нет
		/*if (index_rus < 0) {
			//смотрим в латинице
			var index_lat = lat_lr.indexOf(new_login.charAt(i));
			//если и в латинице нет
			if (index_lat < 0) {
				alert("Недопусимый символ " + new_login.charAt(i));
				return false;
			}else{
				latin_login+= lat_lr[index_lat];
			}			
		}else {
		//кирилица
		latin_login+= lat_lr[index_rus];
		} */		
		i++;
	}
	console.log("code_login=",code_login);
	console.log("latin_login=",latin_login);
	// alert(new_login);
	  
    if (new_login.length == 0)
    {
	  alert("Без login никак");  
	  return false;
    }  	
	   
	   //переходим на вторую страницу
	   var s="second_page.html?"+escape(code_login.slice(0,-1));
	   document.location.href = s;
	   //console.log("*login ",code_login);
	   
	   //return false;
};
//------------------------------

//изменение login_input
/*
$('#login_input').bind('change', function () {
	console.log('Ау');
	console.log($('#login_input').val());
	})
*/

//После за грузки второй страницы, читается json файл и формируется список книг
function second_page_load(){
	console.log("second_page_load()");
	var llogin=location.search;
	console.log("llogin ",llogin.slice(1));
	var mass_code_char = llogin.slice(1).split('_');
	console.log(mass_code_char);
	llogin = "";
	mass_code_char.forEach(function(item) {
		llogin += String.fromCharCode(item);
	});
	console.log("***login ",llogin);
	$('#second_page_h3').text("Привет, " + llogin);

	var jqxhr = $.getJSON( "books.json", function(data) {
		console.log( "success" );
		console.log("length ", data.length );	
		//цикл по массиву записей для разных логинов
		for (var i=0; i<data.length; i++ ) {
			console.log("json login ", data[i].login );	
			//ищем нужный логин
			if (data[i].login == llogin) {
				login_number = i;				
				//цикл по массиву книг
				for (var j=0; j<data[i].books.length; j++ ) {
					console.log("json books ", data[i].books[j].name );
					progress_data[j] = Math.round(data[i].books[j].user_data.length / data[i].books[j].numDay * 100);
					$('#second_page_menu').append('<li class=\'li_moving_menu\'><a class=\'menu_book_name\' '
													+'title=\''+data[i].books[j].name+'\' href=\'#\'>'
													+data[i].books[j].name+'</a>'
													+'<progress max="100" value=\"'+progress_data[j]+'\"></progress></li>');
					
					console.log( "progress_data", progress_data );
				}
				//выходим из цикла
				i = data.length;
			}						
		}		
				
   })
   .done(function(data) { 
		console.log( "second success" );	
		//анимация плавного нарастания прогресс бара	
		/*$('progress').each(function(index, elem) {
			var pdata = String(progress_data[index]);
			console.log( "--progress_data", pdata );
			elem.animate({ //выбираем класс menu и метод animate 
				//this.val(pdata); 	
				value: '25'
        	}, 500); //скорость движения меню в мс	
		});	*/
			
		//----------------------------------------------
	    //красивое перемещение меню в бок
		$('.li_moving_menu').click(function() { /* выбираем класс icon-menu и добавляем метод click с функцией, вызываемой при клике */
			// e.preventDefault();       
			console.log( "click click click" );
			console.log( this.textContent );
			//убираем прогресс бар из списка книг
			$('.li_moving_menu progress').each(function() {
				console.log( "===",$(this).val() );
				$(this).remove();
			})
			
			//убираем выбранную книгу из списка
			
			
			$('#book_list').css('max-width','200px');
 
        	$('#book_list').animate({ //выбираем класс menu и метод animate
 
            left: '10px' /* теперь меню изменит свое положение left:10px */
 				
        	}, 200); //скорость движения меню в мс
			
			$('#book_list').css('vertical-align','top');
			$('#book_list').css('padding-top','20px');
			
			$('article').css('visibility','visible');
			
        	//создаем таблицу и график
        	table_and_grafic(this.textContent, data, login_number);
         
    	});
		
			
	})//done(function(data) {}
	.fail(function() { console.log( "error" ); })
	.always(function() { console.log( "always" ); });	

}

//----таблица-----------------------------------------------------------------
function table_and_grafic(book_name, json_data, login_number)
{
	console.log("new function ", book_name );
	console.log("***json books ", json_data[1].books[1].name );
	console.log("###login ",login_number);
	
    var div_for_table = document.getElementById("for_table"),
	    tableWidth = 200,
        tableHeight = 200,
        width = 200,
        height = 200,
        nameBook = book_name,
		numDay,
		numPages,
		s_first_date,
		user_data,
		numColumns = 4,
		columns = 3,
        rows,
		tr = "",
        td = "";		
		
	//цикл по массиву книг, 
	//чтобы получить данные выбранной книги
	for (var j=0; j<json_data[login_number].books.length; j++ ) {
		if (json_data[login_number].books[j].name == book_name ) {
			numPages = json_data[login_number].books[j].numPages;
			numDay = json_data[login_number].books[j].numDay;
			s_first_date = json_data[login_number].books[j].data;
			user_data = json_data[login_number].books[j].user_data;
			console.log("s_date ",s_first_date);
			console.log("numPages ",numPages);
			console.log("numDay ",numDay);
			break;//выходим из цикла
		}
	}			
			
    rows = numDay;

	console.log("s_date ",s_first_date);
	console.log("numPages ",numPages);
	console.log("numDay ",numDay); 

	//заголовок - название книги
	$('#nameBook').text(nameBook);
	 
	//сколько читать в день
	var num_pages_day = Math.ceil(numPages/numDay); 
	 
	//расшифровываем дату
	//разбиваем строку на элементы
	var dateParts = s_first_date.split('-');    
	//создаем переменную типа Date
	var first_date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], 0, 0, 0);
	console.log("00 ",first_date.getDate()+'-'+(first_date.getMonth()+1)+'-'+first_date.getFullYear())
	//почему-то месяц получается +1
	first_date.setDate(first_date.getDate()-1);
	console.log("+1 ",first_date.getDate()+'-'+(first_date.getMonth()+1)+'-'+first_date.getFullYear())

	var elemTable = document.getElementById("my_table");
	
	var  table = document.createElement("table");
	  table.setAttribute("id", "my_table");
      table.setAttribute("border", "1px");
      table.setAttribute("width", "260px");
      table.setAttribute("height", "500px");
	  table.setAttribute("max-width", "260px");
      table.setAttribute("max-height", "500px");
	  
	//шапка
	  tr = document.createElement("tr");
	  th = document.createElement("th");
	  text = document.createTextNode("дата");
	  th.appendChild(text);
      tr.appendChild(th);
	  th = document.createElement("th");
	  text = document.createTextNode("кол-во\nстр");
	  th.appendChild(text);
	  tr.appendChild(th);
	  th = document.createElement("th");
	  text = document.createTextNode("кол-во\nстр");
	  th.appendChild(text);
	  tr.appendChild(th);
	  table.appendChild(tr);  
	  
	for (var i = 0; i < rows; i++) {
        tr = document.createElement("tr");
        for (var j = 0; j < columns; j++) {
            td = document.createElement("td");
            if (j == 0) {
			    first_date.setDate(first_date.getDate()+1);
			    text = document.createTextNode(first_date.getDate()+'-'+(first_date.getMonth()+1)+'-'+first_date.getFullYear());
            } else if (j == 1){ 		  		  
			  text = document.createTextNode(num_pages_day);
		    } else if (j == 2){ 
			    //если есть пользов. данные		  		  
			    if (i < user_data.length)
			    {
				    text = document.createTextNode(user_data[i]);
			    }
			    else text = document.createTextNode("  ");
		    }
            td.appendChild(text);
            //добавляем обработчик событий
            //для добавления новых данных
            td.addEventListener("click", add_new_result);	
		  
		    tr.appendChild(td);	
        }
        table.appendChild(tr);
    }
    console.log("tr ",tr); 
	
	if (elemTable == null) {
		div_for_table.appendChild(table);
    } else {
        var newTable = div_for_table.appendChild(table);
        div_for_table.replaceChild(newTable, elemTable);
    }
      
    console.log("td ",td);
    console.log("end table "); 

	//место для таблицы
	$('#for_table').css('height','500px');
	//прокрутка для таблицы
	$('#for_table').css('overflow','scroll');
	
//----график-----------------------------------------------------------------
 console.log("graphic "); 
      var grHeight = 500,
		  grWidth = 800,
		  margin=30,
		  data_usr=[];
		  data_0=[];
      
      // создание объекта svg
	  var svg = d3.select("#for_graphic").append("svg")
        .attr("class", "axis")
        .attr("width", "100%")
        .attr("height", "100%")
		.attr("max-width", "100%")
        .attr("max-height", "100%");
        
      //console.log("svg ", svg);  
      
      // длина оси X = ширина контейнера svg - отступ слева и справа
	  var xAxisLength = grWidth - 2 * margin;    
  
	  // длина оси Y = высота контейнера svg - отступ сверху и снизу
	  var yAxisLength = 500 - 60 - 20;   
	  
	  // функция интерполяции значений на ось Х 
	  var scaleX = d3.scaleLinear()
            .domain([0, numDay])
            .range([0, xAxisLength]);
             
	  // функция интерполяции значений на ось Y
	  var scaleY = d3.scaleLinear()
            .domain([numPages, 0])
            .range([0, yAxisLength]);
	  
	  // масштабирование реальных данных в данные для нашей координатной системы
	  var page_number = 0;
	  for(i=0; i<user_data.length; i++)  {
		  page_number = page_number + user_data[i];
		  //console.log("page_number ",page_number);
		  data_usr.push({x: scaleX(i+1)+margin, y: scaleY(page_number) + margin});
	  }
	  
	  page_number = 0;
	  for(i=0; i<user_data.length; i++)  {
		  page_number = page_number + num_pages_day;
		  //console.log("page_number ",page_number);
		  data_0.push({x: scaleX(i+1)+margin, y: scaleY(page_number) + margin});
	  }
	  
	  // создаем ось X  
	  var xAxis = d3.axisBottom() 
            .scale(scaleX) // функция интерполяции
            .ticks(10); // сколько делений на оси

	  // создаем ось Y            
      var yAxis = d3.axisLeft()
             .scale(scaleY)
             .ticks(6);

       // отрисовка оси Х            
		svg.append("g")      
			 .attr("class", "x-axis")
			 .attr("transform",  // сдвиг оси вниз и вправо
				 "translate(" + margin + "," + (margin+yAxisLength) + ")")
			 .call(xAxis);
			 
	   // отрисовка оси Y
		svg.append("g")      
			.attr("class", "y-axis")
			.attr("transform", // сдвиг оси вниз и вправо на margin
					"translate(" + margin + "," + margin + ")")
			.call(yAxis);
			
		// обща функция для создания графиков
		function createChart (data, colorStroke, label){	
			
			// функция, создающая по массиву точек линии
			var line = d3.line()
						.x(function(d){return d.x;})
						.y(function(d){return d.y;});
			// добавляем путь
			svg.append("g").append("path")
			.attr("d", line(data))
			.style("stroke", colorStroke)
			.style("stroke-width", 2);
			
		}	
		
		createChart(data_usr, "steelblue", "usd");
		createChart(data_0, "#FF7F0E", "euro");
		
		$('#for_graphic').css('height','500px');	
	   $('#for_graphic').css('width','850px');
}

function add_new_result() {
				console.log("нажата ");
				//создаем поле ввода
				var in_cell = document.createElement("input");
				in_cell.setAttribute("type", "text");
				//in_cell.css("display", "inline-block");
				in_cell.style.width = '30px';
				this.appendChild(in_cell);
				this.removeEventListener('click', add_new_result);// отцепляем ф-цию от ячейки, иначе можно насоздавать кучу инпутов в одной ячейке				
				
};	















