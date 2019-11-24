//#include "Board.h"
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/pointer.h"
#include "rapidjson/stringbuffer.h"

//#include "mongoose.h"

using namespace rapidjson;

int main(int argc, char const *argv[])
{
    Document document;
    Value author;
    author.SetObject();
    author.AddMember("a", "done", document.GetAllocator());
    printf("%d\n", author["a"].GetStringLength());

    return 0;
}
