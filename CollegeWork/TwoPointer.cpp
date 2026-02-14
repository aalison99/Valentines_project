#include <iostream>
using namespace std;
void PrintingUsingTwoPointers(int arr[],int size){
    int i=0,j=size-1;
    while(i<=j){
            if(i==j){
                cout<<arr[i];
                break;
            }
            else{
            cout<<arr[i]<<" ";
            cout<<arr[j]<<" ";
            i++;
            j--;
            }
      }
}
int main(){
    int size=7;
    int arr[]={10,20,30,40,50,60,70};
    PrintingUsingTwoPointers(arr,size);
    return 0;
}