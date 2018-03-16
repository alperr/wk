// run this when assets are changed

var FS = require("fs");

var wk = FS.readFileSync("./wk.js","utf8");
var lines = wk.split("\n");

var map = {
	"var SOURCE_DISPATCHER = " 			: "dispatcher.js",
	"var SOURCE_UTIL = " 				: "util.js",
	"var SOURCE_STORE = " 				: "store.js",
	"var SOURCE_ELEMENT = " 			: "element.js",
	"var SOURCE_INDEX = " 				: "index.html",
	"var SOURCE_SAMPLE = " 				: "sample.js",
	"var SOURCE_BASIC_HTML = " 			: "basic-template.html",
	"var SOURCE_BASIC_CSS = " 			: "basic-template.css",
	"var SOURCE_BASIC_JS = " 			: "basic-template.js",
	"var SOURCE_ROUTER = " 				: "router.js",
	"var SOURCE_ADVANCED_APPLICATION_JS = " 	: "application.js",
	"var SOURCE_ADVANCED_APPLICATION_CSS = " 	: "application.css",
	"var SOURCE_ADVANCED_APPLICATION_HTML = " 	: "application.html",
	"var SOURCE_ADVANCED_ROUTER_JS = " 		: "router-page.js",
	"var SOURCE_ADVANCED_ROUTER_CSS = " 		: "router-page.css",
	"var SOURCE_ADVANCED_ROUTER_HTML = " 		: "router-page.html",
	"var SOURCE_ADVANCED_COMP_JS = " 		: "components-page.js",
	"var SOURCE_ADVANCED_COMP_CSS = " 		: "components-page.css",
	"var SOURCE_ADVANCED_COMP_HTML = " 		: "components-page.html",
	"var SOURCE_ADVANCED_TEMP_JS = " 		: "templates-page.js",
	"var SOURCE_ADVANCED_TEMP_CSS = " 		: "templates-page.css",
	"var SOURCE_ADVANCED_TEMP_HTML = " 		: "templates-page.html",
	"var SOURCE_ADVANCED_STORE_JS = " 		: "store-page.js",
	"var SOURCE_ADVANCED_STORE_CSS = " 		: "store-page.css",
	"var SOURCE_ADVANCED_STORE_HTML = " 		: "store-page.html",
	"var SOURCE_ADVANCED_DISPATCHER_JS = " 		: "dispatcher-page.js",
	"var SOURCE_ADVANCED_DISPATCHER_CSS = " 	: "dispatcher-page.css",
	"var SOURCE_ADVANCED_DISPATCHER_HTML = " 	: "dispatcher-page.html",
	"var SOURCE_ADVANCED_LANDING_JS = " 		: "landing-page.js",
	"var SOURCE_ADVANCED_LANDING_CSS = " 		: "landing-page.css",
	"var SOURCE_ADVANCED_LANDING_HTML = " 		: "landing-page.html"
}
for (var i in lines)
{
	var l = lines[i];
	for (m in map)
	{
		if (l.indexOf(m) == 0)
			lines[i] =  m + "'" + new Buffer(FS.readFileSync("./asset/" + map[m], "utf8")).toString('base64') + "';";
	}
}

var out = lines.join("\n");
FS.writeFileSync("wk.js",out,"utf8");
