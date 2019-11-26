function configureProfile() {
	$('#beep')[0].play();
	setTimeout(function(){ 
		window.location = 'configure.html';
	}, 300);
}
function showRules() {
	$('#beep')[0].play();
	openModal('REGLAS','Estas son las reglas','ACEPTAR',null,'closeModal();',null)
}