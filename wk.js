#!/usr/bin/env node

var args = process.argv.slice(2);
var command = args[0];

// console.log(command);

var commands = {
	"init"  : init,
	"start" : start
}

if (typeof commands[command] == 'undefined')
	printSmallHelp();
else
	commands[command]();

function printSmallHelp()
{
	console.log("wk init   | initializes a new project with boilerplate code");
	console.log("wk start  | auto-builds components and serves them under dist folder");
}

function init()
{
	console.log("initializing");
}

function start()
{
	console.log("starting");
}