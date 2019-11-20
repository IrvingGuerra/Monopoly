#include "Tablero.h"
#include "string.h"

Tablero::Tablero(int idTablero){
	this->idTablero = idTablero;
	//Creamos las 26 Casillas
	casillas.reserve(26);
	casillas.push_back(Casilla(0, "Salida"));
	casillas.push_back(Casilla(1, "Salida"));
	casillas.push_back(Casilla(2, "Salida"));
	casillas.push_back(Casilla(3, "Salida"));
	casillas.push_back(Casilla(4, "Salida"));
	casillas.push_back(Casilla(5, "Salida"));
	casillas.push_back(Casilla(6, "Salida"));
	casillas.push_back(Casilla(7, "Salida"));
	casillas.push_back(Casilla(8, "Salida"));
	casillas.push_back(Casilla(9, "Salida"));
	casillas.push_back(Casilla(11, "Salida"));
	casillas.push_back(Casilla(12, "Salida"));
	casillas.push_back(Casilla(13, "Salida"));
	casillas.push_back(Casilla(14, "Salida"));
	casillas.push_back(Casilla(15, "Salida"));
	casillas.push_back(Casilla(16, "Salida"));
	casillas.push_back(Casilla(17, "Salida"));
	casillas.push_back(Casilla(18, "Salida"));
	casillas.push_back(Casilla(19, "Salida"));
	casillas.push_back(Casilla(20, "Salida"));
	casillas.push_back(Casilla(21, "Salida"));
	casillas.push_back(Casilla(22, "Salida"));
	casillas.push_back(Casilla(23, "Salida"));
	casillas.push_back(Casilla(24, "Salida"));
	casillas.push_back(Casilla(25, "Salida"));
}


Tablero::~Tablero(){
    //delete[] datos;
}