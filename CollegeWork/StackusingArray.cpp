#include <iostream>
using namespace std;
void Create(int &size, int *&stack){
    cout << "Enter size of stack: ";
    cin >> size;
    stack = new int[size];
}
void isEmpty(int top){
    if(top == -1)
        cout << "The Stack is Empty";
    else
        cout << "Stack is not Empty;";
        cout<<endl;
}
void Push(int size, int &top, int *stack){
    if(top==size)
    cout<<"Overflow";
    else{
    top++;
    cout << "Enter value to be inserted: ";
    cin >> stack[top];
    }
}
void Pop(int &top, int *stack){
    if(top==-1)
    cout<<"Underflow";
    else{
    cout << stack[top];
    top--;}
    cout<<endl;
}
void isFull(int size,int top){
    if(top == size - 1)
        cout << "Stack is full";
    else 
        cout << "Stack is not full";
    cout<<endl;
}
int main(){
    int size;
    int *stack;
    int top=-1;
    Create(size, stack);
    Push(size,top,stack);
    Push(size,top,stack);
    isFull(size,top);
    Pop(top, stack);
    Pop(top,stack);
    isEmpty(top);
    isFull(size,top);
    return 0;
}