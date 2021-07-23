function node_finder(root)
{
	var $ = function(q)
	{ 
		var dom = root.querySelector(q);
		dom.hide = function()
		{
			dom.classList.add("d-none");
		}
		dom.show = function()
		{
			dom.classList.remove("d-none");
		}

		dom.toggle = function(state, a, b)
		{
			if(typeof b == "undefined") b = "";

			if (state)
			{
				if (a != "") dom.classList.add(a);
				if (b != "") dom.classList.remove(b);
			}
			else
			{
				if (a != "") dom.classList.remove(a);
				if (b != "") dom.classList.add(b);
			}
		}
		return dom;
	}
	return $;
}
