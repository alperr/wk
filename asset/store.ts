if (typeof __wk == "undefined")
	var __wk: any = {};
__wk.store = {};
function has(key: number): boolean
{
	return typeof __wk.store[key] != 'undefined'
}
function get(key: number)
{
	return __wk.store[key];
}
function set(key: number, value)
{
	return __wk.store[key] = value;
}