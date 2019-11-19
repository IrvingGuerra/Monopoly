#define MG_ENABLE_HTTP_STREAMING_MULTIPART 1
#include "mongoose.h"
#include <stdio.h>
#include <iostream>
#include <string.h>

using namespace std;

static const char *s_http_port = "8000";
static struct mg_serve_http_opts s_http_server_opts;


static void handle_sendRedData(struct mg_connection *nc, struct http_message *hm) {
/*
	char response[256];
	//Constriumos la respuesta
	mg_get_http_var(&hm->body, "query", response,sizeof(response));
	//Escribimos los datos

	//Escribimos ID red
	strcpy (response, id_red);
	
	//Escribimos host inicial
	strcat (response, ":");
	strcat (response, host_inicial);
	//Escribimos host final
	strcat (response, ":");
	strcat (response, host_final);

	printf("Cadena enviada: %s\n", response);
	mg_send_head(nc,200,strlen(response), "Content-Type: text/plain");
	mg_printf(nc, "%s", response);
*/
}

static void ev_handler(struct mg_connection *nc, int ev, void *p) {
 	struct http_message *hm = (struct http_message *) p;
	if (ev == MG_EV_HTTP_REQUEST) {
		if (mg_vcmp(&hm->uri, "/startGameSolo") == 0) { 

			printf("Iniciando Juego en Modo SOLO\n");

			char username[256];
			char usercolor[256];


			mg_get_http_var(&hm->body, "username", username,sizeof(username));
			mg_get_http_var(&hm->body, "usercolor", usercolor,sizeof(usercolor));

			printf("Nombre de usuario: %s\n",username);
			printf("Color de usuario: %s\n",usercolor);


		    //handle_sendRedData(nc, hm);  

		}else{
			mg_serve_http(nc, (struct http_message *) p, s_http_server_opts);
		}
	}

}

int main(void) {
	struct mg_mgr mgr;
	struct mg_connection *nc;
	mg_mgr_init(&mgr, NULL);

	printf("Starting web server on port %s\n", s_http_port);
	nc = mg_bind(&mgr, s_http_port, ev_handler);
	if (nc == NULL) {
		printf("Failed to create listener\n");
		return 1;
	}
	// Set up HTTP server parameters
	mg_set_protocol_http_websocket(nc);
	s_http_server_opts.document_root = "www"; // Serve current directory
	s_http_server_opts.enable_directory_listing = "yes";
	for (;;) {
		mg_mgr_poll(&mgr, 1000);
	}
	mg_mgr_free(&mgr);

	return 0;
}
