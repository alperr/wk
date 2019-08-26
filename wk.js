#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');
const EXEC = require('child_process').execSync;
const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";

const SOURCE_COMPONENT = 'Ly8gVEhJUyBGSUxFIElTIEFVVE8gR0VORVJBVEVEICwgRE8gTk9UIEVESVQNCmNsYXNzIENvbXBvbmVudA0Kew0KCWNvbnN0cnVjdG9yKHJvb3QsIG1hcmt1cCkNCgl7DQoJCXRoaXMucm9vdCA9IHJvb3Q7DQoJCXZhciBlbGVtZW50ID0gQ29tcG9uZW50LmxvYWRfbWFya3VwKG1hcmt1cCk7DQoJCXRoaXMucm9vdC5hcHBlbmRDaGlsZChlbGVtZW50KTsNCgl9DQoNCglmaW5kKHF1ZXJ5KSAvLyBhbGlhcyBmb3IgcXVlcnlTZWxlY3RvciwgaW5zcGlyZWQgZnJvbSBqUXVlcnkgDQoJew0KCQlyZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTsNCgl9DQoNCglxdWVyeVNlbGVjdG9yKHF1ZXJ5KQ0KCXsNCgkJcmV0dXJuIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTsNCgl9DQoNCglxdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KQ0KCXsNCgkJcmV0dXJuIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KTsNCgl9DQoNCglzdGF0aWMgbG9hZF9tYXJrdXAoa2V5KSAvLyBhbHNvIHVzZWQgZm9yIHRlbXBsYXRlIGxvYWRpbmcNCgl7DQoJCXZhciB3ID0gd2luZG93Ow0KCQlpZiAoIXcuX19tYXJrdXBfZGF0YVtrZXldKQ0KCQkJdGhyb3cgInRoZXJlIGlzIG5vIG1hcmt1cCBmb3IgIiArIGtleTsNCgkNCgkJZnVuY3Rpb24gaHRtbF90b19lbGVtZW50KGh0bWwpDQoJCXsNCgkJCXZhciB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7DQoJCQlodG1sID0gaHRtbC50cmltKCk7DQoJCQl0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sOw0KCQkJcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDsNCgkJfQ0KCQl2YXIgaHRtbCA9IGRlY29kZVVSSUNvbXBvbmVudChhdG9iKHcuX19tYXJrdXBfZGF0YVtrZXldKSk7DQoJCXJldHVybiBodG1sX3RvX2VsZW1lbnQoaHRtbCk7DQoJfQ0KfQ==';
const SOURCE_INDEX = 'PGh0bWw+Cgk8aGVhZD4KCQk8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CgkJPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCI+CgkJPHRpdGxlPndrPC90aXRsZT4KCTwvaGVhZD4KCTxib2R5PjwvYm9keT4KPC9odG1sPg==';
const SOURCE_SAMPLE = 'Y2xhc3MgU2FtcGxlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50DQp7DQoJY29uc3RydWN0b3Iocm9vdCwgb3B0aW9ucykNCgl7DQoJCXN1cGVyKHJvb3QsICJzYW1wbGUtY29tcG9uZW50Iik7DQoJfQ0KfQ==';
const SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwbGljYXRpb24nPgoJPGgxPmJhc2ljIHdrIHByb2plY3Q8L2gxPgoJPHA+dGhpcyBwYWdlIGlzIGdlbmVyYXRlZCBieSBhcHBsaWNhdGlvbiBjb21wb25lbnQ8L3A+Cgk8cD5pdCBjYW4gYmUgZm91bmQgdW5kZXIgPHN0cm9uZz4vY29tcG9uZW50czwvc3Ryb25nPiBmb2xkZXI8L3A+Cgk8cCBjbGFzcz0nYWNjZW50Jz55b3UgY2FuIHR3ZWFrIHRoaXMgY29tcG9uZW50J3Mgc3R5bGUgYnkgZWRpdGluZyA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uY3NzPC9zdHJvbmc+IGZpbGU8L3A+Cgk8cD5hbGwgdGhpcyBjb21wb25lbnQgbWFya3VwIGlzIHdyaXR0ZW4gaW50byA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uaHRtbDwvc3Ryb25nPjwvcD4KPC9kaXY+';
const SOURCE_BASIC_CSS = 'LmFwcGxpY2F0aW9uICp7Cglmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmOwp9CgouYXBwbGljYXRpb24gLmFjY2VudHsKCWNvbG9yOiAjYzBhOwp9';
const SOURCE_HTTP = 'dmFyIGh0dHBfYmFzZSA9ICJodHRwOi8vbG9jYWxob3N0OjgwNjAvIjsKCmZ1bmN0aW9uIGh0dHBfZ2V0X2ZvbyhpZCwgb25sb2FkKSAvLyBzYW1wbGUgZ2V0IHJlcXVlc3QKewoJaHR0cF94aHIoIkdFVCIsICJmb28/aWQ9IiArIGlkLCBvbmxvYWQpOwp9CgpmdW5jdGlvbiBodHRwX3Bvc3RfYmFyKGRhdGExLCBkYXRhMiwgb25sb2FkKSAvLyBzYW1wbGUgcG9zdCByZXF1ZXN0CnsKCXZhciBib2R5ID0KCXsKCQkiZGF0YTEiOiBkYXRhMSwKCQkiZGF0YTIiOiBkYXRhMgoJfTsKCglodHRwX3hocigiUE9TVCIsICJiYXIiLCBvbmxvYWQsIGJvZHkpOwp9CgpmdW5jdGlvbiBodHRwX3hocihtZXRob2QsIHVybCwgb25sb2FkLCBib2R5KQp7Cgl2YXIgeCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOwoJeC5vcGVuKG1ldGhvZCwgaHR0cF9iYXNlICsgdXJsKTsKCXguc2V0UmVxdWVzdEhlYWRlcigiQ29udGVudC1UeXBlIiwgImFwcGxpY2F0aW9uL2pzb24iKTsKCXgub25sb2FkID0gZnVuY3Rpb24oKQoJewoJCWlmICh4LnN0YXR1cyAhPSAyMDApCgkJewoJCQlvbmxvYWQodW5kZWZpbmVkLCB0cnVlKTsKCQkJcmV0dXJuOwoJCX0KCQl0cnkKCQl7CgkJCXZhciByID0geC5yZXNwb25zZVRleHQ7CgkJCW9ubG9hZChyLCBmYWxzZSk7CgkJfQoJCWNhdGNoKGUpCgkJewoJCQlvbmxvYWQociwgdHJ1ZSk7CgkJfQoJfQoKCXgub25lcnJvciA9IGZ1bmN0aW9uKCkKCXsKCQlvbmxvYWQodW5kZWZpbmVkLCB0cnVlKTsKCX0KCglpZiAobWV0aG9kLnRvVXBwZXJDYXNlKCkgPT0gIlBPU1QiKQoJewoJCWlmICh0eXBlb2YgYm9keSA9PSAib2JqZWN0IikKCQkJYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpOwoKCQl4LnNlbmQoYm9keSk7Cgl9CgllbHNlCgl7CgkJeC5zZW5kKCk7Cgl9Cn0=';
const SOURCE_START_SCRIPT = 'PHNjcmlwdCBpZD0id2stc2NyaXB0Ij4Kd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpCnsKCXZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKCXhoci5vcGVuKCJHRVQiLCIuL2Rldi5qc29uIik7Cgl4aHIuc2VuZCgpOwoJeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkKCXsKCQkvL0hPVF9SRUxPQURfQ09ERS8vCgkJd2luZG93Ll9fbWFya3VwX2RhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOwoJCW5ldyBBcHAoZG9jdW1lbnQuYm9keSk7Cgl9Cn0KPC9zY3JpcHQ+';
const SOURCE_HOT_RELOAD = 'dmFyIHdzID0gbmV3IFdlYlNvY2tldCgid3M6Ly8xMjcuMC4wLjE6e3tXU19QT1JUfX0iKTsKd3Mub25tZXNzYWdlID0gZnVuY3Rpb24oKXsgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uOyB9';

const BASE_PATH_COMPONENT = "./src/components/";
const BASE_PATH_SRC = "./src/";
const BASE_PATH_PUBLIC = "./public/";

const VERSION = "0.3.3";

var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"burn" : burn,
	"new" : new_component,
	"build" : build,
	"help" : print_large_help,
	"del" : delete_component,
	"deploy": deploy,	// remove
	"commit" : commit,	// remove
	"extras": add_extras,
	"-v" : version,
	"--v" : version,
	"n" : new_component,
	"i"  : init,
	"s" : start,
	"b" : build,
	"d" : delete_component,
	"v" : version,
	"h" : print_large_help,
	"x" : add_extras
}

var g_changed_files = [];
var g_timer;
var g_css;
var g_js;
var g_json;
var g_component;
var g_socket_clients = {};
var g_ws_port;

var args = process.argv.slice(2);
var command = args[0];
args = args.slice(1);

if (typeof commands[command] == 'undefined')
	print_small_help(command);
else
	commands[command](args);

function print_small_help(c)
{
	if (typeof c != 'undefined')
		error("invalid command: " + c);

	version();
	log("usage:");
	log("	wk init  | initializes a new project");
	log("	wk start | starts development server");
	log("	wk build | creates a production build");
	log("	wk help  | docs");	
}

function print_large_help()
{
	version();
	var msg = `
wk has following 8 commands

  wk init                            (i)
initializes a new project
creates required folders src, public
and app component

  wk start <port?>                   (s)
starts development server on 
http://localhost:6040
takes an optional argument for http port

  wk build                           (b)
creates a production build
minifies javascript and css, puts them
under build/ folder with a time seed

  wk new <component-name>            (n)
generates component folder
generates necessary js,css and html files

  wk del <component-name>            (d)
deletes component folder recursively

  wk extras                          (x)
generates extra utility javascript files

  wk help                            (h)
prints this help text

  wk version                         (v)
prints version
	`;

	log(msg);
}

function init()
{
	if (is_project_valid("./"))
	{
		error("current folder is already initialized");
		return;
	}

	log("initializing a new project");
	create_folder_if_not_exits(BASE_PATH_PUBLIC);
	create_folder_if_not_exits(BASE_PATH_SRC);
	create_folder_if_not_exits(BASE_PATH_COMPONENT);
	b64_to_file("./public/index.html", SOURCE_INDEX);

	new_component(["app"]);
	
	b64_to_file(BASE_PATH_COMPONENT + "app/app.css", SOURCE_BASIC_CSS);
	b64_to_file(BASE_PATH_COMPONENT + "app/app.html", SOURCE_BASIC_HTML);

	var jsconfig = {"include": ["src/**/*" ]};

	FS.writeFileSync("./jsconfig.json", JSON.stringify(jsconfig), "utf8");

	highlight("project initialized successfully");
	log("you can run **start** command now")
	log("wk start  | auto-builds components and serves them under ./public folder");
}

function deinit()
{
	delete_folder_recursive(BASE_PATH_SRC);
	delete_folder_recursive(BASE_PATH_PUBLIC);
	log("- de initialized project and deleted all files");
}

function start(port)
{
	if (!is_project_valid("./"))
	{
		if (is_project_valid("../"))
		{
			error("current folder is not the base folder of project");
			error("navigate to up one level and try **wk start** again")
		}
		else if (is_project_valid("../../"))
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
	check_legacy_project();
	check_version();
	log("starting file server and auto-builder");
	
	start_watcher();
	var OPN = require("open");

	const EXPRESS = require('express');
	const EXPRESS_APP = EXPRESS();

	EXPRESS_APP.get("/index.html", function (request, response)
	{
		response.setHeader("Content-Type", "text/html");
		response.send(render_index_html(true));
		return;
	});

	EXPRESS_APP.use(EXPRESS.static('./public', {index: false}));
	EXPRESS_APP.get('*', function (request, response)
	{
		if (request.originalUrl == "/dev.js")
		{
			response.setHeader("Content-Type", "text/javascript");
			response.send(g_js);
			return;
		}
		
		if (request.originalUrl == "/dev.css")
		{
			response.setHeader("Content-Type", "text/css");
			response.send(g_css);
			return;
		}

		if (request.originalUrl == "/dev.json")
		{
			response.setHeader("Content-Type", "application/json");
			response.send(g_json);
			return;
		}

		if (request.originalUrl == "/index.html")
		{
			response.setHeader("Content-Type", "text/html");
			response.send(render_index_html(true));
			return;
		}

		response.setHeader("Content-Type", "text/html");
		response.send(render_index_html(true));
	});

	if (typeof port[0] == "undefined")
		port = 6040;
	else
		port = port[0];

	log("trying localhost:" + port);

	var PS = require("portscanner");
	PS.findAPortNotInUse(port, port + 100, "127.0.0.1", function (err, port)
	{
		if (err)
		{
			error("no port available for http server");
		}

		EXPRESS_APP.listen(port);
		log("listening localhost:" + port);

		setTimeout(function()
		{
			OPN('http://localhost:' + port);
		}, 250);

		g_ws_port = port + 1;
		const WS = require("ws");
		const WS_SERVER = new WS.Server({ "port": g_ws_port });

		WS_SERVER.on('connection', function connection(ws)
		{
			var s = seed(16);
			ws.data = s;
			g_socket_clients[s] = ws;
			ws.on("close", function()
			{
				delete g_socket_clients[ws.data];
			});
		});
	});
}

function start_watcher()
{
	update_markup_enums();
	var watch = require('node-watch');
	watch(BASE_PATH_COMPONENT, { recursive: true }, onchange);
	watch(BASE_PATH_SRC, { recursive: true }, onchange);
	onchange("change",".js");
}

function new_component(a)
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

	if (!print_invalid_project_msg("./"))
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

	create_component_files(a[0]);
	update_markup_enums();
}

function delete_component(a)
{
	if (a.length == 0)
	{
		log("usage:")
		log("	wk del component-name |  deletes a component, this command is not reversible");
		return;
	}

	if (!print_invalid_project_msg("./"))
		return;

	var input = BASE_PATH_COMPONENT + a[0] + '/' + a[0];

	if (!FS.existsSync(input + '.html') || !FS.existsSync(input + '.js') || !FS.existsSync(input + '.css'))
	{
		error("there is no component named " + a[0]);
		return;
	}

	delete_folder_recursive(BASE_PATH_COMPONENT + a[0]);
	update_markup_enums();
	log("deleted component -> " + a[0])
}

function version()
{
	log("version: " + VERSION);
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

function check_version()
{
	const HTTPS = require('https');
	
	HTTPS.get('https://raw.githubusercontent.com/alperr/wk/master/package.json',
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
				minor_log(msg);
			}
		});
	}).on("error", (err) => {});
}

function build()
{
	check_legacy_project();
	log("building for production");
	g_changed_files.push(".js");
	update_markup_enums();
	transpile_all();
	delete_folder_recursive("./build");
	copy_recursive_sync("./public", "./build");

	FS.unlinkSync("./build/index.html");

	var name;
	var UGLIFYJS = require("uglify-es");
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(render_index_html(false));

	name = time_seed();
	$("link[href$='./dev.css']").attr("href" , "./" + name + ".css");
	$("script[src$='./dev.js']").attr("src" , "./" + name + ".js");

	var h = $.html();
	h = h.replace('"./dev.json"', '"./'+name+'.json"');
	
	var options = 
	{
		"mangle" :
		{
			"toplevel" : true,
			"reserved": ['App', 'Component']
		}
	}
	var msg = '\x1b[32m minification\x1b[0m';
	console.time(msg);
	var minified_js = UGLIFYJS.minify(g_js, options);
	if(minified_js.error)
	{
		console.log(minified_js.error);
		error("unable to minify javascript file");
		return;
	}

	var UGLIFYCSS = require('uglifycss');
	var minified_css = UGLIFYCSS.processString(g_css, {});

	FS.writeFileSync( "./build/" + name + ".js", minified_js.code);
	FS.writeFileSync("./build/index.html" , h);
	FS.writeFileSync( "./build/" + name + ".css", minified_css);
	FS.writeFileSync( "./build/" + name + ".json", JSON.stringify(g_json));

	console.timeEnd(msg);
	log("production build completed with seed " + name);
	return name;
}

// needs a whole rewrite
function burn()
{
	log("building & embedding into build/index.html");
	g_changed_files.push(".js");
	transpile_all();
	delete_folder_recursive("./build");
	copy_recursive_sync("./public", "./build");

	var markup = FS.readFileSync("./build/dev.json");
	FS.unlinkSync("./build/index.html");

	var UGLIFYJS = require("uglify-es");
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(FS.readFileSync("./public/index.html"));

	$("script[src$='dev.js']").remove();
	$("link[href$='dev.css']").remove();

	var embed_script = "";
	embed_script += "		window.onload = function () { window.__markup_data = " + markup +";";
	embed_script += "		new App(document.getElementById('root')); }"

	var js_content =  FS.readFileSync("./public/dev.js", "utf8");
	var options = 
	{
		"mangle" :
		{
			"toplevel" : true,
			"reserved": ['App']
		}
	}
	console.time('\x1b[32m minification\x1b[0m');
	var minified_js = UGLIFYJS.minify(js_content, options);
	if(minified_js.error)
	{
		console.log(minified_js.error);
		error("unable to minify javascript file");
		return;
	}
	$("#wk-script").text(minified_js.code + "\n" + embed_script+ "\n");
	var UGLIFYCSS = require('uglifycss');
	var minified_css = UGLIFYCSS.processFiles([ './public/dev.css' ], {});

	if (typeof $("style")[0] == "undefined")
		$("head").append($("<style></style>")); 

	var css = $("style").html() + "\n" + minified_css+ "\n";
	$("style").text(css);

	FS.writeFileSync("./build/index.html" , $.html());
	console.timeEnd('\x1b[32m minification\x1b[0m');
	log("burn completed");
}

function add_extras()
{
	var path;

	path = "./src/http.js"
	if (!FS.existsSync(path))
	{
		b64_to_file(path, SOURCE_HTTP);
		log("written " + path);
	}
}


function create_component_files(name)
{
	if (FS.existsSync(BASE_PATH_COMPONENT + name))
	{
		error("a component with a name " + name + " already exists");
		return;
	}

	var upper = "MARKUP_" + dash_to_upper(name);
	var pascal = dash_to_pascal(name);
	
	var js = to_ascii(SOURCE_SAMPLE);
	js = js.replace("SampleComponent", pascal);
	js = js.replace('"sample-component"', upper);

	var html = '<div class="'+name+'"></div>';
	var css = '.'+name+'{}';


	FS.mkdirSync(BASE_PATH_COMPONENT + name);
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".html" , html, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".css" , css, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".js" , js, "utf8");

	log("created a new component named " + name);
}

function find_template_files(path, componentName)
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

function update_markup_enums()
{
	var counter = 0;
	var components = FS.readdirSync(BASE_PATH_COMPONENT);
	var s = "";
	for (var i in components)
	{
		if (components[i].startsWith("."))
			continue;

		var name = "MARKUP_" + dash_to_upper(components[i]);
		s += "\nconst " + name + " = " + counter + ";";
		counter++;
	}

	for (var i in components)
	{
		if (components[i].startsWith("."))
			continue;

		var templates = find_template_files(BASE_PATH_COMPONENT + components[i] + '/', components[i]);
		for (var t in templates)
		{
			var name = "TEMPLATE_" + dash_to_upper(components[i]) + "__" + dash_to_upper(templates[t]);
			s += "\nconst " + name + " = " + counter + ";";
			counter++;
		}
	}

	s = to_ascii(SOURCE_COMPONENT) + s;
	g_component = s;
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

function minor_log(m)
{
	console.log(FG_DIM, m, RESET);
}

function transpile_all()
{
	var html_changed = false;
	var css_changed = false;
	var js_changed = false;

	for (var i in g_changed_files)
	{
		if (g_changed_files[i].endsWith(".js"))
			js_changed = true;

		if (g_changed_files[i].endsWith(".css"))
			css_changed = true;

		if (g_changed_files[i].endsWith(".html"))
			html_changed = true;
	}

	if (js_changed) msg = "  (js) |"
	if (css_changed) msg = " (css) |";
	if (html_changed) msg = "(html) |";
	msg = FG_DIM + msg + RESET + '\x1b[32m transpile \x1b[0m';
	console.time(msg);
	
	g_changed_files = [];
	var css = '';
	var markups = [];
	var js_files = [];
	var names = [];

	var files = FS.readdirSync(BASE_PATH_SRC);
	files.forEach(function(file)
	{
		if (!file.endsWith(".js"))
			return;

		js_files.push(BASE_PATH_SRC + file);
	});

	files = FS.readdirSync(BASE_PATH_COMPONENT);
	files.forEach(function(file)
	{
		if (file.indexOf('.') == 0)
			return;	

		names.push(file);
	});

	for (var i=0;i<names.length;i++)
	{
		var input = BASE_PATH_COMPONENT + names[i] + '/' + names[i];

		if (!FS.existsSync(input + '.html')) 
		{
			error('missing file ->' + input + '.html  build cancelled');
			return;
		}

		if (!FS.existsSync(input + '.js')) 
		{
			error('missing file ->' + input + '.js  build cancelled');
			return;
		}

		if (markups[names[i]])
		{
			error('duplicate markup file ->' + names[i] + '.html  build cancelled');
			return;
		}

		var markup = FS.readFileSync(input + ".html","utf8");
		markup = encodeURIComponent(markup)
		markups.push(Buffer.from(markup, "utf8").toString('base64'));
		js_files.push(input + ".js");

		if (FS.existsSync(input + '.css')) 
			css += FS.readFileSync(input + ".css","utf8") + '\n';
	}

	for (var i=0;i<names.length;i++)
	{
		var templates = find_template_files(BASE_PATH_COMPONENT + names[i] + '/', names[i]);
		for (var t in templates)
		{
			var markup = FS.readFileSync(BASE_PATH_COMPONENT + names[i] + "/" + templates[t] + ".html","utf8");
			markups.push(Buffer.from(markup, "utf8").toString('base64'));
		}
	}

	var js = g_component + "\n";
	for (var i=0;i<js_files.length;i++)
		js += FS.readFileSync(js_files[i], "utf8") + '\n';

	g_js = js;
	g_css = css;
	g_json = markups;
	console.timeEnd(msg);

	for (var i in g_socket_clients)
	{
		g_socket_clients[i].send("reload-all");
	}
}

function onchange(event, file_name)
{
	if (!file_name.endsWith(".js") && !file_name.endsWith(".css") && !file_name.endsWith(".html"))
		return;

	clearTimeout(g_timer);
	g_changed_files.push(file_name);
	g_timer = setTimeout(transpile_all, 40);
}

function print_invalid_project_msg(path)
{
	if (!is_project_valid(path))
	{
		error("current folder is not a valid wk project, initialize first");
		log("usage:");
		log("	wk init   | initializes a new project with boilerplate code");
		return  false;
	}
	return true;
}

function is_project_valid(path)
{
	if (!FS.existsSync(path + "public"))
	{
		return false;
	}

	if (!FS.existsSync(path + "src"))
	{
		return false;
	}

	if (!FS.existsSync(path + "src/components"))
	{
		return false;
	}

	return true;
}

function check_legacy_project()
{
	var files = FS.readdirSync(BASE_PATH_SRC);
	files.forEach(function(file)
	{
		if (file.endsWith(".ts"))
		{
			error("Incompatible CLI");
			minor_log("this is a legacy project !");
			minor_log("wk dropped typescript support starting with version 0.3.0");
			minor_log("uninstall current CLI ("+VERSION+") and install latest");
			minor_log("typescript-compatible CLI (0.2.22) to work on this project");
			log("npm un -g wk-toolkit");
			log("npm i -g wk-toolkit@0.2.22");
			process.exit();
		}
	});
}

function create_folder_if_not_exits(path)
{
	if (!FS.existsSync(path)){FS.mkdirSync(path);}
}

function delete_folder_recursive(path)
{
	if (FS.existsSync(path))
	{
		FS.readdirSync(path).forEach(function(file, index)
		{
			var curPath = path + "/" + file;
			if (FS.lstatSync(curPath).isDirectory())
				delete_folder_recursive(curPath);
			else
				FS.unlinkSync(curPath);
		});
		FS.rmdirSync(path);
	}
}

function copy_recursive_sync(src, dest)
{
	var exists = FS.existsSync(src);
	var stats = exists && FS.statSync(src);
	var is_directory = exists && stats.isDirectory();
	if (exists && is_directory)
	{
		FS.mkdirSync(dest);
		FS.readdirSync(src).forEach(function(child_name)
		{
			copy_recursive_sync(PATH.join(src, child_name), PATH.join(dest, child_name));
		});
	}
	else
	{
		FS.linkSync(src, dest);
	}
};

function dash_to_pascal(s)
{
	var words = s.split("-");
	var r = [];
	for (var i in words)
		r.push(words[i][0].toUpperCase() + words[i].slice(1));

	return r.join("");
}

function dash_to_upper(s)
{
	var words = s.split("-");
	var r = [];
	for (var i in words)
		r.push(words[i].toUpperCase());

	return r.join("_");
}

function unlink_if_exists(path)
{
	try { FS.unlinkSync(path); }
	catch (e) { }
}

function to_ascii(source)
{
	return Buffer.from(source, 'base64').toString('ascii');
}

function b64_to_file(path, source)
{
	FS.writeFileSync(path, to_ascii(source), "utf8");
}

function seed(length)
{
	var alphabet = '0123456789abcdefghijklmnopqrstuwvxyz';
	var s = "";
	for (var i=0;i<length;i++)
	{
		var ind = Math.floor(Math.random() * alphabet.length);
		s += alphabet[ind]
	}
	return s;
}

function time_seed()
{
	var alphabet = '0123456789abcdefghijklmnopqrstuwvxyz';
	function int2str(i)
	{
		var r = "";
		while(i > alphabet.length - 1)
		{
			r = alphabet[i % alphabet.length] + r;
			i = Math.floor(i / alphabet.length);
		}
		r = alphabet[i] + r;
		return r;
	}

	const SEED_LENGTH = 4;
	var id = int2str(Math.floor((Date.now()) / 1000));
	id = id.substr(id.length - SEED_LENGTH, SEED_LENGTH);
	return id;
}

function render_index_html(development_mode)
{
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(to_ascii(SOURCE_INDEX));
	$("head").append('<link rel="stylesheet" href="./dev.css">');
	$("head").append('<script src="./dev.js"></script>');
	var src = to_ascii(SOURCE_START_SCRIPT);
	if (development_mode)
	{
		var reloader = to_ascii(SOURCE_HOT_RELOAD);
		src = src.replace("//HOT_RELOAD_CODE//", reloader);
	}
	else
	{
		src = src.replace("//HOT_RELOAD_CODE//", "");
	}

	$("html").append(src);
	var h = $.html();
	h = h.replace("{{WS_PORT}}" , g_ws_port);
	return h;
}

function time_seed_v2()
{
	var months = [ 	"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
			"Sep", "Oct", "Nov", "Dec"];

	var date = new Date();
	var month = months[date.getUTCMonth()];
	var day = date.getUTCDate();

	var year = date.getUTCFullYear();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	var formatted = year + "_" + month + "_" + day + "_";
	formatted += hour + "_" + minutes + "_" + seconds;
	return formatted;
}