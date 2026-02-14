#include <iostream>
#include <algorithm>
using namespace std;
void DNFSorting(int arr[],int size){
    int l=0,mid=0,h=size-1;
     while(mid<=h){
        if(arr[mid]==0){
            swap(arr[l],arr[mid]);
            l++;
            mid++;
        }
        else if(arr[mid]==1)
        mid++;
        else{
            swap(arr[mid],arr[h]);
            h--;
        }
     }
}
int main(){
    int array[10]={2,0,0,1,1,2,1,2,0,1};
    int size=10;
    DNFSorting(array,size);
    for(int i=0;i<size;i++)
        cout<<array[i]<<" ";
    return 0;
}