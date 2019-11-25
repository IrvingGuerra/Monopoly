#ifndef CONTROLLERS_H
#define CONTROLLERS_H

#include "mongoose.h"

#include <iostream>

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/pointer.h"
#include "rapidjson/stringbuffer.h"

#include "Board.h"
#include "Cards.h"

/**
 * Inicia un juego. Crea y manda el tablero por primera vez.
 * No inicia el juego hasta que todos los jugadores se hallan unido.
 */
void onGetGame(struct mg_connection *nc, struct http_message *hm);

/**
 * Se encarga de enviar el tablero al cliente que haga la peticion GET en /board
 */
void onGetBoard(struct mg_connection *nc, struct http_message *hm);

/**
 * Se encarga de guardar el tablero del cliente que haga la peticion POST en /board,
 * y tenerlo listo en memoria para mandarlo.
 */
void onPostBoard(struct mg_connection *nc, struct http_message *hm);

/**
 * Envia una carta del montón correspondiente y la desplaza al final localmente.
 */
void onGetCard(struct mg_connection *nc, struct http_message *hm);

/**
 * Se encarga de enviar una respuesta de éxito.
 */
void sendSuccess(struct mg_connection *nc);

/**
 * Se encarga de enviar una respuesta de error.
 */
void sendError(struct mg_connection *nc);

#endif