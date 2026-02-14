#include <stdio.h>
#include <string.h>

#define MAX 100

void reduce(char stack[MAX][10], int *top, char input[MAX][10], int ipos) {
    int changed;
    do {
        changed = 0;
        // E -> id
        if (*top >= 0 && strcmp(stack[*top], "id") == 0) {
            strcpy(stack[*top], "E");
            printf("%-25s %-25s %-15s\n", stack[0], input[ipos], "Reduce: E -> id");
            changed = 1;
        }
        // E -> ( E )
        else if (*top >= 2 && strcmp(stack[*top - 2], "(") == 0 && strcmp(stack[*top - 1], "E") == 0 && strcmp(stack[*top], ")") == 0) {
            strcpy(stack[*top - 2], "E");
            *top -= 2;
            printf("%-25s %-25s %-15s\n", stack[0], input[ipos], "Reduce: E -> (E)");
            changed = 1;
        }
        // E -> E + E
        else if (*top >= 2 && strcmp(stack[*top - 2], "E") == 0 && strcmp(stack[*top - 1], "+") == 0 && strcmp(stack[*top], "E") == 0) {
            strcpy(stack[*top - 2], "E");
            *top -= 2;
            printf("%-25s %-25s %-15s\n", stack[0], input[ipos], "Reduce: E -> E+E");
            changed = 1;
        }
        // E -> E * E
        else if (*top >= 2 && strcmp(stack[*top - 2], "E") == 0 && strcmp(stack[*top - 1], "*") == 0 && strcmp(stack[*top], "E") == 0) {
            strcpy(stack[*top - 2], "E");
            *top -= 2;
            printf("%-25s %-25s %-15s\n", stack[0], input[ipos], "Reduce: E -> E*E");
            changed = 1;
        }
    } while (changed);
}

int main() {
    char stack[MAX][10];
    char input[MAX][10];
    int top = -1;
    //Input position and No. of Input Tokens
    int ipos = 0, ninput = 0;

    printf("Enter the space-separated token stream (e.g. id + id * id $):\n");
    while (scanf("%s", input[ninput]) == 1) {
        if (strcmp(input[ninput], "$") == 0) break;
        ninput++;
    }
    strcpy(input[ninput++], "$\0"); 
    
    printf("\n%-25s %-25s %-15s\n", "Stack", "Input", "Action");
    printf("------------------------- ------------------------- ---------------\n");
    
    while (1) {
        strcpy(stack[++top], input[ipos]);
        ipos++;

        char stack_str[MAX*10] = "", input_str[MAX*10] = "";
        for (int i = 0; i <= top; i++) { strcat(stack_str, stack[i]); strcat(stack_str, " "); }
        for (int i = ipos; i < ninput; i++) { strcat(input_str, input[i]); strcat(input_str, " "); }
        printf("%-25s %-25s %-15s\n", stack_str, input_str, "Shift");
        reduce(stack, &top, input, ipos);
        if (top == 0 && strcmp(stack[0], "E") == 0 && strcmp(input[ipos], "$") == 0) {
            printf("Accepted\n");
            break;
        }
        if (ipos >= ninput) {
            printf("Rejected\n");
            break;
        }
    }
    return 0;
}
