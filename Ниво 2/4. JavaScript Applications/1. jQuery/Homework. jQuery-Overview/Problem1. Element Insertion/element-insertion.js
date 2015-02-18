(function() {
	
	$(document).ready(function() {
		$('#addBefore').on('click', addElementBefore);
		$('#addAfter').on('click', addElementAfter);
	});

	function addElementBefore() {

		var text = $('#inputElement').val();
		var newItem = $('<li>').text(text);
		$('#items').prepend(newItem);

	}

	function addElementAfter() {
		
		var text = $('#inputElement').val();
		var newItem = $('<li>').text(text);
		$('#items').append(newItem);
	}
}());