// run this when assets are changed

var FS = require("fs");

var wk = FS.readFileSync("./wk.js","utf8");
var lines = wk.split("\n");

var map = {
	"var SOURCE_DISPATCHER = " : "dispatcher.js",
	"var SOURCE_UTIL = " : "util.js",
	"var SOURCE_STORE = " : "store.js",
	"var SOURCE_ELEMENT = " : "element.js",
	"var SOURCE_INDEX = " : "index.html"
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

