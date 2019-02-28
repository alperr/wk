#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');
const EXEC = require('child_process').execSync;
const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";

const SOURCE_COMPONENT = 'Ly8gVEhJUyBGSUxFIElTIEFVVE8gR0VORVJBVEVEICwgRE8gTk9UIEVESVQNCmNsYXNzIENvbXBvbmVudA0Kew0KCXB1YmxpYyByb290OiBIVE1MRWxlbWVudDsNCgljb25zdHJ1Y3Rvcihyb290OiBFbGVtZW50LCBtYXJrdXA6IG51bWJlcikNCgl7DQoJCXRoaXMucm9vdCA9IDxIVE1MRWxlbWVudD5yb290Ow0KCQl0aGlzLmxvYWRNYXJrdXAobWFya3VwKTsNCgl9DQoNCglwdWJsaWMgZmluZCA9IChxdWVyeTogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4NCgl7DQoJCXF1ZXJ5ID0gIi4iICsgcXVlcnk7DQoJCXJldHVybiA8SFRNTEVsZW1lbnQ+dGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IocXVlcnkpOw0KCX0NCg0KCXB1YmxpYyBxdWVyeVNlbGVjdG9yID0gKHF1ZXJ5OiBzdHJpbmcpOiBFbGVtZW50ID0+DQoJew0KCQlyZXR1cm4gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IocXVlcnkpOw0KCX0NCg0KCXB1YmxpYyBxdWVyeVNlbGVjdG9yQWxsID0gKHF1ZXJ5OiBzdHJpbmcpOiBOb2RlTGlzdCA9Pg0KCXsNCgkJcmV0dXJuIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KTsNCgl9DQoNCglwcml2YXRlIGxvYWRNYXJrdXAgPSAoa2V5OiBudW1iZXIpID0+DQoJew0KCQl2YXIgdzogYW55ID0gd2luZG93Ow0KCQlpZiAoIXcuX19tYXJrdXBfZGF0YVtrZXldKQ0KCQkJdGhyb3cgInRoZXJlIGlzIG5vIG1hcmt1cCBmb3IgIiArIGtleTsNCg0KCQkJDQoJCXRoaXMucm9vdC5pbm5lckhUTUwgPSBkZWNvZGVVUklDb21wb25lbnQoYXRvYih3Ll9fbWFya3VwX2RhdGFba2V5XSkpOw0KCX0NCn0NCmZ1bmN0aW9uIGxvYWRUZW1wbGF0ZShrZXk6IG51bWJlcik6IEhUTUxFbGVtZW50DQp7DQoJdmFyIHc6IGFueSA9IHdpbmRvdzsNCglpZiAoIXcuX19tYXJrdXBfZGF0YVtrZXldKQ0KCQl0aHJvdyAidGhlcmUgaXMgbm8gbWFya3VwIGZvciAiICsga2V5Ow0KDQoJZnVuY3Rpb24gaHRtbFRvRWxlbWVudChodG1sKQ0KCXsNCgkJdmFyIHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTsNCgkJaHRtbCA9IGh0bWwudHJpbSgpOw0KCQl0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sOw0KCQlyZXR1cm4gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkOw0KCX0NCglyZXR1cm4gPEhUTUxFbGVtZW50Pmh0bWxUb0VsZW1lbnQoZGVjb2RlVVJJQ29tcG9uZW50KGF0b2Iody5fX21hcmt1cF9kYXRhW2tleV0pKSk7DQp9';
const SOURCE_INDEX = 'PGh0bWwgbGFuZz0iZW4iPgoJPGhlYWQ+CgkJPG1ldGEgY2hhcnNldD0idXRmLTgiPgoJCTxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiPgoJCTx0aXRsZT53azwvdGl0bGU+CgkJPHN0eWxlPgoJCQkjcm9vdHsKCQkJCXdpZHRoOiAxMDAlOwoJCQkJaGVpZ2h0OiAxMDAlOwoJCQkJb3ZlcmZsb3c6IG5vbmU7CgkJCQlwb3NpdGlvbjogcmVsYXRpdmU7CgkJCX0KCQk8L3N0eWxlPgoJCTxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iLi9kZXYuY3NzIj4KCQk8c2NyaXB0IHNyYz0nLi9kZXYuanMnPjwvc2NyaXB0PgoJPC9oZWFkPgoJPGJvZHk+CgkJPGRpdiBpZD0ncm9vdCc+PC9kaXY+Cgk8L2JvZHk+Cgk8c2NyaXB0IGlkPSJ3ay1zY3JpcHQiPgoJd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpCgl7CgkJdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOwoJCXhoci5vcGVuKCJHRVQiLCIuL2Rldi5qc29uIik7CgkJeGhyLnNlbmQoKTsKCQl4aHIub25sb2FkID0gZnVuY3Rpb24oKQoJCXsKCQkJd2luZG93Ll9fbWFya3VwX2RhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOwoJCQluZXcgQXBwbGljYXRpb24oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CgkJfQoJfQoJPC9zY3JpcHQ+CjwvaHRtbD4=';
const SOURCE_SAMPLE = 'Ly8vIDxyZWZlcmVuY2UgcGF0aD0iLi4vLi4vc3JjL2NvbXBvbmVudC50cyIgLz4NCg0KY2xhc3MgU2FtcGxlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50DQp7DQoJY29uc3RydWN0b3Iocm9vdDogRWxlbWVudCwgb3B0aW9ucz86IE9iamVjdCkNCgl7DQoJCXN1cGVyKHJvb3QsICJzYW1wbGUtY29tcG9uZW50Iik7DQoJfQ0KfQ==';
const SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwbGljYXRpb24nPgoJPGgxPmJhc2ljIHdrIHByb2plY3Q8L2gxPgoJPHA+dGhpcyBwYWdlIGlzIGdlbmVyYXRlZCBieSBhcHBsaWNhdGlvbiBjb21wb25lbnQ8L3A+Cgk8cD5pdCBjYW4gYmUgZm91bmQgdW5kZXIgPHN0cm9uZz4vY29tcG9uZW50czwvc3Ryb25nPiBmb2xkZXI8L3A+Cgk8cCBjbGFzcz0nYWNjZW50Jz55b3UgY2FuIHR3ZWFrIHRoaXMgY29tcG9uZW50J3Mgc3R5bGUgYnkgZWRpdGluZyA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uY3NzPC9zdHJvbmc+IGZpbGU8L3A+Cgk8cD5hbGwgdGhpcyBjb21wb25lbnQgbWFya3VwIGlzIHdyaXR0ZW4gaW50byA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uaHRtbDwvc3Ryb25nPjwvcD4KPC9kaXY+';
const SOURCE_BASIC_CSS = 'LmFwcGxpY2F0aW9uICp7Cglmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmOwp9CgouYXBwbGljYXRpb24gLmFjY2VudHsKCWNvbG9yOiAjYzBhOwp9';

const COMPONENT_BASE_PATH = "./com/";
const CLASS_BASE_PATH = "./src/";
const OUTPUT_PATH = "./www/dev";

const VERSION = "0.2.14";
var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"develop" : start,
	"s" : start,
	"burn" : burn,
	"new" : newComponent,
	"n" : newComponent,
	"build" : build,
	"b" : build,
	"del" : deleteComponent,
	"lib" : buildLibrary,
	"lint" : lint,
	"format" : format,
	"deploy": deploy,
	"commit" : commit,
	"-v" : version,
	"--v" : version
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

	version();
	log("usage:");
	log("	wk init   | initializes a new project with boilerplate code");
	log("	wk start  | auto-builds components and serves them under ./www folder");
	log("	wk build  | makes a production build under ./build folder (minifies js&css)");
	log("	wk burn   | builds all ts files, minifies js&css and embeds them into build/index.html");
	log("	wk new    | creates a new component under ./com folder");
	log("	wk del    | deletes a component, this command is not reversible");
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
	if (!FS.existsSync("./www")){FS.mkdirSync("./www");}
	if (!FS.existsSync("./src")){FS.mkdirSync("./src");}
	if (!FS.existsSync("./com")){FS.mkdirSync("./com");}
	log("- folders created");

	FS.writeFileSync("./src/component.ts",Buffer.from(SOURCE_COMPONENT, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./www/index.html",Buffer.from(SOURCE_INDEX, 'base64').toString('ascii'),"utf8");
	log("- classes created");

	newComponent(["application"]);
	FS.writeFileSync("./com/application/application.css",Buffer.from(SOURCE_BASIC_CSS, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./com/application/application.html",Buffer.from(SOURCE_BASIC_HTML, 'base64').toString('ascii'),"utf8");

	highlight("project initialized successfully");
	log("you can run **start** command now")
	log("wk start  | auto-builds components and serves them under ./www folder");
}

function deinit()
{
	deleteFolderRecursive("./www");
	deleteFolderRecursive("./src");
	deleteFolderRecursive("./com");
	log("- de initialized project and deleted all files");
}

function start(port)
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
	checkVersion();
	log("starting file server and auto-builder");
	
	startWatcher();
	var OPN = require("opn");

	const EXPRESS = require('express');
	const PATH = require('path');
	const EXPRESS_APP = EXPRESS();
	
	// serve static assets normally
	EXPRESS_APP.use(EXPRESS.static('./www'));
	EXPRESS_APP.get('*', function (request, response) {
		response.sendFile(PATH.resolve("./www", 'index.html'));
	});
	
	
	console.log("server started on port " + port);	

	var pf = require("portfinder");
	pf.basePort = 8040;
	pf.getPort(function (err, port)
	{
		if (err)
		{
			error("no port available for http server");
		}
		EXPRESS_APP.listen(port);
		// server.listen(port);
		log("listening localhost:" + port);
		
		setTimeout(function(){
			OPN('http://localhost:' + port);
		}, 3000);
	});
}

function startWatcher()
{
	updateMarkupEnums();
	var watch = require('node-watch');
	watch(COMPONENT_BASE_PATH, { recursive: true }, onchange);
	watch(CLASS_BASE_PATH, { recursive: true }, onchange);
	onchange("change",".ts");
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
		log("	wk new component-name | creates a new component under ./com folder with given component-name");
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

	var input = "./com/" + a[0] + '/' + a[0];

	if (!FS.existsSync(input + '.html') || !FS.existsSync(input + '.ts') || !FS.existsSync(input + '.css'))
	{
		error("there is no component named " + a[0]);
		return;
	}

	deleteFolderRecursive("./com/" + a[0]);
	updateMarkupEnums();
	log("deleted component -> " + a[0])
}

function version()
{
	log("version: " + VERSION);
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
				"check-decl",
				"check-operator",
				"check-separator",
				"check-type"
			]
		}
	}

	
	FS.writeFileSync("./tslint.json", JSON.stringify(rules));
	
	var hasError = false;
	try{
		EXEC("tslint */**/*.ts");
	}catch(e)
	{
		hasError = true;
		error(e.stdout.toString('utf8'));
	}

	try{
		EXEC("tslint */*.ts");
	}catch(e)
	{
		hasError = true;
		error(e.stdout.toString('utf8'));
	}
	
	if (hasError)
		error('linter failed')
	else
		log("analysis successful!");

	FS.unlinkSync("./tslint.json");
}

function checkLinter()
{

}

function deploy()
{
	build();
	EXEC("git add -A;");
	EXEC("git commit -m 'release';");
	EXEC("git push;");
	log("deployed");
}


function commit(message)
{
	if (typeof message === "undefined")
		message = "auto release";

	EXEC("git add -A;");
	EXEC("git commit -m '"+message+"';");
	EXEC("git push;");
}

function format()
{
	var rules =
	{
		"indentSize": 8,
		"tabSize": 8,
		"newLineCharacter": "\n",
		"convertTabsToSpaces": false,
		"insertSpaceAfterCommaDelimiter": true,
		"insertSpaceAfterSemicolonInForStatements": false,
		"insertSpaceBeforeAndAfterBinaryOperators": true,
		"insertSpaceAfterKeywordsInControlFlowStatements": true,
		"insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
		"insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,
		"insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
		"placeOpenBraceOnNewLineForFunctions": true,
		"placeOpenBraceOnNewLineForControlBlocks": true
	}
	
	FS.writeFileSync("./tsfmt.json", JSON.stringify(rules));
	
	var hasError = false;
	try{
		EXEC("tsfmt -r */**/*.ts");
	}catch(e)
	{
		hasError = true;
		error(e.stdout.toString('utf8'));
	}

	try{
		EXEC("tsfmt -r */*.ts");
	}catch(e)
	{
		hasError = true;
		error(e.stdout.toString('utf8'));
	}
	
	if (hasError)
		error('formatting failed')
	else
		log("formatting completed!");

	FS.unlinkSync("./tsfmt.json");	
}

function checkVersion()
{
	const https = require('https');
	
	https.get('https://raw.githubusercontent.com/alperr/wk/master/package.json',
	(resp) =>
	{
		var data = '';
		resp.on('data', (chunk) => { data += chunk; });
		resp.on('end', () =>
		{
			try
			{
				var latestVersion = JSON.parse(data)["version"];
				var l = latestVersion.split(".");
				var latest = Number(l[0]) * 10000 + Number(l[1]) * 100 + Number(l[2]);
			}
			catch(e){ return; }
			
			var p = VERSION.split(".");
			var current = Number(p[0]) * 10000 + Number(p[1]) * 100 + Number(p[2]);
			
			if (latest > current)
			{
				var msg = "there is a newer version of wk -> " + latestVersion + " (your version is "+VERSION+")";
				error(msg);
				log("to update:")
				msg = "";
				msg += "npm un -g wk-toolkit\n";
				msg += " npm i -g wk-toolkit\n";
				minorLog(msg);
			}
		});
	}).on("error", (err) => {});
}

function buildLibrary()
{
	log("building a library");
}

function build()
{
	log("building for production");
	changedFiles.push(".ts");
	transpileAll(1);
	deleteFolderRecursive("./build");
	copyRecursiveSync("./www", "./build");

	FS.unlinkSync("./build/dev.css");
	FS.unlinkSync("./build/dev.json");
	FS.unlinkSync("./build/dev.js");
	FS.unlinkSync("./build/index.html");

	var name;
	var UGLIFYJS = require("uglify-js");
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(FS.readFileSync("./www/index.html"));

	name = uid();
	$("link[href$='./dev.css']").attr("href" , "./" + name + ".css");
	$("script[src$='./dev.js']").attr("src" , "./" + name + ".js");

	var h = $.html();
	h = h.replace('"./dev.json"', '"./'+name+'.json"');
	
	var jsContent =  FS.readFileSync("./www/dev.js", "utf8");
	var options = 
	{
		"mangle" :
		{
			"toplevel" : true,
			"reserved": ['Application']
		}
	}
	console.time('\x1b[32m minification\x1b[0m');
	var minifiedJSCode = UGLIFYJS.minify(jsContent, options);
	if(minifiedJSCode.error)
	{
		console.log(minifiedJSCode.error);
		error("unable to minify javascript file");
		return;
	}

	var UGLIFYCSS = require('uglifycss');
	var minifiedCSS = UGLIFYCSS.processFiles([ './www/dev.css' ], {});

	FS.writeFileSync( "./build/" + name + ".js", minifiedJSCode.code)
	FS.writeFileSync("./build/index.html" , h);
	FS.writeFileSync( "./build/" + name + ".css", minifiedCSS)
	FS.copyFileSync("./www/dev.json", "./build/" + name + ".json");

	console.timeEnd('\x1b[32m minification\x1b[0m');
	log("production build completed with seed " + name);
	return name;
}

function burn()
{
	log("building&embedding into build/index.html");
	changedFiles.push(".ts");
	transpileAll(1);
	deleteFolderRecursive("./build");
	copyRecursiveSync("./www", "./build");

	var markup = FS.readFileSync("./build/dev.json");
	FS.unlinkSync("./build/dev.css");
	FS.unlinkSync("./build/dev.json");
	FS.unlinkSync("./build/dev.js");
	FS.unlinkSync("./build/index.html");

	var UGLIFYJS = require("uglify-js");
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(FS.readFileSync("./www/index.html"));

	$("script[src$='dev.js']").remove();
	$("link[href$='dev.css']").remove();

	var embedScript = "";
	embedScript += "		window.onload = function () { window.__markup_data = " + markup +";";
	embedScript += "		new Application(document.getElementById('root')); }"

	var jsContent =  FS.readFileSync("./www/dev.js", "utf8");
	var options = 
	{
		"mangle" :
		{
			"toplevel" : true,
			"reserved": ['Application']
		}
	}
	console.time('\x1b[32m minification\x1b[0m');
	var minifiedJSCode = UGLIFYJS.minify(jsContent, options);
	if(minifiedJSCode.error)
	{
		console.log(minifiedJSCode.error);
		error("unable to minify javascript file");
		return;
	}
	$("#wk-script").text(minifiedJSCode.code + "\n" + embedScript+ "\n");
	var UGLIFYCSS = require('uglifycss');
	var minifiedCSS = UGLIFYCSS.processFiles([ './www/dev.css' ], {});
	var css = $("style").html() + "\n" + minifiedCSS+ "\n";
	$("style").text(css);

	FS.writeFileSync("./build/index.html" , $.html());
	console.timeEnd('\x1b[32m minification\x1b[0m');
	log("burn completed");
}


function createComponentFiles(name)
{
	if (FS.existsSync("./com/" + name))
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

	FS.mkdirSync("./com/" + name);
	FS.writeFileSync("./com/" + name + "/" + name + ".html" , html, "utf8");
	FS.writeFileSync("./com/" + name + "/" + name + ".css" , css, "utf8");
	FS.writeFileSync("./com/" + name + "/" + name + ".ts" , ts, "utf8");

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
	var components = FS.readdirSync("./com/");
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
	FS.writeFileSync("./src/component.ts", s, "utf8");
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


function transpileAll(counter)
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
	changedFiles = [];
	console.time('\x1b[32m transpile\x1b[0m');

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
		markup = encodeURIComponent(markup)
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
		command = "tsc --out ./www/dev.js --target 'es6' ";

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
	console.timeEnd('\x1b[32m transpile\x1b[0m');
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
		transpileAll(counter)
		counter = 0;
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
	if (!FS.existsSync(path + "www"))
	{
		return false;
	}

	if (!FS.existsSync(path + "com"))
	{
		return false;
	}

	if (!FS.existsSync(path + "src"))
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

function copyRecursiveSync(src, dest)
{
	var exists = FS.existsSync(src);
	var stats = exists && FS.statSync(src);
	var isDirectory = exists && stats.isDirectory();
	if (exists && isDirectory)
	{
		FS.mkdirSync(dest);
		FS.readdirSync(src).forEach(function(childItemName)
		{
			copyRecursiveSync(PATH.join(src, childItemName), PATH.join(dest, childItemName));
		});
	}
	else
	{
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

	var id = int2Base62(Math.floor((Date.now()) / 6000));
	id = id.substr(id.length-4, 4);
	return id;
}