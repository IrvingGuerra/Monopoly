#ifndef TABLERO_H
#define TABLERO_H

#include "Casilla.h"

class Tablero{
private:
    Casilla casillas[26]; //Cantidad de casillas que existen
public:
    Tablero();
    ~Tablero();
};

#endif