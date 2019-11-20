#define MG_ENABLE_HTTP_STREAMING_MULTIPART 1
#include "mongoose.h"
#include <stdio.h>
#include <iostream>
#include <string.h>
#include "Tablero.h"
#include "Casilla.h"
#include "Jugador.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/pointer.h"
#include "rapidjson/stringbuffer.h"

using namespace std;
using namespace rapidjson;

static const char *s_http_port = "8000";
static struct mg_serve_http_opts s_http_server_opts;
static int idTableros = 0;

/*
static void handle_sendRedData(struct mg_connection *nc, struct http_message *hm) {

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

}
*/

static void responseConfirmSolo(struct mg_connection *nc, struct http_message *hm, int idTablero) {
	Document d;
	Pointer("/status").Set(d, "ok");
	Pointer("/idTablero").Set(d, idTablero);
	StringBuffer buffer;
	Writer<StringBuffer> writer(buffer);
	d.Accept(writer);
	char response[256];
	mg_get_http_var(&hm->body, "query", response,sizeof(response));
	strcpy (response, buffer.GetString());
	printf("Cadena enviada: %s\n", response);
	mg_send_head(nc,200,strlen(response), "Content-Type: text/plain");
	mg_printf(nc, "%s", response);
}

static void ev_handler(struct mg_connection *nc, int ev, void *p)
{
	struct http_message *hm = (struct http_message *)p;
	if (ev == MG_EV_HTTP_REQUEST)
	{
		if (mg_vcmp(&hm->uri, "/startGameSolo") == 0){
			printf("Iniciando Juego en Modo SOLO\n");
			char username[256];
			char usercolor[256];
			mg_get_http_var(&hm->body, "username", username, sizeof(username));
			mg_get_http_var(&hm->body, "usercolor", usercolor, sizeof(usercolor));
			printf("Nombre de usuario: %s\n", username);
			printf("Color de usuario: %s\n", usercolor);
			idTableros++;
			Tablero tablero(idTableros);
			printf("Tu id de tablero es: %d\n", idTableros);
			Jugador player(username,usercolor,false);
			Jugador bot1((char *)"bot1",(char *)"FF0000",true);
			Jugador bot2((char *)"bot2",(char *)"E800FF",true);
			Jugador bot3((char *)"bot3",(char *)"005DFF",true);
			tablero.insertUsuario(player);
			tablero.insertUsuario(bot1);
			tablero.insertUsuario(bot2);
			tablero.insertUsuario(bot3);
			//printf("Casilla: %s\n",tablero.getCasilla(0));
			responseConfirmSolo(nc, hm, idTableros);
		}else if (mg_vcmp(&hm->uri, "/refrescaTurno") == 0){
			//Se entra a esta peticion cada cierto tiempo
			
		}else{
			mg_serve_http(nc, (struct http_message *)p, s_http_server_opts);
		}
	}
}

int main(void)
{
	struct mg_mgr mgr;
	struct mg_connection *nc;
	mg_mgr_init(&mgr, NULL);

	printf("Starting web server on port %s\n", s_http_port);
	nc = mg_bind(&mgr, s_http_port, ev_handler);
	if (nc == NULL)
	{
		printf("Failed to create listener\n");
		return 1;
	}
	// Set up HTTP server parameters
	mg_set_protocol_http_websocket(nc);
	s_http_server_opts.document_root = "www"; // Serve current directory
	s_http_server_opts.enable_directory_listing = "yes";
	for (;;)
	{
		mg_mgr_poll(&mgr, 1000);
	}
	mg_mgr_free(&mgr);

	return 0;
}

