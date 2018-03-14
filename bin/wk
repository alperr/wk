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
	printSmallHelp();
else
	commands[command](args);



function printSmallHelp()
{
	console.log(FG_RED, "wk init   | initializes a new project with boilerplate code");
	console.log(FG_RED, "wk start  | auto-builds components and serves them under ./dist folder");
	console.log(FG_RED, "wk new    | creates a new component under ./components folder", RESET);
}

function init(a)
{
	console.log("initializing");
}

function start(a)
{
	console.log("starting");
}

function newComponent(a)
{
	console.log("Creating a new component named " + a);
}