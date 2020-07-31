var router_paths = {}
var router_next_onhide_function = function(){}
function navigate(path, should_add_history)
{
	if (typeof router_paths[path] == "undefined")
		return;
	
	var [container, title, onshow, onhide] = router_paths[path];
	document.title = title;

	if (should_add_history)
		window.history.pushState(path, title, path);

	for (var key in router_paths)
		router_paths[key][0].style.display = "none";

	container.style.display = "block";
	router_next_onhide_function();
	router_next_onhide_function = onhide;
	onshow();
}

function init_router(dom)
{
	var children = dom.children;
	for (var i=0;i<children.length;i++)
	{
		var c = children[i];
		var path = c.getAttribute("path");
		var title = c.getAttribute("title");
		var onshow = c.onshow;
		var onhide = c.onhide;
		if (path == null)
			continue;
		if (title == null)
			title = "";
		if (typeof onshow == "undefined")
			onshow = function(){};
		if (typeof onhide == "undefined")
			onhide = function(){};
		router_paths[path] = [c, title, onshow, onhide];
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
