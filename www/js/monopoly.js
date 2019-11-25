var idTablero;
var username;

var tablero;

var casillaActual;
var casillaNueva;

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
        	//console.log(data);
        	tablero = data;
        	//Actualizamos los precios y propietarios de las casillas
        	for (var i = 0; i < tablero.casillas.length; i++){
        		if(tablero.casillas[i].tipo == "PROPIEDAD" && tablero.casillas[i].comprada == true){
        			$("#casilla"+i+"  > .info_propiedad > .propietario").html(tablero.casillas[i].propietario);
        			$("#casilla"+i+"  > .info_propiedad > .precio").html("RENTA $"+tablero.casillas[i].valor);
        		}
        		
        	}

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
        		players+="<div style='color:"+jugadores[i].color+"'>"+(i+1)+": "+jugadores[i].nombre.toUpperCase()+"<span style='color:black'> - $"+jugadores[i].saldo+"</span></div><br>";
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
					//Es turno de un boot. Esperemos un segundo
					setTimeout(turnoBot(), 2000);
				}
			}
        },
	    error: function(error) {
	    	console.log(error.statusText + error.responseText);
	    }
    });
}

function turnoBot() {
	loopVar = 1;
	myLoop(); 
}

function setImageDado() {
	dado = getRandomNum(1, 6);
	document.getElementById('dado').src = 'img/dado/'+dado+'.png';
	if (loopVar == 14) {
		dado = 2;
		showAlert("DADO","verde","<strong>¡LISTO!</strong> El dado cayo en el numero: "+dado);
		//Movemos al jugador
		casillaActual = tablero.jugadores[tablero.turno-1].casilla;
		casillaNueva = casillaActual + dado;
		if (casillaNueva>25) { //Si llega a 26
			//Dio una vuelta
			casillaNueva = casillaNueva - 26;
			tablero.banco-=1000;
			tablero.jugadores[tablero.turno-1].saldo+=1000;
			tablero.jugadores[tablero.turno-1].vueltas++;
			updateJsonTablero();
		}

		switch(tablero.casillas[casillaNueva].tipo){
			case "SALIDA":
				tablero.banco-=1000;
				tablero.jugadores[tablero.turno-1].saldo+=1000;
				updateJsonTablero();
			break;
			case "PROPIEDAD":
				if (tablero.jugadores[tablero.turno-1].esBot == false) {
					if (tablero.casillas[casillaNueva].comprada == false) {
						openModal('CAISTE EN UNA PROPIEDAD','Deseas comprar la propiedad: '+tablero.casillas[casillaNueva].nombre,'COMPRAR','CANCELAR','comprarPropiedad();','cancel();');
					}
				}else{
					//El boot cayo en una propiedad
					if (tablero.jugadores[tablero.turno-1].propiedades.length == 0) {
						//La comprará si es la primera que cae y si le alcanza
						if (tablero.jugadores[tablero.turno-1].saldo >= tablero.casillas[casillaNueva].valor){
							comprarPropiedad();
						}
					}else{
						//La inteligencia esta en comprar casas del mismo color
						var colores = [];
						for (var i = 0; i < tablero.jugadores[tablero.turno-1].propiedades.length; i++) {
							colores.push(tablero.jugadores[tablero.turno-1].propiedades[i].color);
						}
						//Verificamos que el array colores contenga al menos la nueva propiedad donde callo
						if (colores.includes(tablero.casillas[casillaNueva].color)) {
							if (tablero.jugadores[tablero.turno-1].saldo >= tablero.casillas[casillaNueva].valor){
								comprarPropiedad();
							}
						}
					}
				}
				
			break;
			case "ROJA":
				//Pediremos carta roja al back
				$.ajax({
			        type: "POST",
			        url: "/card",
			        data:JSON.stringify({
			        	color: 1,
			            boardId: idTablero
			        }),
			        dataType: "json",
			        success: function(data){
			        	console.log(data);
			        },
				    error: function(error) {
				    	console.log(error.statusText + error.responseText);
				    }
			    });
			break;
			case "AZUL":
			break;
			case "CARCEL":
				//Pierdes 3 turnos y pagas 5000 al banco
				tablero.banco+=5000;
				tablero.jugadores[tablero.turno-1].saldo-=5000;
				tablero.jugadores[tablero.turno-1].turnosEnCastigo = 3;
				updateJsonTablero();
			break;
			case "VACIA":
				updateJsonTablero();
			break;
		}
	}
}

function comprarPropiedad() {
	//Verificamos si nos alcanza
	closeModal();
	if (tablero.jugadores[tablero.turno-1].saldo >= tablero.casillas[casillaNueva].valor) {
		//Si se puede comprar
		//Aumentamos saldos
		tablero.banco+=tablero.casillas[casillaNueva].valor;
		tablero.jugadores[tablero.turno-1].saldo-=tablero.casillas[casillaNueva].valor;
		//Actualizamos datos de la casilla
		tablero.casillas[casillaNueva].valor = tablero.casillas[casillaNueva].valor/10; //Valor de renta
		tablero.casillas[casillaNueva].comprada = true;
		tablero.casillas[casillaNueva].propietario = tablero.jugadores[tablero.turno-1].nombre;
		//Actualizamos al usuario
		tablero.jugadores[tablero.turno-1].propiedades.push(tablero.casillas[casillaNueva]);
		//Es todo
		updateJsonTablero();
	}else{
		openModal('SALDO INSUFICIENTE','No tienes el suficiente saldo para comprar: '+tablero.casillas[casillaNueva].nombre,'ACEPTAR',null,'cancel();',null);
	}
	
}

function cancel() {
	closeModal();
	updateJsonTablero();
}

function updateJsonTablero() {
	//Actualizamos posicion de jugador
	tablero.jugadores[tablero.turno-1].casilla = casillaNueva;
	//Incrementamos el turno
	tablero.turno++;
	if (tablero.turno == 5) {
		tablero.turno = 1;
	}
	$.ajax({
        type: "POST",
        data: JSON.stringify(tablero),
        url: "/board",
        success: function(data){
        	console.log(data);
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
    	showAlert("DADO","rojo","<strong>Espera!</strong> No puedes escoger una tarjeta todavia.");
    }else{
    	
    }
}

var loopVar = 1;  
var dado = 1;
function randomDado(e) {
	e = e || window.event;
    var target = e.target || e.srcElement;
    if ($(target.parentElement).hasClass('disabled')) {
    	showAlert("DADO","rojo","<strong>Espera!</strong> Aun no es tu turno de tirar.");
    }else{
    	loopVar = 1;
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


function getRandomNum(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

