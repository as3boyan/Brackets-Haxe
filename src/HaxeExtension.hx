package ;

import brackets.Brackets;
import brackets.command.CommandManager;
import brackets.command.Menu;
import brackets.command.Menus;
import brackets.extensions.Extension;
import brackets.filesystem.FileSystem;
import brackets.filesystem.File;
import brackets.project.ProjectManager;
import brackets.file.FileUtils;
import js.Lib;
//import brackets.utils.NodeConnection;
import brackets.utils.ExtensionUtils;
import brackets.utils.AppInit;
import js.Browser;

/**
 * Hello World extension which replicates the one from the Brackets wiki: 
 * 
 * https://github.com/adobe/brackets/wiki/Simple-%22Hello-World%22-extension
 *
 * @author AS3BoyanHugo Campos <hcfields@gmail.com> (www.hccampos.net)
 */

/**
 * @author AS3Boyan
 */
class HaxeExtension extends Extension {
    private static inline var PROJECT_NEW_ID = "haxe.project.new";
	private static inline var PROJECT_OPEN_ID = "haxe.project.open";
	private static inline var PROJECT_BUILD_ID = "haxe.project.build";
	private static inline var PROJECT_RUN_ID = "haxe.project.run";
	private static inline var PROJECT_CONFIGURE_ID = "haxe.project.configure";
	var filesystem:FileSystem;
	var file:File;
	var fileutils:FileUtils;
	var projectManager:ProjectManager;
	var NodeConnection:Dynamic;
	var extensionUtils:ExtensionUtils;
	var nodeConnection:Dynamic;

    /**
     * Constructor.
     */
    public function new() 
	{
        super();
    }

    /**
     * Initializes the extension.
     */
    override public function initialize():Void 
	{
        super.initialize();

		 // Get the modules we will need.
        var commandManager:CommandManager = Brackets.getModule("command/CommandManager");
        var menus:Menus = Brackets.getModule("command/Menus");
		projectManager = Brackets.getModule("project/ProjectManager");
		fileutils = Brackets.getModule("file/FileUtils");
		
        // Register our command with brackets so it will know about it when we click the
        // menu item which will be created below.
        commandManager.register("New...", PROJECT_NEW_ID, newProject);
		commandManager.register("Open", PROJECT_OPEN_ID, openProject);
		commandManager.register("Build", PROJECT_BUILD_ID, buildProject);
		commandManager.register("Run", PROJECT_RUN_ID, runProject);
		commandManager.register("Configure...", PROJECT_CONFIGURE_ID, configureProject);

        // Create a new menu item in the file menu and associate it with the command we created above.
        var menu:Menu = menus.addMenu("Project", "haxe.project", "", "");
        menu.addMenuItem(PROJECT_NEW_ID);
		menu.addMenuItem(PROJECT_OPEN_ID);
		menu.addMenuItem(PROJECT_BUILD_ID);
		menu.addMenuItem(PROJECT_RUN_ID);
		menu.addMenuItem(PROJECT_CONFIGURE_ID);
		
		filesystem = Brackets.getModule("filesystem/FileSystem");
		file = Brackets.getModule("filesystem/File");
		extensionUtils = Brackets.getModule("utils/ExtensionUtils");
		NodeConnection = Brackets.getModule("utils/NodeConnection");
		
		var appInit:AppInit = Brackets.getModule("utils/AppInit");
		appInit.appReady(appLoaded);
    }

	public function appLoaded():Void
	{		
		nodeConnection = Type.createInstance(NodeConnection, []);
		
		chain([connect, loadSimpleDomain, exec]);
	}
	
	private function connect()
	{
		var connectionPromise = nodeConnection.connect(true);
		connectionPromise.fail(function ()
		{
			trace("[brackets-simple-node] failed to connect to node");
		}
		);
		return connectionPromise;
	}
	
	private function loadSimpleDomain()
	{
		var path = extensionUtils.getModulePath(module, "node/CompileHaxe");
		var loadPromise = nodeConnection.loadDomains([path], true);
		loadPromise.fail(function () {
			trace("[brackets-simple-node] failed to load domain");
		});
		return loadPromise;
	}
	
	private function exec()
	{
		var execPromise = nodeConnection.domains.Haxe.exec("", "haxe");
		
		execPromise.fail(function (err)
		{
			trace(err);
		}
		);
		
		execPromise.done(function (data)
		{
			trace(data);
		}
		);
		
		return execPromise;
	}
	
	private function chain(p_functions:Array<Dynamic>)
	{
		var functions:Array<Dynamic> = p_functions.copy();
		
		if (functions.length > 0)
		{
			var firstFunction = functions.shift();
			var firstPromise = firstFunction();
			firstPromise.done(function ()
			{
				chain(functions);
			}
			);
		}
	}
	
    /**
     * Method which will be called when the user clicks the menu item that the extension
     * creates in the file menu.
     */
    public function newProject():Void 
	{
		Browser.window.alert("New");
    }
	
	public function openProject():Void 
	{		
		filesystem.showOpenDialog(false, false, "Open Project", "", null, function (error, list):Void
		{
			var extension:String = fileutils.getFileExtension(list[0]);
			
			switch (extension) 
			{
				case "hxml":
				case "xml":
					
				default:
					
			}
			
			//trace(projectManager);
			
			var path:String = fileutils.convertWindowsPathToUnixPath(list[0]);
			projectManager.openProject(fileutils.getDirectoryPath(path));
			
			trace(extension);
			
			//filesystem.getFileForPath(list[0]).read({}, function (err, data, stat):Void
			//{
				//trace(data);
				//trace(stat);
			//}
			//);
		}
		);
    }
	
	 public function buildProject():Void 
	{
		Browser.window.alert("Build");
    }
	
	 public function runProject():Void 
	{
		Browser.window.alert("Run");
    }
	
	 public function configureProject():Void 
	{
		Browser.window.alert("Configure");
    }
}