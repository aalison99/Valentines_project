#include <iostream>
#include <math.h>
#include <limits.h>
using namespace std;
int RodCutting(int price[], int n, int dp[]){
    if(n <= 0)
        return 0;
    int q = INT_MIN;
    if (dp[n]!=-1)
        return dp[n];
    for(int i=1;i<=n;i++){
        q=max(q,price[i-1]+RodCutting(price,n-i,dp));
        dp[n]=q;
    }
    return q;
}
int main(){
    int n=10;
    int ans=0;
    int price[]={1,5,8,9,10,17,17,20,24,30};
    int dp[n+1];
    for(int i = 0; i<=n;i++){
        dp[i]=-1;
    }
    for(int i=0;i<n;i++){
        ans=RodCutting(price,n,dp);
    }
    cout<<ans;
    return 0;
}