(function () {
	$(document).ready(function() {
		var PARSE_APP_ID = "VaJzGS4KMVfva5EUgFp85DI5dkJ0NBFzTsADgeC2";
		var PARSE_API_KEY = "DIP0lSsPRh9Y4VyTQkXvPHoWPaXnWqTolDZfiELd";
		var ul, li, contain, create, update, remove, input;
		loadListBooks();

		function loadListBooks() {
			loadBookFields();
			$.ajax({
				method: 'GET',
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: "https://api.parse.com/1/classes/Book",
				success: listAllBooks,
				Error: ajaxError
			});
		}

		function listAllBooks(data) {
			
			for (var c in data.results) {
				li = $('<li>');
				var book = data.results[c];	
				var bookName = li.text(book.title);
				update = $('<button>').addClass('update').text('UPDATE');
				remove = $('<button>').addClass('remove').text('REMOVE');
				update.data('book', book);
				remove.data('book', book);
				bookName.data('book', book);
				remove.click(removeBook);
				update.click(updateBook);
				li.append(update, remove);
				li.appendTo(ul);
				ul.appendTo(contain);
			}
			create = $('<button>').addClass('create').text('CREATE BOOK');
			contain.append(input, create);
			create.click(createBook);
			
		}

		function removeBook() {
			var book = $(this).data('book');

			$.ajax({
				method: 'DELETE',
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: "https://api.parse.com/1/classes/Book/" + book.objectId,
				success: deletedSuccessfully,
				error: ajaxError
			})
		}


		function updateBook() {
			var book = $(this).data(book);

			$.ajax({
					method: "POST",
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
						"X-Parse-REST-API-Key": PARSE_API_KEY
					},
					url: "https://api.parse.com/1/classes/Book/",
					data: JSON.stringify({
						"name": townName,
						"country": {
							"__type": "Pointer",
							"className": "Country",
							"objectId": country.objectId
						}
					}),
					contentType: "application/json",
					success: function(data) {
						addTownSuccessfully();
						reloadTown(country);
					},
					error: ajaxError
				});
		}

		function createBook() {
			$("#inputDiv").remove();
			var div = $("<div>").attr('id', 'inputDiv');
			var input = $("<input>")
							.prop("type", "text")
							.attr("id", "textInput")
							.attr('placeholder' , 'Enter book title');
			var inputAuthor = $('<input>')
								.prop('type', 'text')
								.attr('id', 'authorName')
								.attr('placeholder' , 'Author');
			var inputIsbn = $('<input>')
								.prop('type', 'text')
								.attr('id', 'isbn')
								.attr('placeholder', 'isbn');
			var button = $("<button>").text('ADD').appendTo("#input");
			input.appendTo(div);
			inputAuthor.appendTo(div);
			inputIsbn.appendTo(div);
			button.appendTo(div);
			div.appendTo($('#input'));
			button.click(function() {
				var editedName = input.val();
				var authorName = inputAuthor.val();
				var isbn = inputIsbn.val();
				div.remove();
				$.ajax({
					method: "POST",
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
						"X-Parse-REST-API-Key": PARSE_API_KEY
					},
					url: "https://api.parse.com/1/classes/Book",
					data: JSON.stringify({
						"title": editedName,
						"author": authorName,
						"isbn" : isbn
					}),
					contentType: "application/json",
					success: addSuccessfully,
					error: ajaxError
				});
			});

		}

		function addSuccessfully() {
			loadListBooks();
			success("Successfully added country");
		}

		function deletedSuccessfully() {
			loadListBooks();
			success("Successfully deleted book!");
		}

		function loadBookFields() {
			$('#contain').html("");
			contain = $('#contain');
			ul = $('<ul>').text("Books:");	
		

		function ajaxError(e) {
			var err = e.responseJSON['error'];
			if (err === "object not found for delete") {
				error("no rights to delete this country");
			} else if (err === "object not found for update") {
				error("no rights to edit this country");
			} else {
				error("Error message.");
			}
		}
	});
}());