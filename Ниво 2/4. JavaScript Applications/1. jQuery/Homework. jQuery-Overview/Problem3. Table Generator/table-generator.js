(function() {
	
	$(document).ready(function() {
		$('#addTable').on('click', addTable);
	});

	function addTable() {
		
		var takeInput = $('#inputText').val();
		var obj = jQuery.parseJSON(takeInput);
		$.each(obj, function(key, value) {
			var tableRow =  $('<tr>');
			tableRow.append(
				$('<td>').text(value.manufacturer), 
				$('<td>').text(value.model),
				$('<td>').text(value.year),
				$('<td>').text(value.price),
				$('<td>').text(value.class));
			$('table').append(tableRow);
		});
	}

}());