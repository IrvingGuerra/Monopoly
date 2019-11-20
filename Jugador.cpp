#include "Jugador.h"
#include "string.h"

using namespace std; 

Jugador::Jugador(int id, char nombre[10], char color[6]){
	this->status = true;
	this->turnos = 0;
    this->id = id;
    strcpy(this->nombre, nombre);
    strcpy(this->color, color);
    this->casilla = 0; //Casilla 0 de salida
    this->vueltas = 0;
    this->saldo = 100000; //Inicia con 100,000
}
void Jugador::setStatus(bool status){
	this->status = status;
}
void Jugador::setTurnos(int turnos){
	this->turnos = turnos;
}
void Jugador::setCasilla(int casilla){
	this->casilla = casilla;
}
void Jugador::setVueltas(int vueltas){
	this->vueltas = vueltas;
}
void Jugador::setSaldo(int saldo){
	this->saldo += saldo;
}
void Jugador::insertPropiedad(Casilla &propiedad){
	//set<Casilla&>::iterator it = propiedades.begin(); 
	this->propiedades.insert(propiedad);
}
Jugador::~Jugador(){
    //delete[] datos;
}