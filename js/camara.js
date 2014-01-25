var threshold = 128;
			
function hasGetUserMedia() {
	// Note: Opera no se puede usar!!
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

// A la carga de la página ...
function init() {
	var ancho = $("#camara").width;
	var alto = $("#camara").height;
	var video = $("#camara");
	video.width = ancho;
	video.height = alto;
	video.loop = true;
	video.volume = 0;
	video.autoplay = true;
	video.controls = true;
				
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
		
		var divContain = $("#camara");
	
		var canvas = $("#divContain");
		canvas.width = ancho;
		canvas.height = alto;
		
		var videoCanvas = $("#divContain");
		videoCanvas.width = video.width;
		videoCanvas.height = video.width*3/4;
				
		var ctx = document.getElementById("divContain").getContext('2d');
		ctx.font = "24px URW Gothic L, Arial, Sans-serif";
				
		var raster = new NyARRgbRaster_Canvas2D(canvas);
		var param = new FLARParam(320,240);
				
		var resultMat = new NyARTransMatResult();
				
		var detector = new FLARMultiIdMarkerDetector(param, 120);
		detector.setContinueMode(true);
				
		var tmp = new Float32Array(16);
				
		var renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
		renderer.setSize(ancho, alto);
				
		var glCanvas = renderer.domElement;
		var s = glCanvas.style;
		divContain.append($(glCanvas));
				
		var scene = new THREE.Scene();
		var camera = new THREE.Camera();
		var camera2 = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000);
		 scene.add(camera);
					
		var lightAmbient = new THREE.AmbientLight(0x000000);
		scene.add(lightAmbient);
				   
		var focoLuz = new THREE.PointLight (0xFFFFFF);
		focoLuz.position.x = 0;
		focoLuz.position.y = 0;
		focoLuz.position.z = 0;
					
		param.copyCameraMatrix(tmp, 10, 10000);
		camera.projectionMatrix.setFromArray(tmp);
					
		/*Crear plano de la camara*/
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
				
		var times = [];
		var markers = {};
		var lastTime = 0;
				   
		
		var cube = new THREE.Mesh( new THREE.CubeGeometry(50,50,50),
			new THREE.MeshLambertMaterial({color:0x0000FF, side:THREE.DoubleSide}));
			
		var cubeDer = new THREE.Mesh( new THREE.CubeGeometry(50, 50, 50),
			new THREE.MeshLambertMaterial({color:0xFF0000, side:THREE.DoubleSide}));
			
		var cubeIzq = new THREE.Mesh( new THREE.CubeGeometry(50, 50, 50),
			new THREE.MeshLambertMaterial({color:0x00FF00, side:THREE.DoubleSide}));
			
		setInterval(function(){
			if (video.ended) video.play();
			if (video.paused) return;
			if (window.paused) return;
			if (video.currentTime == video.duration) {
				video.currentTime = 0;
			}
			if (video.currentTime == lastTime) return;
					  
			lastTime = video.currentTime;
			
			videoCanvas.getContext('2d').drawImage(video,0,0);
			ctx.drawImage(videoCanvas, 0,0,ancho,alto);
			
			var dt = new Date().getTime();
			canvas.changed = true;
			videoTex.needsUpdate = true;
		
			var t = new Date();
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
			for (var i in markers) {
				var m = markers[i];
				if (!m.model) {
					m.model = new THREE.Object3D();
					cube.castShadow = false;
					cube.receiveShadow = false;
					
					cubeDer.castShadow = false;
					cubeDer.receiveShadow = false;
					
					cubeIzq.castShadow = false;
					cubeIzq.receiveShadow = false;
					
					m.model.matrixAutoUpdate = false;
					
					cubeDer.position.x = 60;
					cubeDer.position.z = 30;
					
					cubeIzq.position.x = -60;
					cubeIzq.position.z = 30;
					
					m.model.add(cube);
					m.model.add(cubeDer);
					m.model.add(cubeIzq);
					
					m.model.add(focoLuz);   
					scene.add(m.model);
					animate();
				}
						
				copyMatrix(m.transform, tmp);
				m.model.matrix.setFromArray(tmp);
				m.model.matrixWorldNeedsUpdate = true;
			}
					  
			renderer.autoClear = false;
			renderer.clear();
			renderer.render(videoScene, videoCam);
			renderer.render(scene, camera);
		}, 15);
		
		
		var ultimoTiempo = Date.now();
		function animate() {
			var delta = (Date.now() - ultimoTiempo) / 1500;
			if (delta > 0) {
				/* Aquí se realiza la rotación del cubo */
				cube.rotation.y += toRadianes(45) * delta;
				cube.rotation.x += toRadianes(45) * delta;

				cubeDer.rotation.y += toRadianes(45) * delta;
				cubeDer.rotation.x += toRadianes(45) * delta;

				cubeIzq.rotation.y += toRadianes(45) * delta;
				cubeIzq.rotation.x += toRadianes(45) * delta;				
			}
			ultimoTiempo = Date.now();
			renderer.render(scene, camera);			
			requestAnimationFrame(animate);
		}	
		
		function toRadianes(angulo) {
			return angulo * Math.PI / 180;
		}
					
		var radius = 600;
		var theta = 0;	
		var duration = 1000;
		var keyframes = 15, interpolation = duration / keyframes;
		var lastKeyframe = 0, currentKeyframe = 0;
		
	} else {
		alert('ERROR: La funcion getUserMedia() (necesaria para el uso de la webcam) no esta soportada por su navegador !!');
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
			  