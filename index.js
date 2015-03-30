var bdsm = require('bdsm');
var path = require('path');

var mockupBackgroundImage = function (decl, options) {
    var imagePath = extractPath(decl.value);
    var fullPath = path.join(options.basePath, imagePath);

    return getImageColors(fullPath).then(function (colors) {
        // todo ??
        //decl.cloneBefore({
        //    prop: 'background',
        //    value: gradient(colors.top, colors.bottom)
        //});

        decl.parent.insertBefore(decl, 'background-image: ' + gradient(colors.top, colors.bottom));
    });
};

var extractPath = function (value) {
    // todo good extract
    return value.match(/url\("(.+)"\)/)[1];
};

var getImageColors = function (imagePath) {
    return bdsm.findDominantColors(imagePath);
};

var gradient = function (top, bottom) {
   return 'linear-gradient(' + rgb(top) + ', ' + rgb(bottom) + ')';
};

var rgb = function (color) {
    return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
};

module.exports = function (options) {
    options = options || {};
    options.basePath = options.basePath || '';

    return function (css) {
        var processingDecls = [];

        css.eachDecl(/^(background|background-image)$/, function (decl) {
            processingDecls.push(mockupBackgroundImage(decl, options));
        });

        return Promise.all(processingDecls);
    };
};

module.exports.postcss = function (css) {
    return module.exports()(css);
};
