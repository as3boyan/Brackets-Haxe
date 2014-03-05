(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var brackets_externs = {}
brackets_externs.extensions = {}
brackets_externs.extensions.IExtension = function() { }
brackets_externs.extensions.Extension = function() {
	var _g = this;
	brackets_externs.Brackets.define(function(require,exports,p_module) {
		_g._require = require;
		_g.module = p_module;
		_g.initialize();
	});
};
brackets_externs.extensions.Extension.__interfaces__ = [brackets_externs.extensions.IExtension];
brackets_externs.extensions.Extension.prototype = {
	require: function(moduleName) {
		return this._require(moduleName);
	}
	,initialize: function() {
	}
}
var HaxeExtension = function() {
	brackets_externs.extensions.Extension.call(this);
};
HaxeExtension.__super__ = brackets_externs.extensions.Extension;
HaxeExtension.prototype = $extend(brackets_externs.extensions.Extension.prototype,{
	configureProject: function() {
		js.Browser.window.alert("Configure");
	}
	,runProject: function() {
		js.Browser.window.alert("Run");
	}
	,buildProject: function() {
		js.Browser.window.alert("Build");
	}
	,openProject: function() {
		var _g = this;
		this.filesystem.showOpenDialog(false,false,"Open Project","",null,function(error,list) {
			var extension = _g.fileutils.getFileExtension(list[0]);
			switch(extension) {
			case "hxml":
				break;
			case "xml":
				break;
			default:
			}
			var path = _g.fileutils.convertWindowsPathToUnixPath(list[0]);
			_g.projectManager.openProject(_g.fileutils.getDirectoryPath(path));
			console.log(extension);
		});
	}
	,newProject: function() {
		js.Browser.window.alert("New");
	}
	,chain: function(p_functions) {
		var _g = this;
		var functions = p_functions.slice();
		if(functions.length > 0) {
			var firstFunction = functions.shift();
			var firstPromise = firstFunction();
			firstPromise.done(function() {
				_g.chain(functions);
			});
		}
	}
	,exec: function() {
		var execPromise = this.nodeConnection.domains.Haxe.exec("","haxe");
		execPromise.fail(function(err) {
			console.log(err);
		});
		execPromise.done(function(data) {
			console.log(data);
		});
		return execPromise;
	}
	,loadSimpleDomain: function() {
		var path = this.extensionUtils.getModulePath(this.module,"node/CompileHaxe");
		var loadPromise = this.nodeConnection.loadDomains([path],true);
		loadPromise.fail(function() {
			console.log("[brackets-simple-node] failed to load domain");
		});
		return loadPromise;
	}
	,connect: function() {
		var connectionPromise = this.nodeConnection.connect(true);
		connectionPromise.fail(function() {
			console.log("[brackets-simple-node] failed to connect to node");
		});
		return connectionPromise;
	}
	,appLoaded: function() {
		this.nodeConnection = Type.createInstance(this.NodeConnection,[]);
		this.chain([$bind(this,this.connect),$bind(this,this.loadSimpleDomain),$bind(this,this.exec)]);
	}
	,initialize: function() {
		brackets_externs.extensions.Extension.prototype.initialize.call(this);
		var commandManager = brackets_externs.Brackets.getModule("command/CommandManager");
		var menus = brackets_externs.Brackets.getModule("command/Menus");
		this.projectManager = brackets_externs.Brackets.getModule("project/ProjectManager");
		this.fileutils = brackets_externs.Brackets.getModule("file/FileUtils");
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
		this.filesystem = brackets_externs.Brackets.getModule("filesystem/FileSystem");
		this.file = brackets_externs.Brackets.getModule("filesystem/File");
		this.extensionUtils = brackets_externs.Brackets.getModule("utils/ExtensionUtils");
		this.NodeConnection = brackets_externs.Brackets.getModule("utils/NodeConnection");
		var appInit = brackets_externs.Brackets.getModule("utils/AppInit");
		appInit.appReady($bind(this,this.appLoaded));
	}
});
var Main = function() { }
Main.main = function() {
	var extension = new HaxeExtension();
}
var Type = function() { }
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
brackets_externs.Brackets = function() {
};
brackets_externs.Brackets.define = function(constructor) {
	define(constructor);
}
brackets_externs.Brackets.getModule = function(module) {
	return brackets.getModule(module);
}
brackets_externs.utils = {}
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
var js = {}
js.Browser = function() { }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
var q = window.jQuery;
js.JQuery = q;
HaxeExtension.PROJECT_NEW_ID = "haxe.project.new";
HaxeExtension.PROJECT_OPEN_ID = "haxe.project.open";
HaxeExtension.PROJECT_BUILD_ID = "haxe.project.build";
HaxeExtension.PROJECT_RUN_ID = "haxe.project.run";
HaxeExtension.PROJECT_CONFIGURE_ID = "haxe.project.configure";
js.Browser.window = typeof window != "undefined" ? window : null;
Main.main();
})();
