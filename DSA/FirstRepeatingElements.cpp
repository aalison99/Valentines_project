#include <iostream>
#include <vector>
using namespace std;
int firstRepeated(vector<int> &arr) {
        int n = arr.size();
    // for(int i=0;i<n;i++){
    //     for(int j=i+1;j<n;j++){
    //         if(arr[i]==arr[j]){
    //             return i+1;
    //         }
    //     }
    // }
    unordered_map<int,int> hash;
    for(int i=0;i<n;i++){
        hash[arr[i]]++;
    }
    for(int j=0;j<n;j++){
        if(hash[arr[j]]>1){
            return j+1;
        }
    }
    return -1;
}
int main(){
    vector <int> arr={1,5,3,4,3,5,6};
    int answer = firstRepeated(arr);
    cout<<answer;
    return 0;
}