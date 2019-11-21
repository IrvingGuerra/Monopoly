#include "Tablero.h"
#include "string.h"

Tablero::Tablero(int idTablero){
	this->idTablero = idTablero;
	//Creamos las 26 Casillas
	casillas.reserve(26);
	//Reservamos 4 usuarios
	jugadores.reserve(4);
}

void Tablero::insertUsuario(Jugador j){
    jugadores.push_back(j);
}

int Tablero::getTurno(){
    return this->turno;
}

void Tablero::updateTurno(){
	int size = jugadores.size();
	turno++;
	if (turno>size){
		turno = 1;
	}
}

char * Tablero::getCasilla(int num){
    // char *casilla = (char *) calloc(20,sizeof(char));
    // sprintf(casilla, "%d|%d|%d|%d|%d|%s|%s", casillas[num].getNumero(),casillas[num].getType(),casillas[num].getStatus(),casillas[num].getCantidad(),casillas[num].getPropietario(),casillas[num].getNombre(),casillas[num].getColor());
    // return casilla;
}

Tablero::~Tablero(){
    //delete[] datos;
}