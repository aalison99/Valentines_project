#include <iostream> 
#include <vector>
using namespace std;
vector<int> MoveNegNumbersToLeft(vector <int> &nums){
    int low=0,high=nums.size()-1;
    while(low<=high){
    if(nums[low]<0){
        low++;
    }
    else{ 
        if(nums[high]<0){
            swap(nums[low],nums[high]);
            low++;
            high--;
        }
        else{
            high--;
        }
    }
}
    return nums;
}
int main(){
    vector <int> nums = {1,-2,0,-1,-2,-1};
    MoveNegNumbersToLeft(nums);
    for(int i=0;i<nums.size();i++){
        cout<<nums[i]<<" ";
    }
}
