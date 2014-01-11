(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var brackets_externs = {};
brackets_externs.extensions = {};
brackets_externs.extensions.IExtension = function() { };
brackets_externs.extensions.Extension = function() {
	var _g = this;
	brackets_externs.Brackets.define(function(require,exports,module) {
		_g._require = require;
		_g.initialize();
	});
};
brackets_externs.extensions.Extension.__interfaces__ = [brackets_externs.extensions.IExtension];
brackets_externs.extensions.Extension.prototype = {
	initialize: function() {
	}
	,require: function(moduleName) {
		return this._require(moduleName);
	}
};
var HaxeExtension = function() {
	brackets_externs.extensions.Extension.call(this);
};
HaxeExtension.__super__ = brackets_externs.extensions.Extension;
HaxeExtension.prototype = $extend(brackets_externs.extensions.Extension.prototype,{
	initialize: function() {
		brackets_externs.extensions.Extension.prototype.initialize.call(this);
		var commandManager = brackets_externs.Brackets.getModule("command/CommandManager");
		var menus = brackets_externs.Brackets.getModule("command/Menus");
		commandManager.register("New...","haxe.project.new",$bind(this,this.newProject));
		commandManager.register("Open","haxe.project.open",$bind(this,this.openProject));
		commandManager.register("Build","haxe.project.build",$bind(this,this.buildProject));
		commandManager.register("Run","haxe.project.run",$bind(this,this.runProject));
		commandManager.register("Configure...","haxe.project.configure",$bind(this,this.configureProject));
		var menu = menus.addMenu("Project","haxe.project","","");
		menu.addMenuItem("haxe.project.new");
		menu.addMenuItem("haxe.project.open");
		menu.addMenuItem("haxe.project.build");
		menu.addMenuItem("haxe.project.run");
		menu.addMenuItem("haxe.project.configure");
	}
	,newProject: function() {
		var f = ($_=window,$bind($_,$_.alert));
		function() {
			return f("New");
		};
	}
	,openProject: function() {
		var f = ($_=window,$bind($_,$_.alert));
		function() {
			return f("Open");
		};
	}
	,buildProject: function() {
		var f = ($_=window,$bind($_,$_.alert));
		function() {
			return f("Build");
		};
	}
	,runProject: function() {
		var f = ($_=window,$bind($_,$_.alert));
		function() {
			return f("Run");
		};
	}
	,configureProject: function() {
		var f = ($_=window,$bind($_,$_.alert));
		function() {
			return f("Configure");
		};
	}
});
var Main = function() { };
Main.main = function() {
	var extension = new HaxeExtension();
};
brackets_externs.Brackets = function() {
};
brackets_externs.Brackets.define = function(constructor) {
	define(constructor);
};
brackets_externs.Brackets.getModule = function(module) {
	return brackets.getModule(module);
};
brackets_externs.utils = {};
brackets_externs.utils.CursorPos = function(line,ch) {
	this.line = line;
	this.ch = ch;
};
brackets_externs.utils.KeyBinding = function(key,platform) {
	this.key = key;
	this.platform = platform;
};
brackets_externs.utils.Range = function(startLine,endLine) {
	this.startLine = startLine;
	this.endLine = endLine;
};
brackets_externs.utils.ScrollPos = function(x,y) {
	this.x = x;
	this.y = y;
};
brackets_externs.utils.Selection = function(start,end) {
	this.start = start;
	this.end = end;
};
var js = {};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
var q = window.jQuery;
js.JQuery = q;
HaxeExtension.PROJECT_NEW_ID = "haxe.project.new";
HaxeExtension.PROJECT_OPEN_ID = "haxe.project.open";
HaxeExtension.PROJECT_BUILD_ID = "haxe.project.build";
HaxeExtension.PROJECT_RUN_ID = "haxe.project.run";
HaxeExtension.PROJECT_CONFIGURE_ID = "haxe.project.configure";
Main.main();
})();
