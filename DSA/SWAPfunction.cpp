#include <iostream>
#include <algorithm>
using namespace std;
int main(){
    //4 Methods to swap a number
    int a=5;
    int b=6;
    //1st Method using temp variable 
    // int temp;
    // temp=a;
    // a=b;
    // b=temp;
    // cout<<"A = "<<a<<", B = "<<b<<endl;

    //2nd Method using +,-
//     a=a+b;
//     b=a-b;
//     a=a-b;
//    cout<<"A = "<<a<<", B = "<<b<<endl;
     
//    3rd Method using XOR 
//    5->101
// //    6->110
//    b=a^b;
//    a=a^b;
//    b=a^b;
//     cout<<"A = "<<a<<", B = "<<b<<endl;

//4th Method using Swap Function 
swap(a,b);
     cout<<"A = "<<a<<", B = "<<b<<endl;
   return 0; 
}