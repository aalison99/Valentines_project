#include <stdio.h>
#include <string.h>

#define STACK_SIZE 100
#define INPUT_SIZE 100

typedef enum { S, E, EP, T, ID, EQ, PLUS, DOLLAR, NONE } Symbol;

const char *symbol_names[] = { "S", "E", "E'", "T", "id", "=", "+", "$", "NONE" };

// Convert input token to Symbol
Symbol get_symbol(const char *token) {
    if (strcmp(token, "id") == 0) return ID;
    if (strcmp(token, "=") == 0)  return EQ;
    if (strcmp(token, "+") == 0)  return PLUS;
    if (strcmp(token, "$") == 0)  return DOLLAR;
    return NONE;
}

// Production rules
int get_production(Symbol non_terminal, Symbol lookahead, Symbol *result) {
    // S -> id = E
    if (non_terminal == S && lookahead == ID) {
        result[0] = ID; result[1] = EQ; result[2] = E; return 3;
    }
    // E -> T E'
    if (non_terminal == E && (lookahead == ID)) {
        result[0] = T; result[1] = EP; return 2;
    }
    // E' -> + T E'
    if (non_terminal == EP && lookahead == PLUS) {
        result[0] = PLUS; result[1] = T; result[2] = EP; return 3;
    }
    // E' -> ε
    if (non_terminal == EP && (lookahead == DOLLAR || lookahead == NONE)) {
        // ε: do not push anything
        return 0;
    }
    // T -> id
    if (non_terminal == T && lookahead == ID) {
        result[0] = ID; return 1;
    }
    return -1; // Error
}

void print_stack(Symbol *stack, int top) {
    for (int i = top; i >= 0; i--) {
        printf("%s ", symbol_names[stack[i]]);
    }
}

void print_input(char input[][10], int pos, int len) {
    for (int i = pos; i < len; i++) {
        printf("%s ", input[i]);
    }
}

int main() {
    char input[INPUT_SIZE][10] = { "id", "=", "id", "+", "id", "$" };
    int input_len = 6;
    int input_pos = 0;

    Symbol stack[STACK_SIZE];
    int top = 0;
    stack[top] = DOLLAR; stack[++top] = S;

    printf("| Stack        | Input         | Action         |\n");
    printf("|--------------|--------------|----------------|\n");

    while (top >= 0) {
        // Print stack and input
        printf("| ");
        print_stack(stack, top);
        int pad = 13 - (top + 1) * 3;
        while (pad-- > 0) printf(" ");
        printf("| ");
        print_input(input, input_pos, input_len);
        pad = 14 - (input_len - input_pos) * 3;
        while (pad-- > 0) printf(" ");
        
        Symbol stack_top = stack[top];

        Symbol current_input = get_symbol(input[input_pos]);
        if (stack_top == current_input) {
            printf("| Match %s       |\n", symbol_names[stack_top]);
            top--;
            input_pos++;
            if (stack_top == DOLLAR && input[input_pos - 1][0] == '$')
                break;
        } else if (stack_top == S || stack_top == E || stack_top == EP || stack_top == T) {
            Symbol production[5];
            int prod_len = get_production(stack_top, current_input, production);
            if (prod_len == -1) {
                printf("| Error            |\n");
                break;
            } else if (prod_len == 0) {
                printf("| %s -> ε         |\n", symbol_names[stack_top]);
                top--;
            } else {
                printf("| %s -> ", symbol_names[stack_top]);
                for (int i = 0; i < prod_len; i++)
                    printf("%s ", symbol_names[production[i]]);
                printf("|\n");
                top--;
                for (int i = prod_len - 1; i >= 0; i--) {
                    stack[++top] = production[i];
                }
            }
        } else {
            printf("| Error            |\n");
            break;
        }
    }
    printf("| Accepted      |              |                |\n");
    return 0;
}
