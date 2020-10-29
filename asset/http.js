var http_base = "https://remoteapi.com/";

if (location.hostname == "localhost")
	http_base = "http://localhost:7124/";

function http_serialize(obj)
{
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
			onload(undefined, true, x.status);
			return;
		}
		try
		{
			var r = x.responseText;
			onload(r, false, x.status);
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