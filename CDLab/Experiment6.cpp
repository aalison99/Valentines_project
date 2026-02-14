#include <stdio.h>
#include <string.h>
#define SIZE 100

int main() {
    char prod[SIZE], rules[SIZE][SIZE], rem[SIZE][SIZE];
    int n = 0, i, j = 0;
    char nt; // non-terminal

    printf("Enter production : ");
    scanf("%s", prod);
    nt = prod[0];
    char *rhs = strchr(prod, '>');
    if (!rhs) {
        printf("Invalid production.\n");
        return 1;
    }
    rhs++;

    int len = strlen(rhs);
    char temp[SIZE];
    for (i = 0; i <= len; i++) {
        if (rhs[i] != '|' && rhs[i] != '\0') {
            temp[j++] = rhs[i];
        } else {
            temp[j] = '\0';
            strcpy(rules[n++], temp);
            j = 0;
        }
    }

    // Find longest common starting sequence in all rules
    int minlen = strlen(rules[0]);
    for (i = 1; i < n; i++) {
        if ((int)strlen(rules[i]) < minlen)
            minlen = strlen(rules[i]);
    }
    int prelen = 0;
    for (j = 0; j < minlen; j++) {
        char ch = rules[0][j];
        int allsame = 1;
        for (i = 1; i < n; i++) {
            if (rules[i][j] != ch) {
                allsame = 0;
                break;
            }
        }
        if (allsame)
            prelen++;
        else
            break;
    }

    if (prelen == 0) {
        printf("No left factoring needed.\nProduction is: %s\n", prod);
        return 0;
    }

    for (i = 0; i < n; i++) {
        if ((int)strlen(rules[i]) == prelen)
            strcpy(rem[i], "\u03B5"); // Epsilon for empty remainder
        else
            strcpy(rem[i], rules[i] + prelen);
    }

    printf("\nGrammar after left factoring:\n");
    printf("%c -> ", nt);
    for (i = 0; i < n; i++) {
        if (i == 0) printf("%.*s%c'", prelen, rules[0], nt);
    }
    printf("\n%c' -> ", nt);
    for (i = 0; i < n; i++) {
        printf("%s", rem[i]);
        if (i != n - 1) printf(" | ");
    }
    printf("\n");
    return 0;
}
