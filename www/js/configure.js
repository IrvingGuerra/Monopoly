function joinGame(gameMode,type){
	var idTablero = String(Math.floor(Math.random()*1000) + 1);
	if ($('#username').val() != '') {
		switch(gameMode){
			case 'solo':
				//Unicamente iniciamos juego, usuario y bots
				$.ajax({
			        type: "POST",
			        url: "/game",
			        data:JSON.stringify({
			        	boardId: idTablero,
			            playerName: $('#username').val(),
			            playerIsBot: false,
			            playerColor: $('#usercolor').val()
			        }),
			        success: function(data){
			        	if (data == "SUCCESS") {
			        		//Ingresamos a todos los Bots
			        		$.ajax({
						        type: "POST",
						        url: "/game",
						        data:JSON.stringify({
						        	boardId: idTablero,
						            playerName: "BOT1",
						            playerIsBot: true,
						            playerColor: "#000000"
						        }),
						        success: function(data){
						        	if (data == "SUCCESS") {
						        		$.ajax({
									        type: "POST",
									        url: "/game",
									        data:JSON.stringify({
									        	boardId: idTablero,
									            playerName: "BOT2",
									            playerIsBot: true,
									            playerColor: "#FFFFFF"
									        }),
									        success: function(data){
									        	if (data == "SUCCESS") {
									        		$.ajax({
												        type: "POST",
												        url: "/game",
												        data:JSON.stringify({
												        	boardId: idTablero,
												            playerName: "BOT3",
												            playerIsBot: true,
												            playerColor: "#138F00"
												        }),
												        success: function(data){
												        	if (data == "SUCCESS") {
												        		setCookie('idTablero',idTablero,7);
												        		setCookie('username',$('#username').val(),7);
												        		window.location = 'monopoly.html';
												        	}
												        }
												    });
									        	}
									        }
									    });
						        	}
						        }
						    });
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
			break;
		}
	}else{
		showAlert("Nombre","rojo","<strong>Error!</strong> Tienes que escoger un nombre de usuario");
	}
}