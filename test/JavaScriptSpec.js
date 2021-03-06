define(function JavaScriptSpec(require) {
    "use strict";

    var Parser = require("lexers/JSParser");

    describe("JS Parser", function () {
        it("detects a function declarations and expressions", function () {
            var test = require("text!example/javascript/function.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(3);

            expect(result[0].args.length).toEqual(0);
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(1);
            expect(result[0].name).toEqual("a");
            expect(result[0].type).toEqual("public");

            expect(result[1].args.length).toEqual(0);
            expect(result[1].level).toEqual(0);
            expect(result[1].line).toEqual(3);
            expect(result[1].name).toEqual("b");
            expect(result[1].type).toEqual("public");

            expect(result[2].args.length).toEqual(0);
            expect(result[2].level).toEqual(0);
            expect(result[2].line).toEqual(5);
            expect(result[2].name).toEqual("d");
            expect(result[2].type).toEqual("public");
        });

        it("detects an unnamed function", function () {
            var test = require("text!example/javascript/unnamedFunction.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(1);

            expect(result[0].args.length).toEqual(0);
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(1);
            expect(result[0].name).toEqual("function");
            expect(result[0].type).toEqual("unnamed");
        });

        it("detects a class and class methods", function () {
            var test = require("text!example/javascript/classMethod.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(3);

            expect(result[0].args.length).toEqual(0);
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(1);
            expect(result[0].name).toEqual("Name");
            expect(result[0].type).toEqual("class");

            expect(result[1].args.length).toEqual(0);
            expect(result[1].level).toEqual(0);
            expect(result[1].line).toEqual(3);
            expect(result[1].name).toEqual("getString");
            expect(result[1].type).toEqual("public");

            expect(result[2].args.length).toEqual(0);
            expect(result[2].level).toEqual(0);
            expect(result[2].line).toEqual(5);
            expect(result[2].name).toEqual("_getPrivateString");
            expect(result[2].type).toEqual("private");
        });

        it("detects function parameters", function () {
            var test = require("text!example/javascript/functionParameters.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(2);

            expect(result[0].args.length).toEqual(2);
            expect(result[0].args[0]).toEqual("a");
            expect(result[0].args[1]).toEqual("b");
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(1);
            expect(result[0].name).toEqual("withParameters");
            expect(result[0].type).toEqual("public");

            expect(result[1].args.length).toEqual(2);
            expect(result[1].args[0]).toEqual("a=1");
            expect(result[1].args[1]).toEqual("b=" + Parser.ARG_DEFAULT_PLACEHOLDER);
            expect(result[1].level).toEqual(0);
            expect(result[1].line).toEqual(3);
            expect(result[1].name).toEqual("withDefaultParameters");
            expect(result[1].type).toEqual("public");
        });

        it("detects ES6 functions", function () {
            var test = require("text!example/javascript/ES6.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(3);

            expect(result[0].args.length).toEqual(0);
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(2);
            expect(result[0].name).toEqual("one");
            expect(result[0].type).toEqual("public");

            expect(result[1].args.length).toEqual(0);
            expect(result[1].level).toEqual(0);
            expect(result[1].line).toEqual(3);
            expect(result[1].name).toEqual("two");
            expect(result[1].type).toEqual("public");

            expect(result[2].args.length).toEqual(0);
            expect(result[2].level).toEqual(0);
            expect(result[2].line).toEqual(4);
            expect(result[2].name).toEqual("three");
            expect(result[2].type).toEqual("public");
        });

        it("detects generator functions", function () {
            var test = require("text!example/javascript/generator.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(1);

            expect(result[0].args.length).toEqual(1);
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(1);
            expect(result[0].name).toEqual("generator");
            expect(result[0].type).toEqual("generator");
        });

        it("detects nested functions", function () {
            var test = require("text!example/javascript/nestedFunctions.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(3);

            expect(result[0].args.length).toEqual(0);
            expect(result[0].level).toEqual(0);
            expect(result[0].line).toEqual(1);
            expect(result[0].name).toEqual("a");
            expect(result[0].type).toEqual("public");

            expect(result[1].args.length).toEqual(0);
            expect(result[1].level).toEqual(1);
            expect(result[1].line).toEqual(2);
            expect(result[1].name).toEqual("b");
            expect(result[1].type).toEqual("public");

            expect(result[2].args.length).toEqual(0);
            expect(result[2].level).toEqual(2);
            expect(result[2].line).toEqual(3);
            expect(result[2].name).toEqual("c");
            expect(result[2].type).toEqual("public");
        });

        it("detects es6 classes", function () {
            var test = require("text!example/javascript/class.js");
            var result = Parser.parse(test);

            expect(result).toEqual([
                {
                    type: "class",
                    name: "Class",
                    args: [],
                    level: 0,
                    line: 1
                }, {
                    type: "public",
                    name: "method",
                    args: ["argument"],
                    level: 1,
                    line: 2
                }, {
                    type: "public",
                    name: "field",
                    args: [],
                    level: 1,
                    line: 3
                }, {
                    type: "public",
                    name: "field",
                    args: ["value"],
                    level: 1,
                    line: 4
                }, {
                    type: "class",
                    name: "SubClass",
                    args: ["SuperClass"],
                    level: 0,
                    line: 7
                }
            ]);
        });

        it("detects comments", function () {
            var test = require("text!example/javascript/comment.js");
            var result = Parser.parse(test);

            expect(result.length).toEqual(0);
        });

        it("error", function () {
            var test = require("text!example/javascript/error.js");
            expect(function () {
                Parser.parse(test);
            }).toThrowError("SyntaxError");
        });
    });
});
