#include <stdio.h>
#include <string.h>

#define NTERM 4   
#define TERM 6    

char nonTerminals[NTERM][5] = {"E", "X", "T", "Y"};
char terminals[TERM][5] = {"+", "*", "(", ")", "id", "$"};

char productions[8][15] = {
    "E->TX",   // 0
    "X->+TX",  // 1
    "X->e",    // 2 (e = epsilon)
    "T->FY",   // 3
    "Y->*FY",  // 4
    "Y->e",    // 5
    "F->(E)",  // 6
    "F->id"    // 7
};

char FIRST[NTERM][2][5] = { {"id", "("}, 
                            {"+", "e"}, 
                            {"id", "("}, 
                            {"*", "e"} };
char FOLLOW[NTERM][3][5] = { {")", "$", ""}, 
                             {")", "$", ""}, 
                             {"+", ")", "$"}, 
                             {"+", ")", "$"} };

// Parsing table 
char table[NTERM][TERM][15];

int main() {
    // Clear table
    for(int i=0; i<NTERM; i++)
        for(int j=0; j<TERM; j++)
            strcpy(table[i][j], "");

    // Table filling
    for(int p=0; p<8; p++) {
        char lhs = productions[p][0];   
        char rhs[10]; strcpy(rhs, productions[p] + 3);
        int lhsIdx = -1;
        for(int i=0; i<NTERM; i++) if(nonTerminals[i][0]==lhs) lhsIdx = i;

        // If FIRST(rhs) contains a terminal, add rule for that terminal
        int hasEpsilon = 0;
        for(int i=0; FIRST[lhsIdx][i][0]!='\0'; i++) {
            if(strcmp(FIRST[lhsIdx][i],"e")==0) hasEpsilon = 1;
            else
                for(int j=0; j<TERM; j++)
                    if(strcmp(terminals[j],FIRST[lhsIdx][i])==0)
                        strcpy(table[lhsIdx][j], productions[p]);
        }
        // If FIRST contains epsilon, fill entries for FOLLOW(lhs)
        if(hasEpsilon)
            for(int i=0; FOLLOW[lhsIdx][i][0]!='\0'; i++)
                for(int j=0; j<TERM; j++)
                    if(strcmp(terminals[j],FOLLOW[lhsIdx][i])==0)
                        strcpy(table[lhsIdx][j], productions[p]);
    }

    printf("\nLL(1) Parsing Table:\n\t");
    for(int j=0; j<TERM; j++) printf("%s\t", terminals[j]);
    printf("\n");
    for(int i=0; i<NTERM; i++) {
        printf("%s\t", nonTerminals[i]);
        for(int j=0; j<TERM; j++)
            printf("%s\t", table[i][j]);
        printf("\n");
    }

    return 0;
}
