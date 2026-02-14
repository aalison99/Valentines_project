#include <iostream>
#include <string>
using namespace std;
class NFA {
public:
    bool isAccepted(const string& input) {
        int state = 0; 

        for (char c : input) {
            state = transition(state, c);
            if (state == -1) {
                return false;
            }
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        return state == 5;
    }

private:
    int transition(int state, char c) {
        switch (state) {
            case 0: 
                if (c == 'w') return 1;
                break;
            case 1:
                if (c == 'h') return 2;
                break;
            case 2:
                if (c == 'i') return 3;
                break;
            case 3:
                if (c == 'l') return 4;
                break;
            case 4:
                if (c == 'e') return 5; 
                break;
            default:
                return -1; 
        }
        return -1;
    }
};

int main() {
    NFA nfa;
    string input;

    cout << "Enter a string to check if it contains the keyword 'while': ";
    cin >> input;

    if (nfa.isAccepted(input)) {
        cout << "The string contains the keyword 'while'." << endl;
    } else {
        cout << "The string does not contain the keyword 'while'." << endl;
    }
    return 0;
}