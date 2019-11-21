#include "Casilla.h"

#include <cstdlib>
#include <cstdio>
#include <cstring>

Casilla::Casilla(int numero, char *type, int cantidad,char nombre[10], char color[6])
{
	this->numero = numero;
	// this->type = type;
	// this->status = false;
	// this->cantidad = cantidad;
	strcpy(this->nombre, nombre);
	strcpy(this->color, color);
}
// void Casilla::setTipo(int type)
// {
// 	this->type = type;
// }
// void Casilla::setStatus(bool status)
// {
// 	this->status = status;
// }
// void Casilla::setCantidad(int cantidad)
// {
// 	this->cantidad = cantidad;
// }
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

// int Casilla::getType()
// {
// 	return this->type;
// }
// bool Casilla::getStatus()
// {
// 	return this->status;
// }
// int Casilla::getCantidad()
// {
// 	return this->cantidad;
// }
int Casilla::getPropietario()
{
	return this->propietario;
}
char* Casilla::getNombre()
{
	char *nombre = (char *) calloc(10,sizeof(char));
    sprintf(nombre, "%s", this->nombre);
    return nombre;
}
char* Casilla::getColor()
{
	char *color = (char *) calloc(10,sizeof(char));
    sprintf(color, "%s", this->color);
    return color;
}


int Casilla::getNumero() const
{
	return numero;
}

Casilla::~Casilla()
{
	//delete[] datos;
}
