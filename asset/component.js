// THIS FILE IS AUTO GENERATED , DO NOT EDIT
class Component
{
	constructor(root, markup)
	{
		this.root = root;
		this.loadMarkup(markup);
	}

	find = (query) =>
	{
		query = "." + query;
		return this.root.querySelector(query);
	}

	querySelector = (query) =>
	{
		return this.root.querySelector(query);
	}

	querySelectorAll = (query) =>
	{
		return this.root.querySelectorAll(query);
	}

	loadMarkup = (key) =>
	{
		var w = window;
		if (!w.__markup_data[key])
			throw "there is no markup for " + key;

			
		this.root.innerHTML = decodeURIComponent(atob(w.__markup_data[key]));
	}
}

function loadTemplate(key)
{
	var w = window;
	if (!w.__markup_data[key])
		throw "there is no markup for " + key;

	function htmlToElement(html)
	{
		var template = document.createElement('template');
		html = html.trim();
		template.innerHTML = html;
		return template.content.firstChild;
	}
	return htmlToElement(decodeURIComponent(atob(w.__markup_data[key])));
}