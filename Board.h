#ifndef BOARD_H
#define BOARD_H

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

// Crea un tablero con el id de tablero especificado.
const char * generateBoard(const char *boardid);

// Obtiene el contenido json del archivo con la template del tablero.
unsigned int fetchBoardTemplate(char **jsonTemplate);

// Obtiene un tablero en específico.
unsigned int fetchBoard(char **jsonBoard, const char *filename);

// Actualiza el tablero en el archivo JSON.
void saveBoard(const char *jsonBoard, const char *filename);

// Agrega un jugador al tablero.
void addPlayer(rapidjson::Document &board, const char *name, bool isBot, const char *color);

// Encuentra un jugador en un tablero.
bool findPlayer(rapidjson::Document &board, const char *name);

// Pasa a cadena un tablero de tipo Document de rapidjson
const char * stringify(rapidjson::Document &board);

// Actualiza el tablero con el turno que corresponde.
// unsigned int updateTurn(char **jsonBoard);

#endif