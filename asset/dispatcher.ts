if (typeof __wk == "undefined")
	var __wk: any = {};

__wk.events = {};

function sub(action: number, f)
{
	if (typeof __wk.events[action] == 'undefined')
		__wk.events[action] = [];

	__wk.events[action].push(f);
}

function unsub(action: number, f)
{
	if (typeof __wk.events[action] == 'undefined')
		return;

	for (var i=0;i<__wk.events[action].length;i++)
	{
		if (__wk.events[action][i] == f)
		{
			__wk.events[action].splice(i,1);
			i--;
		}
	}
}

function pub(action: number)
{
	if ( (action | 0) != action)
		throw('bad action');

	if (typeof __wk.events[action] == 'undefined')
		return;

	for (var i=0;i<__wk.events[action].length;i++)
		__wk.events[action][i]();
}

var sig = function(action: number)
{
	return function(){ pub(action) }
}