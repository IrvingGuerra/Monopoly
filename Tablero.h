#ifndef TABLERO_H
#define TABLERO_H

#include "Casilla.h"
#include "Jugador.h"

class Tablero{
private:
	int idTablero;
    //Casilla casillas[26]; //Cantidad de casillas que existen
    //Jugador jugadores[4]; //4 jugadores como maximo
public:
    Tablero(int idTablero);
    ~Tablero();
};

#endif