var __i18n = {};
__i18n.selected_lang = "en";

function set_application_language(lang)
{
	__i18n.selected_lang = lang;
}

function i18n(k)
{
	var t = __i18n.data[k];
	if (typeof t == "undefined")
		throw "there is no translation for " + k;
	
	var s = t[__i18n.selected_lang];
	if (typeof s == "undefined")
		throw "there is no translation for " + k + "/" + __i18n.selected_lang;

	return s;
}

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
	var e = html_to_element(html);

	if (typeof __i18n.data != "undefined")
	{
		var elems = e.querySelectorAll("[i18n]");
		for (var i=0;i<elems.length;i++)
		{
			var k = elems[i].getAttribute("i18n");
			elems[i].innerHTML = i18n(k);
		}
	}
	return e;
}

function load_component(root, key)
{
	var $ = {};
	$.root = root;
	$.find = function(q) { return root.querySelector(q); }
	$.root.appendChild(load_markup(key));
	return $;
}