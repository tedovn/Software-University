define(function() {
	function BooksController(dataPersister, headers) {
		this.persister = dataPersister;
		this.setHeaders(headers);
	
	}

	BooksController.prototype.getHeaders = function() {
		return this._headers;
	};

	BooksController.prototype.setHeaders = function(headers) {
		this._headers = headers;
	};

	BooksController.prototype.getAll = function() {
		var _this, d;
		_this = this;
		d = $.Deferred();

		this.persister.books.getAll(
			function(data) {
				d.resolve(data);

			},
			function(err) {
				console.log(err);
				d.reject();
			},
			_this.getHeaders()
		);

		return d.promise();
	};

	BooksController.prototype.getBookById = function(bookId) {
		var _this, d;
		_this = this;
		d = $.Deferred();

		this.persister.books.getBookById(bookId,
			function(data) {
				d.resolve(data);
			},
			function(err) {
				d.reject(err);
			},
			_this.getHeaders()
		);

		return d.promise();
	};

	BooksController.prototype.deleteById = function(bookId) {
		var _this, d;
		_this = this;
		d = $.Deferred();

		this.persister.books.remove(
			bookId,
			function(data) {
				d.resolve(data);
			},
			function(err) {
				d.reject(err);
			},
			_this.getHeaders()
		);

		return d.promise();
	};

	BooksController.prototype.add = function(bookData) {
		var _this, d;
		_this = this;
		d = $.Deferred();
		this.persister.books.add(
			bookData,
			function(data) {
				d.resolve(data, bookData);
			},
			function(err) {
				d.reject(err);
			},
			_this.getHeaders()
		);

		return d.promise();
	};

	BooksController.prototype.edit = function(bookId, bookData) {
		var _this, d;
		_this = this;
		d = $.Deferred();
		this.persister.books.edit(
			bookId,
			bookData,
			function(data) {
				d.resolve(data,bookData);
			},
			function(err) {
				d.reject(err);
			},
			_this.getHeaders()
		);

		return d.promise();
	};
	

	return {
		get: function(dataPersister, headers) {
			return new BooksController(dataPersister, headers);
		}
	};

}());