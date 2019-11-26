var __i18n = {};
__i18n.selected_lang = "en";
__i18n.initialized = false;

// this function sets the application language
// language value must be one of the types written in ./src/i18n.json file
// sample ./src/i18n.json file looks like this
// {
// 	"HELLO": 
// 	{
// 		"en": "Hello",
// 		"it": "Ciao",
// 		"es": "Hola",
// 		"tr": "Merhaba"
// 	}
// }
function set_lang(lang)
{
	__i18n.selected_lang = lang;
	localStorage.setItem("lang", lang);
}

// this function is for getting correct string value for given key
// key-value pairs are defined in ./src/i18n.json file
// globally set language value is used for determining correct string value
function i18n(k)
{
	if (!__i18n.initialized)
	{
		var l = localStorage.getItem("lang");
		if (l == null) l = "en";
		else __i18n.selected_lang = l;
		__i18n.initialized = true;
	}

	var t = __i18n.data[k];
	if (typeof t == "undefined")
		throw "there is no translation for " + k;
	
	var s = t[__i18n.selected_lang];
	if (typeof s == "undefined")
		throw "there is no translation for " + k + "/" + __i18n.selected_lang;

	return s;
}

// this function is used for loading template files into HTMLElement
function load_markup(key)
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

		elems = e.querySelectorAll("[i18n-placeholder]");
		for (var i=0;i<elems.length;i++)
		{
			var k = elems[i].getAttribute("i18n-placeholder");
			elems[i].placeholder = i18n(k);
		}
	}
	return e;
}

// this function is used in components for loading markup
function load_component(root, key)
{
	var $ = {};
	$.root = root;
	$.find = function(q) { return root.querySelector(q); }
	$.root.appendChild(load_markup(key));
	return $;
}