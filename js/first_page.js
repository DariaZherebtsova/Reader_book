
$('#bt_login').bind('click', function(){
  //alert('Вы нажали');  
  document.location.href = "second_page.html";
 /* var jqxhr = $.getJSON( "books.json", function(data) {
	console.log( "success" );
	alert(data.name);	
	document.location.href = "second_page.html";	
	//$('#second_page_menu').append('<a>Новое меню</a>');	
  })
  .done(function(data) { 
			console.log( "second success" );
			console.log("name ", data.name );
			//document.location.href = "second_page.html";	

		})
		.fail(function() { console.log( "error" ); })
		.always(function() { console.log( "always" ); });*/
  
});

/*function second_page_load(){
				alert("part II");
				$('#second_page_menu').append('<a>Новое меню</a>');
			}*/