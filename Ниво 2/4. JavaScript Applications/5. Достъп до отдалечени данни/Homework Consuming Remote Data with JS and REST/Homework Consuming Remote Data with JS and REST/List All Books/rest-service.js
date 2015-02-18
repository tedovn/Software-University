(function() {
	$(document).ready(function() {
		// 'use strict';
		var PARSE_API_ID = "6K71qNhoHsQVXX9tHheDp136VtCyqnHQZyVQj29r";
		var PARSE_REST_API_KEY = "exkBQJsRuwH8oERYLgz7oYk7rHeimSUElxc1ENFu";
		var wrapper, $table, $th, $tr, $td, $title, $author, $isbn, btn, deleteBtn, $tags, $editTags, $addTag, $deleteTag;
		wrapper = $('#wrapper');
		loadPage();

		function loadPage() {
			$.ajax({
				method: 'GET',
				headers: {
					'X-Parse-Application-Id': PARSE_API_ID,
					'X-Parse-REST-API-Key': PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/classes/Book",
				success: function(data) {
					loadedPage(data);
					loadedPageSuccessfully();
					return data;
				},
				error: ajaxErrorOnLoadedPage
			});
		}

		function loadedPage(data) {
			clearInput();
			var buttonWrapper = $('#btn-wrapper').html('');
			btn = $('<button>').attr('id', "btn-add").text("Add new book").click(createBook).appendTo(buttonWrapper);
			wrapper.html('');
			if (data.results.length > 0) {
				$table = $('<table>').addClass('booksTable');
				$tr = $('<tr>');
				$author = $('<th>').text('Author');
				$title = $('<th>').text('Title');
				$isbn = $('<th>').text('ISBN');
				$tr.append($title, $author, $isbn).appendTo($table);
				for (var b in data.results) {
					var book = data.results[b];
					$tags = $('<td>');
					if (getTagsAsString(book.tags) !== undefined) {
						if (book.tags.length === 0) {
							$tags.text("no tags");
						} else {
							$tags.text(getTagsAsString(book.tags));
						}

					} else {
						$tags.text("no tags");
					}
					$editTags = $('<button>').text('edit tags').click(editTags).data('book', book);
					$deleteTag = $('<button>').text('delete tag').click(deleteTag).data('book', book);
					$addTag = $('<button>').text('add tag').click(addTag).data('book', book);
					$tags.append($addTag, $editTags, $deleteTag);
					$td = $('<td>');
					$tr = $('<tr>');
					deleteBtn = $('<button>').text("Delete Book").data('book', book).click(deleteBook).appendTo($td);
					$title = $('<td>').data('book', book).click(editBook).text(book.title);
					$author = $('<td>').text(book.author);
					$isbn = $('<td>');
					if (book.isbn !== undefined && book.isbn != '0') {
						$isbn.text(book.isbn);
					} else {
						$isbn.text('No isbn for this book');
					}
					$tr.append($title, $author, $isbn, $td, $tags).appendTo($table);
				}

				$table.appendTo(wrapper);
			} else {
				$('<p>').text("Not available books").appendTo(wrapper);
			}
		}

		function createBook() {
			var bookTitle = $('#bookTitle').val();
			var bookAuthor = $('#bookAuthor').val();
			var bookIsbn = $('#bookIsbn').val() || undefined;
			try {
				checkBookArguments(bookTitle, bookAuthor, bookIsbn);
				$.ajax({
					method: "POST",
					headers: {
						'X-Parse-Application-Id': PARSE_API_ID,
						'X-Parse-REST-API-Key': PARSE_REST_API_KEY
					},
					data: JSON.stringify({
						'title': bookTitle,
						'author': bookAuthor,
						'isbn': bookIsbn
					}),
					contentType: "application/json",
					url: "https://api.parse.com/1/classes/Book",
					success: function(data) {
						createBookSuccessfully(data);
						loadPage();
						return data;
					},
					error: ajaxErrorOnCreateBook

				});
			} catch (err) {
				error(err);
			}
		}

		function editBook() {
			var currentBook = $(this).data('book');
			var buttonWrapper = $('#btn-wrapper');
			buttonWrapper.html('');
			btn = $('<button>').attr('id', "btn-edit").text("Edit book").click(function() {
				updateBook(currentBook);
			}).appendTo(buttonWrapper);
			var bookTitle = $('#bookTitle').val(currentBook.title);
			var bookAuthor = $('#bookAuthor').val(currentBook.author);
			var bookIsbn = $('#bookIsbn').val(currentBook.isbn);
		}

		function updateBook(currentBook) {
			try {
				var bookTitle = $('#bookTitle').val();
				var bookAuthor = $('#bookAuthor').val();
				var bookIsbn = $('#bookIsbn').val();
				if (bookIsbn === '') {
					bookIsbn = '0';
				}
				checkBookArguments(bookTitle, bookAuthor, bookIsbn);
				$.ajax({
					method: "PUT",
					headers: {
						'X-Parse-Application-Id': PARSE_API_ID,
						'X-Parse-REST-API-Key': PARSE_REST_API_KEY
					},
					data: JSON.stringify({
						'title': bookTitle,
						'author': bookAuthor,
						'isbn': bookIsbn
					}),
					contentType: "application/json",
					url: "https://api.parse.com/1/classes/Book/" + currentBook.objectId,
					success: function(data) {
						updateBookSuccessfully(data);
						loadPage();
						return data;
					},
					error: ajaxErrorOnUpdateBook
				});
			} catch (err) {
				console.log(err.stack);
			}
		}

		function deleteBook() {
			var currentBook = $(this).data('book');
			$.ajax({
				method: 'DELETE',
				headers: {
					'X-Parse-Application-Id': PARSE_API_ID,
					'X-Parse-REST-API-Key': PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/classes/Book/" + currentBook.objectId,
				success: function(data) {
					deleteBookSuccessfully(data);
					loadPage();
					return data;
				},
				error: ajaxErrorOnDeleteBook
			});
		}

		function editTags() {
			var bookId = $(this).data('book').objectId;
			var tags = $(this).data('book').tags;
			if (tags !== undefined && tags.length > 0) {
				loadTagsEditor(tags);
				var btnSubmit = $('#submiteTag');
				btnSubmit.click(function() {
					var selectected = $('#selectTag option:selected').text();
					var div = $('#tags');
					var tagsWrapper = $('#tags-wrapper');
					var input = $('<input>').prop('type', 'text').attr('id', 'inputTag').val(selectected);
					var button = $('<button>').click(function() {
						if (input.val() !== '' && typeof input.val() === 'string') {
							var editedTag = input.val();
							if (input.val() !== selectected) {
								if (isInArray(tags, input.val())) {
									warrning("This tag is arealdy in tags");
								} else {
									tags = replaceValue(tags, selectected, editedTag);
									editTagToBook(bookId, tags);
								}

							} else {
								success("nothing change");
								loadPage();

							}

						} else {
							error("Tag cannot be empty string or undefined");
						}
					}).text("edit tag");
					tagsWrapper.append(input, button);
				});
			} else {
				warrning("No tags for change(empty)");
			}

		}

		function deleteTag() {
			var bookId = $(this).data('book').objectId;
			var tags = $(this).data('book').tags;
			if (tags !== undefined && tags.length > 0) {
				loadTagsEditor(tags);
				var btnSubmit = $('#submiteTag');
				var selectected = $('#selectTag option:selected').text();
				btnSubmit.click(function() {
					var tagsWrapper = $('#tags-wrapper');
					var input = $('<input>').prop('type', 'text').attr('id', 'inputTag').val(selectected);
					var button = $('<button>').click(function() {
						var delTag = input.val();
						tags = deleteValue(tags, selectected);
						deletetTagToBook(bookId, tags);
					}).text("delete tag");
					tagsWrapper.append(input, button);
				});
			} else {
				warrning("No tags for delete(empty)");
			}

		}

		function addTag() {
			var bookId = $(this).data('book').objectId;
			var tags = $(this).data('book').tags;
			var tagsWrapper = $('#tags-wrapper');
			if (tags === undefined) {
				tags = [];
			}
			var input = $('<input>').prop('type', 'text').attr('id', 'inputTag');
			var button = $('<button>').click(function() {
				if (input.val() !== '' && typeof input.val() === 'string') {
					if (!isInArray(tags, input.val())) {
						tags.push(input.val());
						addTagToBook(bookId, tags);
					} else {
						warrning("This tag is already declared");
					}

				} else {
					error("Tag cannot be empty string or undefined");
				}
			}).text("add tag");

			tagsWrapper.append(input, button);
		}

		function addTagToBook(bookId, tags) {

			$.ajax({
				method: 'PUT',
				headers: {
					'X-Parse-Application-Id': PARSE_API_ID,
					'X-Parse-REST-API-Key': PARSE_REST_API_KEY
				},
				data: JSON.stringify({
					'tags': tags
				}),
				contentType: "application/json",
				url: "https://api.parse.com/1/classes/Book/" + bookId,
				success: function(data) {
					addtagSuccessfully(data);
					loadPage();
					return data;
				},
				error: ajaxErrorOnAddTag
			});


		}

		function editTagToBook(bookId, tags) {
			$.ajax({
				method: 'PUT',
				headers: {
					'X-Parse-Application-Id': PARSE_API_ID,
					'X-Parse-REST-API-Key': PARSE_REST_API_KEY
				},
				data: JSON.stringify({
					'tags': tags
				}),
				contentType: "application/json",
				url: "https://api.parse.com/1/classes/Book/" + bookId,
				success: function(data) {
					editTagSuccessfully(data);
					loadPage();
					return data;
				},
				error: ajaxErrorOnEditTag
			});
		}

		function deletetTagToBook(bookId, tags) {
			if (tags.length === 0) {
				tags = [];
			}
			$.ajax({
				method: 'PUT',
				headers: {
					'X-Parse-Application-Id': PARSE_API_ID,
					'X-Parse-REST-API-Key': PARSE_REST_API_KEY
				},
				data: JSON.stringify({
					'tags': tags
				}),
				contentType: "application/json",
				url: "https://api.parse.com/1/classes/Book/" + bookId,
				success: function(data) {
					deleteTagSuccessfully(data);
					loadPage();
					return data;
				},
				error: ajaxErrorOnDeleteTag
			});
		}

		function updateBookSuccessfully() {
			success('update book successfully');
		}

		function createBookSuccessfully() {
			success("create book successfully");
		}

		function loadedPageSuccessfully() {

		}

		function deleteBookSuccessfully() {
			success('delete book successfully');
		}

		function addtagSuccessfully() {
			success('added tag successfully');
		}

		function editTagSuccessfully() {
			success('edit tag successfully');
		}

		function deleteTagSuccessfully() {
			success('delete tag successfully');
		}

		function ajaxErrorOnLoadedPage(e) {
			error(e);
		}

		function ajaxErrorOnCreateBook(e) {
			error(e);
		}

		function ajaxErrorOnUpdateBook(e) {
			error(e);
		}

		function ajaxErrorOnDeleteBook(e) {
			error(e);
		}

		function ajaxErrorOnAddTag(e) {
			error(e);
		}

		function ajaxErrorOnEditTag(e) {
			error(e);
		}

		function ajaxErrorOnDeleteTag(e) {
			error(e);
		}

		function checkBookArguments(bookTitle, bookAuthor, bookIsbn) {

			if (bookTitle === undefined || bookTitle === '') {
				throw new Error('Book title cannot be undefined or empty string');
			}
			if (typeof bookTitle !== 'string') {
				throw new Error('Book title shoud be of type string');
			}
			if (bookAuthor === undefined || bookAuthor === '') {
				throw new Error('Book author cannot be undefined or empty string');
			}
			if (typeof bookAuthor !== 'string') {
				throw new Error('Book author shoud be of type string');
			}
			if (bookIsbn !== undefined) {
				var isbn = bookIsbn.replace(/[- ]/g, "");
				for (var i = 0; i < isbn.length; i++) {
					var number = parseInt(isbn[i], 10);
					if (!isInt(number)) {
						throw new Error('Isbn can hold only numbers, spaces and dashes');
					}
				}
			}
		}

		function isInt(n) {
			return Number(n) === n && n % 1 === 0;
		}

		function clearInput() {
			$('#bookTitle').val('');
			$('#bookAuthor').val('');
			$('#bookIsbn').val('');
			$('#tags-wrapper').html('');
		}

		function getTagsAsString(tags) {
			if (tags !== undefined) {
				return tags.toString();
			}
			return undefined;

		}

		function setTagAsArray(tagsAsString) {
			return tagsAsString.split(',');
		}

		function loadTagsEditor(tags) {
			var tagsWrapper = $('#tags-wrapper').html('');
			var select = $('<select>').attr('id', 'selectTag');
			var div = $('<div>').attr('id', 'tags').append(select);
			var button = $('<button>').attr('id', 'submiteTag').text("submit");
			for (var i = 0; i < tags.length; i++) {
				var option = $('<option>').text(tags[i]);
				option.appendTo(select);
			}
			tagsWrapper.append(div, button);
		}

		function isInArray(array, search) {
			return array.indexOf(search) >= 0;

		}

		function replaceValue(array, oldValue, newValue) {
			var result = [];
			if (!isInArray(array, newValue)) {
				for (var i = 0; i < array.length; i++) {
					if (array[i] === oldValue) {
						result[i] = newValue;
					} else {
						result[i] = array[i];
					}
				}
				return result;
			} else {

				return array;
			}

		}

		function deleteValue(array, value) {
			var result = [];
			for (var i = 0; i < array.length; i++) {
				if (array[i] !== value) {
					result[i] = array[i];
				}
			}
			return result;
		}

		function success(msg) {
			var $box = $('<div class="box"></div>').text(msg).addClass('success');
			$('#message-box').append($box);
			$box.animate({
				opacity: 1
			}, 1000);
			hideBox($box);
		}

		function warrning(msg) {
			var $box = $('<div class="box"></div>').text(msg).addClass('warrning');
			$('#message-box').append($box);
			$box.animate({
				opacity: 1
			}, 1000);
			hideBox($box);
		}

		function error(msg) {
			var $box = $('<div class="box"></div>').text(msg).addClass('error');
			$('#message-box').append($box);
			$box.animate({
				opacity: 1
			}, 1000);
			hideBox($box);
		}

		function hideBox(box) {
			setTimeout(
				function() {
					box.remove();
				}, 3000);
		}

	});
}());