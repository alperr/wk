var store: any = {};
store._ = {};

store.has = function(key)
{
	return typeof store._[key] != 'undefined'
}

store.get = function(key)
{
	return store._[key];
}

store.set = function(key,value)
{
	return store._[key] = value;
}
