
$(document).ready ( function(){
	//alert("part II");
	
	var jqxhr = $.getJSON( "books.json", function(data) {
	console.log( "success" );
	
	$('#second_page_menu').append('<a>'+data.name+'</a>');		
    })
    .done(function(data) { 
			console.log( "second success" );
			console.log("name ", data.name );	

		})
		.fail(function() { console.log( "error" ); })
		.always(function() { console.log( "always" ); });
	
	
	//$('#second_page_menu').append('<a>Новое меню</a>');
});