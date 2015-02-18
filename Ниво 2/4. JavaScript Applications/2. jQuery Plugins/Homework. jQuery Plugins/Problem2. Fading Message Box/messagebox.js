(function ($) {
    $.fn.messageBox = function () {

        var $this = $(this);

         $('button').click(function() {
                var btnClass = $(this).attr('class');
                
                if(btnClass == 'success-btn') {
                    success('Success message.');
                } else if(btnClass == 'error-btn') {
                   error('Error message.');
                }
});
        function success(msg) {
            var $box = $('<div class="box"></div>').text(msg).addClass('success');
            $this.append($box);
            $box.animate({
                opacity: 1
            }, 1000);
            hideBox($box);
        }

        function error(msg) {
            var $box = $('<div class="box"></div>').text(msg).addClass('error');
            $this.append($box);
            $box.animate({
                opacity: 1
            }, 1000);
            hideBox($box);
        }

        function hideBox(box) {
            setTimeout(
                function () {
                    box.remove();
                }, 3000);
        }
        return $this;
    };
}(jQuery));