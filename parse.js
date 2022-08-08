const nearley = require("nearley");
const grammar = require("./unfold.js");

class UnfoldRuntime {
    constructor(code, walletContext) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

        this.unlocked = 0;

        this.address = walletContext.address
        this.queryToken = walletContext.queryToken;
        this.setChain = walletContext.setChain;
        this.isValidAddr = walletContext.isValidAddr;
        this.queryEth = walletContext.queryEth;
        this.table = {};

        try {
            parser.feed(code);
            this.ast = parser.results;
            if (this.ast.length > 1) {
                this.ast = this.ast[0];
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    async assign(node) {
        const name = node.name;
        const tokenAddress = node.value.address;

        if (!this.isValidAddr(tokenAddress)) {
            // throw error
        }

        this.table[name] = walletContext.queryToken(tokenAddress);
    }

    async query(node) {
        const balance = await this.queryToken(node.operator, node.address);
        return balance;
    }

    async setup() {
        const eth = await this.queryEth();
        this.table["ETH"] = eth;
        console.log(eth);
    }

    async execute() {
        console.log(this.ast);
        if (this.ast.length !== undefined) {
            for (const node of this.ast) {
                console.log(node);
                await this.executeLine(node);
            }
        } else {
            await this.executeLine(this.ast);
        }
    }

    unlock() {
        if (this.unlocked == 0) {
            this.unlocked = 1;
        }
        return this.unlocked;
    }

    lock() {
        if (this.unlocked == 0) {
            this.unlocked = -1;
        }
        return this.unlocked;
    }

    async if(node) {
        const cond = await this.executeLine(node.if);
        if (cond) {
            this.executeLine(node.then);
        } else if (node.else) {
            this.executeLine(node.else);
        }
    }

    async executeLine(node) {
        if (node.operator == null) {
            // leaf node
            if (typeof node === 'string') {
                // is either a declared token, a contract, or reserved keyword (myaddress)
                if (node === "$.address") {
                    return this.address;
                }
                if (node === "$.grantAccess!") {
                    return this.unlock();
                }
                if (node === "$.denyAccess!") {
                    return this.lock();
                }
                if (node.length == 42) {
                    return node;
                }
                return this.table[node];
            }
            return node;
        }

        if (node.operator === 'assign') {
            await this.assign(node);
        } if (node.operator === 'set_chain') {
            console.log(node.chainId);
            await this.setChain(node.chainId);
        } else if (node.operator === 'if') {
            await this.if(node);
        } else if (node.operator === 'ERC20' || node.operator === 'ERC721') {
            const balance = await this.query(node);
            return balance;
        } else if (node.operator === '>') {
            const left = await this.executeLine(node.left);
            const right = await this.executeLine(node.right);
            return (left > right);
        } else if (node.operator === '>=') {
            const left = await this.executeLine(node.left);
            const right = await this.executeLine(node.right);
            return (left >= right);
        } else if (node.operator === '==') {
            const left = await this.executeLine(node.left);
            const right = await this.executeLine(node.right);
            return (left === right);
        } else if (node.operator === '!=') {
            const left = await this.executeLine(node.left);
            const right = await this.executeLine(node.right);
            return (left != right);
        } else if (node.operator === '&&') {
            const left = await this.executeLine(node.left);
            const right = await this.executeLine(node.right);
            return (left && right);
        } else if (node.operator === '||') {
            const left = await this.executeLine(node.left);
            const right = await this.executeLine(node.right);
            return (left || right);
        } else if (node.operator === '!') {
            const child = await this.executeLine(node.child);
            return (!child);
        }
    }

    success() {
        console.log(this.unlocked);
        if (this.unlocked == 1) {
            return true;
        }
        return false;
    }

}

export default UnfoldRuntime;