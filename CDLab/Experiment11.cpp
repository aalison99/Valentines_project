#include <stdio.h>
#include <string.h>

void generate_TAC(const char* expr) {
    char lhs, op1, op2, x, y, z;
    if (strlen(expr) == 7 && expr[1] == '=' &&
       ((expr[3] == '+' || expr[3] == '-' || expr[3] == '*' || expr[3] == '/')) &&
       ((expr[5] == '+' || expr[5] == '-' || expr[5] == '*' || expr[5] == '/'))) {
        lhs = expr[0]; x = expr[2]; op1 = expr[3]; y = expr[4]; op2 = expr[5]; z = expr[6];
        // If op2 is * or /, handle it first
        if (op2 == '*' || op2 == '/') {
            printf("t1 = %c %c %c\n", y, op2, z);
            printf("t2 = %c %c t1\n", x, op1, lhs == x ? 't1' : x); // a = b + t1
            printf("%c = t2\n", lhs);
        } else if (op1 == '*' || op1 == '/') {
            // Left op is higher precedence, e.g. a = b * c + d
            printf("t1 = %c %c %c\n", x, op1, y);
            printf("t2 = t1 %c %c\n", op2, z);
            printf("%c = t2\n", lhs);
        } else {
            // Both are + or -: left to right
            printf("t1 = %c %c %c\n", x, op1, y);
            printf("t2 = t1 %c %c\n", op2, z);
            printf("%c = t2\n", lhs);
        }
    } else if (strlen(expr) == 5 && expr[1] == '=' &&
        (expr[3] == '+' || expr[3] == '-' || expr[3] == '*' || expr[3] == '/')) {
        lhs = expr[0]; x = expr[2]; op1 = expr[3]; y = expr[4];
        printf("t1 = %c %c %c\n", x, op1, y);
        printf("%c = t1\n", lhs);
    } else {
        printf("Unsupported format. Try: a=b+c*d, a=b*c+d, a=b+c+d, a=b*d/e, or a=b+c\n");
    }
}

int main() {
    char input[100];
    printf("Enter an expression (like a=b+c*d, a=b*c+d, a=b+c+d, etc.): ");
    scanf("%s", input);
    generate_TAC(input);
    return 0;
}
