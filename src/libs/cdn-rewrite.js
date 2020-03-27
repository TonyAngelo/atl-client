export function cdnRewrite(url) {
	return 'https://cdn.' + url.substring(url.search('api.')+4)
}
