var bdsm = require('bdsm');

var gradient = function (top, bottom) {
   return 'linear-gradient(' + rgb(top) + ', ' + rgb(bottom) + ')';
};

var extractPath = function (value) {
    var path = value.match(/url\("(.+)"\)/)[1];
    return 'test/img/'+path;
};

var rgb = function (color) {
    return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
};

var getImageColors = function (imagePath, cb) {
    //cb({
    //    top: {r: 255, g: 0, b: 0},
    //    bottom: {r: 0, g: 0, b: 255}
    //});

    bdsm.findDominantColors(imagePath).then(cb);
};

var changeBackgroundValue = function (decl, cb) {
    imagePath = extractPath(decl.value);

    getImageColors(imagePath, function (colors) {
        decl.value = gradient(colors.top, colors.bottom);
        cb();
    });
};


module.exports = function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {
        var count = 0;

        return new Promise(function (resolve, reject) {
            css.eachDecl(function (decl) {
                if (decl.prop == 'background') {
                    count++;
                    changeBackgroundValue(decl, function () {
                        count--;
                        if (!count) {
                            resolve();
                        }
                    });
                }
            });
        });
    };
};

module.exports.postcss = function (css) {
    return module.exports()(css);
};
