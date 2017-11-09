
$(document).ready ( function(){
	//alert("part II");
	
	var jqxhr = $.getJSON( "books.json", function(data) {
		console.log( "success" );
		console.log("length ", data.length );
		for (var i=0; i<data.length; i++ ) {
			$('#second_page_menu').append('<a>'+data[i].name+'</a><br>');			
		}
		
				
    })
    .done(function(data) { 
			console.log( "second success" );	

		})
		.fail(function() { console.log( "error" ); })
		.always(function() { console.log( "always" ); });
	
	
	//$('#second_page_menu').append('<a>Новое меню</a>');
});