(function() {
	$(document).ready(function() {
		var PARSE_APP_ID = "jpXZ033iNjahUaWDG1zRkV2xu7wQuydfzHgubHR9";
		var PARSE_API_KEY = "7vvosGtpjlZ1oI6sVi3tAX747TTBsXYGMWBvwmcl";
		var $tr, $td, $div, $delete, $edit, $add;
		loadCountry();

		function loadCountry() {
			loadTableFields();
			$.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: "https://api.parse.com/1/classes/Country",
				success: countryLoaded,
				Error: ajaxError
			});
		}

		function countryLoaded(data) {

			for (var c in data.results) {
				var country = data.results[c];
				$tr = $('<tr>');
				$td = $('<td>');
				$div = $("<div>");
				var countryName = $div.text(country.name).appendTo($td);
				$td.appendTo($tr);
				$tr.appendTo($('#country'));
				$delete = $('<button>').addClass("delete").text("DEL");
				$edit = $('<button>').addClass("edit").text("EDIT");
				$delete.data('country', country);
				$edit.data('country', country);
				countryName.data('country', country);
				countryName.click(showTown);
				$delete.click(deleteCountry);
				$edit.click(editCountry);
				$td.append($delete, $edit);
			}

			$add = $('<button>').addClass("add").text("ADD Country");
			$("<tr>").append($("<td>").append($add)).appendTo("#country");
			$add.click(addCountry);
		}

		function deleteCountry() {
			var country = $(this).data('country');
			$.ajax({
				method: "DELETE",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: "https://api.parse.com/1/classes/Country/" + country.objectId,
				success: deletedSuccessfully,
				error: ajaxError
			});
		}

		function editCountry() {
			$("#inputDiv").remove();
			var country = $(this).data("country");
			var editedName;
			var div = $("<div>").attr('id', 'inputDiv');
			var input = $("<input>").prop("type", "text").attr("id", "textInput").val(country.name);
			var button = $("<button>").text('Save').appendTo("#input");
			input.appendTo(div);
			button.appendTo(div);
			div.appendTo($('#input'));
			button.click(function() {
				var editedName = input.val();
				div.remove();
				$.ajax({
					method: "PUT",
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
						"X-Parse-REST-API-Key": PARSE_API_KEY
					},
					url: "https://api.parse.com/1/classes/Country/" + country.objectId,
					data: JSON.stringify({
						"name": editedName
					}),
					contentType: "application/json",
					success: editSuccessfully,
					error: ajaxError
				});
			});
		}

		function addCountry() {
			$("#inputDiv").remove();
			var div = $("<div>").attr('id', 'inputDiv');
			var input = $("<input>").prop("type", "text").attr("id", "textInput");
			var button = $("<button>").text('ADD').appendTo("#input");
			input.appendTo(div);
			button.appendTo(div);
			div.appendTo($('#input'));
			button.click(function() {
				var editedName = input.val();
				div.remove();
				$.ajax({
					method: "POST",
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
						"X-Parse-REST-API-Key": PARSE_API_KEY
					},
					url: "https://api.parse.com/1/classes/Country/",
					data: JSON.stringify({
						"name": editedName
					}),
					contentType: "application/json",
					success: addSuccessfully,
					error: ajaxError
				});
			});

		}

		function showTown() {
			$("#inputDiv").remove();
			var country = $(this).data('country');
			var town = $("#town").find("th");
			if (town.length > 0) {
				town.text(country.name);
			} else {
				$th = $('<th>');
				$tr = $('<tr>');
				$th.appendTo($tr);
				$tr.appendTo('#town');
				$th.text(country.name);
			}

			var countryId = country.objectId;
			$.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}',
				success: function(data) {
					townLoaded(country, data);
					return data;
				},
				Error: ajaxError
			});
		}

		function townLoaded(country, data) {

			$("#town").find("tr:has(td)").remove();
			if (data.results.length <= 0) {
				$tr = $('<tr>');
				$td = $('<td>').text("No towns");
				$td.appendTo($tr.appendTo("#town"));
			} else {

				for (var t in data.results) {
					var town = data.results[t];
					$tr = $('<tr>');
					$td = $('<td>');
					$div = $("<div>");
					var townName = $div.text(town.name).appendTo($td);
					$td.appendTo($tr);
					$tr.appendTo($('#town'));
					$delete = $('<button>').addClass("delete").text("DEL");
					$edit = $('<button>').addClass("edit").text("EDIT");
					$delete.data('town', town);
					$delete.data('country', country);
					$edit.data('town', town);
					$edit.data('country', country);
					townName.data('town', town);
					townName.click(showTown);
					$delete.click(deleteTown);
					$edit.click(editTown);
					$td.append($delete, $edit);
				}
			}



			$add = $('<button>').addClass("add").text("ADD Town");
			$("<tr>").append($("<td>").append($add)).appendTo("#town");
			$	add.click(function() {
				return addTown(country);
			});

		}

		function addTown(country) {
			$("#inputDiv").remove();
			var div = $("<div>").attr('id', 'inputDiv');
			var input = $("<input>").prop("type", "text").attr("id", "textInput");
			var button = $("<button>").text('ADD').appendTo("#input");
			input.appendTo(div);
			button.appendTo(div);
			div.appendTo($('#input'));
			button.click(function() {
				var townName = input.val();
				div.remove();
				$.ajax({
					method: "POST",
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
						"X-Parse-REST-API-Key": PARSE_API_KEY
					},
					url: "https://api.parse.com/1/classes/Town/",
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
			});
		}

		function reloadTown(country) {

			$.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + country.objectId + '"}}',
				success: function(data) {
					townLoaded(country, data);
					return data;
				},
				Error: ajaxError
			});
		}

		function deleteTown() {
			var town = $(this).data('town');
			var country = $(this).data('country');
			$.ajax({
				method: "DELETE",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_API_KEY
				},
				url: "https://api.parse.com/1/classes/Town/" + town.objectId,
				success: function(data) {
					deletedTownSuccessfully();
					reloadTown(country);
				},
				error: ajaxTownError
			});
		}

		function editTown() {
			$("#inputDiv").remove();
			var town = $(this).data('town');
			var country = $(this).data('country');
			var editedName;
			var div = $("<div>").attr('id', 'inputDiv');
			var input = $("<input>").prop("type", "text").attr("id", "textInput").val(town.name);
			var button = $("<button>").text('Save').appendTo("#input");
			input.appendTo(div);
			button.appendTo(div);
			div.appendTo($('#input'));
			button.click(function() {
				var editedName = input.val();
				div.remove();
				$.ajax({
					method: "PUT",
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
						"X-Parse-REST-API-Key": PARSE_API_KEY
					},
					url: "https://api.parse.com/1/classes/Town/" + town.objectId,
					data: JSON.stringify({
						"name": editedName
					}),
					contentType: "application/json",
					success: function(data) {
						editTownSuccessfully();
						reloadTown(country);
					},
					error: ajaxTownError
				});
			});
		}

		function loadTableFields() {
			$('#country').html("");
			$tr = $("<tr>");
			$country = $("<th>");
			$country.text("Countries");
			$country.appendTo($tr);
			$tr.appendTo("#country");

		}

		function deletedSuccessfully() {
			loadCountry();
			success("Successfully deleted country");
		}

		function ajaxTownError(e) {

			var err = e.responseJSON['error'];
			if (err === "object not found for delete") {
				error("no rights to delete this town");
			} else if (err === "object not found for update") {
				error("no rights to edit this town");
			} else {
				error("Error message.");
			}
		}

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


		function editSuccessfully() {
			loadCountry();
			success("Successfully edited country");

		}

		function addSuccessfully() {
			loadCountry();
			success("Successfully added country");
		}

		function addTownSuccessfully() {
			success("Successfully added town");
		}

		function editTownSuccessfully() {
			success("Successfully edited town");
		}

		function deletedTownSuccessfully() {
			success("Successfully deleted town");
		}


		function success(msg) {
			var $box = $('<div class="box"></div>').text(msg).addClass('success');
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