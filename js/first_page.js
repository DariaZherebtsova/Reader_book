
var new_login;

console.log('---привет js----');  

//Обработка нажатия кнопки Вход
$('#bt_login').bind('click', function(){
  console.log('нажали Вход');  
  
  if ($('#login_input').val().length == 0)
  {
	alert("Без login никак");  
	return;
  }
  
	//считываем login
	new_login =  $('#login_input').val();
   console.log(new_login);
  // alert(new_login);
   
   //переходим на вторую страницу
   var s="second_page.html?"+escape(new_login);
   document.location.href = s;
   console.log("*login ",new_login);
});
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
	console.log("***login ",llogin.slice(1));
	$('#second_page_h3').text("Привет " + llogin.slice(1));
	var jqxhr = $.getJSON( "books.json", function(data) {
		console.log( "success" );
		console.log("length ", data.length );	
		//цикл по массиву записей для разных логинов
		for (var i=0; i<data.length; i++ ) {
			console.log("json login ", data[i].login );	
			//ищем нужный логин
			if (data[i].login == llogin.slice(1)) {
				//цикл по массиву книг
				for (var j=0; j<data[i].books.length; j++ ) {
					console.log("json books ", data[i].books[j].name );
					$('#second_page_menu').append('<li class=\'moving_menu\'><a  href=\'#\'>'+data[i].books[j].name+'</a></li>');
				}
				//выходим из цикла
				i = data.length;
			}						
		}		
				
   })
   .done(function(data) { 
			console.log( "second success" );	
			
		//----------------------------------------------
	   //красивое перемещение меню в бок
		$('.moving_menu').click(function() { /* выбираем класс icon-menu и
               добавляем метод click с функцией, вызываемой при клике */
       	// e.preventDefault();       
       	 console.log( "click click click" );
 
        	$('#book_list').animate({ //выбираем класс menu и метод animate
 
            left: '0px' /* теперь при клике по иконке, меню, скрытое за
               левой границей на 285px, изменит свое положение на 0px и станет видимым */
 
        	}, 200); //скорость движения меню в мс
         
    		});	
			
		})
	.fail(function() { console.log( "error" ); })
	.always(function() { console.log( "always" ); });
	
	console.log( "click" );
	
    
    console.log( "click click" );
}

