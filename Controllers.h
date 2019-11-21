#ifndef CONTROLLERS_H
#define CONTROLLERS_H

#include "mongoose.h"
#include "Board.h"
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
 * Se encarga de enviar una tarjeta al cliente que haga la peticion GET en /card.
 * Se debe ajustar la baraja afectada para una siguiente llamada
 */
void onGetCard(struct mg_connection *nc, struct http_message *hm);

#endif