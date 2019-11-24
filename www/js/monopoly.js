var idTablero;
var username;

var tablero;

$(document).ready(function() {
	idTablero = getCookie('idTablero');
	username = getCookie('username');
	if (idTablero) {
		$('.idTablero').html("ID DE TABLERO: "+idTablero);
	    setInterval('updateGame()',1000);
	}else{
		window.location = 'configure.html';
	}
});

function infoCasilla(num) {
	openModal('TARJETA ROJA','Si caes en esta casilla tienes que tomar una carta color rojo!','ACEPTAR',null,'closeModal();',null)
}

function updateGame() {
	//Pediremos el tablero
	$.ajax({
        type: "GET",
        data:{
            boardId: idTablero
        },
        dataType: "json",
        url: "/board",
        success: function(data){
        	console.log(data);
        	tablero = data;
        	//Reparasemos los jugadores que hay
        	var players = "";
        	var jugadores = data.jugadores;
        	if ($('.player1').length){
    			$('.player1').remove();
    		}
    		if ($('.player2').length){
    			$('.player2').remove();
    		}
    		if ($('.player3').length){
    			$('.player3').remove();
    		}
    		if ($('.player4').length){
    			$('.player4').remove();
    		}
        	for (var i = 0; i < jugadores.length; i++) {
        		players+="<div style='color:"+jugadores[i].color+"'>"+(i+1)+": "+jugadores[i].nombre.toUpperCase()+"</div><br>";
        		$("#casilla"+jugadores[i].casilla).append('<div class="player'+(i+1)+'" style="background:'+jugadores[i].color+'"></div>');
        	}
			$('.players').html(players);
			if (jugadores.length < 4) {
				$('.statusGame').html("ESPERANDO JUGADORES...");
				$('.statusGame').fadeIn();
			}else{
				$('.statusGame').html("ES TURNO DE: "+data.jugadores[data.turno-1].nombre);
				$('.statusGame').fadeIn();

				//Primeros se comprueba que no sea bot

				if (jugadores[data.turno-1].esBot == false) {
					if (jugadores[data.turno-1].nombre == username) {
						$('.dado').removeClass("disabled");
					}
				}else{
					//Giramos el dado por el
					loopVar = 1;
					//myLoop(); 
				}
			}
        },
	    error: function(error) {
	    	console.log(error.statusText + error.responseText);
	    }
    });
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
	if (loopVar == 14) {
		//Movemos al jugador
		var casillaActual = parseInt(tablero.jugadores[tablero.turno-1].casilla);
		var casillaNueva = casillaActual + dado;
		tablero.jugadores[tablero.turno-1].casilla = casillaNueva;

		switch(tablero.casillas[casillaNueva].tipo){
			case "SALIDA":
			break;
			case "PROPIEDAD":
				if (jugadores[data.turno-1].esBot == false) {
					if (tablero.casillas[casillaNueva].comprada == false) {
						openModal('CAISTE EN UNA PROPIEDAD','Deseas comprar la propiedad: '+tablero.casillas[casillaNueva].nombre,'COMPRAR','CANCELAR','comprarPropiedad();','closeModal();');
					}
				}else{
					//El boot cayo en una propiedad
					//Si es la primera la compramos

				}
				
			break;
			case "ROJA":
			break;
			case "AZUL":
			break;
			case "CARCEL":
			break;
			case "VACIA":
			break;
		}
		//Incrementamos el turno
		tablero.turno++;
		if (tablero.turno == 5) {
			tablero.turno = 1;
		}
		//En cualquier caso actualizamos json
		$.ajax({
        type: "POST",
        data:JSON.stringify(tablero),
        url: "/board",
        success: function(data){
        	console.log(data);
        },
	    error: function(error) {
	    	console.log(error.statusText + error.responseText);
	    }
    });

	}
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

