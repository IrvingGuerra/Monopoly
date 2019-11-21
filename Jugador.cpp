#include "Jugador.h"

int Jugador::instances = 0;

Jugador::Jugador(char nombre[10], char color[6], bool esBot)
{
	id = ++Jugador::instances;
	strcpy(this->nombre, nombre);
	strcpy(this->color, color);
	this->esBot = esBot;
}

void Jugador::setCasilla(int casilla)
{
	this->casilla = casilla;
}

void Jugador::setVueltas(int vueltas)
{
	this->vueltas = vueltas;
}

void Jugador::setSaldo(int saldo)
{
	this->saldo += saldo;
}

void Jugador::setTurnosEnCastigo(int turnosEnCastigo)
{
	this->turnosEnCastigo = turnosEnCastigo;
}

int Jugador::getTurnosEnCastigo(void)
{
	return turnosEnCastigo;
}

int Jugador::getCasilla(void)
{
	return casilla;
}

int Jugador::getVueltas(void)
{
	return vueltas;
}

int Jugador::getSaldo(void)
{
	return saldo;
}

void Jugador::insertPropiedad(Casilla propiedad)
{
	this->propiedades.insert(propiedad);
}
/*
void Jugador::jugarTurno(Tablero t)
{
	// Juega un turno ya sea bot o humano.
}
*/
// Quizás no usaremos el destructor.
Jugador::~Jugador()
{
}