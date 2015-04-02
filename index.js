var postcss = require('postcss');
var bdsm = require('bdsm');
var path = require('path');

var COLOR_PATTERN = /image-color\("(.+?)"\)/;
var COLOR_PATTERN_GLOB = /image-color\("(.+?)"\)/g;

var replacePattern = function (decl, options) {
    var colorImages = decl.value.match(COLOR_PATTERN_GLOB);

    if (!colorImages) {
        return Promise.resolve();
    }

    var colorPromises = getColors(colorImages, options);

    return Promise.all(colorPromises)
        .then(function (colors) {
            decl.value = colors
                .map(rgb)
                .reduce(function (acc, val) {
                    return acc.replace(COLOR_PATTERN, val);
                }, decl.value);
        });
};

var getColors = function (colorImages, options) {
    return colorImages.map(function (image) {
        var imagePath = fullPath(options.basePath, extractPath(image));
        return getImageColor(imagePath);
    });
};

var getImageColor = function (imagePath) {
    return bdsm.findDominantColors(imagePath)
        .then(function (colors) {
            return colors.top;
        });
};

var extractPath = function (value) {
    return value.match(COLOR_PATTERN)[1];
};

var fullPath = function (basePath, imagePath) {
    return path.join(basePath, imagePath);
};

var rgb = function (color) {
    return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
};

var plugin = function (options) {
    options = options || {};
    options.basePath = options.basePath || '';

    return function (css) {
        var processingDecls = [];

        css.eachDecl(function (decl) {
            processingDecls.push(replacePattern(decl, options));
        });

        return Promise.all(processingDecls);
    };
};

module.exports = postcss.plugin('postcss-average-color', plugin);
