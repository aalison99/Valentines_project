#include <stdio.h>
#include <string.h>
#include <ctype.h>
#define MAX 10

char prod[MAX][10];      // Productions
char nonterms[MAX];      // List of non-terminals
int n;                   // Number of productions
char follow[MAX][MAX];   // FOLLOW sets for each non-terminal
int fsize[MAX];          // Number of entries in FOLLOW sets

// Add symbol to FOLLOW set (avoid duplicates)
void addFollow(int idx, char c) {
    for (int i = 0; i < fsize[idx]; i++) {
        if (follow[idx][i] == c) return;
    }
    follow[idx][fsize[idx]++] = c;
}

void findFollow(char target, int idx) {
    // Rule 1: START symbol gets $
    if (target == nonterms[0]) addFollow(idx, '$');
    for (int i = 0; i < n; i++) {
        char* rhs = strchr(prod[i], '=');
        if (!rhs) continue;
        rhs++;
        int len = strlen(rhs);
        for (int j = 0; j < len; j++) {
            if (rhs[j] == target) {
                // Case 1: followed by terminal
                if (rhs[j+1] && !isupper(rhs[j+1]) && rhs[j+1] != '#') {
                    addFollow(idx, rhs[j+1]);
                }
                // Case 2: at end or followed by non-terminal/epsilon
                else if (!rhs[j+1] || rhs[j+1] == '#') {
                    if (prod[i][0] != target) {
                        int lhs = -1;
                        for (int k = 0; k < n; k++)
                            if (nonterms[k] == prod[i][0]) lhs = k;
                        if (lhs >= 0) findFollow(prod[i][0], idx);
                    }
                }
                // Case 3: followed by non-terminal 
                else if (isupper(rhs[j+1])) {
                    // add first terminal in that non-terminal's production
                    for (int pi = 0; pi < n; pi++) {
                        if (prod[pi][0] == rhs[j+1]) {
                            char* r2 = strchr(prod[pi], '=');
                            if (!r2) continue;
                            r2++;
                            if (!isupper(r2[0]) && r2[0] != '#') {
                                addFollow(idx, r2[0]);
                            }
                            if (r2[0] == '#') {
                                if (prod[i][0] != target) {
                                    int lhs = -1;
                                    for (int k = 0; k < n; k++)
                                        if (nonterms[k] == prod[i][0]) lhs = k;
                                    if (lhs >= 0) findFollow(prod[i][0], idx);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

int main() {
    int i, j, ntcount = 0;
    char ch;
    printf("Enter number of productions:\n");
    scanf("%d", &n);
    printf("Enter productions (e.g. E=TD, D=+TD, T=i, use # for epsilon):\n");
    for (i = 0; i < n; i++) {
        scanf("%s", prod[i]);
        // non-terminals
        ch = prod[i][0];
        int exist = 0;
        for (j = 0; j < ntcount; j++)
            if (nonterms[j] == ch) exist = 1;
        if (!exist) nonterms[ntcount++] = ch;
    }
    // Calculate FOLLOW for all non-terminals
    for (i = 0; i < ntcount; i++) {
        fsize[i] = 0;
        findFollow(nonterms[i], i);
    }

    printf("\nFOLLOW sets:\n");
    for (i = 0; i < ntcount; i++) {
        printf("FOLLOW(%c) = { ", nonterms[i]);
        for (j = 0; j < fsize[i]; j++) printf("%c ", follow[i][j]);
        printf("}\n");
    }
    return 0;
}
