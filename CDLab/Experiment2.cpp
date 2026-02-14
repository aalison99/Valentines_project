#include <stdio.h>
#include <ctype.h>
#include <string.h>

// Function to recognize identifiers (variables)
int nfaIdentifier(const char *str, int *end) {
    int i = 0;
    if (isalpha(str[i]) || str[i] == '_') {  // Start state: must be letter or _
        i++;
        while (isalnum(str[i]) || str[i] == '_') {
            i++; 
        }
        *end = i;
        return 1; 
    }
    return 0;
}

// Function to recognize numbers 
int nfaNumber(const char *str, int *end) {
    int i = 0;
    if (isdigit(str[i])) {
        i++;
        while (isdigit(str[i])) { 
            i++;
        }
        *end = i;
        return 1; 
    }
    return 0;
}

int main() {
    char src[100];
    printf("Enter source code: ");
    fgets(src, sizeof(src), stdin);
    int len = strlen(src);
    if (src[len - 1] == '\n') src[len - 1] = '\0';

    int i = 0, end = 0;
    while (src[i] != '\0') {
        // Skip whitespace
        if (isspace(src[i])) {
            i++;
            continue;
        }
        // for identifier
        if (nfaIdentifier(&src[i], &end)) {
            printf("<id, %.*s>\n", end, &src[i]);
            i += end;
            continue;
        }
        // for number
        if (nfaNumber(&src[i], &end)) {
            printf("<num, %.*s>\n", end, &src[i]);
            i += end;
            continue;
        }
        // For other single characters 
        if (ispunct(src[i])) {
            printf("<SYM, %c>\n", src[i]);
            i++;
            continue;
        }
        // If nothing matches, skip
        i++;
    }
    return 0;
}
