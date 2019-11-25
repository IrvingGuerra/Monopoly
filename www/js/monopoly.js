var idTablero;
var username;
var tablero;
var casillaNueva;
var time = 1;  
var dado = 1;

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
        	tablero = data;
        	//ACTUALIZAMOS CASILLAS
        	for (var i = 0; i < tablero.casillas.length; i++){
        		if(tablero.casillas[i].tipo == "PROPIEDAD" && tablero.casillas[i].comprada == true){
        			$("#casilla"+i+"  > .info_propiedad > .propietario").html(tablero.casillas[i].propietario);
        			$("#casilla"+i+"  > .info_propiedad > .precio").html("RENTA $"+tablero.casillas[i].valor);
        		}
        	}
        	//ELIMINAMOS LOS TOKENS
        	var players = "";
        	if ($('.player1').length){$('.player1').remove();}
    		if ($('.player2').length){$('.player2').remove();}
    		if ($('.player3').length){$('.player3').remove();}
    		if ($('.player4').length){$('.player4').remove();}
    		//AGREGAMOS LOS TOKENS
        	for (var i = 0; i < tablero.jugadores.length; i++) {
        		players+="<div style='color:"+tablero.jugadores[i].color+"'>"+(i+1)+": "+tablero.jugadores[i].nombre.toUpperCase()+"<span style='color:black'> - $"+tablero.jugadores[i].saldo+"</span></div><br>";
        		$("#casilla"+tablero.jugadores[i].casilla).append('<div class="player'+(i+1)+'" style="background:'+tablero.jugadores[i].color+'"></div>');
        	}
        	//LISTAMOS JUGADORES
			$('.players').html(players);
			if (tablero.jugadores.length < 4) {
				$('.statusGame').html("ESPERANDO JUGADORES...");
				$('.statusGame').fadeIn();
			}else{
				if (time == 1) {
					$('.statusGame').html("ES TURNO DE: "+tablero.jugadores[tablero.turno-1].nombre);
					$('.statusGame').fadeIn();
					//PRIMERO VERIFICAMOS QUE NO ESTE CASTIGADO, SEA BOT O NO
					if (tablero.jugadores[tablero.turno-1].turnosEnCastigo>0) {
						time = 2;
						$('.statusGame').html("UPS! "+tablero.jugadores[tablero.turno-1].nombre+" ESTA CASTIGADO DURANTE: "+tablero.jugadores[tablero.turno-1].turnosEnCastigo+" TURNOS");
						$('.statusGame').fadeIn();
			        	setTimeout(function(){ 
							time = 1;
							tablero.jugadores[tablero.turno-1].turnosEnCastigo--;
							casillaNueva = tablero.jugadores[tablero.turno-1].casilla;
							updateJsonTablero();
			        	}, 3000);
					}else{
						//VALIDAMOS SI NO ES BOOT
						if (tablero.jugadores[tablero.turno-1].esBot == false) {
							if (tablero.jugadores[tablero.turno-1].nombre == username) {
								$('.dado').removeClass("disabled");
							}else{
								$('.dado').addClass("disabled");
							}
						}else{
							//Es turno de un boot. Esperemos un segundo
							$('.dado').addClass("disabled");
							animacionDado();
						}
					}
				}	
			}
        },
	    error: function(error) {
	    	console.log(error.statusText + error.responseText);
	    }
    });
}

function moverJugador() {
	//Movemos al jugador
	casillaNueva = tablero.jugadores[tablero.turno-1].casilla + dado;
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
				}else{
					if (tablero.casillas[casillaNueva].propietario != tablero.jugadores[tablero.turno-1].nombre) {
						//pagas si no es tuya
						for (var i = 0; i < tablero.jugadores.length; i++) {
							if (tablero.casillas[casillaNueva].propietario == tablero.jugadores[i].nombre) {
								//le pagamos a el
								tablero.jugadores[i].saldo+=tablero.casillas[casillaNueva].valor;
								//nos quitamos el dinero
								tablero.jugadores[tablero.turno-1].saldo-=tablero.casillas[casillaNueva].valor;
							}
						}
					}
				}
			}else{
				//El boot cayo en una propiedad
				//verificamos si tiene dueño
				if (tablero.casillas[casillaNueva].comprada == false) {
					//INTELIGENCIA
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
				}else{
					//PAGAMOS
					if (tablero.casillas[casillaNueva].propietario != tablero.jugadores[tablero.turno-1].nombre) {
						//pagas si no es tuya
						for (var i = 0; i < tablero.jugadores.length; i++) {
							if (tablero.casillas[casillaNueva].propietario == tablero.jugadores[i].nombre) {
								//le pagamos a el
								tablero.jugadores[i].saldo+=tablero.casillas[casillaNueva].valor;
								//nos quitamos el dinero
								tablero.jugadores[tablero.turno-1].saldo-=tablero.casillas[casillaNueva].valor;
							}
						}
					}
					updateJsonTablero();
				}
			}
		break;
		case "ROJA":
			$.ajax({
		        type: "POST",
		        url: "/card",
		        data:{
		        	color: 1,
		            boardId: idTablero
		        },
		        dataType: "json",
		        success: function(data){
		        	$(".cartasRojas").css("font-size","20px");
		        	$('.cartasRojas').html(data.descripcion);
		        	//Mostramos la info solamente 4 segundos
		        	setTimeout(function(){ 
		        		$(".cartasRojas").css("font-size","80px");
		        		$('.cartasRojas').html('<i class="fa fa-question-circle"></i>');
			        	tablero.banco+=data.dinero;
						tablero.jugadores[tablero.turno-1].saldo-=data.dinero;
						tablero.jugadores[tablero.turno-1].turnosEnCastigo = data.turnos;
						updateJsonTablero();
		        	}, 5000);
					
		        },
			    error: function(error) {
			    	console.log(error.statusText + error.responseText);
			    }
		    });
		break;
		case "AZUL":
			$.ajax({
		        type: "POST",
		        url: "/card",
		        data:{
		        	color: 0,
		            boardId: idTablero
		        },
		        dataType: "json",
		        success: function(data){
		        	$(".cartasAzules").css("font-size","20px");
		        	$('.cartasAzules').html(data.descripcion);
		        	setTimeout(function(){ 
						$(".cartasAzules").css("font-size","80px");
		        		$('.cartasAzules').html('<i class="fa fa-question-circle"></i>');
			        	tablero.banco-=data.dinero;
						tablero.jugadores[tablero.turno-1].saldo+=data.dinero;
						updateJsonTablero();
					}, 5000);
		        },
			    error: function(error) {
			    	console.log(error.statusText + error.responseText);
			    }
		    });
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
	tablero.jugadores[tablero.turno-1].casilla = casillaNueva;
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
        	time = 1;
        },
	    error: function(error) {
	    	console.log(error.statusText + error.responseText);
	    }
    });
}



function randomDado(e) {
	e = e || window.event;
    var target = e.target || e.srcElement;
    if ($(target.parentElement).hasClass('disabled')) {
    	showAlert("DADO","rojo","<strong>Espera!</strong> Aun no es tu turno de tirar.");
    }else{
    	animacionDado();
    }
}

function animacionDado() {
	var interval = setInterval(function() { 
		if (time <= 15) { 
			setImageDado();
			time++;
		}
		else { 
		  	showAlert("DADO","verde","<strong>¡LISTO!</strong> El dado cayo en el numero: "+dado);
		  	clearInterval(interval);
		  	moverJugador();
		}
	}, 200);
}

function setImageDado() {
	dado = getRandomNum(1, 6);
	document.getElementById('dado').src = 'img/dado/'+dado+'.png';
}

function getRandomNum(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
