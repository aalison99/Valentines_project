#include <stdio.h>
#include <string.h>
#include <ctype.h>

int nfa_while(const char* str, int* out_len) {
    int state = 0;
    int i = 0;
    while (1) {
        char ch = str[i];
        switch (state) {
            case 0:
                if (ch == 'w') { state = 1; i++; }
                else return 0;
                break;
            case 1:
                if (ch == 'h') { state = 2; i++; }
                else return 0;
                break;
            case 2:
                if (ch == 'i') { state = 3; i++; }
                else return 0;
                break;
            case 3:
                if (ch == 'l') { state = 4; i++; }
                else return 0;
                break;
            case 4:
                if (ch == 'e') { state = 5; i++; }
                else return 0;
                break;
            case 5:
                // Accept if next char is not letter/digit/underscore (not part of a longer word)
                if (!isalnum(ch) && ch != '_') {
                    *out_len = i;
                    return 1; 
                } else {
                    return 0; 
                }
        }
    }
    return 0; 
}

int main() {
    char source[100];
    printf("Enter source code: ");
    fgets(source, sizeof(source), stdin);
    int i = 0, len, found;
    while (source[i] != '\0' && source[i] != '\n') {
        // Skip whitespace
        if (isspace(source[i])) { i++; continue; }
        found = nfa_while(&source[i], &len);
        if (found) {
            printf("<KEYWORD, while>\n");
            i += len;
            continue;
        }
        printf("<UNKNOWN, %c>\n", source[i]);
        i++;
    }
    return 0;
}
