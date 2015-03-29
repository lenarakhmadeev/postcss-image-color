var background = function (css) {
	css.eachDecl(function (decl) {
		decl.value = 'blue';
		console.log(decl);
	});
};

module.exports = background;