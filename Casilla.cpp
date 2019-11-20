#include "Casilla.h"
#include "string.h"

Casilla::Casilla(int numero, char nombre[10])
{
	this->numero = numero;
	this->type = 1; //Casilla vacia por defecto
	this->status = false;
	this->cantidad = 200;
	strcpy(this->nombre, nombre);
	strcpy(this->color, "FFFFFF");
}
void Casilla::setType(int type)
{
	this->type = type;
}
void Casilla::setStatus(bool status)
{
	this->status = status;
}
void Casilla::setCantidad(int cantidad)
{
	this->cantidad = cantidad;
}
void Casilla::setPropietario(int propietario)
{
	this->propietario = propietario;
}
void Casilla::setNombre(char nombre[10])
{
	strcpy(this->nombre, nombre);
}
void Casilla::setColor(char color[6])
{
	strcpy(this->color, color);
}

int Casilla::getNumero() const
{
	return numero;
}

Casilla::~Casilla()
{
	//delete[] datos;
}
