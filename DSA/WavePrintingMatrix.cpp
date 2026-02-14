#include <iostream>
#include <vector>
using namespace std;
int WavePrintingOfMatrix(vector<vector<int>> matrix){
    int rowSize=matrix.size();
    int colSize=matrix[0].size();
    for(int startCol=0;startCol<colSize;startCol++){
        if((startCol&1)==0){
            //even number of columns
            for(int i=0;i<rowSize;i++){
                cout<<matrix[i][startCol]<<" ";
            }
        }
        else{
            //odd number of columns
            for(int j=rowSize-1;j>=0;j--){
                cout<<matrix[j][startCol]<<" ";
            }
        }
    }
    return 0;
}
int main(){
    vector<vector<int>> matrix ={{1,2,3,4},
                                {5,6,7,8},
                                {9,10,11,12}};
    WavePrintingOfMatrix(matrix);
    return 0;
}