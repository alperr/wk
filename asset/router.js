var router = {};
router.paths = {};
router.current = undefined
router.previous = undefined;

router.navigate = function (path, should_add_history)
{
	if (typeof router.paths[path] == "undefined")
	{
		console.error("cant find path " + path);
		hide_all();
		return;
	}

	function hide_all()
	{
		for (var key in router.paths)
			router.paths[key][0].style.display = "none";		
	}

	
	var is_public = router.paths[path][2];

	if (!is_public)
	{
		if (typeof g_token == "undefined")
		{
			dispatch(ACCESS_VIOLATION);
			return;
		}
	}

	var title = router.paths[path][1];
	document.title = title;

	if (should_add_history)
		window.history.pushState(path, title, path);

	router.previous = router.current;
	router.current = path;
	
	hide_all();
	router.paths[path][0].style.display = "block";
	dispatch(ROUTE_CHANGE);
}

router.init = function(dom)
{
	dom = dom.children[0]
	function is_root_valid(d)
	{
		var children = d.children;
		for (var i=0;i<children.length;i++)
		{
			var c = children[i];
			var tag_name = c.tagName.toLowerCase();
			if (tag_name.startsWith("page-"))
				return true;
		}

		return false;
	}

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

		console.error(c);

		if (title == null)
			title = "";

		router.paths[path] = [c, title, is_public];
	}

	var all_links = document.querySelectorAll("a[internal]");
	for (var i=0;i<all_links.length;i++)
	{
		var a = all_links[i];
		a.onclick = function(e)
		{
			e.preventDefault();
			//console.log("qq")
			router.navigate(this.getAttribute("href"), true);
		}
	}

	router.navigate(window.location.pathname, false);

	window.onpopstate = function(e)
	{
		console.log(e);
		var path = "/";
		if (e.state)
			path = e.state;
			
		router.navigate(path, false);
	};
}

router.init_page = function(page)
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
		if (router.current == path)
			page.onshow();
	
		if (router.previous == path)
			page.onhide();
	}

	on(ROUTE_CHANGE, f);
}
