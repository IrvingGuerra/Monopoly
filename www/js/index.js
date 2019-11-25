$(document).ready(function() {
	console.log($('#indexAudio'));
	$('#indexAudio')[0].play();
	/*
	var obj = document.createElemnet("audio");
	obj.src = "sounds/index.wav";
	obj.play();*/
});

function configureProfile() {
	window.location = 'configure.html';
}
function showRules() {
	openModal('REGLAS','Estas son las reglas','ACEPTAR',null,'closeModal();',null)
}