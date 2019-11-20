#include "Casilla.h"
#include "string.h"

Casilla::Casilla(int numero, int type, int cantidad,char nombre[10], char color[6])
{
	this->numero = numero;
	this->type = type;
	this->status = false;
	this->cantidad = cantidad;
	strcpy(this->nombre, nombre);
	strcpy(this->color, color);
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
