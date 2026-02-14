#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX 20

char productions[MAX][MAX];
char firstSet[MAX];
int nProductions;
int idx;

void addToFirst(char c) {
    // Avoid duplicates
    for (int i = 0; i < idx; ++i)
        if (firstSet[i] == c)
            return;
    firstSet[idx++] = c;
}

void findFirst(char c) {
    if (!isupper(c)) {
        addToFirst(c);  
        return;
    }
    for (int i = 0; i < nProductions; ++i) {
        if (productions[i][0] == c) {
            // If production is like A->ε
            if (productions[i][3] == '$') {
                addToFirst('$');
            } else {
                int j = 3;
                while (productions[i][j] != '\0') {
                    char symbol = productions[i][j];
                    if (symbol != c) {
                        int oldIdx = idx;
                        findFirst(symbol);
                        // If the symbol doesn't produce epsilon, break
                        int foundEpsilon = 0;
                        for (int k = oldIdx; k < idx; ++k) {
                            if (firstSet[k] == '$') foundEpsilon = 1;
                        }
                        if (!foundEpsilon) break;
                        else j++; // Otherwise, continue with next symbol
                    } else {
                        // Avoid left recursion
                        break;
                    }
                }
            }
        }
    }
}

int main() {
    int i, choice;
    char c;
    printf("Enter number of productions: ");
    scanf("%d", &nProductions);
    printf("Enter productions (e.g., E->TD), epsilon as $:\n");
    for (i = 0; i < nProductions; i++)
        scanf("%s", productions[i]);
    do {
        printf("\nFind FIRST of non-terminal: ");
        scanf(" %c", &c);
        idx = 0;
        findFirst(c);
        printf("FIRST(%c) = { ", c);
        for (i = 0; i < idx; ++i) {
            if (firstSet[i] == '$')
                printf("epsilon ");
            else
                printf("%c ", firstSet[i]);
        }
        printf("}\n");
        printf("Find FIRST for another non-terminal? (1 = yes, 0 = no): ");
        scanf("%d", &choice);
    } while (choice == 1);
    return 0;
}
