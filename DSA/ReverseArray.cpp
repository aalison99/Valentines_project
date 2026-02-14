#include <iostream>
#include <algorithm>
using namespace std;
int main(){
    //Reverse an Array
    int arr[5]={1,2,3,4,5};
    //Using inbuilt function 
    // reverse(arr,arr+5);

    //Using 2 pointer approach
    int l=0;
    int r=4;
    while(l<r)
    swap(arr[l++],arr[r--]);
    //Bakchodi with pointers : 
    // int *l=arr;
    // int *h=arr+4;
    // while(l<h){
    //     swap(*l, *h);
    //     l++;
    //     h--;
    // }
    for(int i=0;i<5;i++){
        cout<<arr[i]<<" ";
    }
    return 0;
}