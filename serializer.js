// run this when assets are changed

const FS = require("fs");
var wk = FS.readFileSync("./wk.js", "utf8");
var lines = wk.split("\n");

var map =
{
	"const SOURCE_UTILS = " 	: "utils.js",
	"const SOURCE_INDEX = " 	: "index.html",
	"const SOURCE_SAMPLE = " 	: "sample.js",
	"const SOURCE_BASIC_HTML = " 	: "basic-template.html",
	"const SOURCE_BASIC_CSS = " 	: "basic-template.css",
	"const SOURCE_HTTP = " 		: "http.js",
	"const SOURCE_START_SCRIPT = "	: "start-script.html",
	"const SOURCE_HOT_RELOAD = "	: "hot-reload.js",
	"const SOURCE_SAMPLE_C = "	: "template.c",
	"const SOURCE_WASM_INIT = "	: "wasm-init.js"
}

for (var i in lines)
{
	var l = lines[i];
	for (m in map)
	{
		if (l.indexOf(m) == 0)
		{
			lines[i] =  m + "'" + Buffer.from(FS.readFileSync("./asset/" + map[m], "utf8")).toString('base64') + "';";
			console.log("serialized " + map[m]);
		}
	}
}

var out = lines.join("\n");
FS.writeFileSync("wk.js", out, "utf8");