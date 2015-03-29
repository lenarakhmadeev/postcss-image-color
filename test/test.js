var postcss = require('postcss');
var expect  = require('chai').expect;
var fs = require('fs');
var imageMockup = require('../');

var asyncTest = function (input, output, options, done) {
    postcss(imageMockup(options))
        .process(input)
        .then(function (processed) {
            expect(processed.css).to.eql(output);
            done();
        })
        .catch(done);
};

var getCssText = function (name) {
    return fs.readFileSync(__dirname + '/fixtures/' + name + '.css', 'utf8');
};

describe('postcss-image-mockup', function () {
    it('From background', function (done) {
        var input = getCssText('1');
        var output = getCssText('1.out');
        asyncTest(input, output, {basePath: 'test/img'}, done);
    });
});
