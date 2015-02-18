(function() {
	require.config({
		paths: {
			"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"

		}
	});

	require(["jquery", 'data-persister', 'controller'], function($, persister, cont) {

		var PARSE_API_ID = "VaJzGS4KMVfva5EUgFp85DI5dkJ0NBFzTsADgeC2";
		var PARSE_REST_API_KEY = "DIP0lSsPRh9Y4VyTQkXvPHoWPaXnWqTolDZfiELd";
		var headers = {
			'X-Parse-Application-Id': PARSE_API_ID,
			'X-Parse-REST-API-Key': PARSE_REST_API_KEY
		};
		var serviceRootUrl = 'https://api.parse.com/1/classes/';
		var p = persister.get(serviceRootUrl);
		var booksController = cont.get(p, headers);

		booksController.getAll()
			.then(function(data) {
				var parentEl = $('#books-area'),
					d = $.Deferred();
				var $table = $('<table>').addClass('booksTable');
				$table.appendTo($('#wrapper'));
				var $tr = $('<tr>');
				var $author = $('<th>').text('Author');
				var $title = $('<th>').text('Title');
				var $isbn = $('<th>').text('ISBN');
				$tr.append($title, $author, $isbn).appendTo($table);
				$.each(data.results, function(index, book) {
					attachBookToDom(book, parentEl);
				});
				var button = $('button').on('click', addEventHeandler);
				d.resolve(data);
				return d.promise();
			});

		function attachBookToDom(book, parentEl) {
			var $table = $('.booksTable');
			var $tags = $('<td>');
			if (getTagsAsString(book.tags) !== undefined) {
				if (book.tags.length === 0) {
					$tags.text("no tags");
				} else {
					$tags.text(getTagsAsString(book.tags));
				}

			} else {
				$tags.text("no tags");
			}
			var $editTags = $('<button>').text('edit tags').addClass('edit-tag');
			var $deleteTag = $('<button>').text('delete tag').addClass('delete-tag');
			var $addTag = $('<button>').text('add tag').addClass('add-tag');
			var $buttonTd = $('<td>');
			$buttonTd.append($addTag, $editTags, $deleteTag);
			var $td = $('<td>');
			var $tr = $('<tr>').attr('data-objectId', book.objectId);
			var deleteBtn = $('<button>').text("Delete Book").addClass('delete-btn').appendTo($td);
			var editBtn = $('<button>').text("Edit Book").addClass('edit-btn').appendTo($td);
			var $title = $('<td>').text(book.title);
			var $author = $('<td>').text(book.author);
			var $isbn = $('<td>');
			if (book.isbn !== undefined && book.isbn != '0') {
				$isbn.text(book.isbn);
			} else {
				$isbn.text('No isbn for this book');
			}
			$tr.append($title, $author, $isbn, $td, $tags, $buttonTd).appendTo($table);
		}

		function removeBookFromDom(id) {
			var removeBook = $('[data-objectId=' + id + ']');
			removeBook.remove();
		}

		function editBook(id, bookData) {
			var book = $('[data-objectId=' + id + ']').children();

			$(book[0]).text(bookData.title);
			$(book[1]).text(bookData.author);
			$(book[2]).text(bookData.isbn);
			$(book[4]).text(bookData.tags);

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


		function addEventHeandler() {
			var id, tagsField, btn, input;
			var button = $(this);
			var bookTitle = $('#bookTitle').val();
			var bookAuthor = $('#bookAuthor').val();
			var bookIsbn = $('#bookIsbn').val() || undefined;
			var bookData = {
				'title': bookTitle,
				'author': bookAuthor,
				'isbn': bookIsbn
			};
			switch (button.attr('class')) {
				case 'add-book':
					booksController.add(bookData)
						.then(function(data, bookData) {
							attachBookToDom(bookData, $('#wrapper'));
						}).done();
					break;
				case 'delete-btn':
					id = button.parent().parent().attr('data-objectId');
					booksController.deleteById(id)
						.then(function(data) {
							removeBookFromDom(id);
						}).done();
					break;
				case 'edit-btn':
					id = button.parent().parent().attr('data-objectId');
					booksController.getBookById(id)
						.then(function(data) {
							bookTitle = $('#bookTitle').val(data.title);
							bookAuthor = $('#bookAuthor').val(data.author);
							bookIsbn = $('#bookIsbn').val(data.isbn);

						}, function(err) {
							error('Cannot find book with that id');
						}).then(function(data) {
								$('#btn-wrapper').append($('<button>').text('save').attr('id', 'save-btn'));
								$('.add-book').hide();
								$('#save-btn').on('click', function() {
									bookTitle = $('#bookTitle').val();
									bookAuthor = $('#bookAuthor').val();
									bookIsbn = $('#bookIsbn').val();
									bookData = {
										'title': bookTitle,
										'author': bookAuthor,
										'isbn': bookIsbn
									};
									booksController.edit(id, bookData)
										.then(function(data, bookData) {
												editBook(id, bookData);
												$('#save-btn').remove();
												bookTitle = $('#bookTitle').val('');
												bookAuthor = $('#bookAuthor').val('');
												bookIsbn = $('#bookIsbn').val('');
												$('.add-book').show();
												success('edit book');
											},
											function(err) {
												error("Cant edit this book");
											}
										);
								});
							},
							function(err) {
								error(err);
							}
						);
					break;
				case 'add-tag':
					tagsField = $('#tags-filed');
					if (tagsField !== undefined) {
						tagsField.remove();
					}
					id = button.parent().parent().attr('data-objectId');
					tagsField = $('<td>').attr('id', 'tags-filed');
					input = $('<input>').prop('type', 'text').appendTo(tagsField);
					btn = $('<button>').text('save').appendTo(tagsField);
					booksController.getBookById(id)
						.then(function(data) {
								var tags = data.tags;
								if (tags === undefined) {
									tags = [];
								}
								btn.on('click', function() {
									tags.push(input.val());
									bookData = {
										'title': data.title,
										'author': data.auhtor,
										'isbn': data.isbn,
										'tags': tags
									};
									booksController.edit(id, bookData)
										.then(function(data, bookData) {
												editBook(id, bookData);
												tagsField.remove();
											},
											function(err) {
												error('Cannot edin this book');
											}
										);
								});
							},
							function(err) {
								error("Cannot find book with this id");
							}
						);

					tagsField.appendTo($(this).parent().parent());
					break;
				case 'delete-tag':
					tagsField = $('#tags-filed');
					if (tagsField !== undefined) {
						tagsField.remove();
					}
					id = button.parent().parent().attr('data-objectId');
					tagsField = $('<td>').attr('id', 'tags-filed');
					btn = $('<button>').text('delete').appendTo(tagsField);
					id = button.parent().parent().attr('data-objectId');
					tagSelector = $('<select>').attr('id', 'selector').appendTo(tagsField);
					booksController.getBookById(id)
						.then(function(data) {
								var tags = data.tags;
								var count = 0;
								$.each(tags, function(_, tag) {
									var option = $('<option>').text(tag).attr('data-tag', count).appendTo(tagSelector);
									count++;
								});
								btn.on('click', function() {
									var selectedTag = $('#selector option:selected').attr('data-tag');
									tags.splice(selectedTag, 1);
									bookData = {
										'title': data.title,
										'author': data.auhtor,
										'isbn': data.isbn,
										'tags': tags
									};
									booksController.edit(id, bookData)
										.then(function(data, bookData) {
												editBook(id, bookData);
												tagsField.remove();
											},
											function(err) {
												error("Cannot delete this tag");
											}
										);

								});
							}, function(err) {
								error("Cannot find book with this Id");
							}

						);
					tagsField.appendTo($(this).parent().parent());
					break;
				case 'edit-tag':
					tagsField = $('#tags-filed');
					if (tagsField !== undefined) {
						tagsField.remove();
					}
					id = button.parent().parent().attr('data-objectId');
					tagsField = $('<td>').attr('id', 'tags-filed');
					btn = $('<button>').text('edit').appendTo(tagsField);
					id = button.parent().parent().attr('data-objectId');
					tagSelector = $('<select>').attr('id', 'selector').appendTo(tagsField);
					input = $('<input>').prop('type', 'text').appendTo(tagsField);
					booksController.getBookById(id)
						.then(function(data) {
								var tags = data.tags;
								var count = 0;
								$.each(tags, function(_, tag) {
									var option = $('<option>').text(tag).attr('data-tag', count).appendTo(tagSelector);
									if (input.val() === '') {
										input.val(tag);
									}
									count++;
								});

								tagSelector.on('change', function() {
									input.val($('#selector option:selected').text());
								});
								btn.on('click', function() {
									var selectedTag = $('#selector option:selected').attr('data-tag');
									tags[selectedTag] = input.val();
									bookData = {
										'title': data.title,
										'author': data.auhtor,
										'isbn': data.isbn,
										'tags': tags
									};
									booksController.edit(id, bookData)
										.then(function(data, bookData) {
												editBook(id, bookData);
												tagsField.remove();
											},
											function(err) {
												error("Cannot edit this tag");
											}
										);

								});
							},
							function(err) {
								error("Cant find book with this ID");
							}
						);
					tagsField.appendTo($(this).parent().parent());
					break;
				default:
					break;
			}
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