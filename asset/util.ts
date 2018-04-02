var util: any = {};
util.randomAlphaNum = function(length)
{
	// 62 chars 
	// Math.log2(62) = 5.954 bit entropy per character
	// length = 22 will give you a ~128 bit randomness
	var alphabet = '0123456789abcdefghijklmnoprqstuwvxyzABCDEFGHIJKLMNOPQRSTUWVXYZ'
	var r = '';
	for (var i=0;i<length;i++)
		r += alphabet[Math.floor(Math.random() * alphabet.length)];
	
	return r;
}
