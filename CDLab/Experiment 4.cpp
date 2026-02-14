#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main() {
    char src[] = "while (ab>=a1+b1)";
    int i = 0;
    printf("Source code: %s\n", src);
    printf("Tokens:\n");
    while (src[i] != '\0') {
        // Skip whitespace
        if (isspace(src[i])) {
            i++;
            continue;
        }
        // Check for keyword while
        if (strncmp(&src[i], "while", 5) == 0) {
            printf("KEYWORD : while\n");
            i += 5;
            continue;
        }
        // Check for delimiters and operators
        if (src[i] == '(') {
            printf("DELIMITER : (\n"); i++; continue;
        } else if (src[i] == ')') {
            printf("DELIMITER : )\n"); i++; continue;
        } else if (src[i] == '>') {
            if (src[i+1] == '=') {
                printf("OPERATOR : >=\n"); i += 2; continue;
            } else {
                printf("OPERATOR : >\n"); i++; continue;
            }
        } else if (src[i] == '+') {
            printf("OPERATOR : +\n"); i++; continue;
        }
        // Identifiers and numbers
        if (isalpha(src[i])) {
            char buffer[20]; int j = 0;
            while (isalnum(src[i])) buffer[j++] = src[i++];
            buffer[j] = '\0';
            printf("IDENTIFIER : %s\n", buffer);
            continue;
        }
        // Unrecognized character
        printf("UNKNOWN : %c\n", src[i]);
        i++;
    }
    return 0;
}
