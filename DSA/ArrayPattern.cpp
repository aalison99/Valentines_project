#include <iostream>
using namespace std;
int main(){
    int array[]={10,20,30,40,50};
    int count=0;
    for (int i=0; i<5;i++){
        for(int j=i; j<5;j++){
            cout<<array[i]<<", "<<array[j]<<endl;
            count++;
    }
}
cout<<count;
   return 0;
}