#include <iostream>
#include <algorithm>
using namespace std;
int main(){
    int arr[10];
    fill(arr,arr+5,5);
    fill(arr+5,arr+10,10);
    for(int i=0;i<10;i++){
        cout<<arr[i]<<endl;
    }
    return 0;
}