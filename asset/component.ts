class Component
{
	public root: HTMLElement;
	constructor(root: Element, markup: number)
	{
		this.root = <HTMLElement>root;
		this.loadMarkup(markup);
	}

	public querySelector = (query: string): Element =>
	{
		return this.root.querySelector(query);
	}

	public querySelectorAll = (query: string): NodeList =>
	{
		return this.root.querySelectorAll(query);
	}

	private loadMarkup = (key: number) =>
	{
		var w: any = window;
		if (!w.__markup_data[key])
			throw "there is no markup for " + key;

		this.root.innerHTML = atob(w.__markup_data[key]);
	}
}

function loadTemplate(key: number): Element
{
	var root = document.createElement("div");
	var w: any = window;
	if (!w.__markup_data[key])
		throw "there is no markup for " + key;

	this.root.innerHTML = atob(w.__markup_data[key]);
	return root;
}