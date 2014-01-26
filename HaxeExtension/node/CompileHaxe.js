(function () { "use strict";
var CompileHaxe = function() { }
CompileHaxe.main = function() {
	var init = function(DomainManager) {
		if(!DomainManager.hasDomain("Haxe")) DomainManager.registerDomain("Haxe",{ major : 0, minor : 1});
		DomainManager.registerCommand("Haxe","compileHxml",CompileHaxe.compileHxml,false,"Compiles hxml files",[],[{ name : "data", type : "{error: number, code: number}", description : "exit code and error description"}]);
	};
	exports.init = init;
}
CompileHaxe.compileHxml = function() {
}
CompileHaxe.main();
})();
