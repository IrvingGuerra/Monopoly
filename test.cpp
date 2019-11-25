//#include "Board.h"
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/pointer.h"
#include "rapidjson/stringbuffer.h"

//#include "mongoose.h"

#include <iostream>

using namespace rapidjson;

int main(int argc, char const *argv[])
{

    char C[5] = {'1', '2', '^', 2, 4};
    std::string body = C;
    int hat = body.find('^');
    printf("hat: %d\n", hat);
    const char *cpy = body.substr(0, hat).c_str();
    printf("limpio: %s\n", cpy);

    return 0;
}
