const ROUTE_CHANGE = 0;
const ACCESS_VIOLATION = 1;

function on(event, fn)
{
	document.addEventListener(event, fn);
}

function off(event, fn)
{
	document.removeEventListener(event, fn);
}

function dispatch(event)
{
	document.dispatchEvent(new Event(event));
}
