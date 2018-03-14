#!/usr/bin/env node

var BG_RED = "\x1b[41m";
var FG_RED = "\x1b[31m"
var RESET = "\x1b[0m";

var FS = require('fs');

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
	if (typeof c != 'undefined')
		error("invalid command: " + c);
	log("usage:");
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
	if (!isProjectValid())
	{
		error("current folder is not a valid wk project, initialize first");
		log("usage:");
		log("	wk init   | initializes a new project with boilerplate code");
		return;
	}
	log("starting file server and auto-builder");

	FS.watch(BASE_INPUT_PATH, { "recursive" : true } , onchange);
	FS.watch(CLASS_INPUT_PATH, { "recursive" : true } , onchange);
	onchange();

	var finalhandler = require('finalhandler');
	var http = require('http');
	var serveStatic = require('serve-static');
	
	// Serve up public/ftp folder
	var serve = serveStatic('./dist', {'index': ['index.html', 'index.htm']});
	
	// Create server
	var server = http.createServer(
	function onRequest (req, res)
	{
		serve(req, res, finalhandler(req, res))
	})
	
	server.listen(3001);
	log("listening localhost:3001");
}

function newComponent(a)
{
	if (a.length > 1)
	{
		error(a.join(" ") + " is not a valid component name, it has whitespaces in it");
		return;
	}
	if (a.length == 0)
	{
		log("usage:")
		log("	wk new ComponentName | creates a new component under ./components folder with given ComponentName");
		return;
	}

	log("creating a new component named " + a[0]);
	log(a.length);
}

function error(m)
{
	console.log(FG_RED, m, RESET);
}

function log(m)
{
	console.log(RESET, m, RESET);
}

var BASE_INPUT_PATH = "./components/";
var CLASS_INPUT_PATH = "./classes/";
var OUTPUT_PATH = "./dist/dev";

function onchange()
{
	console.time('\x1b[32mbuild completed successfully\x1b[0m');	

	var files = FS.readdirSync(BASE_INPUT_PATH);
	var all = '';
	var css = '';
	var names = [];
	files.forEach(function(file)
	{
		if (file.indexOf('.') == 0)
			return;	

		names.push(file);
	});

	for (var i=0;i<names.length;i++)
	{
		var input = BASE_INPUT_PATH + names[i] + '/' + names[i];

		if (!FS.existsSync(input + '.html')) 
		{
			console.log('\x1b[31m%s\x1b[0m', 'missing file ->' + input + '.html  build cancelled');
			return;
		}

		if (!FS.existsSync(input + '.js')) 
		{
			console.log('\x1b[31m%s\x1b[0m', 'missing file ->' + input + '.js  build cancelled');			
			return;
		}

		var markup = FS.readFileSync(input + ".html","utf8");
		var js = FS.readFileSync(input + ".js","utf8");
		js = js.replace('{{markup}}', new Buffer(markup).toString('base64'));

		all += js + '\n';

		if (FS.existsSync(input + '.css')) 
			css += FS.readFileSync(input + ".css","utf8") + '\n';
	}

	files = FS.readdirSync(CLASS_INPUT_PATH);
	names = [];
	files.forEach(function(file)
	{
		if (file.indexOf('.') == 0)
			return;	

		names.push(file);
	});

	for (var i=0;i<names.length;i++)
	{
		var input = CLASS_INPUT_PATH + names[i];
		all += FS.readFileSync(input,"utf8") + '\n';
	}

	try { FS.unlinkSync( OUTPUT_PATH + ".js" ); } catch (e) { }
	FS.writeFileSync( OUTPUT_PATH + ".js" , all , 'utf8');

	try { FS.unlinkSync( OUTPUT_PATH + ".css" ); } catch (e) { }
	FS.writeFileSync( OUTPUT_PATH + ".css" , css , 'utf8');

	console.timeEnd('\x1b[32mbuild completed successfully\x1b[0m');
}

function isProjectValid()
{
	if (!FS.existsSync("./dist"))
	{
		// error("dist does not exist");
		return false;
	}
		

	if (!FS.existsSync("./components"))
	{
		// error("components folder is missing");
		return false;
	}
		

	if (!FS.existsSync("./classes"))
	{
		// error("classes does not exist");
		return false;
	}
	
	return true;
}