"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["R"] = 0] = "R";
    Direction[Direction["L"] = 1] = "L";
})(Direction = exports.Direction || (exports.Direction = {}));
// eslint-disable-next-line @typescript-eslint/no-require-imports
exports.MathQuill = require('exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery!@edtr-io/mathquill/build/mathquill.js');
exports.MQ = exports.MathQuill.getInterface(2);
