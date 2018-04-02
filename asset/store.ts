if (typeof __wk == "undefined")
	var __wk: any = {};
__wk.store = {};
namespace Store
{
	export function has(key): boolean
	{
		return typeof __wk.store[key] != 'undefined'
	}
	
	export function get(key)
	{
		return __wk.store[key];
	}
	
	export function set(key,value)
	{
		return __wk.store[key] = value;
	}
}