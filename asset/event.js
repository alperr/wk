const SAMPLE_EVENT = 0;
const ANOTHER_EVENT = 1;

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
