interface route_data_t
{
	path: string;
	container: HTMLDivElement;
	onshow?: Function;
	onhide?: Function;
}

function Router(pageData: Array<route_data_t>, onpagenotfound , container404)
{
	var self = this;
	var allContainers = [];
	var currentPageUrl;
	var currentPageUrlExact;
	for (var k in pageData)
	{
		if (typeof pageData[k]['container'] === 'undefined')
			 throw ('cannot find a container for ' + k);
		if (pageData[k]['container'])
			allContainers.push(pageData[k]['container']);
	}
	window.onpopstate = function (e)
	{
		if (e.state)
			self.open(e.state, false);
	};
	window.addEventListener('hashchange', function ()
	{
		var trimmed = window.location.pathname + window.location.hash;
		self.open(trimmed, false);
	});

	self.open = function(url, shouldAddToHistory)
	{
		if (typeof shouldAddToHistory == "undefined")
			shouldAddToHistory = true;
		
		var data = '';
		var exactUrl = url;

		if (!pageData[url])
		{
			var r = findMatchingUrl(url);
			if (!r.success)
			{
				if (onpagenotfound)
					onpagenotfound(url);
				
				hideAll();
				container404.style.display = 'block';
				return;
			}
			exactUrl = r.url;
			data = r.data;
		}
		if (shouldAddToHistory)
			window.history.pushState(url, 'Title', url);
		
		hideAll();
		container404.style.display = 'none';
		if (pageData[exactUrl]['container'])
			pageData[exactUrl]['container'].style.display = 'block';
		
		if (currentPageUrl)
		{
			if (currentPageUrl != url && pageData[currentPageUrlExact]['onunmount'])
				pageData[currentPageUrlExact]['onunmount']();
		}
	
		if (currentPageUrl != url && pageData[exactUrl]['onmount'])
			pageData[exactUrl]['onmount'](data);
	
		currentPageUrl = url;
		currentPageUrlExact = exactUrl;
		document.body.scrollTop = 0;
	}	

	function hideAll()
	{
		for (var i = 0; i < allContainers.length; i++)
			allContainers[i].style.display = 'none';
	}

	function findMatchingUrl(url)
	{
		var r =
		{
			'url': '',
			'data': '',
			'success': false
		};
		var foundUrl;
		for (var k in pageData)
		{
			if (k == '/')
				continue;
			if (url.indexOf(k) == 0)
			{
				foundUrl = k;
				r.success = true;
				break;
			}
		}
		if (!r.success)
			return r;
		
		r.url = foundUrl;
		r.data = url.substr(r.url.length);
		return r;
	}
	
	self.open(window.location.pathname + window.location.hash + window.location.search, false);	
}