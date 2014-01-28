// Variables globales en el proceso de R.A.

var cargador = new THREE.ColladaLoader();
var modelo, param, tmp, videoCanvas, video, ctx, canvas, detector, renderer, raster, resultMat;
var threshold = 128;
var ancho = Math.floor (window.innerWidth * 0.20);
var alto = Math.floor (window.innerHeight * 0.45);
var markers = {};

/*
 * Función de comprobación para la R.A.
 */
function hasGetUserMedia() {
	// Note: Opera no se puede usar!!
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

/*
 * Esta función iniciliza lo necesario para la recepción de datos desde la cámara y su visualización.
 */
function iniciarRA() {
	$("#RA").remove ();
	if (!$('#camara').is(':empty'))
		$("#camara").empty ();
		
	video = document.createElement('video');
	video.width = 320;
	video.height = 240;
	video.loop = true;
	video.autoplay = true;
	
	var getUserMedia = function(t, onsuccess, onerror) {

		if (navigator.getUserMedia) {
			return navigator.getUserMedia(t, onsuccess, onerror);
		} else if (navigator.webkitGetUserMedia) {
			return navigator.webkitGetUserMedia(t, onsuccess, onerror);
		} else if (navigator.mozGetUserMedia) {
			return navigator.mozGetUserMedia(t, onsuccess, onerror);
		} else if (navigator.msGetUserMedia) {
			return navigator.msGetUserMedia(t, onsuccess, onerror);
		} else {
			alert("No dispone de WebCam!!");
		}
	};
				
	var URL = window.URL || window.webkitURL;
	var createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
	if (!createObjectURL) {
		throw new Error("URL.createObjectURL not found.");
	}
				
				
	getUserMedia({'video': true},
		function(stream) {
			var url = createObjectURL(stream);
			video.src = url;
		},

		function(error) {
			alert("ERROR: No se pudo acceder a su WebCam!!");
		}
	);

	// Comprobación vital para el funcionamiento !!
	if (hasGetUserMedia()) {
		
		var divContain = document.getElementById('camara');
	
		canvas = document.createElement('canvas');
		canvas.width = 320;
		canvas.height = 240;
						
		videoCanvas = document.createElement('canvas');
		videoCanvas.width = 320;
		videoCanvas.height = 240;
				
		ctx = canvas.getContext('2d');
		ctx.font = "24px URW Gothic L, Arial, Sans-serif";
				
		raster = new NyARRgbRaster_Canvas2D(canvas);
		param = new FLARParam(320,240);
				
		resultMat = new NyARTransMatResult();
				
		detector = new FLARMultiIdMarkerDetector(param, 120);
		detector.setContinueMode(true);
				
		tmp = new Float32Array(16);
				
		renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
		renderer.setSize(ancho, alto);
				
		var glCanvas = renderer.domElement;
		var s = glCanvas.style;
		divContain.appendChild(glCanvas);
	} else {
		alert('ERROR: La funcion getUserMedia() (necesaria para el uso de la webcam) no esta soportada por su navegador !!');
	}
	initSceneRA ();
}

/*
 *	Esta inicializa la escena que se rendizará en la Realidad Aumentada
 */
function initSceneRA () {
		// Cargamos la escena de Three js
		var scene = new THREE.Scene();
		
		// Creamos las cámaras necesarias
		var camera = new THREE.Camera();
		var camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
		scene.add(camera);
		
		// Damos un punto de luz direccional y una luz ambiental a la escena.
		var lightAmbient = new THREE.AmbientLight(0xA100FF);
		scene.add(lightAmbient);
				   
		var focoLuz = new THREE.PointLight (0xFFFFFF);
		focoLuz.position.x = 0;
		focoLuz.position.y = 0;
		focoLuz.position.z = 0;
		
		param.copyCameraMatrix(tmp, 10, 10000);
		camera.projectionMatrix.setFromArray(tmp);
					
		/* Crear plano de la camara */
		var videoTex = new THREE.Texture(videoCanvas);
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0),
					new THREE.MeshBasicMaterial({map: videoTex})
					);
					
		plane.material.depthTest = false;
		plane.material.depthWrite = false;
		var videoCam = new THREE.Camera();
		var videoScene = new THREE.Scene();
					
		videoScene.add(plane);
		videoScene.add(videoCam);

		// Inicia el proceso de la detección de Markers
		var lastTime = 0;
				   	
		setInterval(function(){
			if (video.ended) video.play();
			if (video.paused) return;
			if (window.paused) return;
			if (video.currentTime == video.duration) {
				video.currentTime = 0;
			}
			if (video.currentTime == lastTime) return;
					  
			lastTime = video.currentTime;
			try {
				videoCanvas.getContext('2d').drawImage(video,0,0);
			} catch (e) { }
			ctx.drawImage(videoCanvas, 0,0, 320, 240);
			canvas.changed = true;
			videoTex.needsUpdate = true;
		
			// Para cada markers que se detecte en la cámara web
			var detected = detector.detectMarkerLite(raster, threshold);
			for (var idx = 0; idx<detected; idx++) {
				var id = detector.getIdMarkerData(idx);
				var currId;
				if (id.packetLength > 4) {
					currId = -1;
				} else {
					currId = 0;
					for (var i = 0; i < id.packetLength; i++ ) {
						currId = (currId << 8) | id.getPacketData(i);
					}
				}
				
				if (!markers[currId]) {
					markers[currId] = {};
				}
				detector.getTransformMatrix(idx, resultMat);
				markers[currId].age = 0;
				markers[currId].transform = Object.asCopy(resultMat);
			}
			
			
			for (var i in markers) {
				var r = markers[i];
				if (r.age > 6) {
					delete markers[i];
					scene.remove(r.model);
				}
				r.age++;
			}
			// Añadimos el modelo cargado desde COLLADA a la escena anteriormente creada y la cuadramos con el marcador
			for (var i in markers) {
				var m = markers[i];
				if (!m.model) {
					
					m.model = new THREE.Object3D();
					
					m.model.matrixAutoUpdate = false;
					m.model.add (modelo);
					
					m.model.add(focoLuz);   
					scene.add(m.model);
					
				}
						
				copyMatrix(m.transform, tmp);
				m.model.matrix.setFromArray(tmp);
				m.model.matrixWorldNeedsUpdate = true;
			}
					  
			renderer.autoClear = false;
			renderer.clear();
			renderer.render(videoScene, videoCam);
			renderer.render(scene, camera);
		}, 100);
}

var modeloBeber, modeloComer, modeloNoche;
function iniciarModelos () {
	cargador.options.convertUpAxis = true;
	
	cargador.load('3dmodels/bicchiere_di_vetro.dae',
		function(collada){
			modeloBeber = collada.scene;
			modeloBeber.scale.set(40,40,40);
			modeloBeber.position.set(0,2,0);
		});

	cargador.load('3dmodels/coltelloY.dae',
		function(collada){
			modeloComer = collada.scene;
			modeloComer.scale.set(30,30,30);
			modeloComer.position.set(0,2,-2);
		});

	cargador.load('3dmodels/bolaDiscoteca.dae',
		function(collada){
			modeloNoche = collada.scene;
			modeloNoche.scale.set(100,100,100);
			modeloNoche.position.set(0,2,0);
		});
}

/*
 *	Esta función carga un modelo 3D realizado en Collada
 */
function cargarModelo () {

	if (tipoLocal == "beber") {
		modelo = modeloBeber;
	} else if (tipoLocal == "comer") {
		modelo = modeloComer;
	} else if (tipoLocal == "noche") {
		modelo = modeloNoche;
	} else {
		alert ("Aviso: para ejecutar la Realidad Aumentada es necesario elegir un tipo de Local a buscar");
	}
}					
			
THREE.Matrix4.prototype.setFromArray = function(m) {
    return this.set(
		m[0], m[4], m[8], m[12],
		m[1], m[5], m[9], m[13],
		m[2], m[6], m[10], m[14],
		m[3], m[7], m[11], m[15]
		);
};
			
function copyMatrix(mat, cm) {
	cm[0] = mat.m00;
	cm[1] = -mat.m10;
	cm[2] = mat.m20;
	cm[3] = 0;
	cm[4] = mat.m01;
	cm[5] = -mat.m11;
	cm[6] = mat.m21;
	cm[7] = 0;
	cm[8] = -mat.m02;
	cm[9] = mat.m12;
	cm[10] = -mat.m22;
	cm[11] = 0;
	cm[12] = mat.m03;
	cm[13] = -mat.m13;
	cm[14] = mat.m23;
	cm[15] = 1;
}
			  