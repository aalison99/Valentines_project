#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Function to simulate NFA for the 'while' keyword
typedef struct {
    int matched;
    int length;
} TokenResult;

TokenResult nfa_while(const char *str) {
    // Recognizes 'while' only if followed by non-alnum/_ or end
    if (strncmp(str, "while", 5) == 0 && !(isalnum(str[5]) || str[5] == '_')) {
        return (TokenResult){1, 5};
    }
    return (TokenResult){0, 0};
}

// Function to simulate NFA for identifiers
TokenResult nfa_identifier(const char *str) {
    int i = 0;
    if (isalpha(str[i]) || str[i] == '_') {
        i++;
        while (isalnum(str[i]) || str[i] == '_') i++;
        return (TokenResult){1, i};
    }
    return (TokenResult){0, 0};
}

// Function to simulate NFA for operators 
TokenResult nfa_arith(const char *str) {
    switch (str[0]) {
        case '+':
        case '-':
        case '*':
        case '/':
            return (TokenResult){1, 1};
        case '=':
            if (str[1] == '=') return (TokenResult){1, 2};
            else return (TokenResult){1, 1};
        case '>':
            if (str[1] == '=') return (TokenResult){1, 2};
            else return (TokenResult){1, 1};
        default:
            return (TokenResult){0, 0};
    }
}

int main() {
    char src[256];
    printf("Enter source code: ");
    fgets(src, sizeof(src), stdin);
    int i = 0, id_count = 1;
    while (src[i] != '\0' && src[i] != '\n') {
        while (isspace(src[i])) i++;
        if (src[i] == '\0' || src[i] == '\n') break;
        TokenResult res;

        // 1. Try keyword 'while'
        res = nfa_while(&src[i]);
        if (res.matched) {
            printf("<KEYWORD, while>\n");
            i += res.length;
            continue;
        }
        // 2. Try identifier
        res = nfa_identifier(&src[i]);
        if (res.matched) {
            printf("<%.*s, id%d>\n", res.length, &src[i], id_count++);
            i += res.length;
            continue;
        }
        // 3. Try arithmetic/relational operator
        res = nfa_arith(&src[i]);
        if (res.matched) {
            if (src[i] == '>' && src[i + 1] == '=')
                printf("<ARTH, >= >\n");
            else if (src[i] == '=' && src[i + 1] == '=')
                printf("<ARTH, == >\n");
            else
                printf("<ARTH, %.*s>\n", res.length, &src[i]);
            i += res.length;
            continue;
        }
        // 4. Delimiters/others
        if (ispunct(src[i])) {
            printf("<DELIM, %c>\n", src[i]);
            i++;
            continue;
        }
        // 5. Unknowns
        printf("<UNKNOWN, %c>\n", src[i]);
        i++;
    }
    return 0;
}
