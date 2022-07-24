@builtin "whitespace.ne"

script -> statement
    | statement _ "\n" _ script {% data => [data[0], ...data[4]] %}

statement -> letStatement | ifStatement

letStatement -> "Token" _ string _ "=" _ token {% data => { return {operator: "assign", name: data[2], value: data[6]} } %}

ifStatement -> "if" _ condition _ "=>" _ "unlock!" {% (data) => { return {operator: "unlock", if: data[2]} } %}
    | "if" _ condition _ "=>" _ "lock!"  {% (data) => { return {operator: "lock", if: data[2]} } %}
    | "if" _ condition _ "=>" _ letStatement {% (data) => { return {operator: "if_assign", if: data[2], assign: data[6]} } %}

condition ->
   "(" _ condition _ ")" {% (data) => { return data[2] }  %}
  | value _ ">" _ value {% (data) => { return {operator: ">", left: data[0], right: data[4]} } %}
  | value _ "<" _  value {% (data) => { return {operator: ">", left: data[4], right: data[0]} }  %}
  | value _ ">=" _  value {% (data) => { return {operator: ">=", left: data[0], right: data[4]} } %}
  | value _ "<=" _  value {% (data) => { return {operator: ">=", left: data[4], right: data[0]} } %}
  | value _ "==" _  value {% (data) => { return {operator: "==", left: data[0], right: data[4]} } %}
  | value _ "!=" _  value {% (data) => { return {operator: "!=", left: data[0], right: data[4]} } %}
  | condition _ "&&" _  condition {% (data) => { return {operator: "&&", left: data[0], right: data[4]} } %}
  | condition _ "||" _  condition {% (data) => { return {operator: "||", left: data[0], right: data[4]} } %}

token -> _ "ERC20(" contract ")" _ {% (data) => { return {operator: "ERC20", address: data[2]} } %}
  | _ "ERC721(" contract ")" _  {% (data) => { return {operator: "ERC721", address: data[2]} } %}
  | _ "ETH" _  {% () => { return "ETH" } %}

value -> [0-9]:+ {% d => parseInt(d[0].join("")) %}
    | "balanceOf(" token ")" {% d => d[1] %}
    | "balanceOf(" string ")" {% d => d[1] %}

contract -> "0x" [a-fA-F0-9]:+ {% d => "0x" + d[1].join("") %}
 
string -> [a-zA-Z]:+ {% d => d[0].join("") %}