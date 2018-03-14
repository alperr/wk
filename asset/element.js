Element.prototype.find = function(str)
{
	str = '.'+str;
	return this.querySelectorAll(str)[0];
}