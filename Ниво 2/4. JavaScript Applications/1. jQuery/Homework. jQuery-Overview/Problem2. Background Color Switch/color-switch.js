(function() {
	
	$(document).ready(function(){
		$('#putColorButton').on('click', switchBackgroundColor);
	});

	function switchBackgroundColor() {
		var takeClassName = $('#inputText').val();
		var takeColor = $('#inputColor').val();
		$('.' + takeClassName).css("background-color", takeColor);
	};
}())