#include <iostream> 
using namespace std;
void ArrayShifting(int array[], int size, int n){
    int arr[10000];
        n=n%size;
        if(n==0){
            for(int i=0;i<size;i++)
                cout<<array[i]<<endl;
        }
        int index=0;
        for(int j=size-n;j<size;j++){
            arr[index]=array[j];
            index++;
        }
        for(int k=0;k<size-n;k++)
            arr[k+n]=array[k];

        for(int l=0;l<size;l++)
            array[l]=arr[l];

    for(int i=0;i<size;i++)
        cout<<array[i]<<endl;

}
int main(){
    int array[10]={10,20,30,40,50,60,70,80,90,100};
    int ShiftElements=2;
    int size=10;
    ArrayShifting(array, size, ShiftElements);
    return 0;
}