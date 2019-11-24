		var opts =
		{
			"env":
			{
				"__memory_base" : 0,
				'memory': new WebAssembly.Memory({initial: 512}),
			} 
		}
		WebAssembly.instantiateStreaming(fetch('app.wasm'), opts).then(onwasmload);
		function onwasmload(obj)
		{ 
			window.wasm = {};
			wasm = obj.instance.exports;
		}
		new app(document.body);