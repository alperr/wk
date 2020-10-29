#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');
const EXEC = require('child_process').execSync;
const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";

const SOURCE_INDEX = 'PGh0bWw+Cgk8aGVhZD4KCQk8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CgkJPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCI+CgkJPHRpdGxlPndrPC90aXRsZT4KCTwvaGVhZD4KCTxib2R5PgoJCTx3ZWItYXBwPjwvd2ViLWFwcD4KCTwvYm9keT4KPC9odG1sPg==';
const SOURCE_SAMPLE = 'Y2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudA0Kew0KCWNvbnN0cnVjdG9yKCl7IHN1cGVyKCk7IH0NCgljb25uZWN0ZWRDYWxsYmFjaygpDQoJew0KCQkNCgl9DQp9';
const SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwJz4KCTxoMj5oZWxsbzwvaDI+Cgk8cD50aGlzIHBhZ2UgaXMgZ2VuZXJhdGVkIGJ5IGEgY29tbWFuZCBsaW5lIGludGVyZmFjZTogPHN0cm9uZz53azwvc3Ryb25nPiA8L3A+Cgk8cD53ZWIgYXBwcyBnZW5lcmF0ZWQgd2l0aCA8c3Ryb25nPndrPC9zdHJvbmc+IGFyZSBjb21wb3NlZCBvZiA8c3Ryb25nPmNvbXBvbmVudHM8L3N0cm9uZz48L3A+Cgk8aDM+d2hhdCBpcyBhIGNvbXBvbmVudD88L2gzPgoJPHVsPgoJCTxsaT5ldmVyeSBpbmRlcGVuZGVudGx5IGZ1bmN0aW9uaW5nIHBhcnQgb2YgYSB1c2VyIGludGVyZmFjZSBpcyBjYWxsZWQgYXMgPHN0cm9uZz5jb21wb25lbnQ8L3N0cm9uZz48L2xpPgoJCTxsaT5ldmVyeSBjb21wb25lbnQgY29udGFpbnMgb25lIDxzdHJvbmc+amF2YXNjcmlwdDwvc3Ryb25nPiwgPHN0cm9uZz5jc3M8L3N0cm9uZz4gYW5kIAoJCTxzdHJvbmc+aHRtbDwvc3Ryb25nPiBmaWxlPC9saT4KCQk8bGk+PHN0cm9uZz5jb21wb25lbnRzPC9zdHJvbmc+IGFyZSBzdG9yZWQgdW5kZXIgPHN0cm9uZz5zcmMvY29tcG9uZW50cy88L3N0cm9uZz4gYXMgaW5kaXZpZHVhbCBmb2xkZXJzPC9saT4KCQk8bGk+ZXZlcnkgcHJvamVjdCBjb250YWlucyBhIG1haW4gY29tcG9uZW50IG5hbWVkIDxzdHJvbmc+d2ViLWFwcDwvc3Ryb25nPjwvbGk+CgkJPGxpIGNsYXNzPSJhY2NlbnQiPnlvdSBjYW4gdHdlYWsgdGhpcyB3ZWItYXBwIGNvbXBvbmVudCdzIHN0eWxlIGJ5IGVkaXRpbmcgCgkJPHN0cm9uZz5zcmMvY29tcG9uZW50cy93ZWItYXBwL3dlYi1hcHAuY3NzPC9zdHJvbmc+IGZpbGU8L2xpPgoJCTxsaT5tYXJrdXAgb2Ygd2ViLWFwcCBjb21wb25lbnQgaXMgd3JpdHRlbiBpbnRvIAoJCTxzdHJvbmc+c3JjL2NvbXBvbmVudHMvd2ViLWFwcC93ZWItYXBwLmh0bWw8L3N0cm9uZz48L2xpPgoJCTxsaT5jb21wb25lbnRzIGFyZSBkZWZpbmVkIGFzIDxzdHJvbmc+ZnVuY3Rpb25zPC9zdHJvbmc+CgkJaW4gLmpzIGZpbGVzIGFuZCBhbnkgY29tcG9uZW50IGNhbiBjcmVhdGUgYW5vdGhlciBvbmUganVzdCBieSBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGF0IGNvbXBvbmVudDwvbGk+CgkJPGxpPnByb2dyYW0gZW50cnkgcG9pbnQgaXMgPHN0cm9uZz5zcmMvY29tcG9uZW50cy93ZWItYXBwL3dlYi1hcHAuanM8L3N0cm9uZz48L2xpPgoJPC91bD4KCgk8cD4KCQlhbGwgb3RoZXIgLmpzIGZpbGVzIHNob3VsZCBiZSBwbGFjZWQgdW5kZXIgPHN0cm9uZz5zcmMvPC9zdHJvbmc+IGZvbGRlci4KCQl3ayBjb25jYXRhbmF0ZXMgZXZlcnkgLmpzIGZpbGVzIGluIHNyYyBmb2xkZXIgKGluY2x1ZGluZyBqYXZhc2NyaXB0IGZpbGVzIG9mIGVhY2ggY29tcG9uZW50KQoJCWFuZCBzZXJ2ZXMgdGhlbSBhcyBhIHNpbmdsZSBqYXZhc2NyaXB0IGZpbGUsIGhlbmNlIHlvdSBkb24ndCBoYXZlIHRvIHVzZSAKCQk8c3BhbiBjbGFzcz0iYWNjZW50Ij5yZXF1aXJlKCk8L3NwYW4+IG9yIDxzcGFuIGNsYXNzPSJhY2NlbnQiPmltcG9ydDwvc3Bhbj4KCQl0byBkZXZlbG9wIGluIGEJbXVsdGlwbGUgZmlsZSBqYXZhc2NyaXB0IGVudmlyb25tZW50LCBldmVyeXRoaW5nIHlvdSB3cml0ZSBpcyByZWdpc3RlcmVkIHRvIGdsb2JhbC4KCTwvcD4KCgk8aHI+Cgk8cD5ydW4gPHN0cm9uZz53ayBoZWxwPC9zdHJvbmc+IHRvIGxlYXJuIGRldGFpbHMgb2YgQ0xJPC9wPgo8L2Rpdj4=';
const SOURCE_BASIC_CSS = 'LmFwcHsKCW1hcmdpbi1sZWZ0OiBhdXRvOwoJbWFyZ2luLXJpZ2h0OiBhdXRvOwoJbWF4LXdpZHRoOiA3NzBweDsJCglwYWRkaW5nOiA0MHB4OwoJbGluZS1oZWlnaHQ6IDEuNDsKfQoKLmFwcCAqewoJZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmOwp9CgouYXBwIC5hY2NlbnR7Cgljb2xvcjogIzBhZjsKfQoKLmFwcCBsaXsKCWxpbmUtaGVpZ2h0OiAyOwp9';
const SOURCE_START_SCRIPT = 'PHNjcmlwdCBpZD0id2stc2NyaXB0Ij4Kd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpCnsKLy9IT1RfUkVMT0FEX0NPREUvLwp9Cjwvc2NyaXB0Pg==';
const SOURCE_HOT_RELOAD = 'CXZhciB3cyA9IG5ldyBXZWJTb2NrZXQoIndzOi8vMTI3LjAuMC4xOnt7V1NfUE9SVH19Iik7Cgl3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpeyB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247IH0=';
const SOURCE_HTTP = 'dmFyIGh0dHBfYmFzZSA9ICJodHRwczovL3JlbW90ZWFwaS5jb20vIjsKCmlmIChsb2NhdGlvbi5ob3N0bmFtZSA9PSAibG9jYWxob3N0IikKCWh0dHBfYmFzZSA9ICJodHRwOi8vbG9jYWxob3N0OjcxMjQvIjsKCmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopCnsKCXZhciBxID0gIiI7Cgl2YXIgY291bnQgPSAwOwoJZm9yICh2YXIga2V5IGluIG9iaikKCXsKCQlpZiAodHlwZW9mIG9ialtrZXldID09ICJ1bmRlZmluZWQiKQoJCQljb250aW51ZTsKCgkJaWYgKGNvdW50ID4gMCkKCQkJcSs9ICImIjsKCgkJcSArPSBrZXk7CgkJcSArPSAiPSI7CgkJcSArPSBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pOwoJCWNvdW50Kys7Cgl9CglpZiAocS5sZW5ndGggIT0gMCkKCQlxID0gIj8iICsgcTsKCglyZXR1cm4gcTsKfQoKCmZ1bmN0aW9uIGh0dHBfcG9zdF9iYXIoZGF0YTEsIGRhdGEyLCBvbmxvYWQpIC8vIHNhbXBsZSBwb3N0IHJlcXVlc3QKewoJdmFyIGJvZHkgPQoJewoJCSJkYXRhMSI6IGRhdGExLAoJCSJkYXRhMiI6IGRhdGEyCgl9OwoKCWh0dHBfeGhyKCJQT1NUIiwgImJhciIsIG9ubG9hZCwgYm9keSk7Cn0KCmZ1bmN0aW9uIGh0dHBfeGhyKG1ldGhvZCwgdXJsLCBvbmxvYWQsIGJvZHkpCnsKCXZhciB4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Cgl4Lm9wZW4obWV0aG9kLCBodHRwX2Jhc2UgKyB1cmwpOwoJeC5zZXRSZXF1ZXN0SGVhZGVyKCJDb250ZW50LVR5cGUiLCAiYXBwbGljYXRpb24vanNvbiIpOwoJeC5vbmxvYWQgPSBmdW5jdGlvbigpCgl7CgkJaWYgKHguc3RhdHVzICE9IDIwMCkKCQl7CgkJCW9ubG9hZCh1bmRlZmluZWQsIHRydWUsIHguc3RhdHVzKTsKCQkJcmV0dXJuOwoJCX0KCQl0cnkKCQl7CgkJCXZhciByID0geC5yZXNwb25zZVRleHQ7CgkJCW9ubG9hZChyLCBmYWxzZSwgeC5zdGF0dXMpOwoJCX0KCQljYXRjaChlKQoJCXsKCQkJb25sb2FkKHIsIHRydWUsIHguc3RhdHVzKTsKCQl9Cgl9CgoJeC5vbmVycm9yID0gZnVuY3Rpb24oKQoJewoJCW9ubG9hZCh1bmRlZmluZWQsIHRydWUsIHguc3RhdHVzKTsKCX0KCglpZiAobWV0aG9kLnRvVXBwZXJDYXNlKCkgPT0gIlBPU1QiKQoJewoJCWlmICh0eXBlb2YgYm9keSA9PSAib2JqZWN0IikKCQkJYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpOwoKCQl4LnNlbmQoYm9keSk7Cgl9CgllbHNlCgl7CgkJeC5zZW5kKCk7Cgl9Cn0=';
const SOURCE_EVENT = 'Y29uc3QgUk9VVEVfQ0hBTkdFID0gMDsKY29uc3QgQUNDRVNTX1ZJT0xBVElPTiA9IDE7CgpmdW5jdGlvbiBvbihldmVudCwgZm4pCnsKCWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTsKfQoKZnVuY3Rpb24gb2ZmKGV2ZW50LCBmbikKewoJZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pOwp9CgpmdW5jdGlvbiBkaXNwYXRjaChldmVudCkKewoJZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnQpKTsKfQo=';
const SOURCE_ROUTER = 'dmFyIHJvdXRlcl9wYXRocyA9IHt9CgpmdW5jdGlvbiBuYXZpZ2F0ZShwYXRoLCBzaG91bGRfYWRkX2hpc3RvcnkpCnsKCWlmICh0eXBlb2Ygcm91dGVyX3BhdGhzW3BhdGhdID09ICJ1bmRlZmluZWQiKQoJewoJCWhpZGVfYWxsKCk7CgkJcmV0dXJuOwoJfQoKCWZ1bmN0aW9uIGhpZGVfYWxsKCkKCXsKCQlmb3IgKHZhciBrZXkgaW4gcm91dGVyX3BhdGhzKQoJCQlyb3V0ZXJfcGF0aHNba2V5XVswXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwkJCgl9CgoJCgl2YXIgaXNfcHVibGljID0gcm91dGVyX3BhdGhzW3BhdGhdWzJdOwoKCWlmICghaXNfcHVibGljKQoJewoJCWlmICh0eXBlb2YgZ190b2tlbiA9PSAidW5kZWZpbmVkIikKCQl7CgkJCWRpc3BhdGNoKEFDQ0VTU19WSU9MQVRJT04pOwoJCQlyZXR1cm47CgkJfQoJfQoKCXZhciB0aXRsZSA9IHJvdXRlcl9wYXRoc1twYXRoXVsxXTsKCWRvY3VtZW50LnRpdGxlID0gdGl0bGU7CgoJaWYgKHNob3VsZF9hZGRfaGlzdG9yeSkKCQl3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUocGF0aCwgdGl0bGUsIHBhdGgpOwoKCS8vIGNvbnNvbGUubG9nKGdfbGFzdF9zaG93bl9yb3V0ZSk7CgkvLyBjb25zb2xlLmxvZyhnX2N1cnJlbnRfcm91dGUpOwoKCWdfbGFzdF9zaG93bl9yb3V0ZSA9IGdfY3VycmVudF9yb3V0ZTsKCWdfY3VycmVudF9yb3V0ZSA9IHBhdGg7CgkKCWhpZGVfYWxsKCk7Cglyb3V0ZXJfcGF0aHNbcGF0aF1bMF0uc3R5bGUuZGlzcGxheSA9ICJibG9jayI7CglkaXNwYXRjaChST1VURV9DSEFOR0UpOwp9CgpmdW5jdGlvbiBpbml0X3JvdXRlcihkb20pCnsKCXZhciBjaGlsZHJlbiA9IGRvbS5jaGlsZHJlbjsKCWZvciAodmFyIGk9MDtpPGNoaWxkcmVuLmxlbmd0aDtpKyspCgl7CgkJdmFyIGMgPSBjaGlsZHJlbltpXTsKCQl2YXIgcGF0aCA9IGMuZ2V0QXR0cmlidXRlKCJwYXRoIik7CgkJdmFyIHRpdGxlID0gYy5nZXRBdHRyaWJ1dGUoInRpdGxlIik7CgkJdmFyIGlzX3B1YmxpYyA9IGMuaGFzQXR0cmlidXRlKCJwdWJsaWMiKTsKCgkJaWYgKHBhdGggPT0gbnVsbCkKCQkJY29udGludWU7CgkJaWYgKHRpdGxlID09IG51bGwpCgkJCXRpdGxlID0gIiI7CgoJCXJvdXRlcl9wYXRoc1twYXRoXSA9IFtjLCB0aXRsZSwgaXNfcHVibGljXTsKCX0KCgl2YXIgYWxsX2xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiYVtpbnRlcm5hbF0iKTsKCWZvciAodmFyIGk9MDtpPGFsbF9saW5rcy5sZW5ndGg7aSsrKQoJewoJCXZhciBhID0gYWxsX2xpbmtzW2ldOwoJCWEub25jbGljayA9IGZ1bmN0aW9uKGUpCgkJewoJCQllLnByZXZlbnREZWZhdWx0KCk7CgkJCW5hdmlnYXRlKHRoaXMuZ2V0QXR0cmlidXRlKCJocmVmIiksIHRydWUpOwoJCX0KCX0KCgluYXZpZ2F0ZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIGZhbHNlKTsKCgl3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKGUpCgl7CgkJdmFyIHBhdGggPSAiLyI7CgkJaWYgKGUuc3RhdGUpCgkJCXBhdGggPSBlLnN0YXRlOwoJCQkKCQluYXZpZ2F0ZShwYXRoLCBmYWxzZSk7Cgl9Owp9';

const BASE_PATH_PUBLIC = "./public/";
const BASE_PATH_SRC = "./src/";
const BASE_PATH_COMPONENT = "./src/components/";

const VERSION = "0.5.6";

var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"new" : new_component,
	"build" : build,
	"lib": library_build,
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
	"x" : add_extras,
}

var g_changed_files = [];
var g_timer;
var g_css;
var g_js;
var g_socket_clients = {};
var g_ws_port;
var g_transpile_mode = "STANDART";
var g_library_name;

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

function init(type)
{
	if (is_project_valid("./"))
	{
		error("current folder is already initialized");
		return;
	}

	log("initializing a new  project");
	
	create_folder_if_not_exits(BASE_PATH_PUBLIC);
	create_folder_if_not_exits(BASE_PATH_SRC);
	create_folder_if_not_exits(BASE_PATH_COMPONENT);
	
	b64_to_file(BASE_PATH_PUBLIC + "index.html", SOURCE_INDEX);

	new_component(["web-app"]);
	
	b64_to_file(BASE_PATH_COMPONENT + "web-app/web-app.css", SOURCE_BASIC_CSS);
	b64_to_file(BASE_PATH_COMPONENT + "web-app/web-app.html", SOURCE_BASIC_HTML);

	var jsconfig = {"include": ["src/**/*" ]};

	FS.writeFileSync("./jsconfig.json", JSON.stringify(jsconfig), "utf8");

	var msg = "project initialized successfully";
	highlight(msg);
	log("you can run **start** command now")
	log("wk start  | auto-builds components and serves them under ./public folder");
}

function deinit()
{
	delete_folder_recursive(BASE_PATH_SRC);
	delete_folder_recursive(BASE_PATH_PUBLIC);
	log("- de initialized project and deleted all files");
}

function library_build(name)
{
	if (name.length == 0)
	{
		error("provide a name");
		process.exit();
	}

	g_library_name = name[0];
	g_transpile_mode = "LIBRARY";
	build();
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
	if (g_transpile_mode == "LIBRARY")
		log("transpile mode: " + g_transpile_mode);

	log("starting file server and auto-builder");
	start_watcher();

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
			process.exit();
		}

		EXPRESS_APP.listen(port);
		log("listening localhost:" + port);

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

	if (a[0].split("-").length == 1)
	{
		error(a.join(" ") + " is not a valid component name, there should be at least 2 words in component name");
		return;
	}

	if (Number.isInteger(Number(a[0][0])))
	{
		error(a.join(" ") + " is not a valid component name, component name cannot start with a number");
		return;
	}

	create_component_files(a[0]);
}

function bundle()
{
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(render_index_html(false));

	var scripts = $("script")
	
}

function export_component()
{
	
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

	if (g_transpile_mode == "LIBRARY")
		log("building library")
	else
		log("building for production");

	g_changed_files.push(".js");
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
	$("#wk-script").remove();
	var h = $.html();

	var options = 
	{
		"mangle" :
		{
			"toplevel" : true
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

	if (g_transpile_mode == "LIBRARY")
	{
		FS.writeFileSync( "./build/" + g_library_name + ".js", `(function(){${minified_js.code}})()`);
		FS.writeFileSync( "./build/" + g_library_name + ".css", minified_css);
		log("library build completed with name " + g_library_name);
	}
	else
	{
		FS.writeFileSync( "./build/" + name + ".js", minified_js.code);
		FS.writeFileSync("./build/index.html" , h);
		FS.writeFileSync( "./build/" + name + ".css", minified_css);
		log("production build completed with seed " + name);
	}

	console.timeEnd(msg);
	return name;
}


function add_extras()
{
	var paths = 
	[
		["./src/http.js", SOURCE_HTTP],
		["./src/event.js", SOURCE_EVENT],
		["./src/router.js", SOURCE_ROUTER]
	]

	for (var i=0;i<paths.length;i++)
	{
		var path = paths[i][0];
		var source = paths[i][1];
		if (!FS.existsSync(path))
		{
			b64_to_file(path, source);
			log("written " + path);
		}
	}
}


function create_component_files(name)
{
	if (FS.existsSync(BASE_PATH_COMPONENT + name))
	{
		error("a component with a name " + name + " already exists");
		return;
	}

	var js = to_ascii(SOURCE_SAMPLE);
	var html = '<div></div>';
	var css = name + ' {}';

	FS.mkdirSync(BASE_PATH_COMPONENT + name);
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".html" , html, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".css" , css, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".js" , js, "utf8");

	log("created a new component named " + name);
}

function error(m){ console.log(FG_RED, m, RESET); }
function log(m){ console.log(RESET, m, RESET); }
function highlight(m){ console.log(BG_GREEN, m, RESET); }
function minor_log(m){ console.log(FG_DIM, m, RESET); }

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
	var start = Date.now();
	
	g_changed_files = [];
	var js = "";
	var css = "";
	var markups = {}
	var js_files = [];
	var names = [];

	var files = FS.readdirSync(BASE_PATH_SRC);
	for (var i=0;i<files.length;i++)
	{
		var f = files[i];
		if (f.endsWith(".js"))
			js_files.push(BASE_PATH_SRC + f);

	}

	files = FS.readdirSync(BASE_PATH_COMPONENT);
	for (var i=0;i<files.length;i++)
	{
		var f = files[i];
		if (f.indexOf('.') == 0)
			return;	

		names.push(f);
	}

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
		markups[names[i]] = markup;

		var js_content = FS.readFileSync(input + ".js","utf8");

		// this is very loose
		// ideally we shoud parse javascript and put this markup injecting
		// code by modifying parsed javascript code
		var search = "connectedCallback()\r\n\t{";
		var target = "connectedCallback()\n\t{\n\t\tthis.root = this.cloneNode(true);\n\t\tthis.innerHTML = `"+markup+"`";
		
		js_content = js_content.replace(search,target);

		if ((g_transpile_mode == "LIBRARY") && (names[i] == "web-app"))
		{
			js += `customElements.define("${g_library_name}", ${js_content});\n`;
		}
		else
		{
			js += `customElements.define("${names[i]}", ${js_content});\n`;
		}
		

		if (FS.existsSync(input + '.css'))
		{
			css += FS.readFileSync(input + ".css","utf8") + '\n';
		}
	}

	try
	{
		var i18n = FS.readFileSync(BASE_PATH_SRC + "i18n.json", "utf8");
		i18n = JSON.stringify(JSON.parse(i18n)); // this minifies
		js += "__i18n.data = " + i18n + ";";
	}
	catch(e){}
	
	for (var i=0;i<js_files.length;i++)
	{
		var jf = js_files[i]
		js += FS.readFileSync(jf, "utf8") + '\n';
	}

	g_js = js;
	g_css = css;

	console.log(msg + ": " + (Date.now() - start) + "ms");

	for (var i in g_socket_clients)
		g_socket_clients[i].send("reload-all");
}

function onchange(event, file_name)
{
	// write a better file watch handler
	if (	!file_name.endsWith(".js") && 
		!file_name.endsWith(".css") && 
		!file_name.endsWith(".html") &&
		!file_name.endsWith(".json"))
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
		return false;

	if (!FS.existsSync(path + "src"))
		return false;

	if (!FS.existsSync(path + "src/components"))
		return false;

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
	var index = FS.readFileSync(BASE_PATH_PUBLIC + "index.html", "utf8");
	var $ = CHEERIO.load(index);
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
