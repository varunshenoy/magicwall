// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "script", "symbols": ["statement"]},
    {"name": "script", "symbols": ["statement", "_", {"literal":"\n"}, "_", "script"], "postprocess": data => [data[0], ...data[4]]},
    {"name": "statement", "symbols": ["letStatement"]},
    {"name": "statement", "symbols": ["ifStatement"]},
    {"name": "letStatement$string$1", "symbols": [{"literal":"T"}, {"literal":"o"}, {"literal":"k"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "letStatement", "symbols": ["letStatement$string$1", "_", "string", "_", {"literal":"="}, "_", "token"], "postprocess": data => { return {operator: "assign", name: data[2], value: data[6]} }},
    {"name": "ifStatement$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$2", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$3", "symbols": [{"literal":"u"}, {"literal":"n"}, {"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"k"}, {"literal":"!"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement", "symbols": ["ifStatement$string$1", "_", "condition", "_", "ifStatement$string$2", "_", "ifStatement$string$3"], "postprocess": (data) => { return {operator: "unlock", if: data[2]} }},
    {"name": "ifStatement$string$4", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$5", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$6", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"k"}, {"literal":"!"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement", "symbols": ["ifStatement$string$4", "_", "condition", "_", "ifStatement$string$5", "_", "ifStatement$string$6"], "postprocess": (data) => { return {operator: "lock", if: data[2]} }},
    {"name": "ifStatement$string$7", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$8", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement", "symbols": ["ifStatement$string$7", "_", "condition", "_", "ifStatement$string$8", "_", "letStatement"], "postprocess": (data) => { return {operator: "if_assign", if: data[2], assign: data[6]} }},
    {"name": "condition", "symbols": [{"literal":"("}, "_", "condition", "_", {"literal":")"}], "postprocess": (data) => { return data[2] }},
    {"name": "condition", "symbols": ["value", "_", {"literal":">"}, "_", "value"], "postprocess": (data) => { return {operator: ">", left: data[0], right: data[4]} }},
    {"name": "condition", "symbols": ["value", "_", {"literal":"<"}, "_", "value"], "postprocess": (data) => { return {operator: ">", left: data[4], right: data[0]} }},
    {"name": "condition$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$1", "_", "value"], "postprocess": (data) => { return {operator: ">=", left: data[0], right: data[4]} }},
    {"name": "condition$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$2", "_", "value"], "postprocess": (data) => { return {operator: ">=", left: data[4], right: data[0]} }},
    {"name": "condition$string$3", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$3", "_", "value"], "postprocess": (data) => { return {operator: "==", left: data[0], right: data[4]} }},
    {"name": "condition$string$4", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$4", "_", "value"], "postprocess": (data) => { return {operator: "!=", left: data[0], right: data[4]} }},
    {"name": "condition$string$5", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["condition", "_", "condition$string$5", "_", "condition"], "postprocess": (data) => { return {operator: "&&", left: data[0], right: data[4]} }},
    {"name": "condition$string$6", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["condition", "_", "condition$string$6", "_", "condition"], "postprocess": (data) => { return {operator: "||", left: data[0], right: data[4]} }},
    {"name": "token$string$1", "symbols": [{"literal":"E"}, {"literal":"R"}, {"literal":"C"}, {"literal":"2"}, {"literal":"0"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "token", "symbols": ["_", "token$string$1", "contract", {"literal":")"}, "_"], "postprocess": (data) => { return {operator: "ERC20", address: data[2]} }},
    {"name": "token$string$2", "symbols": [{"literal":"E"}, {"literal":"R"}, {"literal":"C"}, {"literal":"7"}, {"literal":"2"}, {"literal":"1"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "token", "symbols": ["_", "token$string$2", "contract", {"literal":")"}, "_"], "postprocess": (data) => { return {operator: "ERC721", address: data[2]} }},
    {"name": "token$string$3", "symbols": [{"literal":"E"}, {"literal":"T"}, {"literal":"H"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "token", "symbols": ["_", "token$string$3", "_"], "postprocess": () => { return "ETH" }},
    {"name": "value$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "value$ebnf$1", "symbols": ["value$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "value", "symbols": ["value$ebnf$1"], "postprocess": d => parseInt(d[0].join(""))},
    {"name": "value$string$1", "symbols": [{"literal":"b"}, {"literal":"a"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}, {"literal":"O"}, {"literal":"f"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$1", "token", {"literal":")"}], "postprocess": d => d[1]},
    {"name": "value$string$2", "symbols": [{"literal":"b"}, {"literal":"a"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}, {"literal":"O"}, {"literal":"f"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$2", "string", {"literal":")"}], "postprocess": d => d[1]},
    {"name": "contract$string$1", "symbols": [{"literal":"0"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "contract$ebnf$1", "symbols": [/[a-fA-F0-9]/]},
    {"name": "contract$ebnf$1", "symbols": ["contract$ebnf$1", /[a-fA-F0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "contract", "symbols": ["contract$string$1", "contract$ebnf$1"], "postprocess": d => "0x" + d[1].join("")},
    {"name": "string$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": d => d[0].join("")}
]
  , ParserStart: "script"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
