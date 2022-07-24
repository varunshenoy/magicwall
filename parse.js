const nearley = require("nearley");
const grammar = require("./unfold.js");

class UnfoldRuntime {
    constructor(code) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        this.unlocked = 0;
        try {
            parser.feed(code);
            this.ast = parser.results;
            console.log(this.ast)
            if (this.ast.length > 1) {
                this.ast = this.ast[0];
            }
        } catch (e) {
            console.log(e.message);
        }
        this.table = { "ETH": 0 };
    }

    assign(node) {
        const name = node.name;

        this.table[name] = 1;

        if (node.value.address.length != 42) {
            console.log("INVALID ETH ADDR");
        }

        // query assignment from node.value
    }

    execute() {
        for (const node of this.ast) {
            this.executeLine(node[0]);
        }
    }

    unlock(node) {
        if (this.executeLine(node.if) && this.unlocked == 0) {
            this.unlocked = 1;
        }
    }

    lock(node) {
        if (this.executeLine(node.if) && this.unlocked == 0) {
            this.unlocked = -1;
        }
    }

    if_assign(node) {
        if (this.executeLine(node.if)) {
            this.assign(node.assign);
        }
    }

    executeLine(node) {
        if (node.operator == null) {
            // leaf node
            if (typeof node === 'string') {
                return this.table[node];
            }
            return node;
        }

        if (node.operator === 'assign') {
            this.assign(node);
        } else if (node.operator === 'unlock') {
            this.unlock(node);
        } else if (node.operator === 'lock') {
            this.lock(node);
        } else if (node.operator === 'if_assign') {
            this.if_assign(node);
        } else if (node.operator === 'ERC20') {
            return 5;
        } else if (node.operator === 'ERC721') {
            return 5;
        } else if (node.operator === '>') {
            const left = this.executeLine(node.left);
            const right = this.executeLine(node.right);
            return (left > right);
        } else if (node.operator === '>=') {
            const left = this.executeLine(node.left);
            const right = this.executeLine(node.right);
            console.log((left >= right));
            return (left >= right);
        } else if (node.operator === '==') {
            const left = this.executeLine(node.left);
            const right = this.executeLine(node.right);
            return (left == right);
        } else if (node.operator === '!=') {
            const left = this.executeLine(node.left);
            const right = this.executeLine(node.right);
            return (left != right);
        } else if (node.operator === '&&') {
            const left = this.executeLine(node.left);
            const right = this.executeLine(node.right);
            return (left && right);
        } else if (node.operator === '||') {
            const left = this.executeLine(node.left);
            const right = this.executeLine(node.right);
            return (left || right);
        }
    }

    success() {
        if (this.unlocked == 1) {
            return true;
        }
        return false;
    }

}

const code = "Token ens = ERC721(0xABC)\nif (5 <= 10) => lock!\nif (balanceOf(ERC20(0xabcdef)) > 0 && balanceOf(ETH) < 10) =>unlock!\nif (10 <= 5) => lock!";
//const code = "Token ens = ERC721(0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85)\nif (balanceOf(ens) > 0) => unlock!";
const runtime = new UnfoldRuntime(code);
runtime.execute();
console.log(runtime.success());

// export UnfoldRuntime;

// const parse = (code) => {
//     try {
//         console.log(code.length);
//         parser.feed(code);
//         console.log(JSON.stringify(parser.results));
//     } catch (e) {
//         console.log(e.message);
//     }
// }

// mycode.forEach(parse);