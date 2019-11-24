var idTablero;
var username;

var casillas = [{"numero":0,"tipo":"SALIDA","comprada":false,"valor":1000,"propietario":0,"nombre":"SALIDA","color":"FFFFFF"},{"numero":1,"tipo":"PROPIEDAD","comprada":false,"valor":20000,"propietario":0,"nombre":"TORNIQUETES CAFE","color":"8449A3"},{"numero":2,"tipo":"ROJA","comprada":false,"valor":0,"propietario":0,"nombre":"CARTA ROJA","color":"D50E0E"},{"numero":3,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":4,"tipo":"PROPIEDAD","comprada":false,"valor":80000,"propietario":0,"nombre":"CAFETERIA","color":"3953BB"},{"numero":5,"tipo":"PROPIEDAD","comprada":false,"valor":40000,"propietario":0,"nombre":"CAFETERIA SILLAS","color":"3953BB"},{"numero":6,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":7,"tipo":"AZUL","comprada":false,"valor":0,"propietario":0,"nombre":"CARTA AZUL","color":"3953BB"},{"numero":8,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":9,"tipo":"PROPIEDAD","comprada":false,"valor":40000,"propietario":0,"nombre":"BAÑOS MUJERES","color":"D50E0E"},{"numero":10,"tipo":"PROPIEDAD","comprada":false,"valor":40000,"propietario":0,"nombre":"BAÑOS HOMBRES","color":"D50E0E"},{"numero":11,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":12,"tipo":"PROPIEDAD","comprada":false,"valor":60000,"propietario":0,"nombre":"PAPELERIA","color":"27902C"},{"numero":13,"tipo":"CARCEL","comprada":false,"valor":5000,"propietario":0,"nombre":"CARCEL","color":"FFFFFF"},{"numero":14,"tipo":"ROJA","comprada":false,"valor":0,"propietario":0,"nombre":"CARTA ROJA","color":"D50E0E"},{"numero":15,"tipo":"PROPIEDAD","comprada":false,"valor":50000,"propietario":0,"nombre":"CAFETERIA","color":"3953BB"},{"numero":16,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":17,"tipo":"AZUL","comprada":false,"valor":0,"propietario":0,"nombre":"CARTA AZUL","color":"3953BB"},{"numero":18,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":19,"tipo":"PROPIEDAD","comprada":false,"valor":80000,"propietario":0,"nombre":"PAPELERIA IMPRESIONES","color":"27902C"},{"numero":20,"tipo":"PROPIEDAD","comprada":false,"valor":40000,"propietario":0,"nombre":"PAPELERIA COPIAS","color":"27902C"},{"numero":21,"tipo":"ROJA","comprada":false,"valor":0,"propietario":0,"nombre":"CARTA ROJA","color":"D50E0E"},{"numero":22,"tipo":"VACIA","comprada":false,"valor":0,"propietario":0,"nombre":"VACIA","color":"FFFFFF"},{"numero":23,"tipo":"PROPIEDAD","comprada":false,"valor":30000,"propietario":0,"nombre":"BAÑOS SUCIOS","color":"D50E0E"},{"numero":24,"tipo":"AZUL","comprada":false,"valor":0,"propietario":0,"nombre":"CARTA AZUL","color":"3953BB"},{"numero":25,"tipo":"PROPIEDAD","comprada":false,"valor":20000,"propietario":0,"nombre":"TORNIQUETES ESTACIONAMIENTO","color":"8449A3"}];

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
        	//Reparasemos los jugadores que hay
        	var players = "";
        	var jugadores = data.jugadores;
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
					//Le toca a un bot

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
		console.log("acabo");
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

