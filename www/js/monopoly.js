
/*$(window).resize(function() {
	console.log("Cambio tamaño de pantalla");
	inizializarTablero();
});

function inizializarTablero(){
	var alto = $(document).height();
	var ancho = $(document).width();
	var casillaAlto = (alto / 5);
	var casillaAncho= (ancho / 10);
	$(".cambiaFila").height(alto);
	$(".casilla").height(casillaAlto-2);
	$(".casilla").width(casillaAncho-2);
	$(".cartasYDado").height((casillaAlto)*3);
	$(".cartasRojas").height(casillaAlto);
	$(".cartasRojas").width(casillaAncho*2);
	$(".cartasAzules").height(casillaAlto);
	$(".cartasAzules").width(casillaAncho*2);
}
*/

$(document).ready(function() {
	$.getJSON('https://api.ipify.org?format=json', function(data){
	    console.log(data.ip);
	});
});


function configureProfile() {
	window.location = 'configure.html';
}



function joinGame(gameMode,type){

	if ($('#username').val() != '') {
		switch(gameMode){
			case 'solo':
				//Unicamente iniciamos juego, usuario y bots
				$.ajax({
			        type: "POST",
			        dataType: "json",
			        url: "/startGameSolo",
			        data:{
			            username: $('#username').val(),
			            usercolor: $('#usercolor').val()
			        },
			        success: function(data){
			        	if (data.status == "ok") {
			        		window.location = 'monopoly.html';
			        	}
			        }
			    });
			break;
			case 'multiplayer':
				switch(type){
					case 'create':
						//Creamos el tablero y el usuario
					break;
					case 'join':
						//Unicamente creamos al usuario y nos unimos a un tablero
						
					break;
				}
				window.location = 'configure.html';
			break;
		}
	}else{
		showAlerta("Nombre","rojo","<strong>Error!</strong> Tienes que escoger un nombre de usuario");
	}

		

/*
	//En ambos casos se creara un Jugador
	$.ajax({
        type: "POST",
        url: "/createPlayer",
        data:{
            query: "inicializaWeb"
        },
        success: function(data){
            //Una vez obtenida la info, separamos
            var arrayData = data.split(":");
            var IDred = arrayData[0];
            IDredW = IDred.substring(0,IDred.length-1);
            inicial = parseInt(arrayData[1]);
            final = parseInt(arrayData[2]);

            for (var i = inicial; i <= final; i++) {
                //Agregamos los titulos e imagenes de las screenshoots
                $("#list-host").append(
                    '<div class="col-sm-6 col-lg-3">'+
                        '<div class="text">'+
                            '<h2>'+IDredW+i+'</h2>'+
                        '</div>'+
                        '<img id="host'+IDredW+i+'" src="images/image-not-found.png">'+
                    '</div>'
                );
            }

            //Y cada 5 segundos actualizamos las imagenes

            setInterval('updateScreenshoots("'+IDredW+'","'+inicial+'","'+final+'")',1000);

        }
    });


	switch(gameMode){
		case 'solo':
			window.location = 'monopoly.html';
		break;
		case 'multiplayer':
			window.location = 'monopoly.html';
		break;
	}

	*/
}


function getTarjeta(e,color) {
	e = e || window.event;
    var target = e.target || e.srcElement;
    if ($(target).hasClass('disabled')) {
    	showAlert("rojo","<strong>Espera!</strong> No puedes escoger una tarjeta todavia.");
    }else{
    	
    }
}


var loopVar = 1;  
var dado = 1;
function randomDado(e) {
	e = e || window.event;
    var target = e.target || e.srcElement;
    if ($(target.parentElement).hasClass('disabled')) {
    	showAlert("rojo","<strong>Espera!</strong> Aun no es tu turno de tirar.");
    }else{
    	loopVar = 1;
		//Mostraremos una animacion para que se vea cool
		myLoop(); 
    }
}

function myLoop() {
	setTimeout(function () {
		setImageDado();
		loopVar++;
		if (loopVar < 15) {
		 myLoop();
		}
	}, 200);
}

function setImageDado() {
	dado = getRandomNum(1, 6);
	showAlert("verde","<strong>¡Calculando!</strong> Te toco el numero: "+dado);
	document.getElementById('dado').src = 'img/dado/'+dado+'.png';
}


function getRandomNum(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showAlert(color,text) {
	$('.alert').removeClass('verde');
	$('.alert').removeClass('rojo');
	$('.alert').addClass(color);
	$('.alert > label').html(text);
	$('.alert').fadeIn();
	setTimeout(function () {$('.alert').fadeOut();}, 2000)
}

function showAlerta(id,color,text) {
	$('#alerta'+id).removeClass('verde');
	$('#alerta'+id).removeClass('rojo');
	$('#alerta'+id).addClass(color);
	$('#alerta'+id+' > label').html(text);
	$('#alerta'+id).fadeIn();
	setTimeout(function () {$('#alerta'+id).fadeOut();}, 2000)
}

