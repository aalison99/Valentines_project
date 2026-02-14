#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;
int MaxElementof2DArray(const vector <vector<int>> &arr,int rowSize,int colSize){
    int MaxElement=INT_MIN;
    for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            if(arr[i][j]>MaxElement)
            MaxElement=arr[i][j];
            }
    }
    return MaxElement;
}
int MinElementof2DArray(const vector <vector<int>> &arr,int rowSize,int colSize){
    int MinElement=INT_MAX;
    for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            if(arr[i][j]<MinElement)
            MinElement=arr[i][j];
            }
    }
    return MinElement;
}
void SumOfRowElement(const vector<vector<int>> &arr,int rowSize, int colSize){
    for(int i=0;i<rowSize;i++){
        int sum=0;
        for(int j=0;j<colSize;j++){
            sum+=arr[i][j];
        }
        cout<<sum<<endl;
    }
}
void SumOfColumnElement(const vector <vector<int>> &arr, int rowSize, int colSize){
    for(int i=0;i<colSize;i++){
        int sum=0;
        for(int j=0;j<rowSize;j++){
            sum+=arr[j][i];
        }
        cout<<sum<<endl;
    }
}
int SumOfDiagonalElement(const vector<vector<int>> &arr, int rowSize, int colSize){
    int sum = 0;
    for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            if(i==j)
            sum+=arr[i][j];
        }
    }
    return sum;
}
int SumOfReverseDiagonalElement(const vector<vector<int>> &arr, int rowSize, int colSize){
    int sum = 0;
    for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            if(i+j==rowSize-1)
            sum+=arr[i][j];
        }
    }
    return sum;
}
void TransposeOf2DArray(const vector<vector<int>> &arr, int rowSize, int colSize){
    //Transpose of 2D Array using Additonal Array
    vector<vector<int>> ans(3,vector<int>(3));
    for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            ans[i][j]=arr[j][i];
        }
    }

    //Transpose of 2DArray without using additional Array 
    // for(int i=0;i<rowSize;i++){
    //     for(int j=i;j<colSize;j++){
    //         swap(arr[i][j], arr[j][i]); //Doesnt work as vector is declared as a constant (idk this is a doubt)
    //     }
    // }
      for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            cout<<ans[i][j]<<" ";
        }
        cout<<endl;
    }
}
int main(){
    vector <vector <int>> arr = {{10,20,40},
                                 {40,50,60},
                                 {70,80,90}};
    // int MaxElement = MaxElementof2DArray(arr,arr.size(),arr[0].size());
    // cout<<MaxElement;
    // cout<<endl;
    // int MinElement = MinElementof2DArray(arr,arr.size(),arr[0].size());
    // cout<<MinElement;
    // SumOfColumnElement(arr,arr.size(),arr[0].size());
    // int DiagonalSum = SumOfDiagonalElement(arr, arr.size(), arr[0].size()); //Works for only square matrices
    // cout<<"Sum of Diagonal Elements of 2D Array is : "<<DiagonalSum<<endl;
    // int ReverseDiagonalSum = SumOfReverseDiagonalElement(arr,arr.size(),arr[0].size());
    // cout<<"Sum of Reverse Diagonal Elements of 2D Array is : "<<ReverseDiagonalSum<<endl;
    TransposeOf2DArray(arr, arr.size(), arr[0].size());
    return 0;
}