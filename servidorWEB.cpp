#include <stdio.h>
#include <iostream>
#include <string.h>

#include "mongoose.h"

#include "Controllers.h"

static const char *s_http_port = "8000";
static struct mg_serve_http_opts s_http_server_opts;

static void ev_handler(struct mg_connection *nc, int ev, void *p)
{
	struct http_message *hm = (struct http_message *)p;
	if (ev == MG_EV_HTTP_REQUEST)
	{
		if (mg_vcmp(&hm->uri, "/game") == 0)
		{
			onGetGame(nc, hm);
		}
		else if (mg_vcmp(&hm->uri, "/board") == 0)
		{
			if (mg_vcmp(&hm->method, "GET") == 0)
			{
				onGetBoard(nc, hm);
			}
			else if (mg_vcmp(&hm->method, "POST") == 0)
			{
				onPostBoard(nc, hm);
			}
		}
		else if (mg_vcmp(&hm->uri, "/card") == 0)
		{
			if (mg_vcmp(&hm->method, "GET") == 0)
			{
				// Se obtiene el color de la carta que se pide.
				// Se debe obtener una ruta del tipo: /card?color=COLOR
				// Con COLOR = red | blue.
				char color[10];
				strncpy(color, hm->query_string.p + 6, hm->query_string.len - 6);
				if (strcmp(color, "blue") == 0)
				{
					onGetBlueCard(nc, hm);
				}
				else if (strcmp(color, "red") == 0)
				{
					onGetRedCard(nc, hm);
				}
			}
		}
		else
		{
			mg_serve_http(nc, (struct http_message *)p, s_http_server_opts);
		}
	}
}

int main(void)
{
	struct mg_mgr mgr;
	struct mg_connection *nc;
	mg_mgr_init(&mgr, NULL);

	printf("Iniciando servidor web en puerto %s\n", s_http_port);
	nc = mg_bind(&mgr, s_http_port, ev_handler);
	if (nc == NULL)
	{
		printf("Failed to create listener\n");
		return 1;
	}

	// Set up HTTP server parameters
	mg_set_protocol_http_websocket(nc);

	s_http_server_opts.document_root = "www";
	s_http_server_opts.enable_directory_listing = "yes";

	for (;;)
	{
		mg_mgr_poll(&mgr, 1000);
	}

	mg_mgr_free(&mgr);

	return 0;
}
