#include <iostream> 
#include <map>
#include <unordered_map>
using namespace std;
int main(){
    //Creation
    unordered_map<string, string> table;

    //insertion 
    table["in"]="India";
    table.insert(make_pair("en","England"));

    pair<string,string> p;
    p.first="br";
    p.second="brazil";
    table.insert(p);

    // //Iteration
    // unordered_map<string,string>::iterator it=table.begin();
    // while(it!=table.end()){
    //     pair<string,string> p = *it;
    //     cout<<p.first<<" "<<p.second<<endl;
    //     it++;
    // }

    // //***Find function 
    // if(table.find("in")!=table.end()){
    //     cout<<"Key is found";
    // }
    // else{
    //     cout<<"Key is not found";
    // }

    //*** Count function
    if(table.count("in")==0){
        cout<<"Key not found";
    }
    if(table.count("in")==1){
        cout<<"Key found";
    }

    //Accessing Elements
    // cout<<table.at("in")<<endl;

    // //Modification
    // //Updation using at
    // table.at("in")="Indonesia";
    // cout<<table.at("in")<<endl;

    // //2nd method 
    // table["in"]="Indiana";
    // cout<<table.at("in")<<endl;

    // cout<<table.size()<<endl;
    // table.clear();
    // cout<<table.size()<<endl;
    // if(table.empty()==true){
    //     cout<<"Map is empty"<<endl;
    // }
    // else {
    //     cout<<"Map is not empty";
    // }


    return 0;
}