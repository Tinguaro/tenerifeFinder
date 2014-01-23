//$.mobile.changePage ($("#page4"), "flip");
function comprobarLogin () {

	//hace la búsqueda
	$.ajax({
			type: "POST",
			url: ip + "/php/consultarLogin.php",
			data: "user=" + $("#user").val(),
			dataType: "html",
			error: function(){
				//$.mobile.changePage ($("#page1"), "flip");
			}, 
								
			success: function(data){
				
				if (data.length > 0 && data == $("#password").val()) {
					todoListo ();
				
				$.mobile.changePage($("#page2"),"flip");
					
				} else 
					alert ("ERROR: usuario o password incorrectos!");
			}
	});															   
}