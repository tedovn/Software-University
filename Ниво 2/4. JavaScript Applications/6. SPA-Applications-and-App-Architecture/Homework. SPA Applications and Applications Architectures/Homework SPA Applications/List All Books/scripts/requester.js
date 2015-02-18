var ajaxRequester = (function() {

	var makeRequest = function(method, url, data, success, error, headers) {
		return $.ajax({
			url: url,
			headers: headers,
			type: method,
			contentType: 'application/json',
			data: JSON.stringify(data) || undefined,
			success: success,
			error: error
		});
	};

	var makeGetRequest = function(url, success, error, headers) {
		return makeRequest('GET', url, null, success, error, headers);
	};

	var makePostRequest = function(url, data, success, error, headers) {
		return makeRequest('POST', url, data, success, error, headers);
	};

	var makePutRequest = function(url, data, success, error, headers) {
		return makeRequest('PUT', url, data, success, error, headers);
	};

	var makeDeleteRequest = function(url, success, error, headers) {
		return makeRequest('DELETE', url, null, success, error, headers);
	};

	return {
		get: makeGetRequest,
		post: makePostRequest,
		put: makePutRequest,
		delete: makeDeleteRequest
	};
}());