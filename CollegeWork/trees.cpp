#include <iostream>
using namespace std;
class Node{
    public:
    int data;
    Node* left;
    Node* right;
    Node(int val){
        this->data=val;
        left = NULL;
        right = NULL;
    }
};
Node* createTree(){
    int value;
    cout<<"Enter value to store in Node"<<endl;
    cin>>value;
    if(value==-1){
        return NULL;
    }
    else{
        Node* root = new Node(value);
        cout<<"Enter value for left node : "<<endl;
        root->left = createTree();
        cout<<"Enter value for right node : "<<endl;
        root->right = createTree();
        return root;
    }
}
void preOrderTraversal(Node* root){
    if(root==NULL){
        return;
    }
    //NLR
    //N
    cout<<root->data<<" ";
    //L
    preOrderTraversal(root->left);
    //R
    preOrderTraversal(root->right);
}
void inOrderTraversal(Node* root){
    if(root==NULL){
        return;
    }
    //LNR
    //L
    preOrderTraversal(root->left);
    //N
    cout<<root->data<<" ";
    //R
    preOrderTraversal(root->right);
}
void postOrderTraversal(Node* root){
    if(root==NULL){
        return;
    }
    //LRN
    postOrderTraversal(root->left);
    postOrderTraversal(root->right);
    cout<<root->data<<" ";
}
void levelOrderTraversal(Node* root){
    
}
int main(){
    Node* root;
    root=createTree();
    cout<<"Printing the node using Pre-Order traversal : "<<endl;
    preOrderTraversal(root);
    cout<<endl;
    cout<<"Printing value of nodes using Inorder traversal ; "<<endl;
    inOrderTraversal(root);
    cout<<endl;
    cout<<"Printing value of nodes using Post-Order traversal ; "<<endl;
    postOrderTraversal(root);
    cout<<endl;
    return 0;
}