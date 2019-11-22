function openModal(title,description,btn1,btn2,fnbtn1,fnbtn2) {
	$('body').append('<div class="modal"><div class="submodal"></div></div>');
	$('.submodal').append('<span class="closebtnModal" onclick="closeModal();">&times;</span>');
	$('.submodal').append('<h1>'+title+'</h1>');
	$('.submodal').append('<h2>'+description+'</h2>');
	if (btn1 != null) {
		$('.submodal').append('<button class="btnFormal" onclick="'+fnbtn1+'">'+btn1+'</button>');
	}
	if (btn2 != null) {
		$('.submodal').append('<button class="btnFormal rojo" onclick="'+fnbtn2+'">'+btn2+'</button>');
	}
	$('.modal').fadeIn();
}

function closeModal() {
	$('.modal').remove();
}
//Funciones para alertas pequeñas
function showAlert(id,color,text) {
	$('#alertas').html(""); //Limpiamos el div especializado para alertas
	$('#alertas').append('<div class="alert"></div>');
	$('.alert').append('<span class="closebtnAlert" onclick="closeAlert();">&times;</span>');
	$('.alert').append('<label>'+text+'</label>');
	$('.alert').addClass(color);
	$('.alert').fadeIn();
	setTimeout(function () {$('.alert').fadeOut();}, 2000)
}
function closeAlert(){
	$('.alert').fadeOut();
}