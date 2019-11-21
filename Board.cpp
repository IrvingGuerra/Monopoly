#include "Board.h"

unsigned int fetchBoard(char **jsonBoard)
{
    // Se abre el archivo.
    int fd = open("tablero.json", O_RDONLY);
    if (fd == -1)
    {
        perror("Error al abrir archivo.");
        exit(EXIT_FAILURE);
    }

    // Se obtiene longitud del archivo.
    struct stat data;
    int res = fstat(fd, &data);
    if (res == -1)
    {
        perror("Error al obtener metadatos del archivo.");
        close(fd);
        exit(EXIT_FAILURE);
    }
    unsigned int boardSize = data.st_size;

    // Se lee el archivo
    *jsonBoard = new char[boardSize];
    int bytesRead = read(fd, (void *)*jsonBoard, boardSize);
    if (bytesRead == -1)
    {
        perror("Error en lectura de archivo.");
        close(fd);
        exit(EXIT_FAILURE);
    }

    // Se cierra el archivo.
    close(fd);

    return boardSize;
}

void updateBoard(const char *jsonBoard, unsigned int boardSize)
{
    // Se abre el archivo.
    int fd = open("registros.data", O_CREAT | O_WRONLY | O_TRUNC | O_APPEND, S_IRUSR | S_IWUSR);
    if (fd == -1)
    {
        perror("Error al abrir el archivo.\n");
        exit(EXIT_FAILURE);
    }

    // Se escribe el archivo.
    int res = write(fd, jsonBoard, boardSize);
    if (res == -1)
    {
        perror("Error al escribir el archivo.\n");
        exit(EXIT_FAILURE);
    }
    fsync(fd);

    // Se cierra el archivo.
    close(fd);
}
