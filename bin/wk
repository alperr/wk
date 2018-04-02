#!/usr/bin/env node

var BG_RED = "\x1b[41m";
var FG_RED = "\x1b[31m";
var BG_GREEN = "\x1b[42m";
var FG_BLACK = "\x1b[30m";
var RESET = "\x1b[0m";

var FS = require('fs');
var TS = require('typescript');

var args = process.argv.slice(2);
var command = args[0];

var SOURCE_DISPATCHER = 'aWYgKHR5cGVvZiBfX3drID09ICJ1bmRlZmluZWQiKQoJdmFyIF9fd2sgPSB7fTsKCl9fd2suZXZlbnRzID0ge307CgpmdW5jdGlvbiBzdWIoYWN0aW9uICwgZikKewoJaWYgKHR5cGVvZiBfX3drLmV2ZW50c1thY3Rpb25dID09ICd1bmRlZmluZWQnKQoJCV9fd2suZXZlbnRzW2FjdGlvbl0gPSBbXTsKCglfX3drLmV2ZW50c1thY3Rpb25dLnB1c2goZik7Cn0KCmZ1bmN0aW9uIHVuc3ViKGFjdGlvbiAsIGYpCnsKCWlmICh0eXBlb2YgX193ay5ldmVudHNbYWN0aW9uXSA9PSAndW5kZWZpbmVkJykKCQlyZXR1cm47CgoJZm9yICh2YXIgaT0wO2k8X193ay5ldmVudHNbYWN0aW9uXS5sZW5ndGg7aSsrKQoJewoJCWlmIChfX3drLmV2ZW50c1thY3Rpb25dW2ldID09IGYpCgkJewoJCQlfX3drLmV2ZW50c1thY3Rpb25dLnNwbGljZShpLDEpOwoJCQlpLS07CgkJfQoJfQp9CgpmdW5jdGlvbiBwdWIoYWN0aW9uKQp7CglpZiAoIChhY3Rpb24gfCAwKSAhPSBhY3Rpb24pCgkJdGhyb3coJ2JhZCBhY3Rpb24nKTsKCglpZiAodHlwZW9mIF9fd2suZXZlbnRzW2FjdGlvbl0gPT0gJ3VuZGVmaW5lZCcpCgkJcmV0dXJuOwoKCWZvciAodmFyIGk9MDtpPF9fd2suZXZlbnRzW2FjdGlvbl0ubGVuZ3RoO2krKykKCQlfX3drLmV2ZW50c1thY3Rpb25dW2ldKCk7Cn0KCnZhciBzaWcgPSBmdW5jdGlvbihhY3Rpb24pCnsKCXJldHVybiBmdW5jdGlvbigpeyBwdWIoYWN0aW9uKSB9Cn0=';
var SOURCE_ELEMENT = 'Y2xhc3MgQ29tcG9uZW50CnsKCXB1YmxpYyByb290OiBIVE1MRGl2RWxlbWVudDsKCWNvbnN0cnVjdG9yKHJvb3Q6IEhUTUxEaXZFbGVtZW50LCBtYXJrdXA6IHN0cmluZykKCXsKCQl0aGlzLnJvb3QgPSByb290OwoJfQoKCXB1YmxpYyBmaW5kID0gKHF1ZXJ5OiBzdHJpbmcpOiBFbGVtZW50ID0+Cgl7CgkJcXVlcnkgPSAnLicgKyBxdWVyeTsKCQlyZXR1cm4gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpWzBdOwkJCgl9CgoJcHJpdmF0ZSBsb2FkTWFya3VwID0gKGtleTogc3RyaW5nKSA9PgoJewoJCXZhciB3OiBhbnkgPSB3aW5kb3c7CgkJaWYgKCF3Ll9fbWFya3VwX2RhdGFba2V5XSkKCQkJdGhyb3cgInRoZXJlIGlzIG5vIG1hcmt1cCBmb3IgIiArIGtleTsKCgkJdGhpcy5yb290LmlubmVySFRNTCA9IGF0b2Iody5fX21hcmt1cF9kYXRhW2tleV0pOwoJfQp9';
var SOURCE_STORE = 'dmFyIHN0b3JlID0ge307CnN0b3JlLl8gPSB7fTsKCnN0b3JlLmhhcyA9IGZ1bmN0aW9uKGtleSkKewoJcmV0dXJuIHR5cGVvZiBzdG9yZS5fW2tleV0gIT0gJ3VuZGVmaW5lZCcKfQoKc3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5KQp7CglyZXR1cm4gc3RvcmUuX1trZXldOwp9CgpzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksdmFsdWUpCnsKCXJldHVybiBzdG9yZS5fW2tleV0gPSB2YWx1ZTsKfQo=';
var SOURCE_UTIL = 'dmFyIHV0aWwgPSB7fTsKdXRpbC5yYW5kb21BbHBoYU51bSA9IGZ1bmN0aW9uKGxlbmd0aCkKewoJLy8gNjIgY2hhcnMgCgkvLyBNYXRoLmxvZzIoNjIpID0gNS45NTQgYml0IGVudHJvcHkgcGVyIGNoYXJhY3RlcgoJLy8gbGVuZ3RoID0gMjIgd2lsbCBnaXZlIHlvdSBhIH4xMjggYml0IHJhbmRvbW5lc3MKCXZhciBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHJxc3R1d3Z4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVXVlhZWicKCXZhciByID0gJyc7Cglmb3IgKHZhciBpPTA7aTxsZW5ndGg7aSsrKQoJCXIgKz0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKV07CgkKCXJldHVybiByOwp9Cg==';
var SOURCE_INDEX = 'PGh0bWwgbGFuZz0iZW4iPgoJPGhlYWQ+CgkJPG1ldGEgY2hhcnNldD0idXRmLTgiPgoJCTxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiPgoJCTx0aXRsZT53azwvdGl0bGU+CgkJPHN0eWxlPgoJCQkjcm9vdHsKCQkJCXdpZHRoOiAxMDAlOwoJCQkJaGVpZ2h0OiAxMDAlOwoJCQkJb3ZlcmZsb3c6IG5vbmU7CgkJCQlwb3NpdGlvbjogcmVsYXRpdmU7CgkJCX0KCQk8L3N0eWxlPgoJCTxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iZGV2LmNzcyI+CgkJPHNjcmlwdCBzcmM9J2Rldi5qcyc+PC9zY3JpcHQ+Cgk8L2hlYWQ+CgkKCTxib2R5PgoJCTxkaXYgaWQ9J3Jvb3QnPjwvZGl2PgoJPC9ib2R5PgoJPHNjcmlwdD4KCXdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKQoJewoJCW5ldyBBcHBsaWNhdGlvbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTsKCX0KCTwvc2NyaXB0Pgo8L2h0bWw+';
var SOURCE_SAMPLE = 'Y2xhc3MgU2FtcGxlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50CnsKCWNvbnN0cnVjdG9yKHJvb3Q6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBPYmplY3QpCgl7CgkJc3VwZXIocm9vdCwgInNhbXBsZS1jb21wb25lbnQiKTsKCgl9CgoJcHVibGljIGEgPSAoKT0+Cgl7CgkJCgl9CgoJcHJpdmF0ZSBiID0gKCk9PgoJewoKCX0KfQ==';
var SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwbGljYXRpb24nPgoJPGgxPmJhc2ljIHdrIHByb2plY3Q8L2gxPgoJPHA+dGhpcyBwYWdlIGlzIGdlbmVyYXRlZCBieSBhcHBsaWNhdGlvbiBjb21wb25lbnQ8L3A+Cgk8cD5pdCBjYW4gYmUgZm91bmQgdW5kZXIgPHN0cm9uZz4vY29tcG9uZW50czwvc3Ryb25nPiBmb2xkZXI8L3A+Cgk8cCBjbGFzcz0nYWNjZW50Jz55b3UgY2FuIHR3ZWFrIHRoaXMgY29tcG9uZW50J3Mgc3R5bGUgYnkgZWRpdGluZyA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uY3NzPC9zdHJvbmc+IGZpbGU8L3A+Cgk8cD5hbGwgdGhpcyBjb21wb25lbnQgbWFya3VwIGlzIHdyaXR0ZW4gaW50byA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uaHRtbDwvc3Ryb25nPjwvcD4KCTxwPmluIG9yZGVyIHRvIHNlZSBtb3JlIGFkdmFuY2VkIGV4YW1wbGVzIGZvciB3aywgc3RhcnQgYSBuZXcgcHJvamVjdCBhbmQgaW5pdGlhbGl6ZSB3aXRoPC9wPgoJPGNvZGU+CgkJPHByZT4Kd2sgaW5pdCBhZHZhbmNlZAoJCTwvcHJlPgoJPC9jb2RlPgo8L2Rpdj4=';
var SOURCE_BASIC_CSS = 'LmFwcGxpY2F0aW9uICp7Cglmb250LWZhbWlseTogJ0Z1dHVyYScsIEhlbHZldGljYSwgc2Fucy1zZXJpZjsKfQoKLmFwcGxpY2F0aW9uIHByZXsKCWZvbnQtZmFtaWx5OiBtb25vc3BhY2U7CgliYWNrZ3JvdW5kOiAjZWVlOwoJd2lkdGg6IDEwMCU7CglwYWRkaW5nOiAyMHB4OwoJZm9udC1zaXplOiAxOHB4OwoJaGVpZ2h0OiAyNHB4Owp9CgouYXBwbGljYXRpb24gLmFjY2VudHsKCWNvbG9yOiAjYzBhOwp9';
var SOURCE_BASIC_JS = 'Y2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQKewoJY29uc3RydWN0b3Iocm9vdCwgb3B0aW9ucykKCXsKCQlzdXBlcihyb290LCAiYXBwbGljYXRpb24iKTsKCX0KfQ==';
var SOURCE_ROUTER = 'ZnVuY3Rpb24gUm91dGVyKHBhZ2VEYXRhLCBvbnBhZ2Vub3Rmb3VuZCAsIGNvbnRhaW5lcjQwNCkKewoJdmFyIHNlbGYgPSB0aGlzOwoJdmFyIGFsbENvbnRhaW5lcnMgPSBbXTsKCXZhciBjdXJyZW50UGFnZVVybDsKCXZhciBjdXJyZW50UGFnZVVybEV4YWN0OwoJZm9yICh2YXIgayBpbiBwYWdlRGF0YSkKCXsKCQlpZiAodHlwZW9mIHBhZ2VEYXRhW2tdWydjb250YWluZXInXSA9PT0gJ3VuZGVmaW5lZCcpCgkJCSB0aHJvdyAoJ2Nhbm5vdCBmaW5kIGEgY29udGFpbmVyIGZvciAnICsgayk7CgkJaWYgKHBhZ2VEYXRhW2tdWydjb250YWluZXInXSkKCQkJYWxsQ29udGFpbmVycy5wdXNoKHBhZ2VEYXRhW2tdWydjb250YWluZXInXSk7Cgl9Cgl3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uIChlKQoJewoJCWlmIChlLnN0YXRlKQoJCQlzZWxmLm9wZW4oZS5zdGF0ZSwgZmFsc2UpOwoJfTsKCXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkKCXsKCQl2YXIgdHJpbW1lZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoOwoJCXNlbGYub3Blbih0cmltbWVkLCBmYWxzZSk7Cgl9KTsKCglzZWxmLm9wZW4gPSBmdW5jdGlvbih1cmwsIHNob3VsZEFkZFRvSGlzdG9yeSkKCXsKCQlpZiAodHlwZW9mIHNob3VsZEFkZFRvSGlzdG9yeSA9PSAidW5kZWZpbmVkIikKCQkJc2hvdWxkQWRkVG9IaXN0b3J5ID0gdHJ1ZTsKCQkKCQl2YXIgZGF0YSA9ICcnOwoJCXZhciBleGFjdFVybCA9IHVybDsKCgkJaWYgKCFwYWdlRGF0YVt1cmxdKQoJCXsKCQkJdmFyIHIgPSBmaW5kTWF0Y2hpbmdVcmwodXJsKTsKCQkJaWYgKCFyLnN1Y2Nlc3MpCgkJCXsKCQkJCWlmIChvbnBhZ2Vub3Rmb3VuZCkKCQkJCQlvbnBhZ2Vub3Rmb3VuZCh1cmwpOwoJCQkJCgkJCQloaWRlQWxsKCk7CgkJCQljb250YWluZXI0MDQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CgkJCQlyZXR1cm47CgkJCX0KCQkJZXhhY3RVcmwgPSByLnVybDsKCQkJZGF0YSA9IHIuZGF0YTsKCQl9CgkJaWYgKHNob3VsZEFkZFRvSGlzdG9yeSkKCQkJd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHVybCwgJ1RpdGxlJywgdXJsKTsKCQkKCQloaWRlQWxsKCk7CgkJY29udGFpbmVyNDA0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CgkJaWYgKHBhZ2VEYXRhW2V4YWN0VXJsXVsnY29udGFpbmVyJ10pCgkJCXBhZ2VEYXRhW2V4YWN0VXJsXVsnY29udGFpbmVyJ10uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CgkJCgkJaWYgKGN1cnJlbnRQYWdlVXJsKQoJCXsKCQkJaWYgKGN1cnJlbnRQYWdlVXJsICE9IHVybCAmJiBwYWdlRGF0YVtjdXJyZW50UGFnZVVybEV4YWN0XVsnb251bm1vdW50J10pCgkJCQlwYWdlRGF0YVtjdXJyZW50UGFnZVVybEV4YWN0XVsnb251bm1vdW50J10oKTsKCQl9CgkKCQlpZiAoY3VycmVudFBhZ2VVcmwgIT0gdXJsICYmIHBhZ2VEYXRhW2V4YWN0VXJsXVsnb25tb3VudCddKQoJCQlwYWdlRGF0YVtleGFjdFVybF1bJ29ubW91bnQnXShkYXRhKTsKCQoJCWN1cnJlbnRQYWdlVXJsID0gdXJsOwoJCWN1cnJlbnRQYWdlVXJsRXhhY3QgPSBleGFjdFVybDsKCQlkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7Cgl9CQoKCWZ1bmN0aW9uIGhpZGVBbGwoKQoJewoJCWZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ29udGFpbmVycy5sZW5ndGg7IGkrKykKCQkJYWxsQ29udGFpbmVyc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwoJfQoKCWZ1bmN0aW9uIGZpbmRNYXRjaGluZ1VybCAodXJsKQoJewoJCXZhciByID0KCQl7CgkJCSd1cmwnOiAnJywKCQkJJ2RhdGEnOiAnJywKCQkJJ3N1Y2Nlc3MnOiBmYWxzZQoJCX07CgkJdmFyIGZvdW5kVXJsOwoJCWZvciAodmFyIGsgaW4gcGFnZURhdGEpCgkJewoJCQlpZiAoayA9PSAnLycpCgkJCQljb250aW51ZTsKCQkJaWYgKHVybC5pbmRleE9mKGspID09IDApCgkJCXsKCQkJCWZvdW5kVXJsID0gazsKCQkJCXIuc3VjY2VzcyA9IHRydWU7CgkJCQlicmVhazsKCQkJfQoJCX0KCQlpZiAoIXIuc3VjY2VzcykKCQkJcmV0dXJuIHI7CgkJCgkJci51cmwgPSBmb3VuZFVybDsKCQlyLmRhdGEgPSB1cmwuc3Vic3RyKHIudXJsLmxlbmd0aCk7CgkJcmV0dXJuIHI7Cgl9CgkKCXNlbGYub3Blbih3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaCArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsIGZhbHNlKTsJCn0=';


// rename these
var BASE_INPUT_PATH = "./components/";
var CLASS_INPUT_PATH = "./classes/";
var OUTPUT_PATH = "./dist/dev";

var commands = {
	"init"  : init,
	"deinit"  : deinit,
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
	if (isProjectValid())
	{
		error("current folder is already initialized");
		return;
	}
	
	
	log("initializing a new project");
	if (!FS.existsSync("./dist")){FS.mkdirSync("./dist");}
	if (!FS.existsSync("./classes")){FS.mkdirSync("./classes");}
	if (!FS.existsSync("./components")){FS.mkdirSync("./components");}
	log("- folders created");

	FS.writeFileSync("./classes/util.js",Buffer.from(SOURCE_UTIL, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/element.js",Buffer.from(SOURCE_ELEMENT, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/dispatcher.js",Buffer.from(SOURCE_DISPATCHER, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/store.js",Buffer.from(SOURCE_STORE, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./dist/index.html",Buffer.from(SOURCE_INDEX, 'base64').toString('ascii'),"utf8");
	log("- classes created");

	FS.mkdirSync("./components/application");
	FS.writeFileSync("./components/application/application.js",Buffer.from(SOURCE_BASIC_JS, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./components/application/application.css",Buffer.from(SOURCE_BASIC_CSS, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./components/application/application.html",Buffer.from(SOURCE_BASIC_HTML, 'base64').toString('ascii'),"utf8");

	highlight("project initialized successfully , you can run _start_ command now");
	highlight("wk start  | auto-builds components and serves them under ./dist folder");
}

function deinit(a)
{
	deleteFolderRecursive("./dist");
	deleteFolderRecursive("./classes");
	deleteFolderRecursive("./components");
	log("- de initialized project and deleted all files");
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
	var opn = require("opn");
	
	var serve = serveStatic('./dist', {'index': ['index.html', 'index.htm']});
	
	var server = http.createServer(
	function onRequest (req, res)
	{
		serve(req, res, finalhandler(req, res))
	})
	
	var pf = require("portfinder");
	pf.basePort = 3000;
	pf.getPort(function (err, port)
	{
		if (err)
		{
			error("no port available for http server");
		}
		server.listen(port);
		log("listening localhost:" + port);
		opn('http://localhost:' + port);
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

	if (!isProjectValid())
	{
		error("current folder is not a valid wk project, initialize first");
		log("usage:");
		log("	wk init   | initializes a new project with boilerplate code");
		return;
	}

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

	createComponentFiles(a[0]);
}

function createComponentFiles(name)
{
	if (FS.existsSync("./components/" + name))
	{
		error("a component with a name " + name + " already exists");
		return;
	}
	log("creating a new component named " + name);

	var pascal = dash2PascalCase(name);
	var ts = Buffer.from(SOURCE_SAMPLE, 'base64').toString('ascii');
	ts = ts.replace("SampleComponent", pascal);
	ts = ts.replace("sample-component", name);

	FS.mkdirSync("./components/" + name);
	FS.writeFileSync("./components/" + name + "/" + name + ".html" , "", "utf8");
	FS.writeFileSync("./components/" + name + "/" + name + ".css" , "", "utf8");
	FS.writeFileSync("./components/" + name + "/" + name + ".ts" , ts, "utf8");

	log("created a new component named " + name);
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

function onchange()
{
	console.time('\x1b[32mbuild completed successfully\x1b[0m');

	var files = FS.readdirSync(BASE_INPUT_PATH);
	var all = '';
	var css = '';
	var names = [];
	var markupMap = {};
	var tsFiles = [];
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

		if (!FS.existsSync(input + '.ts')) 
		{
			console.log('\x1b[31m%s\x1b[0m', 'missing file ->' + input + '.ts  build cancelled');
			return;
		}

		if (markupMap[input])
		{
			console.log('\x1b[31m%s\x1b[0m', 'duplicate markup file ->' + input + '.html  build cancelled');
			return;
		}
		var markup = FS.readFileSync(input + ".html","utf8");
		markupMap[input] = new Buffer(markup).toString('base64');
		tsFiles.push(input + ".ts");

		// var js = FS.readFileSync(input + ".js","utf8");
		// js = js.replace("{","{\n\tvar self = this;\n\tself.root = root;\n\troot.innerHTML = atob('"+new Buffer(markup).toString('base64')+"');");
		// all += js + '\n';

		if (FS.existsSync(input + '.css')) 
			css += FS.readFileSync(input + ".css","utf8") + '\n';
	}

	files = FS.readdirSync(CLASS_INPUT_PATH);
	// names = [];
	files.forEach(function(file)
	{
		if (file.indexOf('.') == 0)
			return;

		tsFiles.push(file);
		// names.push(file);
	});

	var js = compile(tsFiles,{
		noEmitOnError: true, noImplicitAny: true,
		target: TS.ScriptTarget.ES5, module: TS.ModuleKind.CommonJS
	});

	
	// for (var i=0;i<names.length;i++)
	// {
	// 	var input = CLASS_INPUT_PATH + names[i];
	// 	all += FS.readFileSync(input,"utf8") + '\n';
	// }

	try { FS.unlinkSync( OUTPUT_PATH + ".js" ); } catch (e) { }
	FS.writeFileSync( OUTPUT_PATH + ".js" , js , 'utf8');

	try { FS.unlinkSync( OUTPUT_PATH + ".css" ); } catch (e) { }
	FS.writeFileSync( OUTPUT_PATH + ".css" , css , 'utf8');

	try { FS.unlinkSync( OUTPUT_PATH + ".json" ); } catch (e) { }
	FS.writeFileSync( OUTPUT_PATH + ".json" , JSON.stringify(markupMap) , 'utf8');

	console.timeEnd('\x1b[32mbuild completed successfully\x1b[0m');
}

function isProjectValid()
{
	if (!FS.existsSync("./dist"))
	{
		return false;
	}

	if (!FS.existsSync("./components"))
	{
		return false;
	}

	if (!FS.existsSync("./classes"))
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

function dash2PascalCase(s)
{
	var words = s.split("-");
	var r = [];
	for (var i in words)
		r.push(words[i][0].toUpperCase() + words[i].slice(1));

	return r.join("");
}

function compile(fileNames, options)
{
	let program = TS.createProgram(fileNames, options);
	let emitResult = program.emit();

	let allDiagnostics = TS.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

	allDiagnostics.forEach(function(diagnostic)
	{
		if (diagnostic.file)
		{
			// let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
			// let message = TS.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
			// console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
		}
		else
		{
			// console.log(`${TS.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
		}
	});

	return emitResult;

	// let exitCode = emitResult.emitSkipped ? 1 : 0;
	// console.log(`Process exiting with code ` + exitCode);
	// process.exit(exitCode);
}

