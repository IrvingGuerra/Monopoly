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

// Obtiene la cadena JSON del tablero del archivo que lo contiene y retorna el tamaño de la misma.
unsigned int fetchBoard(char ** jsonBoard);

// Actualiza el tablero en el archivo JSON
void updateBoard(const char * jsonBoard, unsigned int boardSize);

// Actualiza el turno del tablero.
void *updateTurn(char * jsonBoard);

#endif