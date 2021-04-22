class extends HTMLElement
{
	constructor(){ super(); }
	connectedCallback()
	{
		init_page(this);
	}

	onshow()
	{
		var path = "/" + this.tagName.toLowerCase().substring(5);
		console.log(path + " shown");
	}

	onhide()
	{
		var path = "/" + this.tagName.toLowerCase().substring(5);
		console.log(path + " hidden");
	}
}