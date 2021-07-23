var g_user;
var g_token;
var g_http_base = "https://remoteapi.com/";

if (location.hostname == "localhost")
	g_http_base = "http://localhost:7124/";



	
function http_post_bar(data1, data2, onload) // sample post request
{
	var body =
	{
		"data1": data1,
		"data2": data2
	};

	http_xhr("POST", "bar", onload, body);
}

function http_xhr(method, url, params, onload, is_secure, prevent_parse)
{
	var body;
	if (method.toUpperCase() == "POST")
	{
		body = params;
		if(is_secure)
			body.token = g_token;
	}

	if (method.toUpperCase() == "GET")
	{
		url += http_serialize(params, is_secure)
	}

	if (typeof prevent_parse == "undefined")
		prevent_parse = false;

	var x = new XMLHttpRequest();
	x.open(method, g_http_base + url);
	x.setRequestHeader("Content-Type", "application/json");
	x.onload = function()
	{
		if (x.status == 401)
		{
			dispatch(ACCESS_VIOLATION);
			onload(undefined, true);
			return;
		}

		if (x.status != 200)
		{
			onload(undefined, true, x.status);
			return;
		}
		try
		{
			var r = x.responseText;
			if (!prevent_parse)
				r = JSON.parse(r);

			try{
				onload(r, false, x.status);
			} catch(e) { 
				console.log("http handler error");
				console.log(e);
			}
		}
		catch(e)
		{
			onload(r, true, x.status);
		}
	}

	x.onerror = function()
	{
		onload(undefined, true, x.status);
	}

	if (method.toUpperCase() == "POST")
	{
		if (typeof body == "object")
			body = JSON.stringify(body);

		x.send(body);
	}
	else
	{
		x.send();
	}
}

function http_serialize(obj, has_token)
{
	if (has_token)
		obj.token = g_token;

	var q = "";
	var count = 0;
	for (var key in obj)
	{
		if (typeof obj[key] == "undefined")
			continue;

		if (count > 0)
			q+= "&";

		q += key;
		q += "=";
		q += encodeURIComponent(obj[key]);
		count++;
	}
	if (q.length != 0)
		q = "?" + q;

	return q;
}


function session_write()
{
	localStorage.setItem("token", g_token);
	localStorage.setItem("user", g_user);
}

function session_read()
{
	function get(k)
	{
		var v = localStorage.getItem(k);
		if (v == null)
			return undefined;

		return v;
	}

	g_token = get("token");
	g_user = get("user");

	dispatch(SESSION_READ);
}

function session_clear()
{
	localStorage.clear();
}
