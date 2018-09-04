// run this when assets are changed

var FS = require("fs");

var wk = FS.readFileSync("./wk.js","utf8");
var lines = wk.split("\n");

var map = {
	"var SOURCE_COMPONENT = " 			: "component.ts",
	"var SOURCE_INDEX = " 				: "index.html",
	"var SOURCE_SAMPLE = " 				: "sample.ts",
	"var SOURCE_BASIC_HTML = " 			: "basic-template.html",
	"var SOURCE_BASIC_CSS = " 			: "basic-template.css",
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
