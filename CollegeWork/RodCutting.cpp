#include <iostream>
#include <math.h>
#include <limits.h>
using namespace std;
int RodCutting(int price[], int n){
    if(n <= 0)
        return 0;
    int q = INT_MIN;
    for(int i=1;i<=n;i++){
        q=max(q,price[i-1]+RodCutting(price,n-i));
    }
    return q;
}
int main(){
    int n=9;
    int ans=0;
    int price[]={1,5,8,9,10,17,17,20,24};
    for(int i=0;i<n;i++){
        ans=RodCutting(price,n);
    }
    cout<<ans;
    return 0;
}