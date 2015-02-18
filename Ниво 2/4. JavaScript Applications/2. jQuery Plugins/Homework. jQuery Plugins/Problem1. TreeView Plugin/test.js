(function(cash) {
	 $.fn.treeView = function() {
		  var $this, $ul;
		  $(this).find('li > ul').hide();
		  $this = $(this);
		  $this.click(function(e) {
			   $ul = $(e.target).children("ul");
			   if ($ul.is(":visible")) {
			    $ul.hide();
			   } else {
			    $ul.show();
			   }
		  });
		  return $this;
	 };

}(jQuery));
