	var opts =
	{
		"env":
		{
			"__memory_base" : 0,
			'memory': new WebAssembly.Memory({initial: 256}),
		} 
	}
	WebAssembly.instantiateStreaming(fetch('app.wasm'), opts).then(onwasmload);
	function onwasmload(obj)
	{ 
		window.obj = obj; 
		window.wasm = {};
		wasm = obj.instance.exports;
		console.log(wasm.add(12,12));
	}
	new app(document.body);