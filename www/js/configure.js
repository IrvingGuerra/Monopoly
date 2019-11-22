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
			        		idTablero = data.idTablero;
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
		showAlert("Nombre","rojo","<strong>Error!</strong> Tienes que escoger un nombre de usuario");
	}
}