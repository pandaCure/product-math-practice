"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style/mathquill.scss");
// eslint-disable-next-line @typescript-eslint/no-require-imports
exports.MathQuill = require('exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery!@edtr-io/mathquill/build/mathquill.js');
exports.MQ = exports.MathQuill.getInterface(2);
