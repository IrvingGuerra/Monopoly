#include "Board.h"

int main(int argc, char const *argv[])
{
    char * json;
    unsigned int jsonSize = fetchBoard(&json);
    jsonSize = updateTurn(&json);
    saveBoard(json, jsonSize);
    return 0;
}
