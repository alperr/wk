class Component
{
	public root: HTMLElement;
	constructor(root: Element, markup: number)
	{
		this.root = <HTMLElement>root;
		this.loadMarkup(markup);
	}

	public find = (query: string): any =>
	{
		query = '.' + query;
		return this.root.querySelectorAll(query)[0];
	}

	private loadMarkup = (key: number) =>
	{
		var w: any = window;
		if (!w.__markup_data[key])
			throw "there is no markup for " + key;

		this.root.innerHTML = atob(w.__markup_data[key]);
	}
}

class Template
{
	public root: HTMLElement;
	constructor(key: number)
	{
		this.root = document.createElement("div");
		
		var w: any = window;
		if (!w.__markup_data[key])
			throw "there is no markup for " + key;

		this.root.innerHTML = atob(w.__markup_data[key]);
	}

	public find = (query: string): any =>
	{
		query = '.' + query;
		return this.root.querySelectorAll(query)[0];
	}
}