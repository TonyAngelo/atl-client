export function xmlParse(s) {
	// var parser = new DOMParser;
	// var dom = parser.parseFromString(
	//     '<!doctype html><body>' + s,
	//     'text/html');
	// return = dom.body.textContent;
	var elem = document.createElement('textarea');
	elem.innerHTML = s;
	return elem.value;
}