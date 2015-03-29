// dependencies
var fs = require("fs");
var postcss = require("postcss");
var url = require("postcss-url");
var background = require("./background");

// css to be processed
var css = fs.readFileSync("input.css", "utf8");

// process css
var output = postcss()
	.use(background)
	.process(css, {
		// "rebase" mode need at least one of those options
		// "inline" mode might need `from` option only
		from: "src/stylesheet/index.css",
		to: "dist/index.css"
	}).css;


console.log(output);