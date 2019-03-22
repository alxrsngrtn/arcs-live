// tslint:disable:no-any
// tslint:disable: only-arrow-functions
// tslint:disable: max-line-length
// tslint:disable: trailing-comma
// tslint:disable: interface-name
// tslint:disable: switch-default
// tslint:disable: object-literal-shorthand
// tslint:disable: prefer-const
export class SyntaxError extends Error {
    static buildMessage(expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    const escapedParts = expectation.parts.map((part) => {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            const descriptions = expected1.map(describeExpectation);
            let i;
            let j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    }
    constructor(message, expected, found, location) {
        super();
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, SyntaxError);
        }
    }
}
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    const peg$FAILED = {};
    const peg$startRuleFunctions = { assertion: peg$parseassertion };
    let peg$startRuleFunction = peg$parseassertion;
    const peg$c0 = ":";
    const peg$c1 = peg$literalExpectation(":", false);
    const peg$c2 = "0";
    const peg$c3 = peg$literalExpectation("0", false);
    const peg$c4 = "any";
    const peg$c5 = peg$literalExpectation("any", false);
    const peg$c6 = "1";
    const peg$c7 = peg$literalExpectation("1", false);
    const peg$c8 = "all";
    const peg$c9 = peg$literalExpectation("all", false);
    const peg$c10 = "particle";
    const peg$c11 = peg$literalExpectation("particle", false);
    const peg$c12 = "s";
    const peg$c13 = peg$literalExpectation("s", false);
    const peg$c14 = "trusted particle";
    const peg$c15 = peg$literalExpectation("trusted particle", false);
    const peg$c16 = "untrusted particle";
    const peg$c17 = peg$literalExpectation("untrusted particle", false);
    const peg$c18 = "handle";
    const peg$c19 = peg$literalExpectation("handle", false);
    const peg$c20 = "recipe";
    const peg$c21 = peg$literalExpectation("recipe", false);
    const peg$c22 = "side channel";
    const peg$c23 = peg$literalExpectation("side channel", false);
    const peg$c24 = "sensitive data";
    const peg$c25 = peg$literalExpectation("sensitive data", false);
    const peg$c26 = "nonsensitive data";
    const peg$c27 = peg$literalExpectation("nonsensitive data", false);
    const peg$c28 = "that";
    const peg$c29 = peg$literalExpectation("that", false);
    const peg$c30 = "and";
    const peg$c31 = peg$literalExpectation("and", false);
    const peg$c32 = "does not";
    const peg$c33 = peg$literalExpectation("does not", false);
    const peg$c34 = "do not";
    const peg$c35 = peg$literalExpectation("do not", false);
    const peg$c36 = "is not";
    const peg$c37 = peg$literalExpectation("is not", false);
    const peg$c38 = "are not";
    const peg$c39 = peg$literalExpectation("are not", false);
    const peg$c40 = "see";
    const peg$c41 = peg$literalExpectation("see", false);
    const peg$c42 = "is";
    const peg$c43 = peg$literalExpectation("is", false);
    const peg$c44 = "are";
    const peg$c45 = peg$literalExpectation("are", false);
    const peg$c46 = "seen";
    const peg$c47 = peg$literalExpectation("seen", false);
    const peg$c48 = "by";
    const peg$c49 = peg$literalExpectation("by", false);
    const peg$c50 = "written";
    const peg$c51 = peg$literalExpectation("written", false);
    const peg$c52 = "to by";
    const peg$c53 = peg$literalExpectation("to by", false);
    const peg$c54 = "write";
    const peg$c55 = peg$literalExpectation("write", false);
    const peg$c56 = "to";
    const peg$c57 = peg$literalExpectation("to", false);
    const peg$c58 = "read";
    const peg$c59 = peg$literalExpectation("read", false);
    const peg$c60 = "from";
    const peg$c61 = peg$literalExpectation("from", false);
    const peg$c62 = "reachable";
    const peg$c63 = peg$literalExpectation("reachable", false);
    const peg$c64 = "resolve";
    const peg$c65 = peg$literalExpectation("resolve", false);
    const peg$c66 = "exactly";
    const peg$c67 = peg$literalExpectation("exactly", false);
    const peg$c68 = "exist";
    const peg$c69 = peg$literalExpectation("exist", false);
    const peg$c70 = " ";
    const peg$c71 = peg$literalExpectation(" ", false);
    const peg$c72 = "\n";
    const peg$c73 = peg$literalExpectation("\n", false);
    const peg$c74 = "A";
    const peg$c75 = peg$literalExpectation("A", false);
    const peg$c76 = "B";
    const peg$c77 = peg$literalExpectation("B", false);
    const peg$c78 = "C";
    const peg$c79 = peg$literalExpectation("C", false);
    const peg$c80 = "D";
    const peg$c81 = peg$literalExpectation("D", false);
    const peg$c82 = "E";
    const peg$c83 = peg$literalExpectation("E", false);
    const peg$c84 = "F";
    const peg$c85 = peg$literalExpectation("F", false);
    const peg$c86 = "G";
    const peg$c87 = peg$literalExpectation("G", false);
    const peg$c88 = "H";
    const peg$c89 = peg$literalExpectation("H", false);
    const peg$c90 = "I";
    const peg$c91 = peg$literalExpectation("I", false);
    const peg$c92 = "J";
    const peg$c93 = peg$literalExpectation("J", false);
    const peg$c94 = "K";
    const peg$c95 = peg$literalExpectation("K", false);
    const peg$c96 = "L";
    const peg$c97 = peg$literalExpectation("L", false);
    const peg$c98 = "M";
    const peg$c99 = peg$literalExpectation("M", false);
    const peg$c100 = "N";
    const peg$c101 = peg$literalExpectation("N", false);
    const peg$c102 = "O";
    const peg$c103 = peg$literalExpectation("O", false);
    const peg$c104 = "P";
    const peg$c105 = peg$literalExpectation("P", false);
    const peg$c106 = "Q";
    const peg$c107 = peg$literalExpectation("Q", false);
    const peg$c108 = "R";
    const peg$c109 = peg$literalExpectation("R", false);
    const peg$c110 = "S";
    const peg$c111 = peg$literalExpectation("S", false);
    const peg$c112 = "T";
    const peg$c113 = peg$literalExpectation("T", false);
    const peg$c114 = "U";
    const peg$c115 = peg$literalExpectation("U", false);
    const peg$c116 = "V";
    const peg$c117 = peg$literalExpectation("V", false);
    const peg$c118 = "W";
    const peg$c119 = peg$literalExpectation("W", false);
    const peg$c120 = "X";
    const peg$c121 = peg$literalExpectation("X", false);
    const peg$c122 = "Y";
    const peg$c123 = peg$literalExpectation("Y", false);
    const peg$c124 = "Z";
    const peg$c125 = peg$literalExpectation("Z", false);
    const peg$c126 = "a";
    const peg$c127 = peg$literalExpectation("a", false);
    const peg$c128 = "b";
    const peg$c129 = peg$literalExpectation("b", false);
    const peg$c130 = "c";
    const peg$c131 = peg$literalExpectation("c", false);
    const peg$c132 = "d";
    const peg$c133 = peg$literalExpectation("d", false);
    const peg$c134 = "e";
    const peg$c135 = peg$literalExpectation("e", false);
    const peg$c136 = "f";
    const peg$c137 = peg$literalExpectation("f", false);
    const peg$c138 = "g";
    const peg$c139 = peg$literalExpectation("g", false);
    const peg$c140 = "h";
    const peg$c141 = peg$literalExpectation("h", false);
    const peg$c142 = "i";
    const peg$c143 = peg$literalExpectation("i", false);
    const peg$c144 = "j";
    const peg$c145 = peg$literalExpectation("j", false);
    const peg$c146 = "k";
    const peg$c147 = peg$literalExpectation("k", false);
    const peg$c148 = "l";
    const peg$c149 = peg$literalExpectation("l", false);
    const peg$c150 = "m";
    const peg$c151 = peg$literalExpectation("m", false);
    const peg$c152 = "n";
    const peg$c153 = peg$literalExpectation("n", false);
    const peg$c154 = "o";
    const peg$c155 = peg$literalExpectation("o", false);
    const peg$c156 = "p";
    const peg$c157 = peg$literalExpectation("p", false);
    const peg$c158 = "q";
    const peg$c159 = peg$literalExpectation("q", false);
    const peg$c160 = "r";
    const peg$c161 = peg$literalExpectation("r", false);
    const peg$c162 = "t";
    const peg$c163 = peg$literalExpectation("t", false);
    const peg$c164 = "u";
    const peg$c165 = peg$literalExpectation("u", false);
    const peg$c166 = "v";
    const peg$c167 = peg$literalExpectation("v", false);
    const peg$c168 = "w";
    const peg$c169 = peg$literalExpectation("w", false);
    const peg$c170 = "x";
    const peg$c171 = peg$literalExpectation("x", false);
    const peg$c172 = "y";
    const peg$c173 = peg$literalExpectation("y", false);
    const peg$c174 = "z";
    const peg$c175 = peg$literalExpectation("z", false);
    const peg$c176 = "2";
    const peg$c177 = peg$literalExpectation("2", false);
    const peg$c178 = "3";
    const peg$c179 = peg$literalExpectation("3", false);
    const peg$c180 = "4";
    const peg$c181 = peg$literalExpectation("4", false);
    const peg$c182 = "5";
    const peg$c183 = peg$literalExpectation("5", false);
    const peg$c184 = "6";
    const peg$c185 = peg$literalExpectation("6", false);
    const peg$c186 = "7";
    const peg$c187 = peg$literalExpectation("7", false);
    const peg$c188 = "8";
    const peg$c189 = peg$literalExpectation("8", false);
    const peg$c190 = "9";
    const peg$c191 = peg$literalExpectation("9", false);
    const peg$c192 = "_";
    const peg$c193 = peg$literalExpectation("_", false);
    const peg$c194 = ".";
    const peg$c195 = peg$literalExpectation(".", false);
    const peg$c196 = "-";
    const peg$c197 = peg$literalExpectation("-", false);
    const peg$c198 = "!";
    const peg$c199 = peg$literalExpectation("!", false);
    const peg$c200 = "?";
    const peg$c201 = peg$literalExpectation("?", false);
    let peg$currPos = 0;
    let peg$savedPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;
    let peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        let details = peg$posDetailsCache[pos];
        let p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        const startPosDetails = peg$computePosDetails(startPos);
        const endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parseassertion() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parsename();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseseparator();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsequantifiedFilteredObject();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseseparator();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsepredicate();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$currPos;
                            s7 = peg$parseseparator();
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parsequantifiedFilteredObject();
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s1 = [s1, s2, s3, s4, s5, s6];
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsename() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parsecharacter();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsename();
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parsecharacter();
        }
        return s0;
    }
    function peg$parseseparator() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parseopt_whitespace();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
                s2 = peg$c0;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c1);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseopt_whitespace();
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsequantifiedFilteredObject() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parsequantifier();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseseparator();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseobject();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsefilterPredicate();
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s1 = [s1, s2, s3, s4];
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsequantifier() {
        let s0;
        if (input.charCodeAt(peg$currPos) === 48) {
            s0 = peg$c2;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c3);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c4) {
                s0 = peg$c4;
                peg$currPos += 3;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c5);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 49) {
                    s0 = peg$c6;
                    peg$currPos++;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c8) {
                        s0 = peg$c8;
                        peg$currPos += 3;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c9);
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseobject() {
        let s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c10) {
            s1 = peg$c10;
            peg$currPos += 8;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c11);
            }
        }
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 115) {
                s2 = peg$c12;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                }
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 16) === peg$c14) {
                s1 = peg$c14;
                peg$currPos += 16;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c15);
                }
            }
            if (s1 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 115) {
                    s2 = peg$c12;
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c13);
                    }
                }
                if (s2 === peg$FAILED) {
                    s2 = null;
                }
                if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 18) === peg$c16) {
                    s1 = peg$c16;
                    peg$currPos += 18;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c17);
                    }
                }
                if (s1 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 115) {
                        s2 = peg$c12;
                        peg$currPos++;
                    }
                    else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c13);
                        }
                    }
                    if (s2 === peg$FAILED) {
                        s2 = null;
                    }
                    if (s2 !== peg$FAILED) {
                        s1 = [s1, s2];
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 6) === peg$c18) {
                        s1 = peg$c18;
                        peg$currPos += 6;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c19);
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 115) {
                            s2 = peg$c12;
                            peg$currPos++;
                        }
                        else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c13);
                            }
                        }
                        if (s2 === peg$FAILED) {
                            s2 = null;
                        }
                        if (s2 !== peg$FAILED) {
                            s1 = [s1, s2];
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.substr(peg$currPos, 6) === peg$c20) {
                            s1 = peg$c20;
                            peg$currPos += 6;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c21);
                            }
                        }
                        if (s1 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 115) {
                                s2 = peg$c12;
                                peg$currPos++;
                            }
                            else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c13);
                                }
                            }
                            if (s2 === peg$FAILED) {
                                s2 = null;
                            }
                            if (s2 !== peg$FAILED) {
                                s1 = [s1, s2];
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.substr(peg$currPos, 12) === peg$c22) {
                                s1 = peg$c22;
                                peg$currPos += 12;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c23);
                                }
                            }
                            if (s1 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 115) {
                                    s2 = peg$c12;
                                    peg$currPos++;
                                }
                                else {
                                    s2 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c13);
                                    }
                                }
                                if (s2 === peg$FAILED) {
                                    s2 = null;
                                }
                                if (s2 !== peg$FAILED) {
                                    s1 = [s1, s2];
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                            if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 14) === peg$c24) {
                                    s0 = peg$c24;
                                    peg$currPos += 14;
                                }
                                else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c25);
                                    }
                                }
                                if (s0 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 17) === peg$c26) {
                                        s0 = peg$c26;
                                        peg$currPos += 17;
                                    }
                                    else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c27);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsefilterPredicate() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parsereq_whitespace();
        if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c28) {
                s2 = peg$c28;
                peg$currPos += 4;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c29);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsereq_whitespace();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsepredicate();
                    if (s4 !== peg$FAILED) {
                        s1 = [s1, s2, s3, s4];
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepredicate() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parsenegator();
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsesimplePredicate();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parseseparator();
                if (s4 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c30) {
                        s5 = peg$c30;
                        peg$currPos += 3;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c31);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parsereq_whitespace();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parsesimplePredicate();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsenegator() {
        let s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c32) {
            s1 = peg$c32;
            peg$currPos += 8;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c34) {
                s1 = peg$c34;
                peg$currPos += 6;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c35);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c36) {
                    s1 = peg$c36;
                    peg$currPos += 6;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c37);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c38) {
                        s1 = peg$c38;
                        peg$currPos += 7;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c39);
                        }
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsereq_whitespace();
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsesimplePredicate() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parserelation();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseseparator();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsequantifiedFilteredObject();
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseattribute();
        }
        return s0;
    }
    function peg$parserelation() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c40) {
            s1 = peg$c40;
            peg$currPos += 3;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c41);
            }
        }
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 115) {
                s2 = peg$c12;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                }
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c42) {
                s1 = peg$c42;
                peg$currPos += 2;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c43);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c44) {
                    s1 = peg$c44;
                    peg$currPos += 3;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsereq_whitespace();
                if (s2 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c46) {
                        s3 = peg$c46;
                        peg$currPos += 4;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c47);
                        }
                    }
                    if (s3 !== peg$FAILED) {
                        s4 = peg$parsereq_whitespace();
                        if (s4 !== peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c48) {
                                s5 = peg$c48;
                                peg$currPos += 2;
                            }
                            else {
                                s5 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c49);
                                }
                            }
                            if (s5 !== peg$FAILED) {
                                s1 = [s1, s2, s3, s4, s5];
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c42) {
                    s1 = peg$c42;
                    peg$currPos += 2;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c44) {
                        s1 = peg$c44;
                        peg$currPos += 3;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsereq_whitespace();
                    if (s2 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c50) {
                            s3 = peg$c50;
                            peg$currPos += 7;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c51);
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parsereq_whitespace();
                            if (s4 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 5) === peg$c52) {
                                    s5 = peg$c52;
                                    peg$currPos += 5;
                                }
                                else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c53);
                                    }
                                }
                                if (s5 !== peg$FAILED) {
                                    s1 = [s1, s2, s3, s4, s5];
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 5) === peg$c54) {
                        s1 = peg$c54;
                        peg$currPos += 5;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c55);
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 115) {
                            s2 = peg$c12;
                            peg$currPos++;
                        }
                        else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c13);
                            }
                        }
                        if (s2 === peg$FAILED) {
                            s2 = null;
                        }
                        if (s2 !== peg$FAILED) {
                            s3 = peg$parsereq_whitespace();
                            if (s3 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c56) {
                                    s4 = peg$c56;
                                    peg$currPos += 2;
                                }
                                else {
                                    s4 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c57);
                                    }
                                }
                                if (s4 !== peg$FAILED) {
                                    s1 = [s1, s2, s3, s4];
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.substr(peg$currPos, 4) === peg$c58) {
                            s1 = peg$c58;
                            peg$currPos += 4;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c59);
                            }
                        }
                        if (s1 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 115) {
                                s2 = peg$c12;
                                peg$currPos++;
                            }
                            else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c13);
                                }
                            }
                            if (s2 === peg$FAILED) {
                                s2 = null;
                            }
                            if (s2 !== peg$FAILED) {
                                s3 = peg$parsereq_whitespace();
                                if (s3 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 4) === peg$c60) {
                                        s4 = peg$c60;
                                        peg$currPos += 4;
                                    }
                                    else {
                                        s4 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c61);
                                        }
                                    }
                                    if (s4 !== peg$FAILED) {
                                        s1 = [s1, s2, s3, s4];
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.substr(peg$currPos, 2) === peg$c42) {
                                s1 = peg$c42;
                                peg$currPos += 2;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c43);
                                }
                            }
                            if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 3) === peg$c44) {
                                    s1 = peg$c44;
                                    peg$currPos += 3;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c45);
                                    }
                                }
                            }
                            if (s1 !== peg$FAILED) {
                                s2 = peg$parsereq_whitespace();
                                if (s2 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 4) === peg$c58) {
                                        s3 = peg$c58;
                                        peg$currPos += 4;
                                    }
                                    else {
                                        s3 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c59);
                                        }
                                    }
                                    if (s3 !== peg$FAILED) {
                                        s4 = peg$parsereq_whitespace();
                                        if (s4 !== peg$FAILED) {
                                            if (input.substr(peg$currPos, 2) === peg$c48) {
                                                s5 = peg$c48;
                                                peg$currPos += 2;
                                            }
                                            else {
                                                s5 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c49);
                                                }
                                            }
                                            if (s5 !== peg$FAILED) {
                                                s1 = [s1, s2, s3, s4, s5];
                                                s0 = s1;
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                            if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                if (input.substr(peg$currPos, 2) === peg$c42) {
                                    s1 = peg$c42;
                                    peg$currPos += 2;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c43);
                                    }
                                }
                                if (s1 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c44) {
                                        s1 = peg$c44;
                                        peg$currPos += 3;
                                    }
                                    else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c45);
                                        }
                                    }
                                }
                                if (s1 !== peg$FAILED) {
                                    s2 = peg$parsereq_whitespace();
                                    if (s2 !== peg$FAILED) {
                                        if (input.substr(peg$currPos, 9) === peg$c62) {
                                            s3 = peg$c62;
                                            peg$currPos += 9;
                                        }
                                        else {
                                            s3 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c63);
                                            }
                                        }
                                        if (s3 !== peg$FAILED) {
                                            s4 = peg$parsereq_whitespace();
                                            if (s4 !== peg$FAILED) {
                                                if (input.substr(peg$currPos, 4) === peg$c60) {
                                                    s5 = peg$c60;
                                                    peg$currPos += 4;
                                                }
                                                else {
                                                    s5 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c61);
                                                    }
                                                }
                                                if (s5 !== peg$FAILED) {
                                                    s1 = [s1, s2, s3, s4, s5];
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseattribute() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c64) {
            s1 = peg$c64;
            peg$currPos += 7;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c65);
            }
        }
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 115) {
                s2 = peg$c12;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                }
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsereq_whitespace();
                if (s4 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c66) {
                        s5 = peg$c66;
                        peg$currPos += 7;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c67);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 5) === peg$c68) {
                s1 = peg$c68;
                peg$currPos += 5;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c69);
                }
            }
            if (s1 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 115) {
                    s2 = peg$c12;
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c13);
                    }
                }
                if (s2 === peg$FAILED) {
                    s2 = null;
                }
                if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c42) {
                    s1 = peg$c42;
                    peg$currPos += 2;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c44) {
                        s1 = peg$c44;
                        peg$currPos += 3;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsereq_whitespace();
                    if (s2 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c50) {
                            s3 = peg$c50;
                            peg$currPos += 7;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c51);
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            s1 = [s1, s2, s3];
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 5) === peg$c54) {
                        s1 = peg$c54;
                        peg$currPos += 5;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c55);
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 115) {
                            s2 = peg$c12;
                            peg$currPos++;
                        }
                        else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c13);
                            }
                        }
                        if (s2 === peg$FAILED) {
                            s2 = null;
                        }
                        if (s2 !== peg$FAILED) {
                            s1 = [s1, s2];
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.substr(peg$currPos, 4) === peg$c58) {
                            s1 = peg$c58;
                            peg$currPos += 4;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c59);
                            }
                        }
                        if (s1 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 115) {
                                s2 = peg$c12;
                                peg$currPos++;
                            }
                            else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c13);
                                }
                            }
                            if (s2 === peg$FAILED) {
                                s2 = null;
                            }
                            if (s2 !== peg$FAILED) {
                                s1 = [s1, s2];
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.substr(peg$currPos, 2) === peg$c42) {
                                s1 = peg$c42;
                                peg$currPos += 2;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c43);
                                }
                            }
                            if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 3) === peg$c44) {
                                    s1 = peg$c44;
                                    peg$currPos += 3;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c45);
                                    }
                                }
                            }
                            if (s1 !== peg$FAILED) {
                                s2 = peg$parsereq_whitespace();
                                if (s2 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 4) === peg$c58) {
                                        s3 = peg$c58;
                                        peg$currPos += 4;
                                    }
                                    else {
                                        s3 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c59);
                                        }
                                    }
                                    if (s3 !== peg$FAILED) {
                                        s1 = [s1, s2, s3];
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                            if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                if (input.substr(peg$currPos, 2) === peg$c42) {
                                    s1 = peg$c42;
                                    peg$currPos += 2;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c43);
                                    }
                                }
                                if (s1 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c44) {
                                        s1 = peg$c44;
                                        peg$currPos += 3;
                                    }
                                    else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c45);
                                        }
                                    }
                                }
                                if (s1 !== peg$FAILED) {
                                    s2 = peg$parsereq_whitespace();
                                    if (s2 !== peg$FAILED) {
                                        if (input.substr(peg$currPos, 9) === peg$c62) {
                                            s3 = peg$c62;
                                            peg$currPos += 9;
                                        }
                                        else {
                                            s3 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c63);
                                            }
                                        }
                                        if (s3 !== peg$FAILED) {
                                            s1 = [s1, s2, s3];
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseopt_whitespace() {
        let s0, s1;
        s0 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c70;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c71);
            }
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (input.charCodeAt(peg$currPos) === 32) {
                s1 = peg$c70;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c71);
                }
            }
        }
        return s0;
    }
    function peg$parsereq_whitespace() {
        let s0, s1;
        s0 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c70;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c71);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (input.charCodeAt(peg$currPos) === 32) {
                    s1 = peg$c70;
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c71);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseline_end() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parseopt_whitespace();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c72;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c73);
                }
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseletter() {
        let s0;
        if (input.charCodeAt(peg$currPos) === 65) {
            s0 = peg$c74;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c75);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 66) {
                s0 = peg$c76;
                peg$currPos++;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c77);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 67) {
                    s0 = peg$c78;
                    peg$currPos++;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c79);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 68) {
                        s0 = peg$c80;
                        peg$currPos++;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c81);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 69) {
                            s0 = peg$c82;
                            peg$currPos++;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c83);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 70) {
                                s0 = peg$c84;
                                peg$currPos++;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c85);
                                }
                            }
                            if (s0 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 71) {
                                    s0 = peg$c86;
                                    peg$currPos++;
                                }
                                else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c87);
                                    }
                                }
                                if (s0 === peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 72) {
                                        s0 = peg$c88;
                                        peg$currPos++;
                                    }
                                    else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c89);
                                        }
                                    }
                                    if (s0 === peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 73) {
                                            s0 = peg$c90;
                                            peg$currPos++;
                                        }
                                        else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c91);
                                            }
                                        }
                                        if (s0 === peg$FAILED) {
                                            if (input.charCodeAt(peg$currPos) === 74) {
                                                s0 = peg$c92;
                                                peg$currPos++;
                                            }
                                            else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c93);
                                                }
                                            }
                                            if (s0 === peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 75) {
                                                    s0 = peg$c94;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s0 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c95);
                                                    }
                                                }
                                                if (s0 === peg$FAILED) {
                                                    if (input.charCodeAt(peg$currPos) === 76) {
                                                        s0 = peg$c96;
                                                        peg$currPos++;
                                                    }
                                                    else {
                                                        s0 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                            peg$fail(peg$c97);
                                                        }
                                                    }
                                                    if (s0 === peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 77) {
                                                            s0 = peg$c98;
                                                            peg$currPos++;
                                                        }
                                                        else {
                                                            s0 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                                peg$fail(peg$c99);
                                                            }
                                                        }
                                                        if (s0 === peg$FAILED) {
                                                            if (input.charCodeAt(peg$currPos) === 78) {
                                                                s0 = peg$c100;
                                                                peg$currPos++;
                                                            }
                                                            else {
                                                                s0 = peg$FAILED;
                                                                if (peg$silentFails === 0) {
                                                                    peg$fail(peg$c101);
                                                                }
                                                            }
                                                            if (s0 === peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 79) {
                                                                    s0 = peg$c102;
                                                                    peg$currPos++;
                                                                }
                                                                else {
                                                                    s0 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c103);
                                                                    }
                                                                }
                                                                if (s0 === peg$FAILED) {
                                                                    if (input.charCodeAt(peg$currPos) === 80) {
                                                                        s0 = peg$c104;
                                                                        peg$currPos++;
                                                                    }
                                                                    else {
                                                                        s0 = peg$FAILED;
                                                                        if (peg$silentFails === 0) {
                                                                            peg$fail(peg$c105);
                                                                        }
                                                                    }
                                                                    if (s0 === peg$FAILED) {
                                                                        if (input.charCodeAt(peg$currPos) === 81) {
                                                                            s0 = peg$c106;
                                                                            peg$currPos++;
                                                                        }
                                                                        else {
                                                                            s0 = peg$FAILED;
                                                                            if (peg$silentFails === 0) {
                                                                                peg$fail(peg$c107);
                                                                            }
                                                                        }
                                                                        if (s0 === peg$FAILED) {
                                                                            if (input.charCodeAt(peg$currPos) === 82) {
                                                                                s0 = peg$c108;
                                                                                peg$currPos++;
                                                                            }
                                                                            else {
                                                                                s0 = peg$FAILED;
                                                                                if (peg$silentFails === 0) {
                                                                                    peg$fail(peg$c109);
                                                                                }
                                                                            }
                                                                            if (s0 === peg$FAILED) {
                                                                                if (input.charCodeAt(peg$currPos) === 83) {
                                                                                    s0 = peg$c110;
                                                                                    peg$currPos++;
                                                                                }
                                                                                else {
                                                                                    s0 = peg$FAILED;
                                                                                    if (peg$silentFails === 0) {
                                                                                        peg$fail(peg$c111);
                                                                                    }
                                                                                }
                                                                                if (s0 === peg$FAILED) {
                                                                                    if (input.charCodeAt(peg$currPos) === 84) {
                                                                                        s0 = peg$c112;
                                                                                        peg$currPos++;
                                                                                    }
                                                                                    else {
                                                                                        s0 = peg$FAILED;
                                                                                        if (peg$silentFails === 0) {
                                                                                            peg$fail(peg$c113);
                                                                                        }
                                                                                    }
                                                                                    if (s0 === peg$FAILED) {
                                                                                        if (input.charCodeAt(peg$currPos) === 85) {
                                                                                            s0 = peg$c114;
                                                                                            peg$currPos++;
                                                                                        }
                                                                                        else {
                                                                                            s0 = peg$FAILED;
                                                                                            if (peg$silentFails === 0) {
                                                                                                peg$fail(peg$c115);
                                                                                            }
                                                                                        }
                                                                                        if (s0 === peg$FAILED) {
                                                                                            if (input.charCodeAt(peg$currPos) === 86) {
                                                                                                s0 = peg$c116;
                                                                                                peg$currPos++;
                                                                                            }
                                                                                            else {
                                                                                                s0 = peg$FAILED;
                                                                                                if (peg$silentFails === 0) {
                                                                                                    peg$fail(peg$c117);
                                                                                                }
                                                                                            }
                                                                                            if (s0 === peg$FAILED) {
                                                                                                if (input.charCodeAt(peg$currPos) === 87) {
                                                                                                    s0 = peg$c118;
                                                                                                    peg$currPos++;
                                                                                                }
                                                                                                else {
                                                                                                    s0 = peg$FAILED;
                                                                                                    if (peg$silentFails === 0) {
                                                                                                        peg$fail(peg$c119);
                                                                                                    }
                                                                                                }
                                                                                                if (s0 === peg$FAILED) {
                                                                                                    if (input.charCodeAt(peg$currPos) === 88) {
                                                                                                        s0 = peg$c120;
                                                                                                        peg$currPos++;
                                                                                                    }
                                                                                                    else {
                                                                                                        s0 = peg$FAILED;
                                                                                                        if (peg$silentFails === 0) {
                                                                                                            peg$fail(peg$c121);
                                                                                                        }
                                                                                                    }
                                                                                                    if (s0 === peg$FAILED) {
                                                                                                        if (input.charCodeAt(peg$currPos) === 89) {
                                                                                                            s0 = peg$c122;
                                                                                                            peg$currPos++;
                                                                                                        }
                                                                                                        else {
                                                                                                            s0 = peg$FAILED;
                                                                                                            if (peg$silentFails === 0) {
                                                                                                                peg$fail(peg$c123);
                                                                                                            }
                                                                                                        }
                                                                                                        if (s0 === peg$FAILED) {
                                                                                                            if (input.charCodeAt(peg$currPos) === 90) {
                                                                                                                s0 = peg$c124;
                                                                                                                peg$currPos++;
                                                                                                            }
                                                                                                            else {
                                                                                                                s0 = peg$FAILED;
                                                                                                                if (peg$silentFails === 0) {
                                                                                                                    peg$fail(peg$c125);
                                                                                                                }
                                                                                                            }
                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                if (input.charCodeAt(peg$currPos) === 97) {
                                                                                                                    s0 = peg$c126;
                                                                                                                    peg$currPos++;
                                                                                                                }
                                                                                                                else {
                                                                                                                    s0 = peg$FAILED;
                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                        peg$fail(peg$c127);
                                                                                                                    }
                                                                                                                }
                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                    if (input.charCodeAt(peg$currPos) === 98) {
                                                                                                                        s0 = peg$c128;
                                                                                                                        peg$currPos++;
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        s0 = peg$FAILED;
                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                            peg$fail(peg$c129);
                                                                                                                        }
                                                                                                                    }
                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                        if (input.charCodeAt(peg$currPos) === 99) {
                                                                                                                            s0 = peg$c130;
                                                                                                                            peg$currPos++;
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            s0 = peg$FAILED;
                                                                                                                            if (peg$silentFails === 0) {
                                                                                                                                peg$fail(peg$c131);
                                                                                                                            }
                                                                                                                        }
                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                            if (input.charCodeAt(peg$currPos) === 100) {
                                                                                                                                s0 = peg$c132;
                                                                                                                                peg$currPos++;
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                s0 = peg$FAILED;
                                                                                                                                if (peg$silentFails === 0) {
                                                                                                                                    peg$fail(peg$c133);
                                                                                                                                }
                                                                                                                            }
                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                if (input.charCodeAt(peg$currPos) === 101) {
                                                                                                                                    s0 = peg$c134;
                                                                                                                                    peg$currPos++;
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                                        peg$fail(peg$c135);
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                    if (input.charCodeAt(peg$currPos) === 102) {
                                                                                                                                        s0 = peg$c136;
                                                                                                                                        peg$currPos++;
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        s0 = peg$FAILED;
                                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                                            peg$fail(peg$c137);
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                        if (input.charCodeAt(peg$currPos) === 103) {
                                                                                                                                            s0 = peg$c138;
                                                                                                                                            peg$currPos++;
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            s0 = peg$FAILED;
                                                                                                                                            if (peg$silentFails === 0) {
                                                                                                                                                peg$fail(peg$c139);
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                            if (input.charCodeAt(peg$currPos) === 104) {
                                                                                                                                                s0 = peg$c140;
                                                                                                                                                peg$currPos++;
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                s0 = peg$FAILED;
                                                                                                                                                if (peg$silentFails === 0) {
                                                                                                                                                    peg$fail(peg$c141);
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                if (input.charCodeAt(peg$currPos) === 105) {
                                                                                                                                                    s0 = peg$c142;
                                                                                                                                                    peg$currPos++;
                                                                                                                                                }
                                                                                                                                                else {
                                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                                                        peg$fail(peg$c143);
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 106) {
                                                                                                                                                        s0 = peg$c144;
                                                                                                                                                        peg$currPos++;
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        s0 = peg$FAILED;
                                                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                                                            peg$fail(peg$c145);
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                        if (input.charCodeAt(peg$currPos) === 107) {
                                                                                                                                                            s0 = peg$c146;
                                                                                                                                                            peg$currPos++;
                                                                                                                                                        }
                                                                                                                                                        else {
                                                                                                                                                            s0 = peg$FAILED;
                                                                                                                                                            if (peg$silentFails === 0) {
                                                                                                                                                                peg$fail(peg$c147);
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                            if (input.charCodeAt(peg$currPos) === 108) {
                                                                                                                                                                s0 = peg$c148;
                                                                                                                                                                peg$currPos++;
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                s0 = peg$FAILED;
                                                                                                                                                                if (peg$silentFails === 0) {
                                                                                                                                                                    peg$fail(peg$c149);
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                if (input.charCodeAt(peg$currPos) === 109) {
                                                                                                                                                                    s0 = peg$c150;
                                                                                                                                                                    peg$currPos++;
                                                                                                                                                                }
                                                                                                                                                                else {
                                                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                                                                        peg$fail(peg$c151);
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 110) {
                                                                                                                                                                        s0 = peg$c152;
                                                                                                                                                                        peg$currPos++;
                                                                                                                                                                    }
                                                                                                                                                                    else {
                                                                                                                                                                        s0 = peg$FAILED;
                                                                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                                                                            peg$fail(peg$c153);
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                        if (input.charCodeAt(peg$currPos) === 111) {
                                                                                                                                                                            s0 = peg$c154;
                                                                                                                                                                            peg$currPos++;
                                                                                                                                                                        }
                                                                                                                                                                        else {
                                                                                                                                                                            s0 = peg$FAILED;
                                                                                                                                                                            if (peg$silentFails === 0) {
                                                                                                                                                                                peg$fail(peg$c155);
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                            if (input.charCodeAt(peg$currPos) === 112) {
                                                                                                                                                                                s0 = peg$c156;
                                                                                                                                                                                peg$currPos++;
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                s0 = peg$FAILED;
                                                                                                                                                                                if (peg$silentFails === 0) {
                                                                                                                                                                                    peg$fail(peg$c157);
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                if (input.charCodeAt(peg$currPos) === 113) {
                                                                                                                                                                                    s0 = peg$c158;
                                                                                                                                                                                    peg$currPos++;
                                                                                                                                                                                }
                                                                                                                                                                                else {
                                                                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                                                                                        peg$fail(peg$c159);
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 114) {
                                                                                                                                                                                        s0 = peg$c160;
                                                                                                                                                                                        peg$currPos++;
                                                                                                                                                                                    }
                                                                                                                                                                                    else {
                                                                                                                                                                                        s0 = peg$FAILED;
                                                                                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                                                                                            peg$fail(peg$c161);
                                                                                                                                                                                        }
                                                                                                                                                                                    }
                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                        if (input.charCodeAt(peg$currPos) === 115) {
                                                                                                                                                                                            s0 = peg$c12;
                                                                                                                                                                                            peg$currPos++;
                                                                                                                                                                                        }
                                                                                                                                                                                        else {
                                                                                                                                                                                            s0 = peg$FAILED;
                                                                                                                                                                                            if (peg$silentFails === 0) {
                                                                                                                                                                                                peg$fail(peg$c13);
                                                                                                                                                                                            }
                                                                                                                                                                                        }
                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                            if (input.charCodeAt(peg$currPos) === 116) {
                                                                                                                                                                                                s0 = peg$c162;
                                                                                                                                                                                                peg$currPos++;
                                                                                                                                                                                            }
                                                                                                                                                                                            else {
                                                                                                                                                                                                s0 = peg$FAILED;
                                                                                                                                                                                                if (peg$silentFails === 0) {
                                                                                                                                                                                                    peg$fail(peg$c163);
                                                                                                                                                                                                }
                                                                                                                                                                                            }
                                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                                if (input.charCodeAt(peg$currPos) === 117) {
                                                                                                                                                                                                    s0 = peg$c164;
                                                                                                                                                                                                    peg$currPos++;
                                                                                                                                                                                                }
                                                                                                                                                                                                else {
                                                                                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                                                                                                        peg$fail(peg$c165);
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 118) {
                                                                                                                                                                                                        s0 = peg$c166;
                                                                                                                                                                                                        peg$currPos++;
                                                                                                                                                                                                    }
                                                                                                                                                                                                    else {
                                                                                                                                                                                                        s0 = peg$FAILED;
                                                                                                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                                                                                                            peg$fail(peg$c167);
                                                                                                                                                                                                        }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                                        if (input.charCodeAt(peg$currPos) === 119) {
                                                                                                                                                                                                            s0 = peg$c168;
                                                                                                                                                                                                            peg$currPos++;
                                                                                                                                                                                                        }
                                                                                                                                                                                                        else {
                                                                                                                                                                                                            s0 = peg$FAILED;
                                                                                                                                                                                                            if (peg$silentFails === 0) {
                                                                                                                                                                                                                peg$fail(peg$c169);
                                                                                                                                                                                                            }
                                                                                                                                                                                                        }
                                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                                            if (input.charCodeAt(peg$currPos) === 120) {
                                                                                                                                                                                                                s0 = peg$c170;
                                                                                                                                                                                                                peg$currPos++;
                                                                                                                                                                                                            }
                                                                                                                                                                                                            else {
                                                                                                                                                                                                                s0 = peg$FAILED;
                                                                                                                                                                                                                if (peg$silentFails === 0) {
                                                                                                                                                                                                                    peg$fail(peg$c171);
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }
                                                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                                                if (input.charCodeAt(peg$currPos) === 121) {
                                                                                                                                                                                                                    s0 = peg$c172;
                                                                                                                                                                                                                    peg$currPos++;
                                                                                                                                                                                                                }
                                                                                                                                                                                                                else {
                                                                                                                                                                                                                    s0 = peg$FAILED;
                                                                                                                                                                                                                    if (peg$silentFails === 0) {
                                                                                                                                                                                                                        peg$fail(peg$c173);
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }
                                                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 122) {
                                                                                                                                                                                                                        s0 = peg$c174;
                                                                                                                                                                                                                        peg$currPos++;
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    else {
                                                                                                                                                                                                                        s0 = peg$FAILED;
                                                                                                                                                                                                                        if (peg$silentFails === 0) {
                                                                                                                                                                                                                            peg$fail(peg$c175);
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }
                                                                                                                                                                                                        }
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                                                                                                                                                                                            }
                                                                                                                                                                                        }
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsedigit() {
        let s0;
        if (input.charCodeAt(peg$currPos) === 48) {
            s0 = peg$c2;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c3);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 49) {
                s0 = peg$c6;
                peg$currPos++;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c7);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 50) {
                    s0 = peg$c176;
                    peg$currPos++;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c177);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 51) {
                        s0 = peg$c178;
                        peg$currPos++;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c179);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 52) {
                            s0 = peg$c180;
                            peg$currPos++;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c181);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 53) {
                                s0 = peg$c182;
                                peg$currPos++;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c183);
                                }
                            }
                            if (s0 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 54) {
                                    s0 = peg$c184;
                                    peg$currPos++;
                                }
                                else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c185);
                                    }
                                }
                                if (s0 === peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 55) {
                                        s0 = peg$c186;
                                        peg$currPos++;
                                    }
                                    else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c187);
                                        }
                                    }
                                    if (s0 === peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 56) {
                                            s0 = peg$c188;
                                            peg$currPos++;
                                        }
                                        else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c189);
                                            }
                                        }
                                        if (s0 === peg$FAILED) {
                                            if (input.charCodeAt(peg$currPos) === 57) {
                                                s0 = peg$c190;
                                                peg$currPos++;
                                            }
                                            else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c191);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsepunctuation() {
        let s0;
        if (input.charCodeAt(peg$currPos) === 32) {
            s0 = peg$c70;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c71);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 95) {
                s0 = peg$c192;
                peg$currPos++;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c193);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                    s0 = peg$c194;
                    peg$currPos++;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c195);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 45) {
                        s0 = peg$c196;
                        peg$currPos++;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c197);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 33) {
                            s0 = peg$c198;
                            peg$currPos++;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c199);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 63) {
                                s0 = peg$c200;
                                peg$currPos++;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c201);
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsecharacter() {
        let s0;
        s0 = peg$parseletter();
        if (s0 === peg$FAILED) {
            s0 = peg$parsedigit();
            if (s0 === peg$FAILED) {
                s0 = peg$parsepunctuation();
            }
        }
        return s0;
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
export const parse = peg$parse;
//# sourceMappingURL=assertion-parser.js.map