#include <stdio.h>
#include <string.h>
#define SIZE 100

int main() {
    char prod[SIZE], left[SIZE][SIZE], right[SIZE][SIZE];
    int nleft = 0, nright = 0;
    char nt;

    printf("Enter production (e.g. E->E+T|T): ");
    scanf("%s", prod);
    nt = prod[0];
    char *rhs = strchr(prod, '>');
    if (!rhs) {
        printf("Invalid production.\n");
        return 1;
    }
    rhs++;

    // Split rules by '|'
    char temp[SIZE];
    int i, j = 0, len = strlen(rhs);
    for (i = 0; i <= len; i++) {
        if (rhs[i] != '|' && rhs[i] != '\0') {
            temp[j++] = rhs[i];
        } else {
            temp[j] = '\0';
            if (temp[0] == nt) {
                // left-recursive
                strcpy(left[nleft++], temp + 1); // skip 'E' from 'E+T'
            } else {
                strcpy(right[nright++], temp);
            }
            j = 0;
        }
    }

    if (nleft == 0) {
        printf("No Left Recursion detected.\nProduction is: %s\n", prod);
        return 0;
    }

    printf("\nThe grammar after eliminating left recursion:\n");
    for (i = 0; i < nright; i++) {
        printf("%c -> %s%c'\n", nt, right[i], nt);
    }
    printf("%c' -> ", nt);
    for (i = 0; i < nleft; i++) {
        printf("%s%c'", left[i], nt);
        if (i != nleft - 1) printf(" | ");
    }
    printf(" | ε\n"); 
    return 0;
}
