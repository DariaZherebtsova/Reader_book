
var new_login;

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
  
  //считываем login
  new_login =  $('#login_input').val();
  console.log("new_login=",new_login);
  // alert(new_login);
  
  if (new_login.length == 0)
  {
	alert("Без login никак");  
	return false;
  }	
   
   //переходим на вторую страницу
   var s="second_page.html?"+escape(new_login);
   document.location.href = s;
   console.log("*login ",new_login);
   
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
					$('#second_page_menu').append('<li class=\'li_moving_menu\'><a class=\'menu_book_name\' href=\'#\'>'
													+data[i].books[j].name+'</a>'
													+'<progress max="100" value="25"></progress></li>');
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
		$('.li_moving_menu').click(function() { /* выбираем класс icon-menu и добавляем метод click с функцией, вызываемой при клике */
			// e.preventDefault();       
			console.log( "click click click" );
			console.log( this.textContent );
			//убираем прогресс бар из списка книг
			$('.li_moving_menu progress').each(function() {
				console.log( "===",$(this).val() );
				$(this).remove();
			})
			
			$('#book_list').css('max-width','200px');
 
        	$('#book_list').animate({ //выбираем класс menu и метод animate
 
            left: '10px' /* теперь меню изменит свое положение left:10px */
 				
        	}, 200); //скорость движения меню в мс
        	
        	table_and_grafic(this.textContent, data);
         
    	});	    		
			
	})//done(function(data) {}
	.fail(function() { console.log( "error" ); })
	.always(function() { console.log( "always" ); });	

}


function table_and_grafic(book_name, json_data)
{
	console.log("new function ", book_name );
	console.log("***json books ", json_data[1].books[1].name );
}

