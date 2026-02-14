#include <iostream>
using namespace std;
bool SearchingIn2DArray(int arr[][3],int rowSize,int colSize,int target){
        for(int rowIndex=0;rowIndex<rowSize;rowIndex++){
                for(int colIndex=0;colIndex<colSize;colIndex++)
            {
                if(arr[rowIndex][colIndex]==target)
                return true;
            }
        }
        return false;
}
int main(){
    int rowSize=3;
    int colSize=3;
    int arr[3][3];
    //Taking columnwise input
    for(int i=0;i<rowSize;i++){
        for(int j=0;j<colSize;j++){
            cin>>arr[j][i];
        }
    }
    cout<<endl;
    // int arr[3][3]={{10,20,30},
    //                 {40,50,60},
    //                 {70,80,90}};
    
    //ColumnWisePrinting
    // for(int rowIndex=0;rowIndex<rowSize;rowIndex++){
    //     for(int colIndex=0;colIndex<colSize;colIndex++){
    //         cout<<arr[colIndex][rowIndex]<<" ";
    //     }
    //     cout<<endl;
    // }
    //ReverseDiagonalElementsPrint
    //     for(int rowIndex=0;rowIndex<rowSize;rowIndex++){
    //         for(int colIndex=0;colIndex<colSize;colIndex++)
    //         {
    //             if(rowIndex+colIndex==2)
    //             cout<<arr[rowIndex][colIndex]<<" ";
    //         }
    //     cout<<endl;
    // }
        //     for(int rowIndex=0;rowIndex<rowSize;rowIndex++){
        //         for(int colIndex=0;colIndex<colSize;colIndex++)
        //     {
        //         cout<<arr[rowIndex][colIndex]<<" ";
        //     }
        //     cout<<endl;
        // }
        int target=30;
        bool ans = SearchingIn2DArray(arr,rowSize,colSize,target);
        cout<<ans;
    return 0;
}
  