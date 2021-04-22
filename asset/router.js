var router_paths = {}
var g_current_route = "/";
var g_last_shown_route;

function navigate(path, should_add_history)
{
	if (typeof router_paths[path] == "undefined")
	{
		hide_all();
		return;
	}

	function hide_all()
	{
		for (var key in router_paths)
			router_paths[key][0].style.display = "none";		
	}

	var is_public = router_paths[path][2];

	if (!is_public)
	{
		if (typeof g_token == "undefined")
		{
			dispatch(ACCESS_VIOLATION);
			return;
		}
	}

	var title = router_paths[path][1];
	document.title = title;

	if (should_add_history)
		window.history.pushState(path, title, path);

	g_last_shown_route = g_current_route;
	g_current_route = path;
	
	hide_all();
	router_paths[path][0].style.display = "block";
	dispatch(ROUTE_CHANGE);
}

function init_router(dom)
{
	var children = dom.children;
	for (var i=0;i<children.length;i++)
	{
		var c = children[i];
		var path = c.getAttribute("path");
		var title = c.getAttribute("title");
		var is_public = c.hasAttribute("public");

		if (path == null)
			continue;
		if (title == null)
			title = "";

		router_paths[path] = [c, title, is_public];
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
		var path = "/";
		if (e.state)
			path = e.state;
			
		navigate(path, false);
	};
}

function init_page(page)
{
	var tag = page.tagName.toLowerCase();
	var path = "/" + tag.substring(5)
	var onroutechange = ()=>
	{
		if (g_last_shown_route == g_current_route)
			return;

		if (g_last_shown_route == path)
			page.onhide();

		if (g_current_route == path)
			page.onshow();
	}
	on(ROUTE_CHANGE, onroutechange);
}