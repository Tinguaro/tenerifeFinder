var final_transcript;

// *****************************************************************************/
// IMPORTANTE!! Esta función no rula hasta que esté en el servidor el proyecto 
// -> USO LA ÚLTIMA COMO AUXILIAR A TRAVÉS DEL BOTON ESE DE GOOGLE PARA RECONOCIMIENTO DE VOZ!! 
//(YA SE QUITARÁ CUANDO ESTÉ EL PROYECTO EN EL SERVIDOR)
// *****************************************************************************/
function iniciarReconocimiento () {
	
	if (!('webkitSpeechRecognition' in window))
		alert("No soportado el Reconocimiento de voz en su dispositivo");
		
	var micro = new webkitSpeechRecognition ();
	micro.continuous = true;
	micro.interimResults = false;
	micro.lang = "es-ES";
	
	micro.start ();
	
	micro.onresult = function (event) {
		var interim_transcript = '';

		for (var i = event.resultIndex; i < event.results.length; ++i) {
			interim_transcript += event.results[i][0].transcript;
		}
		
		//var a = "quiero ir a beber y comer";
		obtenerOrden (interim_transcript);
	}
		
	micro.onend = function () {
		alert ("Fin del reconocimiento de voz, pulse de nuevo para ejecutar otra orden!");
	}

}

function obtenerOrden (frase) {
	var ordenes = [];
	ordenes = frase.split (" ");
	for (var i in ordenes) {
		ordenes[i] = ordenes[i].toLowerCase ();
		switch  (ordenes[i]) {
			case 'beber': case 'tomar': 
				console.log ("Entendida la palabra " + ordenes[i] + " en lo pronunciado");
				mostrarAlertaBeber();
				$("#textoAsistente").empty();
				$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">He entendido sitios donde beber</div>'));
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=He+entendido+ir+a+beber' style='display: none'></iframe>");
			break;
		
			case 'comer':
				console.log ("Entendida la palabra  " + ordenes[i] + "  en lo pronunciado");
				mostrarAlertaComer();
				$("#textoAsistente").empty();
				$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">He entendido sitios donde comer</div>'));				
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=He+entendido+ir+a+comer' style='display: none'></iframe>");
			break;
			
			case 'fiesta':	case 'noche':
				console.log ("Entendida la palabra  " + ordenes[i] + "  en lo pronunciado");
				mostrarAlertaNoche();
				$("#textoAsistente").empty();
				$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">He entendido sitios donde salir de fiesta</div>'));				
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=He+entendido+sitios+donde+salir+de+fiesta+o+a+tomar+algo' style='display: none'></iframe>");
			break;
			
			case 'principal': case 'jom': case 'inicio':
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Has+dicho+ir+a+home' style='display: none'></iframe>");			
				$.mobile.changePage("#page1");
			break;
			
			case 'tenerife': case 'finder':
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Has+dicho+ir+a+Tenerife+Finder' style='display: none'></iframe>");			
				$.mobile.changePage("#page2");
			break;
			
			case 'acerca': case 'sobre': case 'about':
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Has+dicho+ir+a+about+us' style='display: none'></iframe>");
				$.mobile.changePage("#page3");
			break;
			
			case 'hola':
				$("#textoAsistente").empty();
				$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Hola, &iquestQu&eacute tal?</div>'));
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Hola+qué+tal' style='display: none'></iframe>");
			break;
			
			case 'chao': case 'adios':
				$("#textoAsistente").empty();
				$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Adi&oacutes espero volver a verle pronto</div>'));
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Adiós+Espero+volver+a+verle+pronto' style='display: none'></iframe>");
				$.mobile.changePage("#page1");
			break;
			
			case 'salir':
				var x = window.confirm("Seguro de querer abandonar el sitio web ?")
				if (x) {
					window.alert("Vuelva pronto!  :)")
					window.open('', '_self', '');
					window.close();
				} else {
					$("#textoAsistente").empty();
					$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Gracias por quedarte</div>'));
					$("#sonidosAsistente").empty ();
					$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Gracias+por+quedarte' style='display: none'></iframe>");
				
				}
			break;
			
			case 'p***': case 'tonta': case 'gilipollas': case 'idiota':
				$("#textoAsistente").empty();
				$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Eso lo ser&aacute tu madre por favor tenga educaci&oacuten</div>'));
				$("#sonidosAsistente").empty ();
				$("#sonidosAsistente").append ("<iframe src='http://translate.google.com/translate_tts?tl=es&q=Eso+lo+será+tu+madre+por+favor+tenga+educación' style='display: none'></iframe>");
				
			break;
		}
	}
}

// Función de momento auxiliar para comprobar el parseo de la entrada de voz -> FUNCIONA CORRECTAMENTE
function ejecutarComandoVoz (comandoVoz) {
	obtenerOrden (comandoVoz);
}
