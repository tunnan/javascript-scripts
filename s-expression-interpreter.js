// These functions will interpret a basic s-expression and return the result

// Split the input into parts that are easier to parse
// and turn them into tokens.
function preprocess(string) {
    return string
        .replace(/\r\n?|\t/g, '')        // remove CRLF and tabs
        .replace(/\s{2,}/,    ' ')       // reduce multiple whitespaces
        .replace(/\(/g,       ' ( ')
        .replace(/\)/g,       ' ) ')
        .trim()
        .match(/\(|[\w\-]+|"[^"]+"|\)/g) // split by words, except when in double quotes
        .map(tokenize);
}

function tokenize(token) {
    return token === '('         ? { type: 'LParens', value: '(' }
         : token === ')'         ? { type: 'RParens', value: ')' }
         : token.match(/^".*"$/) ? { type: 'String',  value: token.replace(/"/g, '') }
         : token.match(/^\d+$/)  ? { type: 'Number',  value: Number(token) }
         :                         { type: 'Symbol',  value: token };
}

// Parse the tokens into a tree
function parse(tokens, list = []) {
    const token = tokens.shift();
    
    if (token === undefined) {
        return list.pop();
    }
    else if (token.type === 'LParens') {
        list.push(parse(tokens, []));
        return parse(tokens, list);
    }
    else if (token.type === 'RParens') {
        return list;
    }

    return parse(tokens, list.concat(token));
}

// Interpret the tree
function interpret(tree, lib) {
    if (Array.isArray(tree)) {
        const list = tree.map(x => interpret(x, lib));
        return list[0].type === 'Func'
            ? list[0].value(list.slice(1))
            : list.join('');
    }
    else if (tree.type === 'Symbol') {
        const fn = lib[tree.value];
        if (typeof fn === 'function') {
            return {
                type: 'Func',
                value: args => fn(...args)
            }
        }
    } else {
        return tree.value;
    }
}

const lib = {
	'add': (a, b) => a + b,
	'sub': (a, b) => a - b,
	'mul': (a, b) => a * b,
	'div': (a, b) => a / b,
}

// Usage:
// const result = interpret(parse(preprocess('(mul (add 2 (sub 15 2)) 2)')), lib);
// console.log(result);