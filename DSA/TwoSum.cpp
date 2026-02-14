#include<iostream>
using namespace std;
void sort0sand1s(int input[], int size){
	int nextZero = 0;
	for(int i=0; i<size; i++){
		if(input[i] == 0){
			int temp = input[nextZero];
			input[nextZero] = input[i];
			input[i] = temp;
            nextZero++;
		}
	}
}
int main(){
    int arr[6]={1,0,0,1,1,0};
    int n=6;
    sort0sand1s(arr,n);
    for(int i=0;i<n;i++){
        cout<<arr[i];
    }
return 0;
}