package ;
import js.Node;

/**
 * ...
 * @author AS3Boyan
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
 
class CompileHaxe
{

	public static function main() 
	{		
		untyped __js__("exports.init = this.init");
	}
	
	private static function init(DomainManager:brackets.DomainManager)
	{
		if (!DomainManager.hasDomain("Haxe")) 
		{
			DomainManager.registerDomain("Haxe", {major: 0, minor: 1});
		}
		
		DomainManager.registerCommand(
		"Haxe",       // domain name
		"exec",    // command name
		exec,   // command handler function
		true,          // this command is synchronous
		"Compiles hxml files",
		[ 
		{
			name: "path",
			type: "string",
			description: ""
		},
		{
			name: "command",
			type: "string",
			description: ""
		}
		],             // no parameters
		[
		{
			name: "data",
			type: "fn(error, stdout: string, stderr: string)",
			description: ""
		} ]
		);
	}
	
	private static function exec(path:String, command:String, onComplete:Dynamic)
	{		
		js.Node.childProcess.exec(command, { cwd: path }, function (error, stdout, stderr)
		{
			onComplete(error, {error: error, stdout: stdout, stderr: stderr});
		}
		);
	}
	
}