#include <iostream> 
using namespace std; 
int MissingElementFromArraywithDuplicates(int nums[], int n){
    //Approach 1 (Visited/Unvisited)
    // for(int i=0;i<n;i++){
    //     int index=abs(nums[i]);
    //     if(nums[index-1]>0){
    //     nums[index-1]*=-1;
    //     }
    // }
    // for(int j=0;j<n;j++){
    //     if(nums[j]>0){
    //         return j+1;
    //     }
    // }
    // return -1;

    //Approach 2 (Sorting by Swapping)
    int i=0;
    while(i<n){
        int index = nums[i]-1;
        if(nums[i]!=nums[index]){
        swap(nums[i],nums[index]);
        }
        else{
            i++;
        }
    }
        for(int i=0;i<n;i++){
        if(nums[i]!=i+1){
            return i+1;
        }
    }
    return -1;
}

int main(){
    int nums[5] = {1,3,5,3,4};
    int n = sizeof(nums)/sizeof(int);
    int answer = MissingElementFromArraywithDuplicates(nums, n);
    cout<<answer;
    return 0;
}