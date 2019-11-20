#ifndef TABLERO_H
#define TABLERO_H

#include <vector>

#include "Casilla.h"
#include "Jugador.h"

class Tablero{
private:
	int idTablero;
    std::vector<Casilla> casillas; // Cantidad de casillas que existen
    std::vector<Jugador> jugadores; // 4 jugadores como maximo
public:
    Tablero(int idTablero);
    void insertUsuario(Jugador j);
    char * getCasilla(int num);
    char * getJugador(int num);
    ~Tablero();
};

#endif