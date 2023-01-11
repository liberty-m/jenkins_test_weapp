let numberFormat = function(value) {
	let unit = '';
	var k = 1000,
		sizes = ['', 'k', 'w', '亿', '万亿'],
		i;
	if (value < k) {
		value = value;
	} else {
		i = Math.floor(Math.log(value) / Math.log(k));
		value = ((value / Math.pow(k, i)));
		unit = sizes[i];
	}
	return value + unit;
}

export {
	numberFormat
}