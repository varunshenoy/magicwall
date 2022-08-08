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
    {"name": "script", "symbols": ["statement"], "postprocess": data => data[0]},
    {"name": "script", "symbols": ["statement", {"literal":"\n"}, "script"], "postprocess": data => [data[0]].concat(data[2])},
    {"name": "statement", "symbols": ["_", "directive", "_"], "postprocess": data => data[1]},
    {"name": "setStatement$string$1", "symbols": [{"literal":"$"}, {"literal":"."}, {"literal":"s"}, {"literal":"e"}, {"literal":"t"}, {"literal":"C"}, {"literal":"h"}, {"literal":"a"}, {"literal":"i"}, {"literal":"n"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "setStatement", "symbols": ["setStatement$string$1", "_", "number", "_", {"literal":")"}], "postprocess": data => { return {operator: "set_chain", chainId: data[2]} }},
    {"name": "letStatement$string$1", "symbols": [{"literal":"T"}, {"literal":"o"}, {"literal":"k"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "letStatement", "symbols": ["letStatement$string$1", "_", "string", "_", {"literal":"="}, "_", "token"], "postprocess": data => { return {operator: "assign", name: data[2], value: data[6]} }},
    {"name": "directive", "symbols": [{"literal":"("}, "_", "directive", "_", {"literal":")"}], "postprocess": data => data[2]},
    {"name": "directive$string$1", "symbols": [{"literal":"$"}, {"literal":"."}, {"literal":"g"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"t"}, {"literal":"A"}, {"literal":"c"}, {"literal":"c"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":"!"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "directive", "symbols": ["directive$string$1"], "postprocess": data => "$.grantAccess!"},
    {"name": "directive$string$2", "symbols": [{"literal":"$"}, {"literal":"."}, {"literal":"d"}, {"literal":"e"}, {"literal":"n"}, {"literal":"y"}, {"literal":"A"}, {"literal":"c"}, {"literal":"c"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":"!"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "directive", "symbols": ["directive$string$2"], "postprocess": data => "$.denyAccess!"},
    {"name": "directive", "symbols": ["letStatement"], "postprocess": data => data[0]},
    {"name": "directive", "symbols": ["_", "setStatement", "_"], "postprocess": data => data[1]},
    {"name": "directive", "symbols": ["_", "ifStatement", "_"], "postprocess": data => data[1]},
    {"name": "ifStatement$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$2", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement", "symbols": ["ifStatement$string$1", "_", "condition", "_", "ifStatement$string$2", "_", "directive"], "postprocess": (data) => { return {operator: "if", if: data[2], then: data[6]} }},
    {"name": "ifStatement$string$3", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$4", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement$string$5", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ifStatement", "symbols": ["ifStatement$string$3", "_", "condition", "_", "ifStatement$string$4", "_", "directive", "_", "ifStatement$string$5", "_", "directive"], "postprocess": (data) => { return {operator: "if", if: data[2], then: data[6], else: data[10]} }},
    {"name": "condition", "symbols": [{"literal":"("}, "_", "condition", "_", {"literal":")"}], "postprocess": (data) => { return data[2] }},
    {"name": "condition", "symbols": ["value", "_", {"literal":">"}, "_", "value"], "postprocess": (data) => { return {operator: ">", left: data[0], right: data[4]} }},
    {"name": "condition", "symbols": ["value", "_", {"literal":"<"}, "_", "value"], "postprocess": (data) => { return {operator: ">", left: data[4], right: data[0]} }},
    {"name": "condition$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$1", "_", "value"], "postprocess": (data) => { return {operator: ">=", left: data[0], right: data[4]} }},
    {"name": "condition$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$2", "_", "value"], "postprocess": (data) => { return {operator: ">=", left: data[4], right: data[0]} }},
    {"name": "condition$string$3", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$3", "_", "value"], "postprocess": (data) => { return {operator: "==", left: data[0], right: data[4]} }},
    {"name": "condition$string$4", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["contract", "_", "condition$string$4", "_", "contract"], "postprocess": (data) => { return {operator: "==", left: data[0], right: data[4]} }},
    {"name": "condition$string$5", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["contract", "_", "condition$string$5", "_", "contract"], "postprocess": (data) => { return {operator: "!=", left: data[0], right: data[4]} }},
    {"name": "condition$string$6", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["value", "_", "condition$string$6", "_", "value"], "postprocess": (data) => { return {operator: "!=", left: data[0], right: data[4]} }},
    {"name": "condition$string$7", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["condition", "_", "condition$string$7", "_", "condition"], "postprocess": (data) => { return {operator: "&&", left: data[0], right: data[4]} }},
    {"name": "condition$string$8", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["condition", "_", "condition$string$8", "_", "condition"], "postprocess": (data) => { return {operator: "||", left: data[0], right: data[4]} }},
    {"name": "condition", "symbols": [{"literal":"!"}, "_", "condition"], "postprocess": (data) => { return {operator: "!", child: data[2]} }},
    {"name": "token$string$1", "symbols": [{"literal":"E"}, {"literal":"R"}, {"literal":"C"}, {"literal":"2"}, {"literal":"0"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "token", "symbols": ["_", "token$string$1", "contract", {"literal":")"}, "_"], "postprocess": (data) => { return {operator: "ERC20", address: data[2]} }},
    {"name": "token$string$2", "symbols": [{"literal":"E"}, {"literal":"R"}, {"literal":"C"}, {"literal":"7"}, {"literal":"2"}, {"literal":"1"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "token", "symbols": ["_", "token$string$2", "contract", {"literal":")"}, "_"], "postprocess": (data) => { return {operator: "ERC721", address: data[2]} }},
    {"name": "token$string$3", "symbols": [{"literal":"E"}, {"literal":"T"}, {"literal":"H"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "token", "symbols": ["_", "token$string$3", "_"], "postprocess": () => { return "ETH" }},
    {"name": "value", "symbols": ["number"], "postprocess": d => d[0]},
    {"name": "value$string$1", "symbols": [{"literal":"$"}, {"literal":"."}, {"literal":"b"}, {"literal":"a"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}, {"literal":"O"}, {"literal":"f"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$1", "token", {"literal":")"}], "postprocess": d => d[1]},
    {"name": "value$string$2", "symbols": [{"literal":"$"}, {"literal":"."}, {"literal":"b"}, {"literal":"a"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}, {"literal":"O"}, {"literal":"f"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$2", "string", {"literal":")"}], "postprocess": d => d[1]},
    {"name": "contract$string$1", "symbols": [{"literal":"0"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "contract$ebnf$1", "symbols": [/[a-fA-F0-9]/]},
    {"name": "contract$ebnf$1", "symbols": ["contract$ebnf$1", /[a-fA-F0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "contract", "symbols": ["contract$string$1", "contract$ebnf$1"], "postprocess": d => "0x" + d[1].join("")},
    {"name": "contract$string$2", "symbols": [{"literal":"$"}, {"literal":"."}, {"literal":"a"}, {"literal":"d"}, {"literal":"d"}, {"literal":"r"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "contract", "symbols": ["contract$string$2"], "postprocess": data => data[0]},
    {"name": "string$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": ["number$ebnf$1"], "postprocess": d => parseInt(d[0].join(""))},
    {"name": "number", "symbols": ["decimal"], "postprocess": data => data[0]},
    {"name": "decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$1", "symbols": ["decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        }
]
  , ParserStart: "script"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
