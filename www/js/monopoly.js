var idTablero = null;

$(document).ready(function() {
	//setInterval('updateGame()',1000);
	/*
	$.getJSON('https://api.ipify.org?format=json', function(data){
	    console.log(data.ip);
	});
	*/
});

function infoCasilla(num) {
	openModal('TARJETA ROJA','Si caes en esta casilla tienes que tomar una carta color rojo!','ACEPTAR',null,'closeModal();',null)
}

updateGame();

function updateGame() {

	//Pediremos el tablero
	$.ajax({
        type: "GET",
        dataType: "json",
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

