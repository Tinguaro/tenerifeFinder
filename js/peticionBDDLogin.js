var usuario;

function todoListo() {
//$("contenidoLogin").remove();Ç
$(".navigation-bar-content").append($('<a class="place-rigth fg-white">'+usuario+'</a>'));
}

function comprobar() {
	alert("comprobamos el login...");
	//hace la búsqueda
	$.ajax({
			type: "POST",
			url: ip + "consultarLogin.php",
			data: "user=" + $("#user").val(),
			dataType: "html",
			error: function(){
				alert("Error al intentar comprobar el Login.");
			}, 
								
			success: function(data){
				console.log("Consulta correcta Data -> " + data);
				if (data.length > 0 && data == $("#password").val()) {
					usuario = $("#user").val();
					todoListo ();
				} else 
					alert ("ERROR: usuario o password incorrectos!");
			}
	});															   
}

