function joinGame(gameMode, type) {
	var idTablero = String(Math.floor(Math.random() * 1000) + 1);
	if ($('#username').val() != '') {
		switch (gameMode) {
			case 'solo':
				//Unicamente iniciamos juego, usuario y bots
				$.ajax({
					type: "POST",
					url: "/game",
					data: {
						boardId: idTablero,
						playerName: $('#username').val(),
						playerIsBot: false,
						playerColor: $('#usercolor').val()
					},
					success: function (data) {
						if (data == "SUCCESS") {
							//Ingresamos a todos los Bots
							$.ajax({
								type: "POST",
								url: "/game",
								data: {
									boardId: idTablero,
									playerName: "BOT1",
									playerIsBot: true,
									playerColor: "#000000"
								},
								success: function (data) {
									if (data == "SUCCESS") {
										$.ajax({
											type: "POST",
											url: "/game",
											data: {
												boardId: idTablero,
												playerName: "BOT2",
												playerIsBot: true,
												playerColor: "#FFFFFF"
											},
											success: function (data) {
												if (data == "SUCCESS") {
													$.ajax({
														type: "POST",
														url: "/game",
														data: {
															boardId: idTablero,
															playerName: "BOT3",
															playerIsBot: true,
															playerColor: "#138F00"
														},
														success: function (data) {
															if (data == "SUCCESS") {
																setCookie('idTablero', idTablero, 7);
																setCookie('username', $('#username').val(), 7);
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
				switch (type) {
					case 'create':
						$.ajax({
							type: "POST",
							url: "/game",
							data: {
								boardId: idTablero,
								playerName: $('#username').val(),
								playerIsBot: false,
								playerColor: $('#usercolor').val()
							},
							success: function (data) {
								if (data == "SUCCESS") {
									//Nos metemos al tablero
									setCookie('idTablero', idTablero, 7);
									setCookie('username', $('#username').val(), 7);
									window.location = 'monopoly.html';
								}
							}
						});
					break;
					case 'join':
						if ($('#idGame').val() != '') {
							//Nos unimos al ID DEL TABLERO
							$.ajax({
								type: "POST",
								url: "/game",
								data: {
									boardId: $('#idGame').val(),
									playerName: $('#username').val(),
									playerIsBot: false,
									playerColor: $('#usercolor').val()
								},
								success: function (data) {
									if (data == "SUCCESS") {
										//Nos metemos al tablero
										setCookie('idTablero', $('#idGame').val(), 7);
										setCookie('username', $('#username').val(), 7);
										window.location = 'monopoly.html';
									}
								},error: function(error) {
							    	showAlert("Nombre", "rojo", "<strong>Error!</strong> El ID de juego NO existe");
							    }
							});
						}else{
							showAlert("Nombre", "rojo", "<strong>Error!</strong> Tienes que ingresar un ID de juego");
						}
					break;
				}
				break;
		}
	} else {
		showAlert("Nombre", "rojo", "<strong>Error!</strong> Tienes que escoger un nombre de usuario");
	}
}