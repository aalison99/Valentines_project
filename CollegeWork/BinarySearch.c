#include <stdio.h>
#include <stdbool.h>
bool BinarySearch(int arr[],int n, int value){
    int l=0,r=n-1;
    while(l<r){
        int mid=(l+r)/2;
        if(value==arr[mid]){
            return true;
        }
        if(value<arr[mid]){
            r=mid-1;
        }
        if(value>arr[mid]){
            l=mid+1;
        }
        return false;
    }
    return false;
}
int main(){
    int arr[5]={1,2,3,4,5};
    if(BinarySearch(arr, 5, 6)){
        printf("Yes");
    }
    else{
        printf("No");
    }
    return 0;
    }