var postcss = require('postcss');
var expect  = require('chai').expect;
var fs = require("fs");
var css = fs.readFileSync("input.css", "utf8");
var plugin = require('../');


var test = function (input, output, opts) {
    var processed = postcss(plugin(opts)).process(input).css;
    expect(processed).to.eql(output);
};

var asyncTest = function (input, output, opts, cb) {
    postcss(plugin(opts))
        .process(input)
        .then(function (processed) {
            setTimeout(function() {
                expect(processed.css).to.eql(output);
                cb();
            });
        });
};

var getCssText = function (name) {
    return fs.readFileSync('test/css/' + name + '.css', 'utf8');
};

describe('postcss-background', function () {
    it('does something', function (done) {
        var input = getCssText('1');
        var output = getCssText('1.out');
        asyncTest(input, output, {}, done);
    });
});
