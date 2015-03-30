var through = require('through2');
var postcss = require('postcss');

// todo errors
module.exports = function (plugins) {

    var transform = function transform (file, encoding, cb) {
        var processor = postcss();
        plugins.forEach(processor.use.bind(processor));

        processor.process(file.contents.toString())
            .then(function (processed) {
                file.contents = new Buffer(processed.css);
                cb(null, file);
            });
    };

    return through.obj(transform);
};