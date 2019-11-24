#ifndef CARDS_H
#define CARDS_H

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/pointer.h"
#include "rapidjson/stringbuffer.h"

#define BLUE 0
#define RED 1

/**
 * Obtiene el arreglo de tarjetas del archivo json correspondiente en formato cadena.
 */
void fetchCards(char **jsonCards, const char *filename);

/**
 * Obtiene la plantilla de las cartas para generar una nueva.
 */
void fetchCardsTemplate(char **jsonCardsTemplate, int color);

/**
 * Guarda una cadena JSON que contiene las tarjetas en su archivo correspondiente.
 */
void saveCards(const char *jsonCards, const char *filename);

/**
 * Rota las cartas del color correspondiente y retorna la carta que fue enviada al final.
 */
const char *rollCards(const char *filename);

/**
 * Obtiene el nombre del archivo según el color y el id de juego.
 */
const char *getFileName(int color, const char *boardid);

/**
 * Se crean nuevas cartas de acuerdo al id de tablero.
 */
void generateCards(const char *boardid);

#endif