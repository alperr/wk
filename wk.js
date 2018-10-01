#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');
const EXEC = require('child_process').execSync;
const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";

const SOURCE_COMPONENT = 'Y2xhc3MgQ29tcG9uZW50CnsKCXB1YmxpYyByb290OiBIVE1MRWxlbWVudDsKCWNvbnN0cnVjdG9yKHJvb3Q6IEVsZW1lbnQsIG1hcmt1cDogbnVtYmVyKQoJewoJCXRoaXMucm9vdCA9IDxIVE1MRWxlbWVudD5yb290OwoJCXRoaXMubG9hZE1hcmt1cChtYXJrdXApOwoJfQoKCXB1YmxpYyBmaW5kID0gKHF1ZXJ5OiBzdHJpbmcpOiBIVE1MRWxlbWVudCA9PgoJewoJCXF1ZXJ5ID0gIi4iICsgcXVlcnk7CgkJcmV0dXJuIDxIVE1MRWxlbWVudD50aGlzLnJvb3QucXVlcnlTZWxlY3RvcihxdWVyeSk7Cgl9CgoJcHVibGljIHF1ZXJ5U2VsZWN0b3IgPSAocXVlcnk6IHN0cmluZyk6IEVsZW1lbnQgPT4KCXsKCQlyZXR1cm4gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IocXVlcnkpOwoJfQoKCXB1YmxpYyBxdWVyeVNlbGVjdG9yQWxsID0gKHF1ZXJ5OiBzdHJpbmcpOiBOb2RlTGlzdCA9PgoJewoJCXJldHVybiB0aGlzLnJvb3QucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7Cgl9CgoJcHJpdmF0ZSBsb2FkTWFya3VwID0gKGtleTogbnVtYmVyKSA9PgoJewoJCXZhciB3OiBhbnkgPSB3aW5kb3c7CgkJaWYgKCF3Ll9fbWFya3VwX2RhdGFba2V5XSkKCQkJdGhyb3cgInRoZXJlIGlzIG5vIG1hcmt1cCBmb3IgIiArIGtleTsKCgkJdGhpcy5yb290LmlubmVySFRNTCA9IGF0b2Iody5fX21hcmt1cF9kYXRhW2tleV0pOwoJfQp9CmZ1bmN0aW9uIGxvYWRUZW1wbGF0ZShrZXk6IG51bWJlcik6IEhUTUxFbGVtZW50CnsKCXZhciB3OiBhbnkgPSB3aW5kb3c7CglpZiAoIXcuX19tYXJrdXBfZGF0YVtrZXldKQoJCXRocm93ICJ0aGVyZSBpcyBubyBtYXJrdXAgZm9yICIgKyBrZXk7CgoJZnVuY3Rpb24gaHRtbFRvRWxlbWVudChodG1sKQoJewoJCXZhciB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7CgkJaHRtbCA9IGh0bWwudHJpbSgpOwoJCXRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWw7CgkJcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDsKCX0KCXJldHVybiA8SFRNTEVsZW1lbnQ+aHRtbFRvRWxlbWVudChhdG9iKHcuX19tYXJrdXBfZGF0YVtrZXldKSk7Cn0KLy8gVEhJUyBFTlVNUyBBUkUgQVVUT0dFTkVSQVRFRCwgRE8gTk9UIEVESVQgVEhFU0U=';
const SOURCE_INDEX = 'PGh0bWwgbGFuZz0iZW4iPgoJPGhlYWQ+CgkJPG1ldGEgY2hhcnNldD0idXRmLTgiPgoJCTxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiPgoJCTx0aXRsZT53azwvdGl0bGU+CgkJPHN0eWxlPgoJCQkjcm9vdHsKCQkJCXdpZHRoOiAxMDAlOwoJCQkJaGVpZ2h0OiAxMDAlOwoJCQkJb3ZlcmZsb3c6IG5vbmU7CgkJCQlwb3NpdGlvbjogcmVsYXRpdmU7CgkJCX0KCQk8L3N0eWxlPgoJCTxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iZGV2LmNzcyI+CgkJPHNjcmlwdCBzcmM9J2Rldi5qcyc+PC9zY3JpcHQ+Cgk8L2hlYWQ+CgkKCTxib2R5PgoJCTxkaXYgaWQ9J3Jvb3QnPjwvZGl2PgoJPC9ib2R5PgoJPHNjcmlwdD4KCXdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKQoJewoJCXZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKCQl4aHIub3BlbigiR0VUIiwiZGV2Lmpzb24iKTsKCQl4aHIuc2VuZCgpOwoJCXhoci5vbmxvYWQgPSBmdW5jdGlvbigpCgkJewoJCQl3aW5kb3cuX19tYXJrdXBfZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7CgkJCW5ldyBBcHBsaWNhdGlvbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTsKCQl9Cgl9Cgk8L3NjcmlwdD4KPC9odG1sPg==';
const SOURCE_SAMPLE = 'Ly8vIDxyZWZlcmVuY2UgcGF0aD0iLi4vLi4vY2xhc3Nlcy9jb21wb25lbnQudHMiIC8+CgpjbGFzcyBTYW1wbGVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQKewoJY29uc3RydWN0b3Iocm9vdDogRWxlbWVudCwgb3B0aW9ucz86IE9iamVjdCkKCXsKCQlzdXBlcihyb290LCAic2FtcGxlLWNvbXBvbmVudCIpOwoJfQp9';
const SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwbGljYXRpb24nPgoJPGgxPmJhc2ljIHdrIHByb2plY3Q8L2gxPgoJPHA+dGhpcyBwYWdlIGlzIGdlbmVyYXRlZCBieSBhcHBsaWNhdGlvbiBjb21wb25lbnQ8L3A+Cgk8cD5pdCBjYW4gYmUgZm91bmQgdW5kZXIgPHN0cm9uZz4vY29tcG9uZW50czwvc3Ryb25nPiBmb2xkZXI8L3A+Cgk8cCBjbGFzcz0nYWNjZW50Jz55b3UgY2FuIHR3ZWFrIHRoaXMgY29tcG9uZW50J3Mgc3R5bGUgYnkgZWRpdGluZyA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uY3NzPC9zdHJvbmc+IGZpbGU8L3A+Cgk8cD5hbGwgdGhpcyBjb21wb25lbnQgbWFya3VwIGlzIHdyaXR0ZW4gaW50byA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uaHRtbDwvc3Ryb25nPjwvcD4KPC9kaXY+';
const SOURCE_BASIC_CSS = 'LmFwcGxpY2F0aW9uICp7Cglmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmOwp9CgouYXBwbGljYXRpb24gLmFjY2VudHsKCWNvbG9yOiAjYzBhOwp9';

const COMPONENT_BASE_PATH = "./components/";
const CLASS_BASE_PATH = "./classes/";
const OUTPUT_PATH = "./static-files/dev";

const VERSION = "0.1.7";
var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"new" : newComponent,
	"build" : productionBuild,
	"del" : deleteComponent,
	"list" : listComponents,
	"stats" : stats,
	"lint" : lint,
	"format" : format
}

var timer;
var counter = 0;
var changedFiles = [];

var args = process.argv.slice(2);
var command = args[0];
args = args.slice(1);

if (typeof commands[command] == 'undefined')
	printSmallHelp(command);
else
	commands[command](args);

function printSmallHelp(c)
{
	if (typeof c != 'undefined')
		error("invalid command: " + c);

	log("version: " + VERSION);
	log("usage:");
	log("	wk init   | initializes a new project with boilerplate code");
	log("	wk start  | auto-builds components and serves them under ./static-files folder");
	log("	wk new    | creates a new component under ./components folder");
	log("	wk del    | deletes a component, this command is not reversible");
	log("	wk list   | lists all components in the project");
	log("	wk build  | makes a production build under ./build folder (minifies js&css)");
	log("	wk stats  | show statistics about project");
	log("	wk lint   | makes a static analysis for your ts files, requires tslint");
	log("	wk format | formats your ts files, requires tsfmt");
}

function init()
{
	if (isProjectValid("./"))
	{
		error("current folder is already initialized");
		return;
	}
	
	log("initializing a new project");
	if (!FS.existsSync("./static-files")){FS.mkdirSync("./static-files");}
	if (!FS.existsSync("./classes")){FS.mkdirSync("./classes");}
	if (!FS.existsSync("./components")){FS.mkdirSync("./components");}
	log("- folders created");

	FS.writeFileSync("./classes/component.ts",Buffer.from(SOURCE_COMPONENT, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./static-files/index.html",Buffer.from(SOURCE_INDEX, 'base64').toString('ascii'),"utf8");
	log("- classes created");

	newComponent(["application"]);
	FS.writeFileSync("./components/application/application.css",Buffer.from(SOURCE_BASIC_CSS, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./components/application/application.html",Buffer.from(SOURCE_BASIC_HTML, 'base64').toString('ascii'),"utf8");

	highlight("project initialized successfully");
	log("you can run **start** command now")
	log("wk start  | auto-builds components and serves them under ./static-files folder");
}

function deinit()
{
	deleteFolderRecursive("./static-files");
	deleteFolderRecursive("./classes");
	deleteFolderRecursive("./components");
	log("- de initialized project and deleted all files");
}

function start()
{
	if (!isProjectValid("./"))
	{
		if (isProjectValid("../"))
		{
			error("current folder is not the base folder of project");
			error("navigate to up one level and try **wk start** again")
		}
		else if (isProjectValid("../../"))
		{
			error("current folder is not the base folder of project");
			error("navigate to up 2 level and try **wk start** again")
		}
		else
		{
			error("current folder is not a valid wk project, initialize first");
			log("usage:");
			log("	wk init   | initializes a new project with boilerplate code");
		}
		return;
	}
	log("starting file server and auto-builder");
	
	updateMarkupEnums();
	FS.watch(COMPONENT_BASE_PATH, { "recursive" : true } , onchange);
	FS.watch(CLASS_BASE_PATH, { "recursive" : true } , onchange);
	onchange("change",".ts");

	var finalhandler = require('finalhandler');
	var http = require('http');
	var serveStatic = require('serve-static');
	var opn = require("opn");
	
	var serve = serveStatic('./static-files', {'index': ['index.html', 'index.htm']});
	
	var server = http.createServer(
	function onRequest (req, res)
	{
		serve(req, res, finalhandler(req, res))
	})
	
	var pf = require("portfinder");
	pf.basePort = 8040;
	pf.getPort(function (err, port)
	{
		if (err)
		{
			error("no port available for http server");
		}
		server.listen(port);
		log("listening localhost:" + port);
		
		setTimeout(function(){
			opn('http://localhost:' + port);
		}, 3000);
	});
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
		log("	wk new component-name | creates a new component under ./components folder with given component-name");
		return;
	}

	if (!printNotValidProjectMessage("./"))
		return;

	if ( a[0].toLowerCase() != a[0])
	{
		error(a.join(" ") + " is not a valid component name, component names are lower-case-dash-seperated");
		return;
	}
	if (a[0].indexOf("--") != -1)
	{
		error(a.join(" ") + " is not a valid component name, -- is not allowed");
		return;
	}

	if (a[0].indexOf("_") != -1)
	{
		error(a.join(" ") + " is not a valid component name, _ is not allowed");
		return;
	}

	if (Number.isInteger(Number(a[0][0])))
	{
		error(a.join(" ") + " is not a valid component name, component name cannot start with a number");
		return;
	}

	createComponentFiles(a[0]);
	updateMarkupEnums();
}

function deleteComponent(a)
{
	if (a.length == 0)
	{
		log("usage:")
		log("	wk del component-name |  deletes a component, this command is not reversible");
		return;
	}

	if (!printNotValidProjectMessage("./"))
		return;

	var input = "./components/" + a[0] + '/' + a[0];

	if (!FS.existsSync(input + '.html') || !FS.existsSync(input + '.ts') || !FS.existsSync(input + '.css'))
	{
		error("there is no component named " + a[0]);
		return;
	}

	deleteFolderRecursive("./components/" + a[0]);
	updateMarkupEnums();
	log("deleted component -> " + a[0])
}

function stats()
{

}

function lint()
{
	var rules = 
	{
		"rules": {
			"align": [false,
				"parameters",
				"arguments",
				"statements"],
			"ban": [true,
				["angular", "forEach"]
			],
			
			"comment-format": [false,
				"check-space",
				"check-lowercase"
			],
			"curly": false,
			"eofline": false,
			"forin": false,
			"indent": [true, "tabs"],
			"interface-name": false,
			"jsdoc-format": true,
			"label-position": true,
			"max-line-length": [false, 140],
			"member-ordering": [true,
				 "public-before-private",
				 "static-before-instance",
				 "variables-before-functions"
			],
			"no-any": false,
			"no-arg": true,
			"no-bitwise": false,
			"no-console": [true,
				"log",
				"debug",
				"info",
				"time",
				"timeEnd",
				"trace"
			],
			"no-construct": true,
			"no-constructor-vars": false,
			"no-debugger": true,
			"no-shadowed-variable": false,
			"no-duplicate-variable": true,
			"no-empty": false,
			"no-eval": true,
			"no-require-imports": true,
			"no-string-literal": false,
			"no-switch-case-fall-through": false,
			"no-trailing-whitespace": false,
			"no-unused-expression": false,
			"no-unused-variable": false,
			"no-use-before-declare": false,
			"no-var-keyword": false,
			"no-var-requires": false,
			"one-line": [true,
				"check-catch",
				"check-whitespace"
			],
			"quotemark": [false, "double"],
			"radix": false,
			"semicolon": false,
			"triple-equals": [true, "allow-null-check"],
			"typedef": [false,
				"callSignature",
				"catchClause",
				"indexSignature",
				"parameter",
				"propertySignature",
				"variableDeclarator"
			],
			"typedef-whitespace": [true, {
				"call-signature": "nospace",
				"index-signature": "nospace",
				"parameter": "nospace",
				"property-declaration": "nospace",
				"variable-declaration": "nospace"
			}],
			"variable-name": [true, "allow-leading-underscore"],
			"whitespace": [false,
				"check-branch",
				"check-decl",
				"check-operator",
				"check-separator",
				"check-type"
			]
		}
	}

	
	FS.writeFileSync("./tslint.json", JSON.stringify(rules));
	
	try{
		EXEC("tslint */**/*.ts");
		EXEC("tslint */*.ts");
		highlight("no error found")
	}catch(e)
	{
		error(e.stdout.toString('utf8'));
		error('linter failed')
	}

	FS.unlinkSync("./tslint.json");
}

function checkLinter()
{

}

function format()
{
	
}

function checkVersion()
{
	const http = require('http');
	http.get('http://alpercinar.com/wk/version.txt',
	(resp) =>
	{
		var data = '';
		resp.on('data', (chunk) => { data += chunk; });
		resp.on('end', () => {
			var mostRecent = Number(data);
			var p = VERSION.split(".");
			var current = Number(p[0]) * 10000 + Number(p[1]) * 100 + Number(p[2]);
	
			if (mostRecent > current)
			{
				// outdated message
			}
		});
	}).on("error", (err) => {});
}

function listComponents()
{
	if (!printNotValidProjectMessage("./"))
		return;

	var components = FS.readdirSync("./components/")
	log("Components:");
	for (var i in components)
	{
		if (!components[i].startsWith("."))
			log("	" + components[i]);
	}

	var classes = FS.readdirSync("./classes/")
	log("Classes:");
	for (var i in classes)
	{
		if (!classes[i].startsWith("."))
			log("	" + classes[i]);
	}
}

function productionBuild()
{
	log("building for production");
	onchange("change",".ts");
	deleteFolderRecursive("./build");
	copyRecursiveSync("./static-files", "./build");

	FS.unlinkSync("./build/dev.css");
	FS.unlinkSync("./build/dev.json");
	FS.unlinkSync("./build/dev.js");
	FS.unlinkSync("./build/index.html");

	setTimeout(function()
	{
		var UGLIFYJS = require("uglify-js");
		var CHEERIO = require('cheerio');
		var $ = CHEERIO.load(FS.readFileSync("./static-files/index.html"));

		var name = uid();
		$("link[href$='dev.css']").attr("href" , name + ".css");
		$("script[src$='dev.js']").attr("src" , name + ".js");

		var h = $.html();
		h = h.replace('"dev.json"', '"'+name+'.json"');
		
		var jsContent =  FS.readFileSync("./static-files/dev.js", "utf8");
		var options = 
		{
			"mangle" :
			{
				"toplevel" : true,
				"reserved": ['Application']
			}
		}

		var minifiedJSCode = UGLIFYJS.minify(jsContent, options);
		if(minifiedJSCode.error)
		{
			console.log(minifiedJSCode.error);
			error("unable to minify javascript file");
			return;
		}

		FS.writeFileSync( "./build/" + name + ".js", minifiedJSCode.code)
		FS.writeFileSync("./build/index.html" , h);
		FS.copyFileSync("./static-files/dev.css", "./build/" + name + ".css");
		FS.copyFileSync("./static-files/dev.json", "./build/" + name + ".json");
		log("production build completed with seed " + name);
	}, 5000);
}

function createComponentFiles(name)
{
	if (FS.existsSync("./components/" + name))
	{
		error("a component with a name " + name + " already exists");
		return;
	}

	var upper = "MARKUP_" + dash2UpperCase(name);
	var pascal = dash2PascalCase(name);
	var ts = Buffer.from(SOURCE_SAMPLE, 'base64').toString('ascii');
	ts = ts.replace("SampleComponent", pascal);
	ts = ts.replace('"sample-component"', upper);

	var html = '<div class="'+name+'"></div>';
	var css = '.'+name+'{}';

	FS.mkdirSync("./components/" + name);
	FS.writeFileSync("./components/" + name + "/" + name + ".html" , html, "utf8");
	FS.writeFileSync("./components/" + name + "/" + name + ".css" , css, "utf8");
	FS.writeFileSync("./components/" + name + "/" + name + ".ts" , ts, "utf8");

	log("created a new component named " + name);
}

function findTemplateFiles(path, componentName)
{
	var htmlFiles = []; 
	var files = FS.readdirSync(path);
	files.forEach(function(file)
	{
		if (!file.endsWith(".html"))
			return;

		if (file == componentName + ".html")
			return;

		htmlFiles.push(file.substr(0,file.length-5));
	});

	return htmlFiles;
}

function updateMarkupEnums()
{
	var counter = 0;
	var components = FS.readdirSync("./components/");
	var s = "";
	for (var i in components)
	{
		if (components[i].startsWith("."))
			continue;

		var name = "MARKUP_" + dash2UpperCase(components[i]);
		s += "\nconst " + name + " = " + counter + ";";
		counter++;
	}

	for (var i in components)
	{
		if (components[i].startsWith("."))
			continue;

		var templates = findTemplateFiles(COMPONENT_BASE_PATH + components[i] + '/', components[i]);
		for (var t in templates)
		{
			var name = "TEMPLATE_" + dash2UpperCase(components[i]) + "__" + dash2UpperCase(templates[t]);
			s += "\nconst " + name + " = " + counter + ";";
			counter++;
		}
	}

	s = Buffer.from(SOURCE_COMPONENT, 'base64').toString('ascii') + s;
	FS.writeFileSync("./classes/component.ts", s, "utf8");
}

function error(m)
{
	console.log(FG_RED, m, RESET);
}

function log(m)
{
	console.log(RESET, m, RESET);
}

function highlight(m)
{
	console.log(BG_GREEN, m, RESET);
}

function minorLog(m)
{
	console.log(FG_DIM, m, RESET);
}

function onchange(event, changeFileName)
{
	if ( !changeFileName.endsWith(".ts") && !changeFileName.endsWith(".css") && !changeFileName.endsWith(".html"))
		return;

	clearTimeout(timer);
	counter++;
	changedFiles.push(changeFileName);
	timer = setTimeout(function()
	{
		var isHtmlChanged = false;
		var isCssChanged = false;
		var isTypescriptChanged = false;

		for (var i in changedFiles)
		{
			if (changedFiles[i].endsWith(".ts"))
				isTypescriptChanged = true;

			if (changedFiles[i].endsWith(".css"))
				isCssChanged = true;

			if (changedFiles[i].endsWith(".html"))
				isHtmlChanged = true;
		}

		var msg = [];
		if (isTypescriptChanged) msg.push("ts");
		if (isCssChanged) msg.push("css");
		if (isHtmlChanged) msg.push("html");
		msg = "[" + msg.join(", ") + "]";

		minorLog(counter + " save action captured, transpiling " + msg);
		counter = 0;
		changedFiles = [];
		console.time('\x1b[32m transpiled\x1b[0m');

		var css = '';
		var markupMap = [];
		var tsFiles = [];
		var names = [];

		var files = FS.readdirSync(CLASS_BASE_PATH);
		files.forEach(function(file)
		{
			if (!file.endsWith(".ts"))
				return;

			tsFiles.push(CLASS_BASE_PATH + file);
		});

		files = FS.readdirSync(COMPONENT_BASE_PATH);
		files.forEach(function(file)
		{
			if (file.indexOf('.') == 0)
				return;	

			names.push(file);
		});

		for (var i=0;i<names.length;i++)
		{
			var input = COMPONENT_BASE_PATH + names[i] + '/' + names[i];

			if (!FS.existsSync(input + '.html')) 
			{
				error('missing file ->' + input + '.html  build cancelled');
				return;
			}

			if (!FS.existsSync(input + '.ts')) 
			{
				error('missing file ->' + input + '.ts  build cancelled');
				return;
			}

			if (markupMap[names[i]])
			{
				error('duplicate markup file ->' + names[i] + '.html  build cancelled');
				return;
			}

			var markup = FS.readFileSync(input + ".html","utf8");
			markupMap.push(new Buffer(markup).toString('base64'));
			tsFiles.push(input + ".ts");

			if (FS.existsSync(input + '.css')) 
				css += FS.readFileSync(input + ".css","utf8") + '\n';
		}

		for (var i=0;i<names.length;i++)
		{
			var templates = findTemplateFiles(COMPONENT_BASE_PATH + names[i] + '/', names[i]);
			for (var t in templates)
			{
				var markup = FS.readFileSync(COMPONENT_BASE_PATH + names[i] + "/" + templates[t] + ".html","utf8");
				markupMap.push(new Buffer(markup).toString('base64'));
			}
		}

		if (isTypescriptChanged)
		{
			command = "tsc --out ./static-files/dev.js --lib 'es6','dom' ";
			command += tsFiles.join(" ");
			try{
				EXEC(command);
			}catch(e)
			{
				error('typescript build failed');
				error(e.stdout.toString('utf8'));
				return;
			}
		}

		try { FS.unlinkSync( OUTPUT_PATH + ".css" ); } catch (e) { }
		FS.writeFileSync( OUTPUT_PATH + ".css" , css , 'utf8');

		try { FS.unlinkSync( OUTPUT_PATH + ".json" ); } catch (e) { }
		FS.writeFileSync( OUTPUT_PATH + ".json" , JSON.stringify(markupMap) , 'utf8');
		console.timeEnd('\x1b[32m transpiled\x1b[0m');
	}, 250);
}

function printNotValidProjectMessage(path)
{
	if (!isProjectValid(path))
	{
		error("current folder is not a valid wk project, initialize first");
		log("usage:");
		log("	wk init   | initializes a new project with boilerplate code");
		return  false;
	}
	return true;
}

function isProjectValid(path)
{
	if (!FS.existsSync(path + "static-files"))
	{
		return false;
	}

	if (!FS.existsSync(path + "components"))
	{
		return false;
	}

	if (!FS.existsSync(path + "classes"))
	{
		return false;
	}

	return true;
}

 function deleteFolderRecursive(path)
 {
	if (FS.existsSync(path))
	{
		FS.readdirSync(path).forEach(function(file, index)
		{
			var curPath = path + "/" + file;
			if (FS.lstatSync(curPath).isDirectory())
				deleteFolderRecursive(curPath);
			else
				FS.unlinkSync(curPath);
		});
		FS.rmdirSync(path);
	}
}

function copyRecursiveSync(src, dest) {
  var exists = FS.existsSync(src);
  var stats = exists && FS.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    FS.mkdirSync(dest);
    FS.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(PATH.join(src, childItemName),
                        PATH.join(dest, childItemName));
    });
  } else {
    FS.linkSync(src, dest);
  }
};

function dash2PascalCase(s)
{
	var words = s.split("-");
	var r = [];
	for (var i in words)
		r.push(words[i][0].toUpperCase() + words[i].slice(1));

	return r.join("");
}

function dash2UpperCase(s)
{
	var words = s.split("-");
	var r = [];
	for (var i in words)
		r.push(words[i].toUpperCase());

	return r.join("_");
}

function uid()
{
	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUWVXYZabcdefghijklmnoprqstuwvxyz';
	function int2Base62(i)
	{
		var r = "";
		while(i > 61)
		{
			r = alphabet[i % 62] + r;
			i = Math.floor(i / 62);
		}
		r = alphabet[i] + r;
		return r;
	}
	
	// return int2Base62(Math.floor((Date.now()) / 1000));
	var id = int2Base62(Math.floor((Date.now()) / 60000));
	id = id.substr(id.length-3, 3);
	return id;
}