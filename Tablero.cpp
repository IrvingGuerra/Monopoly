#include "Tablero.h"
#include "string.h"

Tablero::Tablero(int idTablero){
	this->idTablero = idTablero;
	//Creamos las 26 Casillas
	casillas.reserve(26);

	//1 = Casilla Vacia, 2 = Propiedad, 3 = Carta roja, 4 = Carta Azul, 5 = Carcel, 6 = Salida

	//numero , tipo, cantidad, nombre y color
	casillas.push_back(Casilla(0,6,1000, (char *)"SALIDA", (char *)"FFFFFF"));
	casillas.push_back(Casilla(1,2,20000, (char *)"TORNIQUETES CAFE", (char *)"8449A3"));
	casillas.push_back(Casilla(2,3,0, (char *)"CARTA ROJA", (char *)"D50E0E"));
	casillas.push_back(Casilla(3,1,0, (char *)"VACIA", (char *)"FFFFFF"));

	casillas.push_back(Casilla(4,2,80000, (char *)"CAFETERIA", (char *)"3953BB"));
	casillas.push_back(Casilla(5,2,40000, (char *)"CAFETERIA SILLAS", (char *)"3953BB"));
	
	casillas.push_back(Casilla(6,1,0, (char *)"VACIA", (char *)"FFFFFF"));
	casillas.push_back(Casilla(7,4,0, (char *)"CARTA AZUL", (char *)"3953BB"));
	casillas.push_back(Casilla(8,1,0, (char *)"VACIA", (char *)"FFFFFF"));

	casillas.push_back(Casilla(9,2,40000, (char *)"BAÑOS MUJERES", (char *)"D50E0E"));
	casillas.push_back(Casilla(10,2,40000, (char *)"BAÑOS HOMBRES", (char *)"D50E0E"));

	casillas.push_back(Casilla(11,1,0, (char *)"VACIA", (char *)"FFFFFF"));

	casillas.push_back(Casilla(12,2,60000, (char *)"PAPELERIA", (char *)"27902C"));

	casillas.push_back(Casilla(13,5,5000, (char *)"CARCEL", (char *)"FFFFFF"));
	casillas.push_back(Casilla(14,3,0, (char *)"CARTA ROJA", (char *)"D50E0E"));

	casillas.push_back(Casilla(15,2,50000, (char *)"CAFETERIA", (char *)"3953BB"));

}


Tablero::~Tablero(){
    //delete[] datos;
}