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
unsigned int fetchCards(char **jsonRedCards, int color);

/**
 * Guarda una cadena JSON que contiene las tarjetas en su archivo correspondiente.
 */
void saveCards(const char *jsonBlueCards, unsigned int blueCardsSize, int color);

/**
 * Rota las cartas del color correspondiente y retorna la carta que fue enviada al final.
 */
const char *rollCards(int color);

#endif