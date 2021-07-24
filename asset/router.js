var g_router_paths = {}
var g_current_route;

function navigate(path, should_add_history)
{
	if (typeof g_router_paths[path] == "undefined")
	{
		console.error("cant find path " + path);
		hide_all();
		return;
	}

	function hide_all()
	{
		for (var key in g_router_paths)
			g_router_paths[key][0].style.display = "none";		
	}

	var is_public = g_router_paths[path][2];

	if (!is_public)
	{
		if (typeof g_token == "undefined")
		{
			dispatch(ACCESS_VIOLATION);
			return;
		}
	}

	var title = g_router_paths[path][1];
	document.title = title;

	if (should_add_history)
		window.history.pushState(path, title, path);

	g_last_shown_route = g_current_route;
	g_current_route = path;
	
	hide_all();
	g_router_paths[path][0].style.display = "block";
	dispatch(ROUTE_CHANGE);
}

function init_router(dom)
{
	var children = dom.children;
	for (var i=0;i<children.length;i++)
	{
		var c = children[i];
		var title = c.getAttribute("title");
		var is_public = c.hasAttribute("public");
		var tag_name = c.tagName.toLowerCase();

		var path;
		if (tag_name == "page-main")
			path = "/"
		else if (tag_name.startsWith("page-"))
			path = "/" + tag_name.substring(5);
		else
			continue;

		if (title == null)
			title = "";

		g_router_paths[path] = [c, title, is_public];
	}

	var all_links = document.querySelectorAll("a[internal]");
	for (var i=0;i<all_links.length;i++)
	{
		var a = all_links[i];
		a.onclick = function(e)
		{
			e.preventDefault();
			navigate(this.getAttribute("href"), true);
		}
	}

	navigate(window.location.pathname, false);

	window.onpopstate = function(e)
	{
		console.log(e);
		var path = "/";
		if (e.state)
			path = e.state;
			
		navigate(path, false);
	};
}

function init_page(page)
{
	var tag_name = page.tagName.toLowerCase()
 
	var path;
	if (tag_name == "page-main")
		path = "/"
	else if (tag_name.startsWith("page-"))
		path = "/" + tag_name.substring(5);

	if (typeof onhide == "undefined")
		onhide = function(){}

	function f()
	{
		if (g_current_route == path)
			page.onshow();
	
		if (g_last_shown_route == path)
			page.onhide();
	}

	on(ROUTE_CHANGE, f);
}
