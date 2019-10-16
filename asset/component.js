function load_markup(key) // also used for template loading
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

function load_component(root, key)
{
	var $ = {};
	$.root = root;
	$.find = function(q) { return root.querySelector(q); }
	$.root.appendChild(load_markup(key));
	return $;
}