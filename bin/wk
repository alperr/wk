#!/usr/bin/env node

var BG_RED = "\x1b[41m";
var FG_RED = "\x1b[31m"
var RESET = "\x1b[0m";

var args = process.argv.slice(2);
var command = args[0];

var commands = {
	"init"  : init,
	"start" : start,
	"new" : newComponent
}
args = args.slice(1);

if (typeof commands[command] == 'undefined')
	printSmallHelp(command);
else
	commands[command](args);



function printSmallHelp(c)
{
	error("invalid command: " + c);
	// log("");
	log("usage:");
	// log("--------");
	log("	wk init   | initializes a new project with boilerplate code");
	log("	wk start  | auto-builds components and serves them under ./dist folder");
	log("	wk new    | creates a new component under ./components folder");
}

function init(a)
{
	log("initializing a new project");
}

function start(a)
{
	log("starting file server and auto-builder");
}

function newComponent(a)
{
	if (a.length > 1)
	{
		error(a.join(" ") + " is not a valid component name, it has whitespaces in it");
		// log("usage:")
		// log("	wk new ComponentName | creates a new component under ./components folder with given ComponentName");
		return;
	}
	if (a.length == 0)
	{
		log("usage:")
		log("	wk new ComponentName | creates a new component under ./components folder with given ComponentName");
		return;
	}

	log("Creating a new component named " + a[0]);
	log(a.length);

}


function error(m)
{
	console.log(FG_RED, m, RESET);
}

function log(m)
{
	console.log(RESET,m,RESET);
}