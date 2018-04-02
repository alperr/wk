class Component
{
	public root: HTMLDivElement;
	constructor(root: HTMLDivElement, markup: string)
	{
		this.root = root;
	}

	public find = (query: string): Element =>
	{
		query = '.' + query;
		return this.root.querySelectorAll(query)[0];		
	}

	private loadMarkup = (key: string) =>
	{
		var w: any = window;
		if (!w.__markup_data[key])
			throw "there is no markup for " + key;

		this.root.innerHTML = atob(w.__markup_data[key]);
	}
}