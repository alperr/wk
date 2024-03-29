#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');

const SOURCE_INDEX = 'PGh0bWw+Cgk8aGVhZD4KCQk8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CgkJPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCI+CgkJPHRpdGxlPndrPC90aXRsZT4KCTwvaGVhZD4KCTxib2R5PgoJCTx3ZWItYXBwPjwvd2ViLWFwcD4KCTwvYm9keT4KPC9odG1sPg==';
const SOURCE_SAMPLE = 'Y2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudA0Kew0KCWNvbnN0cnVjdG9yKCl7IHN1cGVyKCk7IH0NCgljb25uZWN0ZWRDYWxsYmFjaygpDQoJew0KCQkNCgl9DQp9';
const SOURCE_SAMPLE_PAGE = 'Y2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudAp7Cgljb25zdHJ1Y3RvcigpeyBzdXBlcigpOyB9Cgljb25uZWN0ZWRDYWxsYmFjaygpCgl7CgkJcm91dGVyLmluaXRfcGFnZSh0aGlzKTsKCX0KCglvbnNob3coKQoJewoJCXZhciBwYXRoID0gIi8iICsgdGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDUpOwoJCWNvbnNvbGUubG9nKHBhdGggKyAiIHNob3duIik7Cgl9CgoJb25oaWRlKCkKCXsKCQl2YXIgcGF0aCA9ICIvIiArIHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZyg1KTsKCQljb25zb2xlLmxvZyhwYXRoICsgIiBoaWRkZW4iKTsKCX0KfQo=';
const SOURCE_HTTP = 'dmFyIGdfdXNlcjsKdmFyIGdfdG9rZW47CnZhciBnX2h0dHBfYmFzZSA9ICJodHRwczovL3JlbW90ZWFwaS5jb20vIjsKCmlmIChsb2NhdGlvbi5ob3N0bmFtZSA9PSAibG9jYWxob3N0IikKCWdfaHR0cF9iYXNlID0gImh0dHA6Ly9sb2NhbGhvc3Q6NzEyNC8iOwoKZnVuY3Rpb24gaHR0cF9wb3N0X2JhcihkYXRhMSwgZGF0YTIsIG9ubG9hZCkgLy8gc2FtcGxlIHBvc3QgcmVxdWVzdAp7Cgl2YXIgYm9keSA9Cgl7CgkJImRhdGExIjogZGF0YTEsCgkJImRhdGEyIjogZGF0YTIKCX07CgoJaHR0cF94aHIoIlBPU1QiLCAiYmFyIiwgb25sb2FkLCBib2R5KTsKfQoKZnVuY3Rpb24gaHR0cF94aHIobWV0aG9kLCB1cmwsIG9ubG9hZCwgYm9keSwgc2hvdWxkX3BhcnNlKQp7CglpZiAodHlwZW9mIHNob3VsZF9wYXJzZSA9PSAidW5kZWZpbmVkIikKCQlzaG91bGRfcGFyc2UgPSB0cnVlOwoKCXZhciB4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Cgl4Lm9wZW4obWV0aG9kLCBnX2h0dHBfYmFzZSArIHVybCk7Cgl4LnNldFJlcXVlc3RIZWFkZXIoIkNvbnRlbnQtVHlwZSIsICJhcHBsaWNhdGlvbi9qc29uIik7Cgl4Lm9ubG9hZCA9IGZ1bmN0aW9uKCkKCXsKCQlpZiAoeC5zdGF0dXMgPT0gNDAxKQoJCXsKCQkJZGlzcGF0Y2goQUNDRVNTX1ZJT0xBVElPTik7CgkJCW9ubG9hZCh1bmRlZmluZWQsIHRydWUpOwoJCQlyZXR1cm47CgkJfQoKCQlpZiAoeC5zdGF0dXMgIT0gMjAwKQoJCXsKCQkJb25sb2FkKHVuZGVmaW5lZCwgdHJ1ZSwgeC5zdGF0dXMpOwoJCQlyZXR1cm47CgkJfQoJCXRyeQoJCXsKCQkJdmFyIHIgPSB4LnJlc3BvbnNlVGV4dDsKCQkJaWYgKHNob3VsZF9wYXJzZSkKCQkJCXIgPSBKU09OLnBhcnNlKHIpOwoKCQkJdHJ5ewoJCQkJb25sb2FkKHIsIGZhbHNlLCB4LnN0YXR1cyk7CgkJCX0gY2F0Y2goZSkgeyAKCQkJCWNvbnNvbGUuZXJyb3IoImh0dHAgaGFuZGxlciBlcnJvciIpOwoJCQkJY29uc29sZS53YXJuKGUpOwoJCQl9CgkJfQoJCWNhdGNoKGUpCgkJewoJCQlvbmxvYWQociwgdHJ1ZSwgeC5zdGF0dXMpOwoJCX0KCX0KCgl4Lm9uZXJyb3IgPSBmdW5jdGlvbigpCgl7CgkJb25sb2FkKHVuZGVmaW5lZCwgdHJ1ZSwgeC5zdGF0dXMpOwoJfQoKCWlmIChtZXRob2QudG9VcHBlckNhc2UoKSA9PSAiUE9TVCIpCgl7CgkJaWYgKHR5cGVvZiBib2R5ID09ICJvYmplY3QiKQoJCQlib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7CgoJCXguc2VuZChib2R5KTsKCX0KCWVsc2UKCXsKCQl4LnNlbmQoKTsKCX0KfQoKZnVuY3Rpb24gaHR0cF9zZXJpYWxpemUob2JqLCBoYXNfdG9rZW4pCnsKCWlmIChoYXNfdG9rZW4pCgkJb2JqLnRva2VuID0gZ190b2tlbjsKCgl2YXIgcSA9ICIiOwoJdmFyIGNvdW50ID0gMDsKCWZvciAodmFyIGtleSBpbiBvYmopCgl7CgkJaWYgKHR5cGVvZiBvYmpba2V5XSA9PSAidW5kZWZpbmVkIikKCQkJY29udGludWU7CgoJCWlmIChjb3VudCA+IDApCgkJCXErPSAiJiI7CgoJCXEgKz0ga2V5OwoJCXEgKz0gIj0iOwoJCXEgKz0gZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKTsKCQljb3VudCsrOwoJfQoJaWYgKHEubGVuZ3RoICE9IDApCgkJcSA9ICI/IiArIHE7CgoJcmV0dXJuIHE7Cn0KCgpmdW5jdGlvbiBzZXNzaW9uX3dyaXRlKCkKewoJbG9jYWxTdG9yYWdlLnNldEl0ZW0oInRva2VuIiwgZ190b2tlbik7Cglsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgidXNlciIsIGdfdXNlcik7Cn0KCmZ1bmN0aW9uIHNlc3Npb25fcmVhZCgpCnsKCWZ1bmN0aW9uIGdldChrKQoJewoJCXZhciB2ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oayk7CgkJaWYgKHYgPT0gbnVsbCkKCQkJcmV0dXJuIHVuZGVmaW5lZDsKCgkJcmV0dXJuIHY7Cgl9CgoJZ190b2tlbiA9IGdldCgidG9rZW4iKTsKCWdfdXNlciA9IGdldCgidXNlciIpOwoKCWRpc3BhdGNoKFNFU1NJT05fUkVBRCk7Cn0KCmZ1bmN0aW9uIHNlc3Npb25fY2xlYXIoKQp7Cglsb2NhbFN0b3JhZ2UuY2xlYXIoKTsKfQo=';
const SOURCE_EVENT = 'Y29uc3QgUk9VVEVfQ0hBTkdFID0gMDsKY29uc3QgQUNDRVNTX1ZJT0xBVElPTiA9IDE7CgpmdW5jdGlvbiBvbihldmVudCwgZm4pCnsKCWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTsKfQoKZnVuY3Rpb24gb2ZmKGV2ZW50LCBmbikKewoJZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pOwp9CgpmdW5jdGlvbiBkaXNwYXRjaChldmVudCkKewoJZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnQpKTsKfQo=';
const SOURCE_ROUTER = 'dmFyIHJvdXRlciA9IHt9Owpyb3V0ZXIucGF0aHMgPSB7fTsKcm91dGVyLmN1cnJlbnQgPSB1bmRlZmluZWQKcm91dGVyLnByZXZpb3VzID0gdW5kZWZpbmVkOwoKcm91dGVyLm5hdmlnYXRlID0gZnVuY3Rpb24gKHBhdGgsIHNob3VsZF9hZGRfaGlzdG9yeSkKewoJaWYgKHR5cGVvZiByb3V0ZXIucGF0aHNbcGF0aF0gPT0gInVuZGVmaW5lZCIpCgl7CgkJY29uc29sZS5lcnJvcigiY2FudCBmaW5kIHBhdGggIiArIHBhdGgpOwoJCWhpZGVfYWxsKCk7CgkJcmV0dXJuOwoJfQoKCWZ1bmN0aW9uIGhpZGVfYWxsKCkKCXsKCQlmb3IgKHZhciBrZXkgaW4gcm91dGVyLnBhdGhzKQoJCQlyb3V0ZXIucGF0aHNba2V5XVswXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwkJCgl9CgoJCgl2YXIgaXNfcHVibGljID0gcm91dGVyLnBhdGhzW3BhdGhdWzJdOwoKCWlmICghaXNfcHVibGljKQoJewoJCWlmICh0eXBlb2YgZ190b2tlbiA9PSAidW5kZWZpbmVkIikKCQl7CgkJCWRpc3BhdGNoKEFDQ0VTU19WSU9MQVRJT04pOwoJCQlyZXR1cm47CgkJfQoJfQoKCXZhciB0aXRsZSA9IHJvdXRlci5wYXRoc1twYXRoXVsxXTsKCWRvY3VtZW50LnRpdGxlID0gdGl0bGU7CgoJaWYgKHNob3VsZF9hZGRfaGlzdG9yeSkKCQl3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUocGF0aCwgdGl0bGUsIHBhdGgpOwoKCXJvdXRlci5wcmV2aW91cyA9IHJvdXRlci5jdXJyZW50OwoJcm91dGVyLmN1cnJlbnQgPSBwYXRoOwoJCgloaWRlX2FsbCgpOwoJcm91dGVyLnBhdGhzW3BhdGhdWzBdLnN0eWxlLmRpc3BsYXkgPSAiYmxvY2siOwoJZGlzcGF0Y2goUk9VVEVfQ0hBTkdFKTsKfQoKcm91dGVyLmluaXQgPSBmdW5jdGlvbihkb20pCnsKCWRvbSA9IGRvbS5jaGlsZHJlblswXQoJdmFyIGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuOwoJZm9yICh2YXIgaT0wO2k8Y2hpbGRyZW4ubGVuZ3RoO2krKykKCXsKCQl2YXIgYyA9IGNoaWxkcmVuW2ldOwoJCXZhciB0aXRsZSA9IGMuZ2V0QXR0cmlidXRlKCJ0aXRsZSIpOwoJCXZhciBpc19wdWJsaWMgPSBjLmhhc0F0dHJpYnV0ZSgicHVibGljIik7CgkJdmFyIHRhZ19uYW1lID0gYy50YWdOYW1lLnRvTG93ZXJDYXNlKCk7CgoJCXZhciBwYXRoOwoJCWlmICh0YWdfbmFtZSA9PSAicGFnZS1tYWluIikKCQkJcGF0aCA9ICIvIgoJCWVsc2UgaWYgKHRhZ19uYW1lLnN0YXJ0c1dpdGgoInBhZ2UtIikpCgkJCXBhdGggPSAiLyIgKyB0YWdfbmFtZS5zdWJzdHJpbmcoNSk7CgkJZWxzZQoJCQljb250aW51ZTsKCgkJaWYgKHRpdGxlID09IG51bGwpCgkJCXRpdGxlID0gIiI7CgoJCXJvdXRlci5wYXRoc1twYXRoXSA9IFtjLCB0aXRsZSwgaXNfcHVibGljXTsKCX0KCgl2YXIgYWxsX2xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiYVtpbnRlcm5hbF0iKTsKCWZvciAodmFyIGk9MDtpPGFsbF9saW5rcy5sZW5ndGg7aSsrKQoJewoJCXZhciBhID0gYWxsX2xpbmtzW2ldOwoJCWEub25jbGljayA9IGZ1bmN0aW9uKGUpCgkJewoJCQllLnByZXZlbnREZWZhdWx0KCk7CgkJCS8vY29uc29sZS5sb2coInFxIikKCQkJcm91dGVyLm5hdmlnYXRlKHRoaXMuZ2V0QXR0cmlidXRlKCJocmVmIiksIHRydWUpOwoJCX0KCX0KCglyb3V0ZXIubmF2aWdhdGUod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBmYWxzZSk7CgoJd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbihlKQoJewoJCWNvbnNvbGUubG9nKGUpOwoJCXZhciBwYXRoID0gIi8iOwoJCWlmIChlLnN0YXRlKQoJCQlwYXRoID0gZS5zdGF0ZTsKCQkJCgkJcm91dGVyLm5hdmlnYXRlKHBhdGgsIGZhbHNlKTsKCX07Cn0KCnJvdXRlci5pbml0X3BhZ2UgPSBmdW5jdGlvbihwYWdlKQp7Cgl2YXIgdGFnX25hbWUgPSBwYWdlLnRhZ05hbWUudG9Mb3dlckNhc2UoKQogCXZhciBwYXRoOwoJaWYgKHRhZ19uYW1lID09ICJwYWdlLW1haW4iKQoJCXBhdGggPSAiLyIKCWVsc2UgaWYgKHRhZ19uYW1lLnN0YXJ0c1dpdGgoInBhZ2UtIikpCgkJcGF0aCA9ICIvIiArIHRhZ19uYW1lLnN1YnN0cmluZyg1KTsKCglpZiAodHlwZW9mIG9uaGlkZSA9PSAidW5kZWZpbmVkIikKCQlvbmhpZGUgPSBmdW5jdGlvbigpe30KCglmdW5jdGlvbiBmKCkKCXsKCQlpZiAocm91dGVyLmN1cnJlbnQgPT0gcGF0aCkKCQkJcGFnZS5vbnNob3coKTsKCQoJCWlmIChyb3V0ZXIucHJldmlvdXMgPT0gcGF0aCkKCQkJcGFnZS5vbmhpZGUoKTsKCX0KCglvbihST1VURV9DSEFOR0UsIGYpOwp9Cg==';
const SOURCE_UTIL = 'ZnVuY3Rpb24gbm9kZV9maW5kZXIocm9vdCkKewoJdmFyICQgPSBmdW5jdGlvbihxKQoJeyAKCQl2YXIgZG9tID0gcm9vdC5xdWVyeVNlbGVjdG9yKHEpOwoJCWRvbS5oaWRlID0gZnVuY3Rpb24oKQoJCXsKCQkJZG9tLmNsYXNzTGlzdC5hZGQoImQtbm9uZSIpOwoJCX0KCQlkb20uc2hvdyA9IGZ1bmN0aW9uKCkKCQl7CgkJCWRvbS5jbGFzc0xpc3QucmVtb3ZlKCJkLW5vbmUiKTsKCQl9CgoJCWRvbS50b2dnbGUgPSBmdW5jdGlvbihzdGF0ZSwgYSwgYikKCQl7CgkJCWlmKHR5cGVvZiBiID09ICJ1bmRlZmluZWQiKSBiID0gIiI7CgoJCQlpZiAoc3RhdGUpCgkJCXsKCQkJCWlmIChhICE9ICIiKSBkb20uY2xhc3NMaXN0LmFkZChhKTsKCQkJCWlmIChiICE9ICIiKSBkb20uY2xhc3NMaXN0LnJlbW92ZShiKTsKCQkJfQoJCQllbHNlCgkJCXsKCQkJCWlmIChhICE9ICIiKSBkb20uY2xhc3NMaXN0LnJlbW92ZShhKTsKCQkJCWlmIChiICE9ICIiKSBkb20uY2xhc3NMaXN0LmFkZChiKTsKCQkJfQoJCX0KCQlyZXR1cm4gZG9tOwoJfQoJcmV0dXJuICQ7Cn0K';

const BASE_PATH_PUBLIC = "./public/";
const BASE_PATH_SRC = "./src/";
const BASE_PATH_COMPONENT = "./src/components/";

const VERSION = "0.5.24";

var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"new" : new_component,
	"build" : build,
	"help" : print_large_help,
	"del" : delete_component,
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
	var msg = `
wk (version ${VERSION}) has following 6 commands

  wk init                                    (i)
initializes the project

  wk start <port?>                           (s)
starts development server on localhost:6040

  wk build                                   (b)
creates build/ folder, minifies js&css

  wk new <component-name>                    (n)
generates component folder and
necessary js,css and html files

  wk del <component-name>                    (d)
deletes given component folder recursively

  wk extras                                  (x)
adds router,http and dom utility files

for more info, visit -> wk.js.org
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

	console.log("type", type)
	log("initializing a new  project");
	
	create_folder_if_not_exits(BASE_PATH_PUBLIC);
	create_folder_if_not_exits(BASE_PATH_SRC);
	create_folder_if_not_exits(BASE_PATH_COMPONENT);
	
	b64_to_file(BASE_PATH_PUBLIC + "index.html", SOURCE_INDEX);
	new_component(["web-app"]);

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
	check_build_type();

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

	function size(s)
	{
		return Math.floor(s / 1000) + "kB";
	}

	log(`JS: ${size(minified_js.code.length)} CSS: ${size(minified_css.length)}`);

	console.timeEnd(msg);
	return name;
}


function add_extras()
{
	var paths = 
	[
		["./src/http.js", SOURCE_HTTP],
		["./src/event.js", SOURCE_EVENT],
		["./src/router.js", SOURCE_ROUTER],
		["./src/util.js", SOURCE_UTIL]
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

	if (name.startsWith("page-"))
	{
		log("page component detected!");
		log("page boilerplate will be generated");
		js = to_ascii(SOURCE_SAMPLE_PAGE);
	}

	FS.mkdirSync(BASE_PATH_COMPONENT + name);
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".html" , html, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".css" , css, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".js" , js, "utf8");

	log("created a new component named " + name);
}

const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";
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
	
	var names = [];

	var files = FS.readdirSync(BASE_PATH_SRC);
	for (var i=0;i<files.length;i++)
	{
		var f = files[i];
		if (f.endsWith(".js"))
			js += FS.readFileSync(BASE_PATH_SRC + f, "utf8") + '\n';
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
		
		var lines = js_content.split("\n");
		for (var j=0;j<lines.length;j++)
		{
			var l = lines[j];
			if (l.indexOf("connectedCallback()") != -1)
			{
				lines.splice(j+2, 0, "\n\t\tthis.root = this.cloneNode(true);\n\t\tthis.innerHTML = `"+markup+"`")
				break;
			}
		}
		
		js_content = lines.join("\n");

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
	


	g_js = js;
	g_css = css;

	console.log(msg + ": " + (Date.now() - start) + "ms");
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


function check_build_type()
{
	try{
		var conf = JSON.parse(FS.readFileSync("./jsconfig.json", "utf8"));
	} catch(e) { error("can't read jsconfig.json"); }
	
	if (typeof conf["lib"] != "undefined")
	{
		g_library_name = conf["lib"];
		g_transpile_mode = "LIBRARY";
	}
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
	var h = $.html();
	return h;
}
