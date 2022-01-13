#include <iostream>
#include <math.h>
using namespace std;

int main(int argc, char const *argv[])
{
    int n;    // number of square roots
    double x; // value
    cin >> n >> x;
    if (n < 1 || x <= 0)
    {
        cout << "ERROR";
        return 0;
    }

    if (n == 1)
    {
        cout << sqrt(x);
        return 0;
    }

    double tmp = sqrt(x);
    while (n-- > 1)
    {
        tmp = sqrt(tmp * x);
    }

    cout << tmp;
    return 0;
}