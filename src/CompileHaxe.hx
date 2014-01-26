package ;

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
		var init = function (DomainManager:brackets.DomainManager)
		{
			if (!DomainManager.hasDomain("Haxe")) 
			{
				DomainManager.registerDomain("Haxe", {major: 0, minor: 1});
			}
			
			DomainManager.registerCommand(
            "Haxe",       // domain name
            "compileHxml",    // command name
            compileHxml,   // command handler function
            false,          // this command is synchronous
            "Compiles hxml files",
            [],             // no parameters
            [{name: "data",
                type: "{error: number, code: number}",
                description: "exit code and error description"}]
			);
		};
		
		untyped __js__("exports.init = init");
	}
	
	private static function compileHxml() 
	{
		
	}
	
}