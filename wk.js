#!/usr/bin/env node

// **** INCLUDES ****
var FS = require('fs');
var EXEC = require('child_process').execSync;


// **** CONSTANTS ****
var BG_RED = "\x1b[41m";
var FG_RED = "\x1b[31m";
var FG_DIM = "\x1b[2m";
var BG_GREEN = "\x1b[42m";
var FG_BLACK = "\x1b[30m";
var RESET = "\x1b[0m";

var SOURCE_DISPATCHER = 'aWYgKHR5cGVvZiBfX3drID09ICJ1bmRlZmluZWQiKQoJdmFyIF9fd2s6IGFueSA9IHt9OwoKX193ay5ldmVudHMgPSB7fTsKCmZ1bmN0aW9uIHN1YihhY3Rpb246IG51bWJlciwgZikKewoJaWYgKHR5cGVvZiBfX3drLmV2ZW50c1thY3Rpb25dID09ICd1bmRlZmluZWQnKQoJCV9fd2suZXZlbnRzW2FjdGlvbl0gPSBbXTsKCglfX3drLmV2ZW50c1thY3Rpb25dLnB1c2goZik7Cn0KCmZ1bmN0aW9uIHVuc3ViKGFjdGlvbjogbnVtYmVyLCBmKQp7CglpZiAodHlwZW9mIF9fd2suZXZlbnRzW2FjdGlvbl0gPT0gJ3VuZGVmaW5lZCcpCgkJcmV0dXJuOwoKCWZvciAodmFyIGk9MDtpPF9fd2suZXZlbnRzW2FjdGlvbl0ubGVuZ3RoO2krKykKCXsKCQlpZiAoX193ay5ldmVudHNbYWN0aW9uXVtpXSA9PSBmKQoJCXsKCQkJX193ay5ldmVudHNbYWN0aW9uXS5zcGxpY2UoaSwxKTsKCQkJaS0tOwoJCX0KCX0KfQoKZnVuY3Rpb24gcHViKGFjdGlvbjogbnVtYmVyKQp7CglpZiAoIChhY3Rpb24gfCAwKSAhPSBhY3Rpb24pCgkJdGhyb3coJ2JhZCBhY3Rpb24nKTsKCglpZiAodHlwZW9mIF9fd2suZXZlbnRzW2FjdGlvbl0gPT0gJ3VuZGVmaW5lZCcpCgkJcmV0dXJuOwoKCWZvciAodmFyIGk9MDtpPF9fd2suZXZlbnRzW2FjdGlvbl0ubGVuZ3RoO2krKykKCQlfX3drLmV2ZW50c1thY3Rpb25dW2ldKCk7Cn0KCnZhciBzaWcgPSBmdW5jdGlvbihhY3Rpb246IG51bWJlcikKewoJcmV0dXJuIGZ1bmN0aW9uKCl7IHB1YihhY3Rpb24pIH0KfQ==';
var SOURCE_ELEMENT = 'Y2xhc3MgQ29tcG9uZW50CnsKCXB1YmxpYyByb290OiBFbGVtZW50OwoJY29uc3RydWN0b3Iocm9vdDogRWxlbWVudCwgbWFya3VwOiBzdHJpbmcpCgl7CgkJdGhpcy5yb290ID0gcm9vdDsKCQl0aGlzLmxvYWRNYXJrdXAobWFya3VwKTsKCX0KCglwdWJsaWMgZmluZCA9IChxdWVyeTogc3RyaW5nKTogRWxlbWVudCA9PgoJewoJCXF1ZXJ5ID0gJy4nICsgcXVlcnk7CgkJcmV0dXJuIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KVswXTsJCQoJfQoKCXByaXZhdGUgbG9hZE1hcmt1cCA9IChrZXk6IHN0cmluZykgPT4KCXsKCQl2YXIgdzogYW55ID0gd2luZG93OwoJCWlmICghdy5fX21hcmt1cF9kYXRhW2tleV0pCgkJCXRocm93ICJ0aGVyZSBpcyBubyBtYXJrdXAgZm9yICIgKyBrZXk7CgoJCXRoaXMucm9vdC5pbm5lckhUTUwgPSBhdG9iKHcuX19tYXJrdXBfZGF0YVtrZXldKTsKCX0KfQ==';
var SOURCE_STORE = 'aWYgKHR5cGVvZiBfX3drID09ICJ1bmRlZmluZWQiKQoJdmFyIF9fd2s6IGFueSA9IHt9OwpfX3drLnN0b3JlID0ge307Cm5hbWVzcGFjZSBTdG9yZQp7CglleHBvcnQgZnVuY3Rpb24gaGFzKGtleTogbnVtYmVyKTogYm9vbGVhbgoJewoJCXJldHVybiB0eXBlb2YgX193ay5zdG9yZVtrZXldICE9ICd1bmRlZmluZWQnCgl9CgkKCWV4cG9ydCBmdW5jdGlvbiBnZXQoa2V5OiBudW1iZXIpCgl7CgkJcmV0dXJuIF9fd2suc3RvcmVba2V5XTsKCX0KCQoJZXhwb3J0IGZ1bmN0aW9uIHNldChrZXk6IG51bWJlciwgdmFsdWUpCgl7CgkJcmV0dXJuIF9fd2suc3RvcmVba2V5XSA9IHZhbHVlOwoJfQp9';
var SOURCE_UTIL = 'bmFtZXNwYWNlIFV0aWwKewoJZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUFscGhhTnVtKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nCgl7CgkJLy8gNjIgY2hhcnMgCgkJLy8gTWF0aC5sb2cyKDYyKSA9IDUuOTU0IGJpdCBlbnRyb3B5IHBlciBjaGFyYWN0ZXIKCQkvLyBsZW5ndGggPSAyMiB3aWxsIGdpdmUgeW91IGEgfjEyOCBiaXQgcmFuZG9tbmVzcwoJCXZhciBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHJxc3R1d3Z4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVXVlhZWicKCQl2YXIgciA9ICcnOwoJCWZvciAodmFyIGk9MDtpPGxlbmd0aDtpKyspCgkJCXIgKz0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKV07CgkJCgkJcmV0dXJuIHI7Cgl9Cn0=';
var SOURCE_INDEX = 'PGh0bWwgbGFuZz0iZW4iPgoJPGhlYWQ+CgkJPG1ldGEgY2hhcnNldD0idXRmLTgiPgoJCTxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiPgoJCTx0aXRsZT53azwvdGl0bGU+CgkJPHN0eWxlPgoJCQkjcm9vdHsKCQkJCXdpZHRoOiAxMDAlOwoJCQkJaGVpZ2h0OiAxMDAlOwoJCQkJb3ZlcmZsb3c6IG5vbmU7CgkJCQlwb3NpdGlvbjogcmVsYXRpdmU7CgkJCX0KCQk8L3N0eWxlPgoJCTxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iZGV2LmNzcyI+CgkJPHNjcmlwdCBzcmM9J2Rldi5qcyc+PC9zY3JpcHQ+Cgk8L2hlYWQ+CgkKCTxib2R5PgoJCTxkaXYgaWQ9J3Jvb3QnPjwvZGl2PgoJPC9ib2R5PgoJPHNjcmlwdD4KCXdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKQoJewoJCXZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKCQl4aHIub3BlbigiR0VUIiwiZGV2Lmpzb24iKTsKCQl4aHIuc2VuZCgpOwoJCXhoci5vbmxvYWQgPSBmdW5jdGlvbigpCgkJewoJCQl3aW5kb3cuX19tYXJrdXBfZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7CgkJCW5ldyBBcHBsaWNhdGlvbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTsKCQl9Cgl9Cgk8L3NjcmlwdD4KPC9odG1sPg==';
var SOURCE_SAMPLE = 'Ly8vIDxyZWZlcmVuY2UgcGF0aD0iLi4vLi4vY2xhc3Nlcy9jb21wb25lbnQudHMiIC8+CgpjbGFzcyBTYW1wbGVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQKewoJY29uc3RydWN0b3Iocm9vdDogRWxlbWVudCwgb3B0aW9uczogT2JqZWN0KQoJewoJCXN1cGVyKHJvb3QsICJzYW1wbGUtY29tcG9uZW50Iik7CgoJfQoKCXB1YmxpYyBhID0gKCk9PgoJewoJCQoJfQoKCXByaXZhdGUgYiA9ICgpPT4KCXsKCgl9Cn0=';
var SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwbGljYXRpb24nPgoJPGgxPmJhc2ljIHdrIHByb2plY3Q8L2gxPgoJPHA+dGhpcyBwYWdlIGlzIGdlbmVyYXRlZCBieSBhcHBsaWNhdGlvbiBjb21wb25lbnQ8L3A+Cgk8cD5pdCBjYW4gYmUgZm91bmQgdW5kZXIgPHN0cm9uZz4vY29tcG9uZW50czwvc3Ryb25nPiBmb2xkZXI8L3A+Cgk8cCBjbGFzcz0nYWNjZW50Jz55b3UgY2FuIHR3ZWFrIHRoaXMgY29tcG9uZW50J3Mgc3R5bGUgYnkgZWRpdGluZyA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uY3NzPC9zdHJvbmc+IGZpbGU8L3A+Cgk8cD5hbGwgdGhpcyBjb21wb25lbnQgbWFya3VwIGlzIHdyaXR0ZW4gaW50byA8c3Ryb25nPmNvbXBvbmVudHMvYXBwbGljYXRpb24vYXBwbGljYXRpb24uaHRtbDwvc3Ryb25nPjwvcD4KCTxwPmluIG9yZGVyIHRvIHNlZSBtb3JlIGFkdmFuY2VkIGV4YW1wbGVzIGZvciB3aywgc3RhcnQgYSBuZXcgcHJvamVjdCBhbmQgaW5pdGlhbGl6ZSB3aXRoPC9wPgoJPGNvZGU+CgkJPHByZT4Kd2sgaW5pdCBhZHZhbmNlZAoJCTwvcHJlPgoJPC9jb2RlPgo8L2Rpdj4=';
var SOURCE_BASIC_CSS = 'LmFwcGxpY2F0aW9uICp7Cglmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmOwp9CgouYXBwbGljYXRpb24gcHJlewoJZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKCWJhY2tncm91bmQ6ICNlZWU7Cgl3aWR0aDogMTAwJTsKCXBhZGRpbmc6IDIwcHg7Cglmb250LXNpemU6IDE4cHg7CgloZWlnaHQ6IDI0cHg7Cn0KCi5hcHBsaWNhdGlvbiAuYWNjZW50ewoJY29sb3I6ICNjMGE7Cn0=';
var SOURCE_BASIC_JS = 'Ly8vIDxyZWZlcmVuY2UgcGF0aD0iLi4vLi4vY2xhc3Nlcy9jb21wb25lbnQudHMiIC8+CgpjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudAp7Cgljb25zdHJ1Y3Rvcihyb290LCBvcHRpb25zKQoJewoJCXN1cGVyKHJvb3QsICJhcHBsaWNhdGlvbiIpOwoJfQp9';
var SOURCE_ROUTER = 'ZnVuY3Rpb24gUm91dGVyKHBhZ2VEYXRhLCBvbnBhZ2Vub3Rmb3VuZCAsIGNvbnRhaW5lcjQwNCkKewoJdmFyIHNlbGYgPSB0aGlzOwoJdmFyIGFsbENvbnRhaW5lcnMgPSBbXTsKCXZhciBjdXJyZW50UGFnZVVybDsKCXZhciBjdXJyZW50UGFnZVVybEV4YWN0OwoJZm9yICh2YXIgayBpbiBwYWdlRGF0YSkKCXsKCQlpZiAodHlwZW9mIHBhZ2VEYXRhW2tdWydjb250YWluZXInXSA9PT0gJ3VuZGVmaW5lZCcpCgkJCSB0aHJvdyAoJ2Nhbm5vdCBmaW5kIGEgY29udGFpbmVyIGZvciAnICsgayk7CgkJaWYgKHBhZ2VEYXRhW2tdWydjb250YWluZXInXSkKCQkJYWxsQ29udGFpbmVycy5wdXNoKHBhZ2VEYXRhW2tdWydjb250YWluZXInXSk7Cgl9Cgl3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uIChlKQoJewoJCWlmIChlLnN0YXRlKQoJCQlzZWxmLm9wZW4oZS5zdGF0ZSwgZmFsc2UpOwoJfTsKCXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkKCXsKCQl2YXIgdHJpbW1lZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoOwoJCXNlbGYub3Blbih0cmltbWVkLCBmYWxzZSk7Cgl9KTsKCglzZWxmLm9wZW4gPSBmdW5jdGlvbih1cmwsIHNob3VsZEFkZFRvSGlzdG9yeSkKCXsKCQlpZiAodHlwZW9mIHNob3VsZEFkZFRvSGlzdG9yeSA9PSAidW5kZWZpbmVkIikKCQkJc2hvdWxkQWRkVG9IaXN0b3J5ID0gdHJ1ZTsKCQkKCQl2YXIgZGF0YSA9ICcnOwoJCXZhciBleGFjdFVybCA9IHVybDsKCgkJaWYgKCFwYWdlRGF0YVt1cmxdKQoJCXsKCQkJdmFyIHIgPSBmaW5kTWF0Y2hpbmdVcmwodXJsKTsKCQkJaWYgKCFyLnN1Y2Nlc3MpCgkJCXsKCQkJCWlmIChvbnBhZ2Vub3Rmb3VuZCkKCQkJCQlvbnBhZ2Vub3Rmb3VuZCh1cmwpOwoJCQkJCgkJCQloaWRlQWxsKCk7CgkJCQljb250YWluZXI0MDQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CgkJCQlyZXR1cm47CgkJCX0KCQkJZXhhY3RVcmwgPSByLnVybDsKCQkJZGF0YSA9IHIuZGF0YTsKCQl9CgkJaWYgKHNob3VsZEFkZFRvSGlzdG9yeSkKCQkJd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHVybCwgJ1RpdGxlJywgdXJsKTsKCQkKCQloaWRlQWxsKCk7CgkJY29udGFpbmVyNDA0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CgkJaWYgKHBhZ2VEYXRhW2V4YWN0VXJsXVsnY29udGFpbmVyJ10pCgkJCXBhZ2VEYXRhW2V4YWN0VXJsXVsnY29udGFpbmVyJ10uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CgkJCgkJaWYgKGN1cnJlbnRQYWdlVXJsKQoJCXsKCQkJaWYgKGN1cnJlbnRQYWdlVXJsICE9IHVybCAmJiBwYWdlRGF0YVtjdXJyZW50UGFnZVVybEV4YWN0XVsnb251bm1vdW50J10pCgkJCQlwYWdlRGF0YVtjdXJyZW50UGFnZVVybEV4YWN0XVsnb251bm1vdW50J10oKTsKCQl9CgkKCQlpZiAoY3VycmVudFBhZ2VVcmwgIT0gdXJsICYmIHBhZ2VEYXRhW2V4YWN0VXJsXVsnb25tb3VudCddKQoJCQlwYWdlRGF0YVtleGFjdFVybF1bJ29ubW91bnQnXShkYXRhKTsKCQoJCWN1cnJlbnRQYWdlVXJsID0gdXJsOwoJCWN1cnJlbnRQYWdlVXJsRXhhY3QgPSBleGFjdFVybDsKCQlkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7Cgl9CQoKCWZ1bmN0aW9uIGhpZGVBbGwoKQoJewoJCWZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ29udGFpbmVycy5sZW5ndGg7IGkrKykKCQkJYWxsQ29udGFpbmVyc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwoJfQoKCWZ1bmN0aW9uIGZpbmRNYXRjaGluZ1VybCAodXJsKQoJewoJCXZhciByID0KCQl7CgkJCSd1cmwnOiAnJywKCQkJJ2RhdGEnOiAnJywKCQkJJ3N1Y2Nlc3MnOiBmYWxzZQoJCX07CgkJdmFyIGZvdW5kVXJsOwoJCWZvciAodmFyIGsgaW4gcGFnZURhdGEpCgkJewoJCQlpZiAoayA9PSAnLycpCgkJCQljb250aW51ZTsKCQkJaWYgKHVybC5pbmRleE9mKGspID09IDApCgkJCXsKCQkJCWZvdW5kVXJsID0gazsKCQkJCXIuc3VjY2VzcyA9IHRydWU7CgkJCQlicmVhazsKCQkJfQoJCX0KCQlpZiAoIXIuc3VjY2VzcykKCQkJcmV0dXJuIHI7CgkJCgkJci51cmwgPSBmb3VuZFVybDsKCQlyLmRhdGEgPSB1cmwuc3Vic3RyKHIudXJsLmxlbmd0aCk7CgkJcmV0dXJuIHI7Cgl9CgkKCXNlbGYub3Blbih3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaCArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsIGZhbHNlKTsJCn0=';

var COMPONENT_BASE_PATH = "./components/";
var CLASS_BASE_PATH = "./classes/";
var OUTPUT_PATH = "./dist/dev";

var commands = {
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"new" : newComponent,
	"build" : productionBuild
}

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
	log("usage:");
	log("	wk init   | initializes a new project with boilerplate code");
	log("	wk start  | auto-builds components and serves them under ./dist folder");
	log("	wk new    | creates a new component under ./components folder");
	log("	wk build  | makes a production build (minifies css and js) under ./build folder");
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

	FS.writeFileSync("./classes/util.ts",Buffer.from(SOURCE_UTIL, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/component.ts",Buffer.from(SOURCE_ELEMENT, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/dispatcher.ts",Buffer.from(SOURCE_DISPATCHER, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/store.ts",Buffer.from(SOURCE_STORE, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./classes/router.ts",Buffer.from(SOURCE_ROUTER, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./dist/index.html",Buffer.from(SOURCE_INDEX, 'base64').toString('ascii'),"utf8");
	log("- classes created");

	FS.mkdirSync("./components/application");
	FS.writeFileSync("./components/application/application.ts",Buffer.from(SOURCE_BASIC_JS, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./components/application/application.css",Buffer.from(SOURCE_BASIC_CSS, 'base64').toString('ascii'),"utf8");
	FS.writeFileSync("./components/application/application.html",Buffer.from(SOURCE_BASIC_HTML, 'base64').toString('ascii'),"utf8");

	highlight("project initialized successfully");
	log("you can run **start** command now")
	log("wk start  | auto-builds components and serves them under ./dist folder");
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

	FS.watch(COMPONENT_BASE_PATH, { "recursive" : true } , onchange);
	FS.watch(CLASS_BASE_PATH, { "recursive" : true } , onchange);
	onchange("change",".ts");

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


function productionBuild()
{
	log("building for production");

	var UGLIFYJS = require("uglify-js");
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(FS.readFileSync("./dist/index.html"));
	
	var name = randomString(16);
	$("link[href$='dev.css']").attr("href" , name + ".css");
	$("script[src$='dev.js']").attr("src" , name + ".js");
	log($.html());
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

function minorLog(m)
{
	console.log(FG_DIM, m, RESET);
}

var timer;
var counter = 0;
var changedFiles = [];
function onchange(event,changeFileName)
{
	if ( !changeFileName.endsWith(".ts") && !changeFileName.endsWith(".css") && !changeFileName.endsWith(".html"))
		return;

	clearTimeout(timer);
	counter++;
	changedFiles.push(changeFileName);
	timer = setTimeout(function()
	{
		minorLog(counter + " save action captured, building");
		minorLog(changedFiles);
		
		counter = 0;
		changedFiles = [];
		console.time('\x1b[32mbuild completed successfully\x1b[0m');

		var css = '';
		var markupMap = {};
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
			markupMap[names[i]] = new Buffer(markup).toString('base64');
			tsFiles.push(input + ".ts");

			if (FS.existsSync(input + '.css')) 
				css += FS.readFileSync(input + ".css","utf8") + '\n';
		}

		command = "tsc --out ./dist/dev.js ";	
		command += tsFiles.join(" ");
		// console.log(tsFiles);
		// console.log(command);
		try{
			EXEC(command);
		}catch(e)
		{
			error('typescript build failed');
			error(e.stdout.toString('utf8'));
			return;
		}

		try { FS.unlinkSync( OUTPUT_PATH + ".css" ); } catch (e) { }
		FS.writeFileSync( OUTPUT_PATH + ".css" , css , 'utf8');

		try { FS.unlinkSync( OUTPUT_PATH + ".json" ); } catch (e) { }
		FS.writeFileSync( OUTPUT_PATH + ".json" , JSON.stringify(markupMap) , 'utf8');

		console.timeEnd('\x1b[32mbuild completed successfully\x1b[0m');
	},500);
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

function randomString(length)
{
	var alphabet = 'abcdefghijklmnoprqstuwvxyz'
	var r = '';
	for (var i=0;i<length;i++)
		r += alphabet[Math.floor(Math.random() * alphabet.length)];
	
	return r;
}