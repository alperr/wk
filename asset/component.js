// THIS FILE IS AUTO GENERATED , DO NOT EDIT
class Component
{
	constructor(root, markup)
	{
		this.root = root;
		var element = Component.load_markup(markup);
		this.root.appendChild(element);
	}

	find(query) // alias for querySelector, inspired from jQuery 
	{
		return this.querySelector(query);
	}

	querySelector(query)
	{
		return this.root.querySelector(query);
	}

	querySelectorAll(query)
	{
		return this.root.querySelectorAll(query);
	}

	static load_markup(key) // also used for template loading
	{
		var w = window;
		if (!w.__markup_data[key])
			throw "there is no markup for " + key;
	
		function html_to_element(html)
		{
			var template = document.createElement('template');
			html = html.trim();
			template.innerHTML = html;
			return template.content.firstChild;
		}
		var html = decodeURIComponent(atob(w.__markup_data[key]));
		return html_to_element(html);
	}
}