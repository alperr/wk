#!/usr/bin/env node

var args = process.argv.slice(2);
var command = args[0];

// console.log(command);

var commands = {
	"init" : true,
	"run"  : true
}

printSmallHelp();


function printSmallHelp()
{
	console.log("wk init   | initializes a new project with boilerplate code");
	console.log("wk start  | auto-builds components and serves them under dist folder");
	console.log("wk help   | detailed help");
}



// Usage:
//   microz <path> (create|init)
//   microz <path> api run [<param=value> ...]
//   microz <path> script <name> create
//   microz <path> script <name> run [<param=value> ...]
//   microz <path> test [<target>]
