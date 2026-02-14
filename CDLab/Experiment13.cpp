lexer.l
%{
#include <stdio.h>
%}
%%
[ \t]+ ;
[a-zA-Z_][a-zA-Z0-9_]* { printf("ID : %s\n", yytext); }
"=" { printf("ASSIGN : %s\n", yytext); }
"+" { printf("PLUS : %s\n", yytext); }
\n { return 0; }
. { printf("UNKNOWN : %s\n", yytext); }
%%
int main() {
 yylex();
 return 0;
}
