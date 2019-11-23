#include "Board.h"

int main(int argc, char const *argv[])
{
    char *json;
    unsigned int jsonSize = fetchBoard(&json);
    rapidjson::Document root;
    root.Parse(json);
    
    rapidjson::Value &casillas = root["casillas"];
    rapidjson::Value casillaNueva(casillas[0], root.GetAllocator());
    casillas.Erase(casillas.Begin());
    casillas.PushBack(casillaNueva, root.GetAllocator());

    // Enlaza con buffer y writer.
    rapidjson::StringBuffer buffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
    root.Accept(writer);
    printf("%s", buffer.GetString());
    return 0;
}
