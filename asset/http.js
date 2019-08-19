var http_base = "http://localhost:8060/";

function http_get_foo(id, onload) // sample get request
{
	http_xhr("GET", "foo?id=" + id, onload);
}

function http_post_bar(data1, data2, onload) // sample post request
{
	var body =
	{
		"data1": data1,
		"data2": data2
	};

	http_xhr("POST", "bar", onload, body);
}

function http_xhr(method, url, onload, body)
{
	var x = new XMLHttpRequest();
	x.open(method, http_base + url);
	x.setRequestHeader("Content-Type", "application/json");
	x.onload = function()
	{
		if (x.status != 200)
		{
			onload(undefined, true);
			return;
		}
		try
		{
			var r = x.responseText;
			onload(r, false);
		}
		catch(e)
		{
			onload(r, true);
		}
	}

	x.onerror = function()
	{
		onload(undefined, true);
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